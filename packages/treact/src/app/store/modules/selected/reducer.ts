import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import { CHATS } from 'store/actions'
const { SELECT } = CHATS

export type StoreSelected = {
  dialog: number;
}

export const dialog = createReducer({
  [SELECT]: (_, payload: number) => payload,
}, NaN)

export const selected = combineReducers({
  dialog,
})

