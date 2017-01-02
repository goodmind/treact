import * as React from 'react';
import { ChatList as XChatList } from 'components';
import { ChatListItem } from 'containers';

interface IProps {
  item?: any;
  activeChat?: any;
  dialogs: any;
  users: any;
  messages: any;
  chats: any;
  onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

class ChatList extends React.Component<IProps, any> {
  public static displayName = 'Telegram(ChatList)';

  public render() {
    const {
      onChatClick,
      dialogs,
      messages,
      users,
      chats,
      item,
      activeChat,
    } = this.props;

    const props = {
      chatList: dialogs.list,
      activeChat,
      loadingList: null,
      onChatClick,
      dialogs,
      messages,
      users,
      chats,
      item: item || ChatListItem,
    };

    return (
      <XChatList
        {...props} />
    );
  }
}

export { ChatList }
