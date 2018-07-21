import theme, { applyTheme } from 'store/modules/theme'
import { Dispatch, Store } from 'store/store.h'
import defaultTheme from 'themes/default'
import nightTheme from 'themes/night'

export function switchNightMode() {
  return (dispatch: Dispatch, getState: () => Store) => {
    const { meta: { builtin, nightMode } } = theme.getState()
    if (builtin) {
      if (nightMode) {
        applyTheme(defaultTheme)
      } else {
        applyTheme(nightTheme)
      }
    }
  }
}
