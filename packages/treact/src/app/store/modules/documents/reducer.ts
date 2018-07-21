import { documents } from './shape'

import { chats } from 'store/events'
const { getDialogs, loadSlice } = chats

import { updateStoreMap } from 'helpers/reselector'
import { Slice } from 'helpers/reselector.h'

const updater = updateStoreMap<Slice, 'documents'>('documents')

documents
  .on(loadSlice.done, updater)
  .on(getDialogs.done, updater)
