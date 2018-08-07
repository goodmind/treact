import { byIdGetter } from 'helpers/Telegram/helpers'
import { F, T } from 'ramda'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { REHYDRATE } from 'redux-persist/constants'
import { Store } from 'store/store.h'

import { AUTH } from 'store/actions'

export interface AuthError {
  code: number
  type: string
  message: string
}
export const isAuthError =
  // tslint:disable-next-line
  (p: any): p is AuthError =>
    typeof p === 'object'
    && typeof p.code === 'number'
    && typeof p.type === 'string'
export interface Auth {
  authenticated: boolean
  loading: boolean
  phoneNumber: string
  phoneCodeHash: string
  phoneCode: string
  passwordSalt: string
  error: AuthError
}

const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH

const passwordSalt = createReducer({
  [GET_PASSWORD.DONE]: (_, { passwordSalt }) => passwordSalt,
}, '')

const saveError = (_: AuthError, { code, message, type }: AuthError): AuthError => ({ code, message, type })

const error = createReducer<AuthError>({
  [SEND_CODE.FAIL]: saveError,
  [SIGN_IN.FAIL]: saveError,
  [GET_PASSWORD.FAIL]: saveError,
}, {
  code: -1,
  message: '',
  type: '',
})

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
}, false)

const authenticated = createReducer({
  [SIGN_IN.DONE]: T,
  [LOG_OUT.DONE]: F,
  [REHYDRATE]: (_, { authKey, currentUser, currentDc }: Store) =>
    !!byIdGetter(`${currentDc}`)(authKey) && !!currentUser,
}, false)

const phoneNumber = createReducer({
  [SEND_CODE.DONE]: (_, { phoneNumber }) => phoneNumber,
}, '')

const phoneCodeHash = createReducer({
  [SEND_CODE.DONE]: (_, { phoneCodeHash }) => phoneCodeHash,
}, '')

const loggedOut = createReducer<boolean>({
  [LOG_OUT.DONE]: T,
}, false)

export const authReducer = combineReducers<Auth>({
  loading,
  error,
  authenticated,
  loggedOut,
  passwordSalt,
  phoneNumber,
  phoneCodeHash,
})
