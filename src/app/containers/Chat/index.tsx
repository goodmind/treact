import * as React from 'react'
import { connect } from 'react-redux'

import { Chat, DefaultScreen } from 'components/Chat'
import { Message } from 'components/Message'
import { MessageGroup } from 'components/MessageGroup'
import { Entity, RichText } from 'components/RichText'
import { getPeerData, getPeerName } from 'helpers/Telegram/Peers'
import { eqProps, groupWith, pipe, props } from 'ramda'
import { loadOffset } from 'redux/api/chatList'
import { TPeersType } from 'redux/modules/peers'
import { MtpChat, MtpMessage, MtpUser } from 'redux/mtproto'
import { Dispatch, Store } from 'redux/store.h'
import { createSelector } from 'reselect'

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
    const { loadOffset, selected, history } = this.props
    const maxID = history[0]
    // TODO: remove console.log
    console.log(await loadOffset(selected, maxID))
  }
  public render() {
    if (!this.props.selected) return <DefaultScreen />
    const { messages, peerName } = this.props
    console.log(messages)
    return (
      <Chat
        name={peerName}
        userCount={0}
        loadMore={this.loadSliceRange}>
        {messages.map(messageGroup)}
      </Chat>
    )
  }
}

type ConnectedState =  {
  selected: number;
  history: number[];
  messages: MtpMessage[][];
  peer?: TPeersType;
  peerData?: MtpUser | MtpChat;
  peerName: string;
}

type ConnectedActions = {
  loadOffset: typeof loadOffset,
}

type Props = ConnectedState & ConnectedActions

const messageItem = ({ id, from_id, date, message, media, entities, out }: MtpMessage) =>
  <Message
    key={id}
    id={id}
    date={date}
    user={from_id}
    media={media}
    own={out}
    // HACK: what to do here?
    text={
      <RichText
        id={id}
        // TODO: remove any cast
        // tslint:disable-next-line
        entities={(entities as any) as Entity[]}
        text={message} />} />

const messageGroup = (messages: MtpMessage[]) =>
  <MessageGroup
    key={`${messages[0].from_id}_${messages[0].date}`}
    messages={messages}
    message={messageItem}
    first={messages[0]} />

// TODO: sort only ids?
// TODO: move to redux?
const groupByUser = pipe(
  groupWith<MtpMessage, MtpMessage[]>((a, b) =>
    eqProps('from_id', a, b) && (b.date < a.date + 900)),
)

const messagesPath = ({ messages }: Store) => messages.byId
const historiesPath = ({ histories }: Store) => histories.byId
const selectedPath = ({ selected }: Store) => selected.dialog

const historySelector = createSelector(
  historiesPath,
  selectedPath,
  (histories, selected) => histories[selected] || [],
)

const messagesSelector = createSelector(
  messagesPath,
  historySelector,
  // TODO: sort only ids?
  (messages, history) => props(history, messages),
)

const groupedMessagesSelector = createSelector(
  messagesSelector,
  groupByUser,
)

const stateMap = (state: Store): ConnectedState => {
  const selected = state.selected.dialog
  if (!selected) return {
    selected,
    history: [],
    messages: [],
    // TODO: This is arguable
    peerName: '',
  }

  const history = historySelector(state)
  const messages = groupedMessagesSelector(state)
  const peer = state.peers.byId[selected]
  const peerData = getPeerData(selected, peer, state)
  const peerName = getPeerName(peer, peerData)
  return {
    selected,
    history,
    messages,
    peer,
    peerData,
    peerName,
  }
}

const dispatchMap = {
  // TODO: check this works?
  loadOffset,
}

const connected = connect<ConnectedState, ConnectedActions, {}, Store>(stateMap, dispatchMap)(ChatContainer)

export { connected as Chat }
