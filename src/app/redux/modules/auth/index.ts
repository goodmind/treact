import { REHYDRATE } from 'redux-persist/constants';
import { AUTH } from 'actions';
import { IAuth, IAuthError } from 'models/auth';

import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH;
const FALSE = () => false;
const TRUE = () => true;

const passwordSalt = createReducer({
  [GET_PASSWORD.DONE]: (_, { passwordSalt }) => passwordSalt,
}, '');

const saveError = (_, { error_code, error_message }: IAuthError): IAuthError => ({ error_code, error_message });

const error = createReducer<IAuthError>({
  [SEND_CODE.FAIL]: saveError,
  [SIGN_IN.FAIL]: saveError,
  [GET_PASSWORD.FAIL]: saveError,
}, {
  error_code: null,
  error_message: null,
});

const loading = createReducer({
  [SEND_CODE.INIT]: TRUE,
  [SEND_CODE.DONE]: FALSE,
  [SEND_CODE.FAIL]: FALSE,
  [SIGN_IN.INIT]: TRUE,
  [SIGN_IN.DONE]: FALSE,
  [SIGN_IN.FAIL]: FALSE,
  [GET_PASSWORD.INIT]: TRUE,
  [GET_PASSWORD.DONE]: FALSE,
  [GET_PASSWORD.FAIL]: FALSE,
}, false);

const authenticated = createReducer({
  [SIGN_IN.DONE]: TRUE,
  [LOG_OUT.DONE]: FALSE,
  [REHYDRATE]: (_, { authKey, currentUser }) => !!authKey && !!currentUser,
}, false);

const phoneNumber = createReducer({
  [SEND_CODE.DONE]: (_, { phoneNumber }) => phoneNumber,
}, '');

const phoneCodeHash = createReducer({
  [SEND_CODE.DONE]: (_, { phoneCodeHash }) => phoneCodeHash,
}, '');

const loggedOut = createReducer({
  [LOG_OUT.DONE]: TRUE,
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
