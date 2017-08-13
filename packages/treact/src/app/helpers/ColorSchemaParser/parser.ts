import { isEmpty, pipe, reject, split } from 'ramda';
import color from './color';
import Color from './color-value';
import mapLinks from './map-links';
import omitComment from './omit-comment';
import splitKV from './split-kv';

type Parser = (text: string) => {[colorName: string]: Color[]};

export const parser = pipe(
  split(`\n`),
  omitComment,
  reject(isEmpty),
  splitKV,
  color,
);

const linkedParser: Parser = pipe(
  parser,
  mapLinks,
);

export default linkedParser;
