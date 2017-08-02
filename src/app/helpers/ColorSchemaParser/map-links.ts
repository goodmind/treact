import {
  append,
  chain,
  fromPairs,
  is,
  lensProp,
  map,
  over,
  pipe,
  toPairs,
} from 'ramda';

import Color from './color-value';

type ColorRef = [string, number];
type ColorLink = [string, number, number];
type InputPair = [string, Array<Color | string>];



const createNamesMap: (list: InputPair[]) => {[name: string]: ColorRef[]} =
pipe(
  map(([name]: InputPair) => name),
  map((name: string): [string, ColorRef[]] => [name, []]),
  fromPairs,
);

const addToNameMap = (
  name: string,
  index: number,
  ref: string,
  namesMap: {[name: string]: ColorRef[]},
): {[name: string]: ColorRef[]} =>
  over(lensProp(ref), append([name, index]), namesMap);

type ReducerAcc = {
  colorList: Color[],
  namesMap: {[name: string]: ColorRef[]},
  results: ColorLink[],
};

function colorReducer(
  { colorList, namesMap, results }: ReducerAcc,
  [name, color, index]: [string, Color | string, number],
) {
  if (is(String, color))
    return {
      colorList,
      namesMap: addToNameMap(name, index, color, namesMap),
      results,
    };
  return {
    colorList: append(color, colorList),
    namesMap,
    results: append([name, index, colorList.length], results),
  };
}

function colorsReducer(
  acc: ReducerAcc,
  [name, colors]: InputPair) {
  return colors
    .map((color, index) => [name, color, index])
    .reduce(colorReducer, acc);
}

function resolveLinks({ colorList, namesMap, results }: ReducerAcc): {[name: string]: Color[]} {
  // TODO: fix types
  const refMap = fromPairs(results
    // tslint:disable-next-line
    .filter(([_, index]: any) => index === 0)
    // tslint:disable-next-line
    .map(([name, _, position]: any) => [name, position]) as any,
  );
  const linked = pipe(
    toPairs,
    chain(
      // tslint:disable-next-line
      ([field, links]: any) => links.map(
        // tslint:disable-next-line
        ([name, index]: any) => [name, index, refMap[field]])),
  )(namesMap);
  return results
    // tslint:disable-next-line
    .concat(linked as any)
    .reduce((acc: {[key: string]: Color[]}, [name, index, ref]) => {
      if (!colorList[ref])
        return acc;
      if (!acc[name])
        acc[name] = [];
      acc[name][index] = colorList[ref];
      //log(['acc name', name])(acc[name])
      return acc;
    }, {});
}

export default function processing(list: InputPair[]) {
  const namesMap = createNamesMap(list);
  const result = list
    .reduce(colorsReducer, { colorList: [], namesMap, results: [] });
  return resolveLinks(result);
}
