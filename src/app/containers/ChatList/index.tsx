import * as React from 'react';
import { ChatList } from 'components';
import { ChatListItem } from 'containers';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';
import { TById, IMtpDialog } from 'redux/mtproto';
import { IStoreHistory } from 'redux/modules/histories';
import { TPeersType } from 'redux/modules/peers';

interface IProps {
  dialogsIds: number[];
  dialogsMap: TById<IMtpDialog>;
  historiesMap: TById<IStoreHistory>;
  peersMap: TById<TPeersType>;
  selected: number;
  loading: boolean;
  // item?: any;
  // activeChat?: any;
  // dialogs: any;
  // users: any;
  // messages: any;
  // chats: any;
  // onChatClick: (event: React.MouseEvent<any>, chatId: number) => any;
}

class ChatListContainer extends React.Component<IProps, {}> {
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

  public render() {
    const {
      dialogsIds,
      loading,
    } = this.props;
    return (
      <ChatList loading={loading}>
        {dialogsIds.map(this.renderChat)}
      </ChatList>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  dialogsIds: state.dialogs.ids,
  dialogsMap: state.dialogs.byId,
  historiesMap: state.histories.byId,
  peersMap: state.peers.byId,
  selected: state.selected.dialog,
  loading: state.loadings.chatList,
});

const connected = connect(mapStateToProps, null)(ChatListContainer);

export { connected as ChatList }
