import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { invoke } from 'helpers/Telegram';
import { MESSAGES } from 'actions';

const id = (s) => s;
const FALSE = () => false;
const TRUE = () => true;

const loading = createReducer({
  [MESSAGES.INIT]: TRUE,
  [MESSAGES.DONE]: FALSE,
  [MESSAGES.FAIL]: FALSE,
}, false);

const list = createReducer({
  [MESSAGES.INIT]: id,
  [MESSAGES.DONE]: id,
  [MESSAGES.FAIL]: id,
}, {});

export const messagesReducer = combineReducers({
  loading,
  list,
});

export function fetchMessages(peer) {
  return dispatch => {
    dispatch(MESSAGES.INIT());
    invoke('messages.getHistory', { peer });
  };
}
