import * as React from 'react';
import { connect } from 'react-redux';

import { Chat, DefaultScreen } from 'components/Chat';
import { IStore, IDispatch } from 'redux/IStore';
import { getPeerData } from 'helpers/Telegram/Peers';
import { IMtpUser, IMtpChat, IMtpMessage } from 'redux/mtproto';
import { Message } from 'components/Message';
import { selectChat, loadOffset } from 'redux/api/chatList';
import { getPeerName } from 'helpers/Telegram/Peers';
import { TPeersType } from 'redux/modules/peers';
import { path, props, ascend, prop, sort, Obj } from 'ramda';

const onChatSelect = async (currentId: number, nextId: number) => {
  if (nextId && nextId !== currentId) {
    await selectChat(nextId);
  }
};

const MesageItem = ({ id, from_id, date, message }: IMtpMessage) =>
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
  public loadSliceRange = () => {
    const { loadOffset, selected, history } = this.props;
    const maxID = history[0];
    loadOffset(selected, maxID)
      .then(console.log.bind(console));
  }
  public render() {
    if (!this.props.selected) return <DefaultScreen />;
    const { messages, peerName } = this.props;
    return (
      <Chat
        name={peerName}
        userCount={0}
        loadMore={this.loadSliceRange}>
        {messages.map(MesageItem)}
      </Chat>
    );
  }
}

interface IConnectedState {
  selected: number;
  history: number[];
  messages: IMtpMessage[];
  peer?: TPeersType;
  peerData?: IMtpUser | IMtpChat;
  peerName?: string;
}

interface IConnectedActions {
  loadOffset: (id: number, offset?: number) => any;
}

type IProps = IConnectedState & IConnectedActions;

const sortMessages = sort(ascend<IMtpMessage>(prop('date')));

type MessagesPath = (obj: IStore) => Obj<IMtpMessage>;
const messagesPath: MessagesPath = path(['messages', 'byId']);

const stateMap = (state: IStore): IConnectedState => {
  const selected = state.selected.dialog;
  if (!selected) return {
    selected,
    history: [],
    messages: [],
  };

  const history = state.histories.byId[selected] || [];
  const messagesStore = messagesPath(state);
  const messages = sortMessages(props(history, messagesStore));
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
