import * as React from 'react';

import { path, isEmpty } from 'ramda';

import { getPeerData } from 'helpers/Telegram/Peers';
import { ChatListItemEmpty, ChatListItem } from 'components/ChatListItem';
import { IMtpDialog, IMtpUser, IMtpChat /* IMtpMessage */, IMtpMessage } from 'redux/mtproto';
import { TPeersType } from 'redux/modules/peers';
import { IStoreHistory } from 'redux/modules/histories';
import { connect } from 'react-redux';
import { IDispatch, IStore } from 'redux/IStore';
import { getPeerName, getPeerShortName } from 'helpers/Telegram/Peers';
import { selectChat } from 'redux/api/chatList';

// const getLastMessage =
//  (history: IStoreHistory): IMtpMessage => history.byId[last<number, typeof history.ids>(history.ids)];

class ChatListItemContainer extends React.Component<IProps & IFuncs & IState, {}> {
  public renderEmptyItem = () => {
    const { id, selected, peer, peerData } = this.props;
    return <ChatListItemEmpty
      id={id}
      click={this.click}
      selected={selected}
      name={getPeerName(peer, peerData)}
      />;
  }
  public renderItem = () => {
    const { id, selected, peer, peerData, from, fromData, isNotChat, isYou, message } = this.props;
    const lastMsg = message || {message: ''};
    return <ChatListItem
      id={id}
      click={this.click}
      selected={selected}
      name={getPeerName(peer, peerData)}
      unreadCount={this.props.dialog.unread_count}
      previewName={isNotChat ? undefined : getPeerShortName(from, fromData)}
      isYou={isYou}
      text={lastMsg.message || ''}
      />;
  }
  public click = () => this.props.click(this.props.id);
  public render() {
    const { history } = this.props;
    return isEmpty(history)
      ? this.renderEmptyItem()
      : this.renderItem();
  }
}

interface IProps {
  id: number;
  dialog: IMtpDialog;
  history: IStoreHistory;
  peer: TPeersType;
  selected: boolean;
}

interface IFuncs {
  click(id: number): any;
}

interface IState {
  peerData: IMtpUser|IMtpChat;
  fromData: IMtpUser|IMtpChat;
  from: TPeersType;
  isNotChat: boolean;
  isYou: boolean;
  message?: IMtpMessage;
}

const preview = (state, message, peer) => {
  const fromId = message.from_id || -1;
  const from = state.peers.byId[fromId];

  const isNotChat = peer === 'user' || from !== 'user';
  const isYou = !!message.out;
  const fromData = !isNotChat && getPeerData(fromId, from, state);

  return {
    isNotChat,
    isYou,
    fromData,
    from: isNotChat ? peer : from,
  };
};

const messagesPath = path(['messages', 'byId']);

const mapState = (state: IStore, { id, peer, dialog }: IProps): IState => {
  const message = messagesPath(state)[dialog.top_message];
  const peerData = getPeerData(id, peer, state);

  return {
    peerData,
    message,
    ...preview(state, message, peer),
  };
};

const mapDispatch = (dispatch: IDispatch) => ({
  click: (id: number) => dispatch(selectChat(id)),
});

const connected = connect<IState, IFuncs, IProps>(mapState, mapDispatch)(ChatListItemContainer);

export { connected as ChatListItem };
