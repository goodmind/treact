import * as React from 'react';
import { ChatList, Chat } from 'components';
const s = require('./style.css');

class Home extends React.Component<any, any> {
  public render() {
    const onChatClick = (e, chatId) => console.log(e, this, chatId);
    const chatList = [{
      unreadItems: 0,
      name: 'ok',
      id: 1,
    }];

    return (
      <div className={s.main}>
        <ChatList
          chatList={chatList}
          activeChat={1}
          loadingList={null}
          onChatClick={onChatClick} />
        <Chat />
      </div>
    );
  }
}

export { Home }
