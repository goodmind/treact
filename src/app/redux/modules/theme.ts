import { createReducer } from 'redux-act';
import { THEME } from 'redux/actions';
import defaultTheme from 'themes/default';
import { RawTheme } from 'themes/theme.h';
const { APPLY } = THEME;

const reducer = createReducer<RawTheme>({
  [APPLY]: (_, payload) => payload,
}, defaultTheme);

export { RawTheme as StoreTheme };
export default reducer;
