import { IAuthKey, IAuthKeyAction } from 'models/authKey';
import { authKeyWithSaltToStorableBuffer } from 'helpers/Telegram';

export const SET_AUTH_KEY = 'authKey/SET_AUTH_KEY';

const initialState: IAuthKey = null;

export function authKeyReducer(state = initialState, action: IAuthKeyAction) {
  switch (action.type) {
    case SET_AUTH_KEY:
      const { key, serverSalt } = action.payload;
      return authKeyWithSaltToStorableBuffer(key, serverSalt);
    default:
      return state;
  }
}

export function setAuthKey(authKey) {
  return {
    type: SET_AUTH_KEY,
    payload: authKey,
  };
}
