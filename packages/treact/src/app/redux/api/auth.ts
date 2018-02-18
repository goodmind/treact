import { AUTH } from 'actions'
import { makePasswordHash } from 'helpers/Telegram'
import { APP_HASH, APP_ID, DEFAULT_DC_ID } from 'helpers/Telegram/config'
import { api, storage } from 'helpers/Telegram/pool'
import { pipe, tap } from 'ramda'
import { AuthError } from 'redux/modules/auth'
import { MtpUser } from 'redux/mtproto'
// TODO: use absolute paths
import history from '../../../history'
import { Dispatch, Store } from '../store.h'

const { SEND_CODE, SIGN_IN, GET_PASSWORD, LOG_OUT } = AUTH

const options = {dcID: DEFAULT_DC_ID, createNetworker: true, noErrorBox: true}

const addDc = <T extends { user: MtpUser }>(r: T) => {
  const dcID = DEFAULT_DC_ID
  return storage
    .getItem<string>(`dc${dcID}_auth_key`)
    .then(authKey => Object.assign({}, r, {dcID, authKey}))
}

function getPassword() {
  const onDone = <T extends { current_salt: string }>({ current_salt }: T) => GET_PASSWORD.DONE({
    passwordSalt: current_salt,
  })
  return (dispatch: Dispatch) => {
    dispatch(GET_PASSWORD.INIT())
    return api<{ current_salt: string }>(
      'account.getPassword',
      {},
      options,
    )
      .then(onDone, GET_PASSWORD.FAIL)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any);
  }
}

export function checkPassword(password: string) {
  return (dispatch: Dispatch, getState: () => Store) => {
    const { auth } = getState()
    const hash = makePasswordHash(auth.passwordSalt, password)
    return api<{ user: MtpUser }>('auth.checkPassword', {
      password_hash: hash,
    }, options).then(addDc)
      .then(SIGN_IN.DONE, SIGN_IN.FAIL)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any);
  }
}

export function signIn(phoneCode: string) {
  return (dispatch: Dispatch, getState: () => Store) => {
    const catchNeedPass = (err: AuthError) => err.message === 'SESSION_PASSWORD_NEEDED'
      ? dispatch(getPassword())
      : err
    const catchAndDispatch = pipe(tap(catchNeedPass), err => dispatch(SIGN_IN.FAIL(err)))
    const { auth } = getState()
    dispatch(SIGN_IN.INIT())
    return api<{ user: MtpUser }>('auth.signIn', {
      phone_number: auth.phoneNumber,
      phone_code_hash: auth.phoneCodeHash,
      phone_code: phoneCode,
    }, options).then(addDc)
      .then(SIGN_IN.DONE)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any)
      .catch(catchAndDispatch)
  }
}

export function sendCode(phoneNumber: string) {
  const onDone = ({ phone_code_hash }: { phone_code_hash: string }) => SEND_CODE.DONE({
    phoneCodeHash: phone_code_hash,
    phoneNumber,
  })
  return (dispatch: Dispatch) => {
    dispatch(SEND_CODE.INIT())
    return api<{ phone_code_hash: string }>('auth.sendCode', {
      phone_number: phoneNumber,
      current_number: false,
      api_id: APP_ID,
      api_hash: APP_HASH,
    }, options).then(onDone, SEND_CODE.FAIL)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any);
  }
}

export function logOut() {
  return (dispatch: Dispatch) => {
    const cleanAndRedirect = () => {
      localStorage.clear()
      history.push('/')
    }
    dispatch(LOG_OUT.INIT())
    return api<boolean>('auth.logOut')
      .then(LOG_OUT.DONE, LOG_OUT.FAIL)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any)
      .then(tap(cleanAndRedirect))
  }
}
