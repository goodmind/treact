
import {
  append,
  contains,
  equals,
  head,
  last,
  map,
  pipe,
  reduce,
  split,
  take,
  takeLast,
} from 'ramda'
import {
  ListChange,
  StringChange,
  StringPred,
  TokenHandler,
} from './index.h'

const isBeginWith: (word: string) => StringPred = word => pipe(
  take(word.length),
  equals(word),
)

const callHandler: (handler: TokenHandler) => StringChange =
  handler => str =>
    handler.isOnly(str)
      ? ''
      : handler.apply(str)

const lineComment: StringChange = callHandler({
  isOnly: isBeginWith('//'),
  apply : pipe(split('//'), head),
})

const mlCommentL: StringChange = callHandler({
  isOnly: isBeginWith('/*'),
  apply : pipe(split('/*'), head),
})

const mlCommentR: StringChange = callHandler({
  isOnly: pipe(takeLast(2), equals('*/')),
  apply : pipe(split('*/'), t => last(t)),
})

const semi: StringChange = callHandler({
  isOnly: isBeginWith(';'),
  apply : pipe(split(';'), head),
})

type OmitMLAcc = { list: string[], comment: boolean }
const omitMLComments: (list: string[]) => string[] = pipe(
  reduce(({ list, comment }: OmitMLAcc, str: string) => {
  if (comment) {
      if (contains('*/', str))
        return {
          list: append(mlCommentR(str), list),
          comment: false,
        }
      return { list, comment }
    }
  if (contains('/*', str))
      return {
        list: append(mlCommentL(str), list),
        comment: true,
      }
  return {
      list: append(str, list),
      comment,
    }
  }, { list: [], comment: false }),
  x => x.list,
)


const omitComment: ListChange = pipe(
  map(lineComment),
  omitMLComments,
  map(semi),
)

export default omitComment
