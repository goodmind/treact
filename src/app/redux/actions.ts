import { createAction } from 'redux-act';

export const actionEvent = (reduxMessage: string) => ({
  INIT: createAction(`[begin] ${reduxMessage}`),
  DONE: createAction(`[end] ${reduxMessage}`),
  FAIL: createAction(`[fail] ${reduxMessage}`),
});

export const AUTH = {
  SEND_CODE: actionEvent('send code'),
  SIGN_IN: actionEvent('sign in'),
  GET_PASSWORD: actionEvent('get password'),
  LOG_OUT: actionEvent('user log out'),
};

export const MESSAGES = actionEvent('messages');

export const CHATS = {
  LOAD_SLICE: actionEvent('load slice'),
  SELECT: createAction('select dialog by id'),
};
