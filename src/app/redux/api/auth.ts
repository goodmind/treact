import { pipe, tap } from 'ramda';

import { api } from 'helpers/pool'
import { APP_HASH, APP_ID, makePasswordHash } from 'helpers/Telegram';
import { push } from 'react-router-redux';
import { IDispatch } from '../IStore';
import { AUTH } from 'actions';


const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH;

function getPassword() {
  const onDone = ({ current_salt }) => GET_PASSWORD.DONE({
    passwordSalt: current_salt,
  });
  return dispatch => {
    dispatch(GET_PASSWORD.INIT());
    return api('account.getPassword')
      .then(onDone, GET_PASSWORD.FAIL)
      .then(dispatch);
  };
}

export function checkPassword(password: string) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const hash = makePasswordHash(auth.passwordSalt, password);
    return api('auth.checkPassword', {
      password_hash: hash,
    }).then(SIGN_IN.DONE, SIGN_IN.FAIL)
      .then(dispatch);
  };
}

export function signIn(phoneCode) {
  return (dispatch, getState) => {
    const catchNeedPass = err => err.error_message === 'SESSION_PASSWORD_NEEDED'
      ? dispatch(getPassword())
      : err;
    const catchAndDispatch = pipe( tap(catchNeedPass), err => dispatch(SIGN_IN.FAIL(err)) );
    const { auth } = getState();
    dispatch(SIGN_IN.INIT());
    return api('auth.signIn', {
      phone_number: auth.phoneNumber,
      phone_code_hash: auth.phoneCodeHash,
      phone_code: phoneCode,
    }).then(SIGN_IN.DONE)
      .then(dispatch)
      .catch(catchAndDispatch);
  };
}

export function sendCode(phoneNumber: string) {
  const onDone = ({ phone_code_hash }) => SEND_CODE.DONE({
    phoneCodeHash: phone_code_hash,
    phoneNumber,
  });
  return dispatch => {
    dispatch(SEND_CODE.INIT());
    return api('auth.sendCode', {
      phone_number: phoneNumber,
      current_number: false,
      api_id: APP_ID,
      api_hash: APP_HASH,
    }).then(onDone, SEND_CODE.FAIL)
      .then(dispatch);
  };
}

export function logOut() {
  return (dispatch: IDispatch) => {
    const cleanAndRedirect = r => {
      if (r.payload === false) {
        localStorage.clear();
      }
      dispatch(push('/'));
    };
    dispatch(LOG_OUT.INIT());
    return api<boolean>('auth.logOut')
      .then(LOG_OUT.DONE, LOG_OUT.FAIL)
      .then(dispatch)
      .then(tap(cleanAndRedirect));
  };
}
