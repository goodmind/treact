import { APP_HASH, APP_ID, DEFAULT_DC_ID } from 'helpers/Telegram/config';
import { invoke, makePasswordHash } from 'helpers/Telegram';
import { push } from 'react-router-redux';
import { IDispatch } from '../IStore';
import { AUTH } from 'actions';

import { pipe, tap } from 'ramda';

const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH;

const addDc = x => Object.assign({}, x, { dcID: DEFAULT_DC_ID });

function getPassword() {
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
    }).then(addDc)
      .then(SIGN_IN.DONE, SIGN_IN.FAIL)
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
    return invoke('auth.signIn', {
      phone_number: auth.phoneNumber,
      phone_code_hash: auth.phoneCodeHash,
      phone_code: phoneCode,
    }).then(addDc)
      .then(SIGN_IN.DONE)
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
  return (dispatch: IDispatch) => {
    const cleanAndRedirect = r => {
      if (r.payload === false) {
        localStorage.clear();
      }
      dispatch(push('/'));
    };
    dispatch(LOG_OUT.INIT());
    return invoke<boolean>('auth.logOut')
      .then(LOG_OUT.DONE, LOG_OUT.FAIL)
      .then(dispatch)
      .then(tap(cleanAndRedirect));
  };
}
