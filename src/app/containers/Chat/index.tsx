import * as React from 'react';
import { connect } from 'react-redux';

import { Chat, DefaultScreen } from 'components/Chat';
import { Message } from 'components/Message';
import { getPeerData } from 'helpers/Telegram/Peers';
import { getPeerName } from 'helpers/Telegram/Peers';
import { Obj, path, props } from 'ramda';
import { loadOffset, selectChat } from 'redux/api/chatList';
import { IDispatch, IStore } from 'redux/IStore';
import { TPeersType } from 'redux/modules/peers';
import { IMtpChat, IMtpMessage, IMtpUser } from 'redux/mtproto';

const onChatSelect = async (currentId: number, nextId: number) => {
  if (nextId && nextId !== currentId) {
    await selectChat(nextId);
  }
};

const MessageItem = ({ id, from_id, date, message }: IMtpMessage) =>
  <Message
    key={id}
    id={id}
    date={date}
    user={from_id}
    text={message} />;

class ChatContainer extends React.Component<IProps, {}> {
  public componentWillReceiveProps(nextProps: IConnectedState) {
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

type IConnectedState =  {
  selected: number;
  history: number[];
  messages: IMtpMessage[];
  peer?: TPeersType;
  peerData?: IMtpUser | IMtpChat;
  peerName: string;
};

type IConnectedActions = {
  loadOffset<T>(id: number, offset?: number): Promise<T>;
};

type IProps = IConnectedState & IConnectedActions;

type MessagesPath = (obj: IStore) => Obj<IMtpMessage>;
const messagesPath: MessagesPath = path(['messages', 'byId']);

const stateMap = (state: IStore): IConnectedState => {
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

const dispatchMap = (dispatch: IDispatch) => ({
  loadOffset: (id: number, offset: number) => dispatch(loadOffset(id, offset)),
});

const connected = connect<IConnectedState, IConnectedActions, {}>(stateMap, dispatchMap)(ChatContainer);

export { connected as Chat };
