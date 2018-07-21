import { createAction } from 'redux-act'
import { AuthError } from 'store/modules/auth'

import { Payload, SlicePayload } from 'helpers/reselector.h'
import { MtpUser } from 'store/mtproto'

export const actionEvent = <I, D, F>(reduxMessage: string) => ({
  INIT: createAction<I, {}>(`[begin] ${reduxMessage}`),
  DONE: createAction<D, {}>(`[end] ${reduxMessage}`),
  FAIL: createAction<F, {}>(`[fail] ${reduxMessage}`),
})

export const AUTH = {
  SEND_CODE   : actionEvent<{}, {}, AuthError>('send code'),
  SIGN_IN     : actionEvent<{}, {
    user: MtpUser,
    dcID: number,
    authKey: string,
  }, AuthError>('sign in'),
  GET_PASSWORD: actionEvent<{}, {}, AuthError>('get password'),
  LOG_OUT     : actionEvent<{}, {}, AuthError>('user log out'),
}

export const MESSAGES = {
  SEND_TEXT: actionEvent('send text'),
}

export const UPDATES = {
  NEW_UPDATE: createAction('new update'),
}

export const CHATS = {
  LOAD_SLICE : actionEvent<{}, SlicePayload, {}>('load slice'),
  GET_DIALOGS: actionEvent<{}, SlicePayload, {}>('load every dialog slice'),
  SELECT     : createAction('select dialog by id'),
}

export const CACHE = {
  QUEUE: createAction('add imgs to download queue'),
  LOAD : createAction<number[], {}>('load next img'),
  DONE : createAction<number[], {}>('complete downloading img'),
}
