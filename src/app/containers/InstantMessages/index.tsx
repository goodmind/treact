import { fetchChatList } from 'api/chatList';
import { InstantMessages } from 'components';
import { Chat, ChatList } from 'containers';
import pool from 'helpers/Telegram/pool';
import * as React from 'react';
import { asyncConnect /*, AsyncOptions*/ } from 'redux-connect';
// import { IStore } from 'redux/IStore';
import DownloadAssistant from './downloadAssistant';

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
