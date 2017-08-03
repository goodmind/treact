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
type IndexMap = {[field: string]: number};


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

const converter = (field: string, refMap: IndexMap) =>
  ([name, index]: ColorRef): ColorLink  => [name, index, refMap[field]];

function joinResults(results: ColorLink[], linked: ColorLink[], colorList: Color[]) {
  return results
    .concat(linked)
    .reduce(reducer, {});

  function reducer(acc: {[key: string]: Color[]}, [name, index, ref]: ColorLink) {
    if (!colorList[ref])
      return acc;
    if (!acc[name])
      acc[name] = [];
    acc[name][index] = colorList[ref];
    return acc;
  }
}

function createRefMap(results: ColorLink[]) {
  const refPairs = results
    .filter(([_, index]) => index === 0)
    .map(([name, _, position]): ColorRef => [name, position]);

  return fromPairs<number>(refPairs);
}

function resolveLinks({ colorList, namesMap, results }: ReducerAcc): {[name: string]: Color[]} {
  const namePairs = toPairs(namesMap);
  const refMap = createRefMap(results);

  const linker = ([field, links]: [string, ColorRef[]]) => links.map(converter(field, refMap));
  const linked: ColorLink[]  = chain<[string, ColorRef[]], ColorLink>(linker, namePairs);
  return joinResults(results, linked, colorList);
}

export default function processing(list: InputPair[]) {
  const namesMap = createNamesMap(list);
  const initialAcc = { colorList: [], namesMap, results: [] };
  const result = list.reduce(colorsReducer, initialAcc);
  return resolveLinks(result);
}
