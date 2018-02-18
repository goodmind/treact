import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'

import { CHATS } from 'redux/actions'
const { SELECT } = CHATS

export type StoreSelected = {
  dialog: number;
}

const dialog = createReducer({
  [SELECT]: (_, payload: number) => payload,
}, NaN)

const reducer = combineReducers({
  dialog,
})

export default reducer
