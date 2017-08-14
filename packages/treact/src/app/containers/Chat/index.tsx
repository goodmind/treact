import * as React from 'react';
import { connect } from 'react-redux';

import { Chat, DefaultScreen } from 'components/Chat';
import { Message } from 'components/Message';
import { Entity, RichText } from 'components/RichText';
import { MessageGroup } from 'components/MessageGroup';
import { getPeerData } from 'helpers/Telegram/Peers';
import { getPeerName } from 'helpers/Telegram/Peers';
import { eqProps, groupWith, map, Obj, path, pipe, props } from 'ramda';
import { loadOffset } from 'redux/api/chatList';
import { TPeersType } from 'redux/modules/peers';
import { MtpChat, MtpMessage, MtpUser } from 'redux/mtproto';
import { Dispatch, Store } from 'redux/store.h';

/*const onChatSelect = async (currentId: number, nextId: number) => {
  if (nextId && nextId !== currentId) {
    await selectChat(nextId);
  }
};*/

class ChatContainer extends React.Component<Props, {}> {
  /*public componentWillReceiveProps(nextProps: ConnectedState) {
    const { selected } = this.props;
    onChatSelect(selected, nextProps.selected);
  }*/
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
        {groupByUser(messages)}
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

const messageItem = ({ id, from_id, date, message, entities, out }: MtpMessage) =>
  <Message
    key={id}
    id={id}
    date={date}
    user={from_id}
    own={out}
    // HACK: what to do here?
    text={
      <RichText
        id={id}
        // TODO: remove any cast
        // tslint:disable-next-line
        entities={(entities as any) as Entity[]}
        text={message} />} />;

const messageGroup = ([first, ...rest]: MtpMessage[]) =>
  <MessageGroup
    key={`${first.from_id}_${first.date}`}
    messages={[first, ...rest]}
    message={messageItem}
    first={first} />;

const groupByUser = pipe(
  groupWith<MtpMessage, MtpMessage[]>((a, b) => {
    return eqProps('from_id', a, b) && (b.date < a.date + 900);
  }),
  map(messageGroup),
);

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
