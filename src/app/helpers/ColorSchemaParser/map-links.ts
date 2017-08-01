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
  const refMap = fromPairs(results
    .filter(([name, index]: [string, number]) => index === 0)
    .map(([name, index, position]: [string, number, number]) => [name, position]),
  );
  const linked = pipe(
    toPairs,
    chain(
      ([field, links]: [string, ColorRef[]]) => links.map(
        ([name, index]: [string, number]) => [name, index, refMap[field]])),
  )(namesMap);
  return results
    .concat(linked)
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

export default function processing(list: [string, Array<Color | string>]) {
  const namesMap = createNamesMap(list);
  const result = list
    .reduce(colorsReducer, { colorList: [], namesMap, results: [] });
  return resolveLinks(result);
}
