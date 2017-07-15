import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { CHATS } from 'redux/actions';
const { SELECT } = CHATS;

export type IStoreSelected = {
  dialog: number;
};

const dialog = createReducer({
  [SELECT]: (_, payload: number) => payload,
}, NaN);

const reducer = combineReducers({
  dialog,
});

export default reducer;
