import * as React from 'react';
import { client } from 'helpers/Telegram';
import { retrieveId } from 'helpers/Telegram/Peers';
import { /*ChatMessage,*/ AutoSizeTextarea } from 'components';
import { connect } from 'react-redux';
// import { fetchMessages } from 'modules/messages';
import { loadSliceRange } from 'redux/api/chats';
import { IDispatch, IStore } from 'redux/IStore';
import { CHATS } from 'actions';
import { IStoreMessage } from 'redux/modules/chats';
import Message from './message';

const s = require('./style.css');

const retrieveInputPeer = (peer) => {
  const id = retrieveId(peer);
  switch (peer.getTypeName()) {
    case 'Telegram.type.Channel':
      return new client.schema.type.InputPeerChannel({
        props: {
          channel_id: id,
          access_hash: peer.access_hash,
        },
      });

    case 'Telegram.type.Chat':
      return new client.schema.type.InputPeerChat({
        props: {
          chat_id: id,
        },
      });

    case 'Telegram.type.User':
      return new client.schema.type.InputPeerUser({
        props: {
          user_id: id,
          access_hash: peer.access_hash,
        },
      });

    default:
      throw new Error('Unknown peer type' + peer.getTypeName());
  }
};

interface IConnectedState {
  chats: any;
  dialog: {
    ids: number[],
    messages: { [key: number]: IStoreMessage },
  };
}

interface IConnectedActions {
  loadSlice: (id: number, peer, offset?: number, limit?: number) => Promise<any>;
  selectChat: (id: number) => any;
}

interface IOwnProps {
  activeChat: any;
  messages: any;
}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

const onChatSelect = async (loadSlice, activeChat, selectChat, nextChat) => {
  if (nextChat && nextChat !== activeChat) {
    const inputPeer = retrieveInputPeer(nextChat);
    await loadSlice(nextChat.id, inputPeer);
    selectChat(nextChat.id);
  }
};

class ChatImpl extends React.Component<IProps, any> {
  public componentWillReceiveProps(nextProps: IProps) {
    const { loadSlice, activeChat, selectChat } = this.props;
    const nextChat = nextProps.activeChat;
    onChatSelect(loadSlice, activeChat, selectChat, nextChat);
  }
  public renderMessage = (id: number) => {
    const { user, date, text } = this.props.dialog.messages[id];
    return <Message key={id} id={id} date={date} user={user} text={text} />;
  }
  public render() {
    const { activeChat, /*messages,*/ dialog } = this.props;

    const chatContainer = !activeChat ? (
        <div className={s.bubble}>Please select a chat to start messaging</div>
      ) : (
        <div className={s.chatcontainer}>
          <div className={s.chatheader}>
            <div className={s.left}>
              <div className={s.top}>{activeChat.name}</div>
              <div className={s.bottom}>{activeChat.userCount} members</div>
            </div>
            <div className={s.right} />
          </div>
          <div className={s.chatbody}>
            <div className={s.box}>
              {dialog.ids.map(this.renderMessage)}
            </div>
          </div>
          <div className={s.chatfooter}>
            <AutoSizeTextarea
              className={s.editText}
              rows={1}
              placeholder="  Write a message" />
            <div className={s.sendbutton}>Send</div>
          </div>
        </div>
      );

    return (
      <div className={s.chat}>
        {chatContainer}
      </div>
    );
  }
}

const defaultDialog = {
  ids: [],
  messages: {},
};

const stateToProps = (state: IStore) => {
  const selected = state.chats.selected;
  return {
    chats: state.chatList.chats,
    selected: state.chats.selected,
    dialog: selected
      ? state.chats.byId[selected]
      : defaultDialog,
  };
};

const dispatchToProps = (dispatch: IDispatch) => ({
  loadSlice: loadSliceRange(dispatch),
  selectChat: id => dispatch(CHATS.SELECT(id)),
});

const Chat = connect<IConnectedState, IConnectedActions, IOwnProps>(
  stateToProps,
  dispatchToProps,
)(ChatImpl);

export { Chat }
