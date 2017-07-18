import { InstantMessages } from 'components';
import { Chat, ChatList } from 'containers';
import pool from 'helpers/Telegram/pool';
import * as React from 'react';
import DownloadAssistant from './downloadAssistant';

class InstantMessagesImpl extends React.Component<{}, {}> {
  // public updates = Updates.getInstance();

  constructor(props: {}, context: {}) {
    super(props, context);
    // TODO: Updates disabled until telegram-mtproto release
    // pool.updates.attach();
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

export { InstantMessagesImpl as InstantMessages };
