import { THEME } from 'actions';
import { Dispatch, Store } from 'redux/store.h';
import defaultTheme from 'themes/default';
import nightTheme from 'themes/night';
import { RawTheme } from 'themes/theme.h';
const { APPLY } = THEME;

export function applyTheme(theme: RawTheme) {
  return (dispatch: Dispatch) => dispatch(APPLY(theme));
}

export function switchNightMode() {
  return (dispatch: Dispatch, getState: () => Store) => {
    const { theme: { meta: { builtin, nightMode } } } = getState();
    if (builtin) {
      if (nightMode) {
        dispatch(applyTheme(defaultTheme));
      } else {
        dispatch(applyTheme(nightTheme));
      }
    }
  };
}
