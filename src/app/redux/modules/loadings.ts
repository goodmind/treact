import { F, T } from 'ramda';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

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
