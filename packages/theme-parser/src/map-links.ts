import {
  append,
  filter,
  fromPairs,
  map,
  mergeAll,
  mergeWith,
  of,
  partition,
  pipe,
  uniqBy,
  values,
} from 'ramda'

import Color from './color-value'
import parser from './parser'

export type InputPair = [string, Array<Color | string>]

const intoArrays = mergeWith((c1: Color[], c2: Color[]) => c1.concat(c2))
const arrifyProps: (x: {[name: string]: Color}) => {[name: string]: Color[]} =
  map(of)

const splitFallbacks: (colors: ColorValue[]) => [ColorValue[], ColorValue[]] =
  partition(val => !val.isFallback)

const inputToColorPair: (list: InputPair[]) => [ColorValue[], ColorValue[]] =
  pipe(flatten, splitFallbacks)

const makePendings = (list: ColorValue[]) => ({
  pending: list.filter(val => !val.isColor),
  colorMap: makeColorMap(list),
})

export function processing([mainColors, defaults]: [ColorValue[], ColorValue[]]) {
  let firsts = makePendings(mainColors)
  let fallbacks = makePendings(defaults)
  while (firsts.pending.length > 0 || fallbacks.pending.length > 0) {
    const iteration = resolveLoop(
      firsts.pending, fallbacks.pending,
      firsts.colorMap, fallbacks.colorMap,
    )
    const uselessIteration =  // Prevents infinite loop
      iteration.firsts.pending.length === firsts.pending.length &&
      iteration.fallbacks.pending.length === fallbacks.pending.length
    if (uselessIteration) break
    firsts = iteration.firsts
    fallbacks = iteration.fallbacks
  }
  return {
    main: firsts.colorMap,
    fallbacks: fallbacks.colorMap,
  }
}

const uniqColor = uniqBy((color: ColorValue) => color.name)
const join = (listR: ColorValue[]) => (listL: ColorValue[]) => uniqColor(listL.concat(listR))

export type ThemePair = [ColorValue[], ColorValue[]]

export function mergeThemes(
  [leftMain, leftFallbacks = []]: ThemePair,
  [rightMain, rightFallbacks = []]: ThemePair,
) {
  const { main, fallbacks } = processing([
    join(rightMain)(leftMain),
    join(rightFallbacks)(leftFallbacks),
  ])
  return Object.assign({}, fallbacks, main)
}

export function parseWithDefaults(defaultThemePairs: InputPair[]) {
  const defaultTheme = inputToColorPair(defaultThemePairs)
  return (themePairs: InputPair[]) => {
    const theme = inputToColorPair(themePairs)
    return mergeThemes(theme, [[], defaultTheme[1]])
  }
}

export const processingToObject = pipe(
  inputToColorPair,
  processing,
  values,
  mergeAll,
)

function processingToPairs(list: InputPair[]) {
  const { main, fallbacks } = processing(inputToColorPair(list))
  return intoArrays(
    arrifyProps(main),
    arrifyProps(fallbacks),
  )
}

export default pipe(parser, processingToPairs)

const loopAcc = { found: [], notFound: [] }

function resolveLoop(
  pending: ColorValue[],
  pendingS: ColorValue[],
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) {
  const resolver = resolve(
    reduceColorMap(colorMap, colorMapS),
    getFound(colorMap, colorMapS),
  )
  return {
    firsts: resolver(pending, colorMap),
    fallbacks: resolver(pendingS, colorMapS),
  }
}

const resolve = (reducer, getter) => (pending, colorMap) => {
  const step =  pending.reduce(reducer, loopAcc)
  const foundMap = fromPairs(step.found.map(getter))
  const resultMap = Object.assign({}, colorMap, foundMap)
  return {
    pending: step.notFound,
    colorMap: resultMap,
  }
}

const getFound = (
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) => (val: ColorValue) => {
  const name = val.name
  const value = val.value as string
  return [name, colorMap[value] || colorMapS[value]]
}

export class ColorValue {
  public isColor: boolean
  constructor(
    public name: string,
    public value: Color | string,
    public isFallback: boolean = false,
  ) {
    this.isColor = value instanceof Color
  }
}

export function flatten(list: InputPair[]) {
  const result: ColorValue[] = []
  for (const [name, pair] of list) {
    switch (pair.length) {
      case 1: {
        result.push(new ColorValue(name, pair[0]))
        break
      }
      case 2: {
        result.push(new ColorValue(name, pair[0]))
        result.push(new ColorValue(name, pair[1], true))
        break
      }
      default: throw new RangeError(`Unexpected array ${pair.toString()}`)
    }
  }
  return result
}

const makeColorMap: (list: ColorValue[]) => {[name: string]: Color} =
  pipe(
    filter(val => val.isColor),
    map((val): [string, Color] => [val.name, val.value as Color]),
    fromPairs,
  )

type SearchReduceAcc = {
  found: ColorValue[],
  notFound: ColorValue[],
}

const reduceColorMap = (
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) =>
  ({ found, notFound }: SearchReduceAcc, value: ColorValue) => {
  const data = value.value as string
  if (colorMap[data] || colorMapS[data])
    return {
      notFound,
      found: append(value, found),
    }
  return {
    notFound: append(value, notFound),
    found,
  }
}
