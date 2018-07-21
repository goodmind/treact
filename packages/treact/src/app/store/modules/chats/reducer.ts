import { Slice } from 'helpers/reselector.h'

import { chats as chatEvents } from 'store/events'
import { chats } from './shape'

import { updateStoreMap } from 'helpers/reselector'

const { loadSlice, getDialogs } = chatEvents

const updater = updateStoreMap<Slice, 'chats'>('chats')

chats
  .on(loadSlice.done, updater)
  .on(getDialogs.done, updater)
