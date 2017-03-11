import { createReducer } from 'redux-act';

import { CHATS } from 'actions';
import { IStoreList } from 'helpers/state';
import { IMtpChat } from '../mtproto';

export type IStoreChats = IStoreList<IMtpChat>;

import { updateStoreMap, modelDefaults } from 'helpers/reselector';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const updater = updateStoreMap('chats');

const newReducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default newReducer;
