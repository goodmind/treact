import { Event } from 'effector'
import { ActionCreator } from 'redux-act'
import { asEvent } from 'store/effector-redux'
import { AUTH, CACHE, CHATS, MESSAGES } from './actions'

const effectLike = <A, B, C, D, E, F>(ACTION: {
  INIT: ActionCreator<A, B>,
  DONE: ActionCreator<C, D>,
  FAIL: ActionCreator<E, F>,
}): Event<A> & {
  done: Event<C>,
  fail: Event<E>,
} => {
  //tslint:disable-next-line no-any
  const effect: any = asEvent(ACTION.INIT.raw())
  effect.done = asEvent(ACTION.DONE.raw())
  effect.fail = asEvent(ACTION.FAIL.raw())
  return effect
}

export const chats = {
  getDialogs: effectLike(CHATS.GET_DIALOGS),
  loadSlice: effectLike(CHATS.LOAD_SLICE),
}

export const messages = {
  sendText: effectLike(MESSAGES.SEND_TEXT),
}

export const auth = {
  signIn: effectLike(AUTH.SIGN_IN),
  logOut: effectLike(AUTH.LOG_OUT),
}

export const cache = {
  queue: asEvent(CACHE.QUEUE.raw()),
  load : asEvent(CACHE.LOAD.raw()),
  done : asEvent(CACHE.DONE.raw()),
}
