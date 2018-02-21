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
} from 'ramda'
import {
  StringPred,
} from './index.h'

const checkString: StringPred = both(
  is(String),
  str => str.length > 0,
)

const process: (x: string[]) => string[][] = pipe(
  filter(contains(':')),
  map(split(':')),
  map<string[], string[]>(map(trim)),
  filter<string[]>(all(checkString)),
)

export default process
