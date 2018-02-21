import {
  contains,
  equals,
  head,
  map,
  pipe,
  split,
  tail,
  trim,
  when,
} from 'ramda'
import {
  Splitter,
  StringPred,
} from './index.h'

import Color from './color-value'

// TODO: make better types
const onSecond = <L, T, S>(fn: (a: T) => S) =>
  // tslint:disable-next-line
  ([l, t, ...rest]: any[]): (L|T|S) & any => [l, fn(t), ...rest];
const isPair: StringPred = contains('|')
const splitPair: Splitter = pipe(split('|'), map(trim))
const isColor: StringPred = pipe(head, equals('#'))

const getColorObj: (str: string) => Color =
  pipe(tail, (str: string) => {
    switch (str.length) {
      case 6: {
        return Color.of(str + 'ff')
      }
      case 8: {
        return Color.of(str)
      }
      default: {
        throw new TypeError(`Unexpected color value ${str}`)
      }
    }
  })


const arrify = (str: string) => isPair(str)
  ? splitPair(str)
  : [str]

const transformColors: (str: string) => string | Color = when(isColor, getColorObj)

const processing = pipe(
  map<string[], [string, string[]]>(onSecond<string, string, string[]>(arrify)),
  map<[string, string[]], [string, Array<string | Color>]>(
    onSecond<string, string[], Array<string | Color>>(map(transformColors))),
)

export default processing
