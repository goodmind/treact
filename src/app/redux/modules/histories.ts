import { CHATS, MESSAGES } from 'actions'
import { StoreList } from 'helpers/state'
import { createReducer } from 'redux-act'

import { modelDefaults, updateStoreListSorted } from 'helpers/reselector'
import { Slice } from 'helpers/reselector.h'

const { LOAD_SLICE, GET_DIALOGS } = CHATS
const { SEND_TEXT } = MESSAGES

export type StoreHistory = number[]

export type StoreHistories = StoreList<StoreHistory>

const updater = updateStoreListSorted<Slice, 'histories'>('histories')

const newReducer = createReducer({
  [SEND_TEXT.DONE]: updater,
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults)

export default newReducer
