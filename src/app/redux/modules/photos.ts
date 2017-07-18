import { CHATS } from 'actions';
import { modelDefaults, updateStoreMap } from 'helpers/reselector';
import { Slice, TLPhoto } from 'helpers/reselector.h';
import { StoreList } from 'helpers/state';
import { createReducer } from 'redux-act';

export type StorePhotos = StoreList<TLPhoto>;

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const updater = updateStoreMap<Slice, 'photos'>('photos');

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default reducer;
