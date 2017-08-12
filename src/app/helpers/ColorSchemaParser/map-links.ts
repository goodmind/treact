import {
  append,
  filter,
  fromPairs,
  map,
  mergeWith,
  of,
  pipe,
} from 'ramda';

import Color from './color-value';

type InputPair = [string, Array<Color | string>];

const intoArrays = mergeWith((c1: Color[], c2: Color[]) => c1.concat(c2));
const arrifyProps: (x: {[name: string]: Color}) => {[name: string]: Color[]} =
  map(of);

export default function processing(list: InputPair[]) {
  const res = flatten(list);
  const mainColors = res.filter(val => !val.isSecond);
  const defaults = res.filter(val => val.isSecond);
  let firsts = {
    pending: mainColors.filter(val => !val.isColor),
    colorMap: makeColorMap(mainColors),
  }
  let seconds = {
    pending: defaults.filter(val => !val.isColor),
    colorMap: makeColorMap(defaults),
  }
  while (firsts.pending.length > 0 || seconds.pending.length > 0) {
    const iteration = resolveLoop(
      firsts.pending, seconds.pending,
      firsts.colorMap, seconds.colorMap,
    );
    firsts = iteration.firsts;
    seconds = iteration.seconds;
  }
  const r = intoArrays(
    arrifyProps(firsts.colorMap),
    arrifyProps(seconds.colorMap),
  );
  return r;
}

const loopAcc = { found: [], notFound: [] };

function resolveLoop(
  pending: ColorValue[],
  pendingS: ColorValue[],
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) {
  const resolver = resolve(
    reduceColorMap(colorMap, colorMapS),
    getFound(colorMap, colorMapS),
  );
  return {
    firsts: resolver(pending, colorMap),
    seconds: resolver(pendingS, colorMapS),
  };
}

const resolve = (reducer, getter) => (pending, colorMap) => {
  const step =  pending.reduce(reducer, loopAcc);
  const foundMap = fromPairs(step.found.map(getter));
  const resultMap = Object.assign({}, colorMap, foundMap);
  return {
    pending: step.notFound,
    colorMap: resultMap,
  };
};

const getFound = (
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) => (val: ColorValue) => {
  const name = val.name;
  const value = val.value as string;
  return [name, colorMap[value] || colorMapS[value]];
};

class ColorValue {
  public isColor: boolean;
  constructor(
    public name: string,
    public value: Color | string,
    public isSecond: boolean = false,
  ) {
    this.isColor = value instanceof Color;
  }
}

function flatten(list: InputPair[]) {
  const result: ColorValue[] = [];
  for (const [name, pair] of list) {
    switch (pair.length) {
      case 1: {
        result.push(new ColorValue(name, pair[0]));
        break;
      }
      case 2: {
        result.push(new ColorValue(name, pair[0]));
        result.push(new ColorValue(name, pair[1], true));
        break;
      }
      default: throw new RangeError(`Unexpected array ${pair.toString()}`);
    }
  }
  return result;
}

const makeColorMap: (list: ColorValue[]) => {[name: string]: Color} =
  pipe(
    filter(val => val.isColor),
    map((val): [string, Color] => [val.name, val.value as Color]),
    fromPairs,
  );

type SearchReduceAcc = {
  found: ColorValue[],
  notFound: ColorValue[],
};

const reduceColorMap = (
  colorMap: {[name: string]: Color},
  colorMapS: {[name: string]: Color},
) =>
  ({ found, notFound }: SearchReduceAcc, value: ColorValue) => {
  const data = value.value as string;
  if (colorMap[data] || colorMapS[data])
    return {
      notFound,
      found: append(value, found),
    };
  return {
    notFound: append(value, notFound),
    found,
  };
};
