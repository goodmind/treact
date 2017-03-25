import * as React from 'react';
import { InstantMessages } from 'components';
import { Chat, ChatList } from 'containers';
import { fetchChatList } from 'api/chatList';
import pool from 'helpers/Telegram/pool';
import DownloadAssistant from './downloadAssistant';
import { asyncConnect } from 'redux-connect';

class InstantMessagesImpl extends React.Component<{}, {}> {
  // public updates = Updates.getInstance();

  constructor(props, context) {
    super(props, context);
    pool.updates.attach();
    pool.on('*', msg => console.debug('updates', msg._, msg));
    pool.on('apiUpdate', msg => console.debug('apiUpdate', msg._, msg));
    pool.on('difference', msg => console.debug('difference', msg._, msg));
  }

  public render() {
    return (
      <InstantMessages>
        <ChatList />
        <Chat />
        <DownloadAssistant />
      </InstantMessages>
    );
  }
}

const InstantMessagesContainer =
  asyncConnect<IConnectedState, IConnectedActions, IOwnProps>([{
    promise: ({ store }) => store.dispatch(fetchChatList()),
  }])(InstantMessagesImpl);

export { InstantMessagesContainer as InstantMessages }
