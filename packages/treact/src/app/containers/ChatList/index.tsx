import { fetchChatList } from 'api/chatList'
import { ChatList } from 'components'
import { ChatListItem } from 'containers'
import { Payload, Slice } from 'helpers/reselector.h'
import { path, sort } from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux-act'
import { createSelector } from 'reselect'
import { StoreHistory } from 'store/modules/histories'
import { TPeersType } from 'store/modules/peers'
import { MtpDialog, TById } from 'store/mtproto'
import { Dispatch, Store } from 'store/store.h'

interface Props {
  offsetDate: number
  sortedDialogsIds: number[]
  dialogsIds: number[]
  dialogsMap: TById<MtpDialog>
  historiesMap: TById<StoreHistory>
  peersMap: TById<TPeersType>
  selected: number
  loading: boolean
  loadAtDate: (date: number) => Promise<Action<Payload<Slice>, {}>>
  // item?: any;
  // activeChat?: any;
  // dialogs: any;
  // users: any;
  // messages: any;
  // chats: any;
  // onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

interface State {
  hasMore: boolean
}

class ChatListContainer extends React.Component<Props, State> {
  public state: State = {
    hasMore: true,
  }

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
    const { dialogsIds, offsetDate, loadAtDate } = this.props
    const offsetId = dialogsIds[dialogsIds.length - 1]
    console.log('loadSliceRange', offsetId, offsetDate, loadAtDate)
    loadAtDate(offsetDate)
      .then(({ payload: { result = { dialogs: [] } } }) => this.setState({
        hasMore: result.dialogs.length !== 0,
      }))
      .catch(e => console.error(e))
  }

  public render() {
    const {
      sortedDialogsIds,
      loading,
    } = this.props
    return (
      <ChatList
        loading={loading}
        hasMore={this.state.hasMore}
        loadMore={this.loadSliceRange}>
        {sortedDialogsIds.map(this.renderChat)}
      </ChatList>
    )
  }
}

const sortDialogs = createSelector<
  Store,
  Store['dialogs']['ids'],
  Store['messages']['byId'],
  Store['dialogs']['byId'],
  Store['dialogs']['ids']>(
  path(['dialogs', 'ids']),
  path(['messages', 'byId']),
  path(['dialogs', 'byId']),
  (dialogs, msgs, dmap) => sort(
    (a, b) => msgs[dmap[b].top_message].date - msgs[dmap[a].top_message].date,
    dialogs,
  ),
)

const offsetDate = createSelector<
  Store,
  Store['dialogs']['ids'],
  Store['dialogs']['byId'],
  Store['messages']['byId'],
  number
>(
  path(['dialogs', 'ids']),
  path(['dialogs', 'byId']),
  path(['messages', 'byId']),
  (ids, dialogsMap, messages) => {
    const id = ids[ids.length - 1]
    const msgId = dialogsMap[id].top_message
    return messages[msgId].date
  })

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAtDate: (date: number) => dispatch(fetchChatList(undefined, date)),
})

const mapStateToProps = (state: Store) => ({
  // offsetDate: reduce(addSortedId(state), 0, state.dialogs.ids),
  offsetDate: offsetDate(state),
  sortedDialogsIds: sortDialogs(state),
  dialogsIds: state.dialogs.ids,
  dialogsMap: state.dialogs.byId,
  historiesMap: state.histories.byId,
  peersMap: state.peers.byId,
  selected: state.selected.dialog,
  loading: state.loadings.chatList,
})

const connected = connect(mapStateToProps, mapDispatchToProps)(ChatListContainer)

export { connected as ChatList }
