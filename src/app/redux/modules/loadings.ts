import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { CHATS } from 'redux/actions';
const { GET_DIALOGS } = CHATS;

export type IStoreLoadings = {
  chatList: boolean;
};

const setTrue = () => true;
const setFalse = () => false;

const chatList = createReducer({
  [GET_DIALOGS.INIT]: setTrue,
  [GET_DIALOGS.DONE]: setFalse,
}, false);

const reducer = combineReducers({
  chatList,
});

export default reducer;
