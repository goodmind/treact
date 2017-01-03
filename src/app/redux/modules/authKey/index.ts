import { authKeyWithSaltToStorableBuffer, client } from 'helpers/Telegram';

import { createReducer } from 'redux-act';

import { AUTH } from '../../actions';

const onSignIn = () => {
  const { key, serverSalt } = client.authKey;
  return authKeyWithSaltToStorableBuffer(key, serverSalt);
}

export const authKeyReducer = createReducer({
  [AUTH.SIGN_IN.DONE]: onSignIn,
}, null);
