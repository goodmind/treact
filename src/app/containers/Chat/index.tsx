import * as React from 'react';
import { connect } from 'react-redux';

import { Chat, DefaultScreen } from 'components/Chat';
import { Message } from 'components/Message';
import { RichText, Entity } from 'components/RichText';
import { getPeerData } from 'helpers/Telegram/Peers';
import { getPeerName } from 'helpers/Telegram/Peers';
import { Obj, path, props } from 'ramda';
import { loadOffset, selectChat } from 'redux/api/chatList';
import { TPeersType } from 'redux/modules/peers';
import { MtpChat, MtpMessage, MtpUser } from 'redux/mtproto';
import { Dispatch, Store } from 'redux/store.h';

const onChatSelect = async (currentId: number, nextId: number) => {
  if (nextId && nextId !== currentId) {
    await selectChat(nextId);
  }
};

const MessageItem = ({ id, from_id, date, message, entities }: MtpMessage) =>
  <Message
    key={id}
    id={id}
    date={date}
    user={from_id}
    // HACK: what to do here?
    text={
      <RichText
        id={id}
        // TODO: remove any cast
        // tslint:disable-next-line
        entities={(entities as any) as Entity[]}
        text={message} />} />;

class ChatContainer extends React.Component<Props, {}> {
  public componentWillReceiveProps(nextProps: ConnectedState) {
    const { selected } = this.props;
    onChatSelect(selected, nextProps.selected);
  }
  public loadSliceRange = async () => {
    const { loadOffset, selected, history } = this.props;
    const maxID = history[0];
    // TODO: remove console.log
    console.log(await loadOffset(selected, maxID));
  }
  public render() {
    if (!this.props.selected) return <DefaultScreen />;
    const { messages, peerName } = this.props;
    console.log(messages);
    return (
      <Chat
        name={peerName}
        userCount={0}
        loadMore={this.loadSliceRange}>
        {messages.map(MessageItem)}
      </Chat>
    );
  }
}

type ConnectedState =  {
  selected: number;
  history: number[];
  messages: MtpMessage[];
  peer?: TPeersType;
  peerData?: MtpUser | MtpChat;
  peerName: string;
};

type ConnectedActions = {
  loadOffset<T>(id: number, offset?: number): Promise<T>;
};

type Props = ConnectedState & ConnectedActions;

type MessagesPath = (obj: Store) => Obj<MtpMessage>;
const messagesPath: MessagesPath = path(['messages', 'byId']);

const stateMap = (state: Store): ConnectedState => {
  const selected = state.selected.dialog;
  if (!selected) return {
    selected,
    history: [],
    messages: [],
    // TODO: This is arguable
    peerName: '',
  };

  const history = state.histories.byId[selected] || [];
  const messagesStore = messagesPath(state);
  const messages = props(history, messagesStore);
  const peer = state.peers.byId[selected];
  const peerData = getPeerData(selected, peer, state);
  const peerName = getPeerName(peer, peerData);
  return {
    selected,
    history,
    messages,
    peer,
    peerData,
    peerName,
  };
};

const dispatchMap = (dispatch: Dispatch) => ({
  loadOffset: (id: number, offset: number) => dispatch(loadOffset(id, offset)),
});

const connected = connect<ConnectedState, ConnectedActions, {}>(stateMap, dispatchMap)(ChatContainer);

export { connected as Chat };
