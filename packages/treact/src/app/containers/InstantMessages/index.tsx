import * as React from 'react';
import { Chat } from 'containers/Chat';
import { ChatList } from 'containers';
import { fetchChatList } from 'api/chatList';
import { asyncConnect } from 'redux-connect';
// import { Updates } from 'helpers/Telegram/Updates';
import DownloadAssistant from './downloadAssistant';
const s = require('./style.css');

class InstantMessagesImpl extends React.Component<{}, {}> {
  // public updates = Updates.getInstance();

  constructor(props, context) {
    super(props, context);
    // this.updates.start(update => {
    //   console.log(update._typeName, update);
    // });
  }

  public render() {
    return (
      <div className={s.main}>
        <ChatList />
        <Chat />
        <DownloadAssistant />
      </div>
    );
  }
}

const InstantMessages = asyncConnect<IConnectedState, IConnectedActions, IOwnProps>([{
  promise: ({ store }) => store.dispatch(fetchChatList()),
}])(InstantMessagesImpl);

export { InstantMessages }
