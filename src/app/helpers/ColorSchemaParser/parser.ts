import { isEmpty, pipe, reject, split } from 'ramda';
import color from './color';
import mapLinks from './map-links';
import omitComment from './omit-comment';
import splitKV from './split-kv';

const parser = pipe(
  split(`\n`),
  omitComment,
  reject(isEmpty),
  splitKV,
  color,
  mapLinks,
);

export default parser;
