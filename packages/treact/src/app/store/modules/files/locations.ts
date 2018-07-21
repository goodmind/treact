import { locations } from './shape'

import { updateStoreMap } from 'helpers/reselector'
import { Slice } from 'helpers/reselector.h'
import { chats } from 'store/events'

const { loadSlice, getDialogs } = chats

const updater = updateStoreMap<Slice, 'fileLocations'>('fileLocations')

locations
  .on(loadSlice.done, updater)
  .on(getDialogs.done, updater)
