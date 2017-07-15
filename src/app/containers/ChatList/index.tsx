import * as React from 'react';
import { ChatList } from 'components';
import { ChatListItem } from 'containers';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';
import { TById, IMtpDialog } from 'redux/mtproto';
import { IStoreHistory } from 'redux/modules/histories';
import { TPeersType } from 'redux/modules/peers';
import { fetchChatList } from 'api/chatList';
import { createSelector } from 'reselect';
import { path, sort } from 'ramda';

interface IProps {
  offsetDate: number;
  sortedDialogsIds: number[];
  dialogsIds: number[];
  dialogsMap: TById<IMtpDialog>;
  historiesMap: TById<IStoreHistory>;
  peersMap: TById<TPeersType>;
  selected: number;
  loading: boolean;
  loadAtDate: (date: number) => any;
  // item?: any;
  // activeChat?: any;
  // dialogs: any;
  // users: any;
  // messages: any;
  // chats: any;
  // onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

interface IState {
  hasMore: boolean;
}

class ChatListContainer extends React.Component<IProps, IState> {
  public state: IState = {
    hasMore: true,
  };

  public renderChat = (id: number) => (
    <ChatListItem
      id={id}
      key={id}
      dialog={this.props.dialogsMap[id]}
      history={this.props.historiesMap[id]}
      peer={this.props.peersMap[id]}
      selected={id === this.props.selected}
      />
  )

  public loadSliceRange = () => {
    const { dialogsIds, offsetDate, loadAtDate } = this.props;
    const offsetId = dialogsIds[dialogsIds.length - 1];
    console.log('loadSliceRange', offsetId, offsetDate, loadAtDate);
    loadAtDate(offsetDate)
      .then(({ payload: { dialogs } }) => this.setState({ hasMore: dialogs.list.length !== 0 }))
      .catch(e => console.error(e));
  }

  public render() {
    const {
      sortedDialogsIds,
      loading,
    } = this.props;
    return (
      <ChatList
        loading={loading}
        hasMore={this.state.hasMore}
        loadMore={this.loadSliceRange}>
        {sortedDialogsIds.map(this.renderChat)}
      </ChatList>
    );
  }
}

const sortDialogs = createSelector<
  IStore,
  IStore['dialogs']['ids'],
  IStore['dialogs']['ids'],
  IStore['messages']['byId'],
  IStore['dialogs']['byId']>(
  path(['dialogs', 'ids']),
  path(['messages', 'byId']),
  path(['dialogs', 'byId']),
  (dialogs, msgs, dmap) => sort(
    (a, b) => msgs[dmap[b].top_message].date - msgs[dmap[a].top_message].date,
    dialogs,
  ),
);

const offsetDate = createSelector<
  IStore,
  number,
  IStore['dialogs']['ids'],
  IStore['dialogs']['byId'],
  IStore['messages']['byId']
>(
  path(['dialogs', 'ids']),
  path(['dialogs', 'byId']),
  path(['messages', 'byId']),
  (ids, dialogsMap, messages) => {
    const id = ids[ids.length - 1];
    const msgId = dialogsMap[id].top_message;
    return messages[msgId].date;
  });

const mapDispatchToProps = dispatch => ({
  loadAtDate: (date: number) => dispatch(fetchChatList(undefined, date)),
});

const mapStateToProps = (state: IStore) => ({
  // offsetDate: reduce(addSortedId(state), 0, state.dialogs.ids),
  offsetDate: offsetDate(state),
  sortedDialogsIds: sortDialogs(state),
  dialogsIds: state.dialogs.ids,
  dialogsMap: state.dialogs.byId,
  historiesMap: state.histories.byId,
  peersMap: state.peers.byId,
  selected: state.selected.dialog,
  loading: state.loadings.chatList,
});

const connected = connect(mapStateToProps, mapDispatchToProps)(ChatListContainer);

export { connected as ChatList }
