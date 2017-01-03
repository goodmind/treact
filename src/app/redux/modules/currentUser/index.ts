import { createReducer } from 'redux-act';

import { AUTH } from '../../actions';

export const currentUserReducer = createReducer({
  [AUTH.SIGN_IN.DONE]: (_, { user }) => user,
  [AUTH.LOG_OUT.DONE]: () => null,
}, null);
