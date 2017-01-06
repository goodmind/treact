import * as React from 'react';
import { client } from 'helpers/Telegram';
import { ChatMessage, AutoSizeTextarea } from 'components';
import { connect } from 'react-redux';
import { fetchMessages } from 'modules/messages';

const s = require('./style.css');

const retrieveInputPeer = (peer) => {
  switch (peer.getTypeName()) {
    case 'Telegram.type.Channel':
      return new client.schema.type.InputPeerChannel({
        props: {
          channel_id: -peer.id,
          access_hash: peer.access_hash,
        },
      });

    case 'Telegram.type.Chat':
      return new client.schema.type.InputPeerChat({
        props: {
          chat_id: -peer.id,
        },
      });

    case 'Telegram.type.User':
      return new client.schema.type.InputPeerUser({
        props: {
          user_id: peer.id,
          access_hash: peer.access_hash,
        },
      });

    default:
      throw new Error('Unknown peer type' + peer.getTypeName());
  }
};

interface IConnectedState {
  chats: any;
}

interface IConnectedActions {
  dispatch: any;
}

interface IOwnProps {
  activeChat: any;
  messages: any;
}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class ChatImpl extends React.Component<IProps, any> {
  public componentWillReceiveProps(nextProps: IProps) {
    const { activeChat, dispatch } = nextProps;
    const inputPeer = activeChat && retrieveInputPeer(activeChat);

    dispatch(fetchMessages(inputPeer));
  }

  public render() {
    const { activeChat, messages } = this.props;

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
              {messages.map(message => <ChatMessage message={message} activeChat={activeChat} />)}
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

const Chat = connect<IConnectedState, IConnectedActions, IOwnProps>(({ chatList: { chats } }) => ({ chats }))(ChatImpl);

export { Chat }
