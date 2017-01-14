import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { CHATS } from 'actions';
import { IMtpGetDialogs, IMtpMessagesSlice } from 'redux/mtproto';
import { getListOf,
  newIdsFromList, fieldListToMap, IStoreList } from 'helpers/state';
import { IMtpChat } from '../mtproto';

export type IStoreChats = IStoreList<IMtpChat>;

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const getChats = getListOf('chats');

const onDialogsDone = newIdsFromList(getChats);

const ids = createReducer({
  [LOAD_SLICE.DONE]: onDialogsDone,
  [GET_DIALOGS.DONE]: onDialogsDone,
}, []);

const byId = createReducer({
  [LOAD_SLICE.DONE]: fieldListToMap<IMtpChat, IMtpMessagesSlice>(getChats),
  [GET_DIALOGS.DONE]: fieldListToMap<IMtpChat, IMtpGetDialogs>(getChats),
}, {});

const reducer = combineReducers({
  ids,
  byId,
});

export default reducer;
