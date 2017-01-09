import { IChatList, IChatListAction } from 'models/chatList';
import { TypeLanguage, invoke, client, generateDialogIndex } from 'helpers/Telegram';
import { getFullMessageID } from 'helpers/Telegram/Messages';
import { getPeerID } from 'helpers/Telegram/Peers';
import { IDispatch } from 'redux/IStore';

export const FETCH_CHAT_LIST = 'chatList/FETCH_CHAT_LIST';
export const FETCH_CHAT_LIST_SUCCESS = 'chatList/FETCH_CHAT_LIST_SUCCESS';
export const FETCH_CHAT_LIST_FAILURE = 'chatList/FETCH_CHAT_LIST_FAILURE';

/* tslint:disable:no-bitwise */

interface ISaveMsgOpts {
  isEdited?: boolean;
  isNew?: boolean;
}

const initialState: IChatList = {
  loading: false,
  dialogs: null,
  users: null,
  chats: null,
  messages: null,
  error: null,
};

const mapToList = (v) => v.list;
const saveChats = mapToList;
const saveUsers = mapToList;
const saveMessages = ({list}, options: ISaveMsgOpts = {}) => {
  return list.reduce((acc, m) => {
    if (m.getTypeName() === 'Telegram.type.MessageEmpty') { return acc; }

    const peerID = getMessagePeer(m);
    const isChannel = m.to_id.getTypeName() === 'Telegram.type.PeerChannel';
    const channelID = isChannel ? -peerID : 0;
    const mid = getFullMessageID(m.id, channelID);

    if (!options.isEdited) { acc[mid] = Object.assign({}, m, {
      out: options.isNew || !!m.out,
      unread: !!m.unread,
      mid,
      peerID,
    }); }

    return acc;
  }, {});
};

const overVector = (vec, newVec) => Object.assign(new TypeLanguage.TypeVector(), vec, {
  list: newVec,
});

const isChannel = c => (id) => {
  const chat = c.getById(-id);
  return chat && (chat.instanceOf('Telegram.type.Channel') || chat.instanceOf('Telegram.type.ChannelForbidden'));
};

const getMessagePeer = (message) => {
  const toID = message.to_id && getPeerID(message.to_id) || 0;

  if (toID < 0) {
    return toID;
  } else if (message.out || message.flags & 2) {
    return toID;
  }
  return message.from_id;
};

const saveConversation = (c, m) => dialog => {
  const peerID = getPeerID(dialog.peer);
  const channelID = (peerID < 0) && isChannel(c)(peerID) ? -peerID : 0;
  const mid = getFullMessageID(dialog.top_message, channelID);
  const message = m[mid];
  let topDate = message.date;

  if (channelID) {
    const channel = c.getById(channelID);
    if (!topDate || channel.date && channel.date > topDate) {
      topDate = channel.date;
    }
  }
  dialog.read_inbox_max_id = getFullMessageID(dialog.read_inbox_max_id, channelID);
  dialog.ead_outbox_max_id = getFullMessageID(dialog.read_outbox_max_id, channelID);

  const unreadKey = message.out ? 'read_outbox_max_id' : 'read_inbox_max_id';
  if (message.mid && message.mid > dialog[unreadKey]) {
    message.unread = true;
  }

  return Object.assign({}, dialog, {
    top_message: mid,
    message,
    peerID,
    index: generateDialogIndex(topDate),
  });
};

export function chatListReducer(state = initialState, action: IChatListAction) {
  switch (action.type) {
    case FETCH_CHAT_LIST:
      return Object.assign({}, state, {
        loading: true,
      });

    case FETCH_CHAT_LIST_SUCCESS:
      const { dialogs: d, chats: c, users: u, messages: m } = action.payload;
      const chats = overVector(c, saveChats(c));
      const messages = saveMessages(m);
      const users = overVector(u, saveUsers(u));
      const dialogs = overVector(d, d.list.map(saveConversation(chats, messages)));
      return Object.assign({}, state, {
        loading: false,
        users,
        chats,
        messages,
        dialogs,
      });

    case FETCH_CHAT_LIST_FAILURE:
      return Object.assign(state, {}, {
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
}

function fetchChatListSuccess({ dialogs, chats, users, messages }) {
  return {
    type: FETCH_CHAT_LIST_SUCCESS,
    payload: {
      dialogs,
      chats,
      users,
      messages,
    },
  };
}

function fetchChatListFailure(err) {
  return {
    type: FETCH_CHAT_LIST_FAILURE,
    payload: err,
  };
}

export function fetchChatList(limit: number = 20) {
  return (dispatch: IDispatch) => {
    dispatch({type: FETCH_CHAT_LIST});
    return invoke('messages.getDialogs', {
      offset_date: 0,
      offset_id: 0,
      offset_peer: new client.schema.type.InputPeerEmpty(),
      limit,
    }).then(fetchChatListSuccess, fetchChatListFailure)
      .then(dispatch);
  };
}
