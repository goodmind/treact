import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
const { GET_DIALOGS, LOAD_SLICE } = CHATS;

import { modelDefaults, updateStoreMap } from 'helpers/reselector';
import { Slice, StoredPayload } from 'helpers/reselector.h';

export type StoreMessages = StoredPayload<Slice['media']>;

const updater = updateStoreMap<Slice, 'media'>('media');

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default reducer;
