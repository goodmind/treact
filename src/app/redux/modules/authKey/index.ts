import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { authKeyWithSaltToStorableBuffer, client } from 'helpers/Telegram';
import { AUTH } from 'actions';

const onLogOut = () => ({});
const onSignIn = (s, { dcID }) => {
  const { key, serverSalt } = client.authKey;
  return Object.assign({}, s, { [dcID]: authKeyWithSaltToStorableBuffer(key, serverSalt) });
};

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
