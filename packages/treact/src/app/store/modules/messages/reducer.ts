import { messages } from './shape'

import { chats, messages as messageEvents } from 'store/events'
const { getDialogs, loadSlice } = chats
const { sendText } = messageEvents

import { updateStoreMap } from 'helpers/reselector'
import { Slice, StoredPayload } from 'helpers/reselector.h'

export type StoreMessages = StoredPayload<Slice['messages']>

const updater = updateStoreMap<Slice, 'messages'>('messages')

messages
  .on(sendText.done, updater)
  .on(loadSlice.done, updater)
  .on(getDialogs.done, updater)
