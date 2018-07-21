import { applyTheme } from './actions'
import { theme } from './shape'

theme
  .on(applyTheme, (_, payload) => payload)
