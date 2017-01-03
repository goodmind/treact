import { invoke, APP_HASH, APP_ID, makePasswordHash } from 'helpers/Telegram';

import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { AUTH } from '../../actions';
const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH;

const passwordSalt = createReducer({
  [GET_PASSWORD.DONE]: (_, { passwordSalt }) => passwordSalt,
}, '');

const saveError = (_, { error_code, error_message }) => ({ error_code, error_message });

const error = createReducer({
  [SEND_CODE.FAIL]: saveError,
  [SIGN_IN.FAIL]: saveError,
  [GET_PASSWORD.FAIL]: saveError,
}, {
  error_code: null,
  error_message: null,
});

const FALSE = () => false;
const TRUE = () => true;

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
}, false);

const phoneNumber = createReducer({
  [SEND_CODE.DONE]: (_, { phoneNumber }) => phoneNumber,
}, '');

const phoneCodeHash = createReducer({
  [SEND_CODE.DONE]: (_, { phoneCodeHash }) => phoneCodeHash,
}, '');

export const authReducer = combineReducers({
  loading,
  error,
  authenticated,
  passwordSalt,
  phoneNumber,
  phoneCodeHash,
});

export function getPassword() {
  const onDone = ({ current_salt }) => GET_PASSWORD.DONE({
    passwordSalt: current_salt,
  });
  return dispatch => {
    dispatch(GET_PASSWORD.INIT());
    return invoke('account.getPassword')
      .then(onDone, GET_PASSWORD.FAIL)
      .then(dispatch);
  };
}

export function checkPassword(password: string) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const hash = makePasswordHash(auth.passwordSalt, password);
    return invoke('auth.checkPassword', {
      password_hash: hash,
    }).then(SIGN_IN.DONE, SIGN_IN.FAIL)
      .then(dispatch);
  };
}

export function signIn(phoneCode) {
  const catchNeedPass = err => err.error_message === 'SESSION_PASSWORD_NEEDED'
      ? getPassword()
      : SIGN_IN.FAIL(err);
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(SIGN_IN.INIT());
    return invoke('auth.signIn', {
      phone_number: auth.phoneNumber,
      phone_code_hash: auth.phoneCodeHash,
      phone_code: phoneCode,
    }).then(SIGN_IN.DONE, catchNeedPass)
      .then(dispatch);
  };
}

export function sendCode(phoneNumber: string) {
  const onDone = ({ phone_code_hash }) => SEND_CODE.DONE({
    phoneCodeHash: phone_code_hash,
    phoneNumber,
  });
  return dispatch => {
    dispatch(SEND_CODE.INIT());
    return invoke('auth.sendCode', {
      phone_number: phoneNumber,
      current_number: false,
      api_id: APP_ID,
      api_hash: APP_HASH,
    }).then(onDone, SEND_CODE.FAIL)
      .then(dispatch);
  };
}

export function logOut() {
  return dispatch => {
    dispatch(LOG_OUT.INIT());
    return invoke('auth.logOut')
      .then(LOG_OUT.DONE, LOG_OUT.FAIL)
      .then(dispatch);
  };
}
