import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
import { updateStoreMap, modelDefaults } from 'helpers/reselector';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const updater = updateStoreMap('photos');

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default reducer;
