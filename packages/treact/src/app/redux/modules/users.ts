import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
import { StoreList } from 'helpers/state';
import { MtpUser } from '../mtproto';

import { modelDefaults, updateStoreMap } from 'helpers/reselector';
import { Slice } from 'helpers/reselector.h';

export type StoreUsers = StoreList<MtpUser>;

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const updater = updateStoreMap<Slice, 'users'>('users');

const newReducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default newReducer;
