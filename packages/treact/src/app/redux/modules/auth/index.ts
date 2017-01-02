import { IAuth, IAuthAction } from 'models/auth';
import { invoke, APP_HASH, APP_ID, makePasswordHash, client } from 'helpers/Telegram';
import { setCurrentUser } from '../currentUser';
import { setAuthKey } from '../authKey';

export const SEND_CODE = 'auth/SEND_CODE';
export const SEND_CODE_SUCCESS = 'auth/SEND_CODE_SUCCESS';
export const SEND_CODE_FAILURE = 'auth/SEND_CODE_FAILURE';
export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'auth/SIGN_IN_FAILURE';
export const GET_PASSWORD = 'auth/GET_PASSWORD';
export const GET_PASSWORD_SUCCESS = 'auth/GET_PASSWORD_SUCCESS';
export const GET_PASSWORD_FAILURE = 'auth/GET_PASSWORD_FAILURE';

const initialState: IAuth = {
  authenticated: false,
  loading: false,
  phoneNumber: '',
  phoneCodeHash: '',
  phoneCode: '',
  passwordSalt: '',
  error: {
    error_code: null,
    error_message: null,
  },
};

export function authReducer(state = initialState, action: IAuthAction) {
  switch (action.type) {
    case SEND_CODE:
      return Object.assign(state, {}, {
        loading: true,
      });

    case SEND_CODE_SUCCESS:
      return Object.assign(state, {}, action.payload, {
        loading: false,
      });

    case SEND_CODE_FAILURE:
      return Object.assign(state, {}, {
        loading: false,
        error: action.payload,
      });

    case SIGN_IN:
      return Object.assign(state, {}, {
        loading: true,
      });

    case SIGN_IN_SUCCESS:
      return Object.assign(state, {}, {
        loading: false,
        authenticated: true,
      });

    case SIGN_IN_FAILURE:
      return Object.assign(state, {}, {
        loading: false,
        error: action.payload,
      });

    case GET_PASSWORD:
      return Object.assign(state, {}, {
        loading: true,
      });

    case GET_PASSWORD_SUCCESS:
      return Object.assign(state, {}, action.payload, {
        loading: false,
      });

    case GET_PASSWORD_FAILURE:
      return Object.assign(state, {}, {
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
}

function sendCodeSuccess(payload: {phoneCodeHash: string, phoneNumber: string}) {
  return {
    type: SEND_CODE_SUCCESS,
    payload,
  };
}

function sendCodeFailure(err: any) {
  return {
    type: SEND_CODE_FAILURE,
    payload: err,
  };
}

function signInSuccess(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}

function signInFailure(err) {
  return {
    type: SIGN_IN_FAILURE,
    payload: err,
  };
}

function getPasswordSuccess(payload) {
  return {
    type: GET_PASSWORD_SUCCESS,
    payload,
  };
}

function getPasswordFailure(err) {
  return {
    type: GET_PASSWORD_FAILURE,
    payload: err,
  };
}

export function getPassword() {
  return dispatch => {
    dispatch({type: GET_PASSWORD});
    return invoke('account.getPassword')
      .then(result => dispatch(getPasswordSuccess({
        passwordSalt: result.current_salt,
      })))
      .catch(err => dispatch(getPasswordFailure(err)));
  };
}

export function checkPassword(password: string) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const hash = makePasswordHash(auth.passwordSalt, password);
    return invoke('auth.checkPassword', {
      password_hash: hash,
    }).then(result => {
      dispatch(setCurrentUser(result.user));
      dispatch(setAuthKey(client.authKey));
      return dispatch(signInSuccess(result));
    })
      .catch(err => dispatch(signInFailure(err)));
  };
}

export function signIn(phoneCode) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch({type: SIGN_IN});
    return invoke('auth.signIn', {
      phone_number: auth.phoneNumber,
      phone_code_hash: auth.phoneCodeHash,
      phone_code: phoneCode,
    }).then(result => {
      dispatch(setCurrentUser(result.user));
      dispatch(setAuthKey(client.authKey));
      return dispatch(signInSuccess(result));
    })
      .catch(err => {
        if (err.error_message === 'SESSION_PASSWORD_NEEDED') {
          return dispatch(getPassword()).then(() => err);
        }
        return err;
      })
      .then(err => dispatch(signInFailure(err)));
  };
}

export function sendCode(phoneNumber: string) {
  return dispatch => {
    dispatch({type: SEND_CODE});
    return invoke('auth.sendCode', {
      phone_number: phoneNumber,
      current_number: false,
      api_id: APP_ID,
      api_hash: APP_HASH,
    }).then(result => dispatch(sendCodeSuccess({
        phoneCodeHash: result.phone_code_hash,
        phoneNumber,
      })))
      .catch(err => dispatch(sendCodeFailure(err)));
  };
}
