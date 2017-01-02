import * as React from 'react';
import { ChatMessage, AutoSizeTextarea } from 'components';

const s = require('./style.css');

class Chat extends React.Component<any, any> {
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
              rows="1"
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

export { Chat }
