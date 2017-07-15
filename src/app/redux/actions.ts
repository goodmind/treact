import { createAction } from 'redux-act';
import { IAuthError } from 'redux/modules/auth';

export const actionEvent = <I, D, F>(reduxMessage: string) => ({
  INIT: createAction<I, {}>(`[begin] ${reduxMessage}`),
  DONE: createAction<D, {}>(`[end] ${reduxMessage}`),
  FAIL: createAction<F, {}>(`[fail] ${reduxMessage}`),
});

export const AUTH = {
  SEND_CODE   : actionEvent<{}, {}, IAuthError>('send code'),
  SIGN_IN     : actionEvent<{}, {}, IAuthError>('sign in'),
  GET_PASSWORD: actionEvent<{}, {}, IAuthError>('get password'),
  LOG_OUT     : actionEvent<{}, {}, IAuthError>('user log out'),
};

export const MESSAGES = {
  SEND_TEXT: actionEvent('send text'),
};

export const UPDATES = {
  NEW_UPDATE: createAction('new update'),
};

export const CHATS = {
  LOAD_SLICE : actionEvent('load slice'),
  GET_DIALOGS: actionEvent('load every dialog slice'),
  SELECT     : createAction('select dialog by id'),
};

export const CACHE = {
  QUEUE: createAction('add imgs to download queue'),
  LOAD : createAction<number[], {}>('load next img'),
  DONE : createAction('complete downloading img'),
};
