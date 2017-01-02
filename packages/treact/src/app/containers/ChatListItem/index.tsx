import * as React from 'react';
import { ChatListItem as XChatListItem } from 'components';

class ChatListItem extends React.Component<any, any> {
  public static displayName = 'Telegram(ChatListItem)';

  public render() {
    const { peerID, unread_count, message } = this.props.chat;
    const { users, chats, activeChat } = this.props.parentProps;

    let props = {
      name: null,
      active: false,
      onClick: null,
      unreadCount: null,
    };
    let peer;

    if (peerID > 0) {
      const user = users.getById(peerID);
      props.name = user.first_name + ' ' + user.last_name;
      peer = user;
    } else {
      const chat = chats.getById(-peerID);
      props.name = chat.title;
      peer = chat;
    }

    const fromUser = users.getById(message.from_id);
    props = Object.assign(props, {}, {
      id: peerID,
      active: peerID === activeChat,
      onClick: this.props.onClick(Object.assign(peer, {}, { id: peerID })),
      lastMsg: [(fromUser && {
        text: (!message.media ||
          message.media.instanceOf('api.type.MessageMediaEmpty')) ?
            message.message || '[none]' : '[image]',
        fromUser: {
          displayName: fromUser.first_name + ' ' + fromUser.last_name,
        },
      }) || null],
      unreadCount: unread_count,
    });

    return (
      <XChatListItem
        {...props} />
    );
  }
}

export { ChatListItem }
