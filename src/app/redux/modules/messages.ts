import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
const { GET_DIALOGS, LOAD_SLICE } = CHATS;

import { updateStoreMap, modelDefaults } from 'helpers/reselector';
import { Slice } from 'helpers/reselector.h';

const updater = updateStoreMap<Slice, 'messages'>('messages');

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default reducer;
