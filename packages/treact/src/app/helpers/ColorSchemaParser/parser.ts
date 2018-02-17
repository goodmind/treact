import { isEmpty, pipe, reject, split } from 'ramda'
import color from './color'
import Color from './color-value'
import omitComment from './omit-comment'
import splitKV from './split-kv'

type Parser = (text: string) => Array<[string, Array<Color | string>]>

export const parser: Parser = pipe(
  split(`\n`),
  omitComment,
  reject<string[]>(isEmpty),
  splitKV,
  color,
)

export default parser
