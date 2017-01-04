import { IChatList, IChatListAction } from 'models/chatList';
import { invoke, client, generateDialogIndex, getPeerID } from 'helpers/Telegram';

export const FETCH_CHAT_LIST = 'chatList/FETCH_CHAT_LIST';
export const FETCH_CHAT_LIST_SUCCESS = 'chatList/FETCH_CHAT_LIST_SUCCESS';
export const FETCH_CHAT_LIST_FAILURE = 'chatList/FETCH_CHAT_LIST_FAILURE';

const initialState: IChatList = {
  loading: false,
  dialogs: null,
  users: null,
  chats: null,
  messages: null,
  error: null,
};

export function chatListReducer(state = initialState, action: IChatListAction) {
  switch (action.type) {
    case FETCH_CHAT_LIST:
      return Object.assign({}, state, {
        loading: true,
      });

    case FETCH_CHAT_LIST_SUCCESS:
      const { dialogs: d, chats: c, users: u, messages: m } = action.payload;
      const isChannel = (id) => {
        const chat = c.getById(-id);
        return chat && (chat.instanceOf('Telegram.type.Channel') || chat.instanceOf('Telegram.type.ChannelForbidden'));
      };
      return Object.assign({}, state, {
        loading: false,
        users: u,
        dialogs: Object.assign({}, d, {
          list: d.list.map(dialog => {
            const message = m.getById(dialog.top_message);
            const peerID = getPeerID(dialog.peer);
            const channelID = (peerID < 0) && isChannel(peerID) ? -peerID : 0;
            let topDate = message.date;

            if (channelID) {
              const channel = c.getById(channelID);
              if (!topDate || channel.date && channel.date > topDate) {
                topDate = channel.date;
              }
            }

            return Object.assign({}, dialog, {
              message,
              peerID,
              index: generateDialogIndex(topDate),
            });
          }),
        }),
        chats: c,
        messages: m,
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
  return dispatch => {
    dispatch({type: FETCH_CHAT_LIST});
    return invoke('messages.getDialogs', {
      offset_date: 0,
      offset_id: 0,
      offset_peer: new client.schema.type.InputPeerEmpty(),
      limit,
    }).then(result => dispatch(fetchChatListSuccess(result)))
      .catch(err => dispatch(fetchChatListFailure(err)));
  };
}
