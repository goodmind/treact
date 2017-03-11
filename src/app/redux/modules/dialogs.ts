import { createReducer } from 'redux-act';

import { IMtpDialog } from 'redux/mtproto';
import { CHATS } from 'actions';
import { IStoreList } from 'helpers/state';

import { updateStoreMap, modelDefaults } from 'helpers/reselector';

const { GET_DIALOGS } = CHATS;

export type IStoreDialogs = IStoreList<IMtpDialog>;


const updater = updateStoreMap('dialogs');

const newReducer = createReducer({
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default newReducer;
