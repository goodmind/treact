import {
  all,
  both,
  contains,
  filter,
  is,
  map,
  pipe,
  split,
  trim,
} from 'ramda';
import {
  StringPred,
} from './index.h';

const checkString: StringPred = both(
  is(String),
  str => str.length > 0,
);

const process = pipe(
  filter(contains(':')),
  map(split(':')),
  map(map(trim)),
  filter(all(checkString)),
);

export default process;
