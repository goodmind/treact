import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { T, F } from 'ramda';
import { byIdGetter } from 'helpers/Telegram/helpers';

import { AUTH } from 'actions';

export interface IAuthError {
  code: number;
  type: string;
  description?: string;
}
export interface IAuth {
  authenticated: boolean;
  loading: boolean;
  phoneNumber: string;
  phoneCodeHash: string;
  phoneCode: string;
  passwordSalt: string;
  error: IAuthError;
}

const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH;

const passwordSalt = createReducer({
  [GET_PASSWORD.DONE]: (_, { passwordSalt }) => passwordSalt,
}, '');

const saveError = (_, { code, type }: IAuthError): IAuthError => ({ code, type });

const error = createReducer<IAuthError>({
  [SEND_CODE.FAIL]: saveError,
  [SIGN_IN.FAIL]: saveError,
  [GET_PASSWORD.FAIL]: saveError,
}, {
  code: null,
  type: null,
});

const loading = createReducer({
  [SEND_CODE.INIT]: T,
  [SEND_CODE.DONE]: F,
  [SEND_CODE.FAIL]: F,
  [SIGN_IN.INIT]: T,
  [SIGN_IN.DONE]: F,
  [SIGN_IN.FAIL]: F,
  [GET_PASSWORD.INIT]: T,
  [GET_PASSWORD.DONE]: F,
  [GET_PASSWORD.FAIL]: F,
}, false);

const authenticated = createReducer({
  [SIGN_IN.DONE]: T,
  [LOG_OUT.DONE]: F,
  [REHYDRATE]: (_, { authKey, currentUser, currentDc }) => !!byIdGetter(currentDc)(authKey) && !!currentUser,
}, false);

const phoneNumber = createReducer({
  [SEND_CODE.DONE]: (_, { phoneNumber }) => phoneNumber,
}, '');

const phoneCodeHash = createReducer({
  [SEND_CODE.DONE]: (_, { phoneCodeHash }) => phoneCodeHash,
}, '');

const loggedOut = createReducer({
  [LOG_OUT.DONE]: T,
}, false);

export const authReducer = combineReducers<IAuth>({
  loading,
  error,
  authenticated,
  loggedOut,
  passwordSalt,
  phoneNumber,
  phoneCodeHash,
});
