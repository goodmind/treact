import * as React from 'react';
import { Chat } from 'components';
import { ChatList } from 'containers';
// import { connect } from 'react-redux';
import { fetchChatList } from 'modules/chatList';
import { asyncConnect } from 'redux-connect';
const s = require('./style.css');

class InstantMessagesImpl extends React.Component<any, any> {
  constructor(...args) {
    super(...args);
    this.state = {
      activeChatID: 0,
      activeChat: null,
    };
  }

  public render() {
    const { dialogs, users, messages, chats } = this.props;
    const onChatClick = (e, chat) => {
      console.log(e, this, chat);
      this.setState({
        activeChatID: chat.id,
        activeChat: chat,
      });
    };

    if (dialogs && users && messages) {
      console.log(dialogs.getById, dialogs.list);
      console.log(users.getById);
      console.log(messages.getById);
      console.log(chats.getById, chats.list);
    }

    return (
      <div className={s.main}>
        <ChatList
          activeChat={this.state.activeChatID}
          dialogs={dialogs}
          users={users}
          messages={messages}
          chats={chats}
          onChatClick={onChatClick} />
        <Chat
          messages={[]}
          activeChat={this.state.activeChat} />
      </div>
    );
  }
}

const mapStateToProps = ({ chatList: { dialogs, messages, users, chats } }) => ({ dialogs, messages, users, chats });
const areStatesEqual = ({ chatList: a }, { chatList: b }) => {
  return a.dialogs === b.dialogs &&
    a.messages === b.messages &&
    a.users === b.users &&
    a.chats === b.chats;
};
// const InstantMessages = connect(mapStateToProps, null, null, { areStatesEqual } as any)(InstantMessagesImpl);
const InstantMessages = asyncConnect([{
  promise: ({ store }) => store.dispatch(fetchChatList()),
}], mapStateToProps, null, null, { areStatesEqual })(InstantMessagesImpl);

export { InstantMessages }
