import * as React from 'react';

class ChatMessage extends React.Component<any, any> {
  public render() {
    const s = require('./style.css');
    const { message, activeChat } = this.props;

    return (
      <div className={s.message}>
        <div className={s.unread}
             id="unread">{activeChat.unreadItems} unread messages</div>
        <div className={s.flexcontainer}>
          <img
            src={message.fromUser.avatarUrlSmall}
            className={s.messageavatar} />
          <div
            className={s.messagebody}>
            <div className={s.sender}>{message.fromUser.displayName}</div>
            {message.text}
          </div>
        </div>
      </div>
    );
  }
}

export { ChatMessage }
