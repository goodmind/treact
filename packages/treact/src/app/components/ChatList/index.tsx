import * as React from 'react';
import { ChatListSearch, ChatListItem } from 'components';

interface IProps {
  item?: any;
  chatList: any[];
  loadingList: any;
  activeChat: any;
  onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

class ChatList extends React.Component<IProps, any> {
  public chats() {
    return this.props.chatList.sort((a, b) => {
      return b.index - a.index;
    });
  }

  public onChatClick(chatId) {
    return e => {
      this.props.onChatClick(e, chatId);
    };
  }

  public renderChat(chat) {
    const ItemComponent = this.props.item || ChatListItem;

    return (
      <ItemComponent
        key={chat.index}
        parentProps={this.props}
        chat={chat}
        onClick={this.onChatClick.bind(this)} />
    );
  }

  public render() {
    const s = require('./style.css');
    const { loadingList, chatList } = this.props;

    return (
      <div className={s.chatlist}>
        <ChatListSearch />
        <div className={s.chatbox}>
          <div className={s.chatpane}>
            {loadingList && <div className={s.loading}>Loading...</div>}
            {chatList.length > 0 && !loadingList && this.chats().map(this.renderChat, this)}
          </div>
        </div>
      </div>
    );
  }
}

export { ChatList }
