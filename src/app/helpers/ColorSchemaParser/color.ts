import {
  adjust,
  contains,
  equals,
  head,
  map,
  pipe,
  split,
  tail,
  trim,
  when,
} from 'ramda';
import {
  Splitter,
  StringPred,
} from './index.h';

import Color from './color-value';

const onSecond = (fn: (a: {}) => {}) => adjust(fn, 1);
const isPair: StringPred = contains('|');
const splitPair: Splitter = pipe(split('|'), map(trim));
const isColor: StringPred = pipe(head, equals('#'));

const getColorObj: (str: string) => Color =
  pipe(tail, (str: string) => {
    switch (str.length) {
      case 6: {
        return Color.of(str + 'ff');
      }
      case 8: {
        return Color.of(str);
      }
      default: {
        throw new TypeError(`Unexpected color value ${str}`);
      }
    }
  });


const arrify = (str: string) => isPair(str)
  ? splitPair(str)
  : [str];

const transformColors: (str: string) => string | Color = when(isColor, getColorObj);

const processing = pipe(
  map(onSecond(arrify)),
  map(onSecond(map(transformColors))),
);

export default processing;
