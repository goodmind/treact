import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { T, F } from 'ramda';

import { CHATS } from 'redux/actions';
const { GET_DIALOGS } = CHATS;

export type IStoreLoadings = {
  chatList: boolean;
};

const chatList = createReducer({
  [GET_DIALOGS.INIT]: T,
  [GET_DIALOGS.DONE]: F,
}, false);

const reducer = combineReducers({
  chatList,
});

export default reducer;
