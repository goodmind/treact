import { createReducer } from 'redux-act';
// import { combineReducers } from 'redux';

import { CHATS } from 'actions';
// import { IMtpGetDialogs, IMtpMessagesSlice } from 'redux/mtproto';
import { /*getListOf,
  newIdsFromList, fieldListToMap, */IStoreList } from 'helpers/state';
import { IMtpUser } from '../mtproto';

import { updateStoreList, modelDefaults } from 'helpers/reselector';

export type IStoreUsers = IStoreList<IMtpUser>;

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

// const getUsers = getListOf('users');

// const onDialogsDone = newIdsFromList(getUsers);

// const ids = createReducer({
//   [LOAD_SLICE.DONE]: onDialogsDone,
//   [GET_DIALOGS.DONE]: onDialogsDone,
// }, []);

// const byId = createReducer({
//   [LOAD_SLICE.DONE]: fieldListToMap<IMtpUser, IMtpMessagesSlice>(getUsers),
//   [GET_DIALOGS.DONE]: fieldListToMap<IMtpUser, IMtpGetDialogs>(getUsers),
// }, {});

// const reducer = combineReducers({
//   ids,
//   byId,
// });

const updater = updateStoreList('users');

const newReducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
}, modelDefaults);

export default newReducer;
