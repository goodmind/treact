import { chats } from 'store/events'

import { updateStoreMap } from 'helpers/reselector'
import { Slice } from 'helpers/reselector.h'
import { dialogs } from './shape'

const { getDialogs } = chats

const updater = updateStoreMap<Slice, 'dialogs'>('dialogs')

dialogs
  .on(getDialogs.done, updater)

