import { AUTH } from 'actions';
import { createReducer } from 'redux-act';
import { IMtpUser } from 'redux/mtproto';

export const currentUserReducer = createReducer({
  [AUTH.SIGN_IN.DONE]: (_, { user }) => user,
  [AUTH.LOG_OUT.DONE]: () => null,
}, null);
