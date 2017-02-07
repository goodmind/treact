import * as React from 'react';

import { getPeerData } from 'helpers/Telegram/Peers';
import { ChatListItemEmpty, ChatListItem } from 'components/ChatListItem';
import { IMtpDialog, IMtpUser, IMtpChat /* IMtpMessage */ } from 'redux/mtproto';
import { TPeersType } from 'redux/modules/peers';
import { IStoreHistory } from 'redux/modules/histories';
import { isEmptyList } from 'helpers/state';
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
    const { id, selected, peer, peerData, history } = this.props;
    const shortName = getPeerShortName(peer, peerData);
    const lastMsg = history.byId[this.props.dialog.top_message] || {message: ''};
    return <ChatListItem
      id={id}
      click={this.click}
      selected={selected}
      name={getPeerName(peer, peerData)}
      unreadCount={this.props.dialog.unread_count}
      previewName={shortName}
      text={lastMsg.message}
      />;
  }
  public click = () => this.props.click(this.props.id);
  public render() {
    const { history } = this.props;
    return isEmptyList(history)
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
}

const mapState = (state: IStore, { id, peer }: IProps) => {
  return {
    peerData: getPeerData(id, peer, state),
  };
};

const mapDispatch = (dispatch: IDispatch) => ({
  click: (id: number) => dispatch(selectChat(id)),
});

const connected = connect<IState, IFuncs, IProps>(mapState, mapDispatch)(ChatListItemContainer);

export { connected as ChatListItem };
