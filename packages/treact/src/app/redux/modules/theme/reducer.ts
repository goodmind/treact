import { createReducer } from 'effector'
import defaultTheme from 'themes/default'
import { RawTheme } from 'themes/theme.h'
import { applyTheme } from './actions'

export const reducer = createReducer<RawTheme>(defaultTheme)
  .on(applyTheme, (_, payload) => payload)

export { RawTheme as StoreTheme }

export default reducer
