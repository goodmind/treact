import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { AUTH } from 'actions';

const onLogOut = () => ({});
const onSignIn = (s, { dcID, authKey }) => Object.assign({}, s, { [dcID]: authKey });

const onLogOutIds = () => ([]);
const onSignInIds = (s, { dcID }) => s.concat([dcID]);

const ids = createReducer({
  [AUTH.LOG_OUT.DONE]: onLogOutIds,
  [AUTH.SIGN_IN.DONE]: onSignInIds,
}, []);

const byId = createReducer({
  [AUTH.LOG_OUT.DONE]: onLogOut,
  [AUTH.SIGN_IN.DONE]: onSignIn,
}, {});

export const authKeyReducer = combineReducers({
  ids,
  byId,
});
