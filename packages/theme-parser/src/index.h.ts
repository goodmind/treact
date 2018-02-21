export type StringPred = (str: string) => boolean
export type Splitter = (str: string) => string[]
export type StringChange = (str: string) => string
export type ListChange = (list: string[]) => string[]
export type TokenHandler = {
  isOnly: StringPred,
  apply: StringChange,
}
