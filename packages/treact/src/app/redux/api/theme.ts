import { applyTheme } from 'redux/modules/theme'
import { Dispatch, Store } from 'redux/store.h'
import defaultTheme from 'themes/default'
import nightTheme from 'themes/night'

export function switchNightMode() {
  return (dispatch: Dispatch, getState: () => Store) => {
    const { theme: { meta: { builtin, nightMode } } } = getState()
    if (builtin) {
      if (nightMode) {
        dispatch(applyTheme(defaultTheme))
      } else {
        dispatch(applyTheme(nightTheme))
      }
    }
  }
}
