import * as React from 'react';
import { ChatListSearch, ChatListItem } from 'components';

interface IProps {
  chatList: any[];
  loadingList: any;
  activeChat: any;
  onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

class ChatList extends React.Component<IProps, any> {
  public chats() {
    return this.props.chatList.sort((a, b) => {
      const aTime = (a.lastMsg[0] && a.lastMsg[0].sent) || a.lastAccessTime;
      const bTime = (b.lastMsg[0] && b.lastMsg[0].sent) || b.lastAccessTime;
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
  }

  public onChatClick(chatId) {
    return e => {
      this.props.onChatClick(e, chatId);
    };
  }

  public renderChat(chat) {
    const { activeChat } = this.props;

    return (
      <ChatListItem
        key={chat.id}
        unreadCount={chat.unreadItems}
        avatar={chat.avatarUrl}
        lastMsg={chat.lastMsg}
        name={chat.name}
        active={chat.id === activeChat}
        onClick={this.onChatClick(chat.id)} />
    );
  }

  public render() {
    const s = require('./style.css');
    const { loadingList, chatList } = this.props;

    return (
      <div className={s.chatlist}>
        <ChatListSearch />
        {loadingList && <div className={s.loading}>Loading...</div>}
        {chatList.length > 0 && !loadingList && this.chats().map(this.renderChat, this)}
      </div>
    );
  }
}

export { ChatList }
