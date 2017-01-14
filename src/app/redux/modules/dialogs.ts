import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import * as R from 'ramda';

import { IMtpDialog } from 'redux/mtproto';
import { CHATS } from 'actions';
import { whenNot, getReduce, getListOf, IStoreList, appendNew, changePayload } from 'helpers/state';

const { GET_DIALOGS } = CHATS;

export type IStoreDialogs = IStoreList<IMtpDialog>;

const peerId = (peer): number => {
  switch (peer._typeName) {
    case 'Telegram.type.PeerUser': return peer.user_id;
    case 'Telegram.type.PeerChat': return peer.chat_id;
    case 'Telegram.type.PeerChannel': return peer.channel_id;
    default: return null;
  }
};

const getId = R.pipe(R.prop('peer'), peerId);

const addNewId = changePayload(getId, appendNew);

const getDialogs = getListOf('dialogs');

const onDialogsDone = getReduce(getDialogs, addNewId);

const ids = createReducer({
  [GET_DIALOGS.DONE]: onDialogsDone,
}, []);

const cleanPayload = R.pick([
  'read_inbox_max_id',
  'read_outbox_max_id',
  'top_message',
  'unread_count',
]);

const isDialogEquals = dialog => state => R.equals(
  state[getId(dialog)],
  cleanPayload(dialog),
);

const addDialog = dialog => R.assoc(getId(dialog), cleanPayload(dialog));

const addChanged = whenNot(isDialogEquals, addDialog);

const byIdOnDialogsDone = getReduce(getDialogs, addChanged);

const byId = createReducer({
  [GET_DIALOGS.DONE]: byIdOnDialogsDone,
}, {});

const reducer = combineReducers({
  ids,
  byId,
});

export default reducer;
