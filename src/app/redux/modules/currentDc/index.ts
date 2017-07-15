import { createReducer } from 'redux-act';
import { AUTH } from 'actions';

export const currentDcReducer = createReducer({
  [AUTH.SIGN_IN.DONE]: (_, { dcID }) => dcID,
  [AUTH.LOG_OUT.DONE]: () => null,
}, null);
