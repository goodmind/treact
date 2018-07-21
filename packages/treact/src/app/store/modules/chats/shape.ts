import { createStore, Store } from 'effector'

import { StoreList } from 'helpers/state'
import { MtpChat } from 'store/mtproto'

export type StoreChats = StoreList<MtpChat>

import { modelDefaults } from 'helpers/reselector'

export const chats: Store<StoreChats> = createStore(modelDefaults)

