import { createAction } from 'redux-act';

export type IAction<T> = {
  type: string;
  payload: T;
};

export type IActionCreator<T> = (payload: T) => IAction<T>;

export type IActionEvent<I, S, F> = {
  INIT: IActionCreator<I>,
  DONE: IActionCreator<S>,
  FAIL: IActionCreator<F>,
};

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
