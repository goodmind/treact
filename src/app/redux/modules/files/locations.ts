import { createReducer } from 'redux-act'

import { CHATS } from 'actions'
import { modelDefaults, updateStoreMap } from 'helpers/reselector'
import { Slice } from 'helpers/reselector.h'

const { LOAD_SLICE, GET_DIALOGS } = CHATS

const updater = updateStoreMap<Slice, 'fileLocations'>('fileLocations')

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults)

export default reducer
