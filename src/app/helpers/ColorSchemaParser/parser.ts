import { pipe, split, reject, isEmpty } from 'ramda';
import omitComment from './omit-comment';
import splitKV from './split-kv';
import color from './color';
import mapLinks from './map-links';
import { Parser } from './index.h';

const parser: Parser = pipe(
  split(`\n`),
  omitComment,
  reject(isEmpty),
  splitKV,
  color,
  mapLinks,
);

export default parser;
