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
    console.log(loadAtDate(offsetDate)
      .then(({ payload: { dialogs } }) => this.setState({ hasMore: dialogs.list.length !== 0 }))
      .catch(e => console.error(e)));
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

/*
const sortByDate = ({
  histories: { byId: historiesMap },
  dialogs: { byId: dialogsMap },
}) => (a, b) => {
  return historiesMap[b].byId[dialogsMap[b].top_message].date - historiesMap[a].byId[dialogsMap[a].top_message].date;
};
*/

const sortDialogs = createSelector<IStore, IStore['dialogs']['ids'], IStore['dialogs']['ids'], any, any>(
  path(['dialogs', 'ids']),
  path(['histories', 'byId']),
  path(['dialogs', 'byId']),
  (dialogs, hmap, dmap) => sort(
    (a, b) =>
      hmap[b].byId[dmap[b].top_message].date - hmap[a].byId[dmap[a].top_message].date,
    dialogs,
  ),
);

/*
const addSortedId = ({
  dialogs: { byId: dialogsMap },
  histories: { byId: historiesMap },
}) => (offsetDate, id) => {
  const msg = historiesMap[id].byId[dialogsMap[id].top_message];
  const { date } = msg;
  // console.count('addSortedId');
  // console.log(msg, offsetDate, date, !offsetDate, offsetDate < date);
  if (date && (!offsetDate || offsetDate < date)) {
    return date;
  }
  return offsetDate;
};
*/

/*
const offsetDate = ({
  dialogs: { ids, byId: dialogsMap },
  histories: { byId: historiesMap },
}) => {
  const id = ids[ids.length - 1];
  const msgId = dialogsMap[id].top_message;
  return historiesMap[id].byId[msgId].date;
};
*/
const offsetDate = createSelector<
  IStore,
  number,
  IStore['dialogs']['ids'],
  IStore['dialogs']['byId'],
  IStore['histories']['byId']
>(
  path(['dialogs', 'ids']),
  path(['dialogs', 'byId']),
  path(['histories', 'byId']),
  (ids, dialogsMap, historiesMap) => {
    const id = ids[ids.length - 1];
    const msgId = dialogsMap[id].top_message;
    return historiesMap[id].byId[msgId].date;
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
