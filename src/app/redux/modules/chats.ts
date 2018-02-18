import { Slice } from 'helpers/reselector.h'
import { createReducer } from 'redux-act'

import { CHATS } from 'actions'
import { StoreList } from 'helpers/state'
import { MtpChat } from '../mtproto'

export type StoreChats = StoreList<MtpChat>

import { modelDefaults, updateStoreMap } from 'helpers/reselector'

const { LOAD_SLICE, GET_DIALOGS } = CHATS

const updater = updateStoreMap<Slice, 'chats'>('chats')

const newReducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults)

export default newReducer
