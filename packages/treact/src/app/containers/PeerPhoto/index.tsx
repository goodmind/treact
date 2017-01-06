import * as React from 'react';
import { connect } from 'react-redux';

interface IConnectedState {
  chats: any;
  users: any;
}

interface IConnectedActions {}

interface IOwnProps {
  avatar?: string;
  peerID: number;
}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class PeerPhotoImpl extends React.Component<IProps, any> {
  public static defaultProps = {
    avatar: require('./usercolor1.png'),
  };

  public render() {
    const { avatar, peerID, users, chats } = this.props;
    const peer = peerID > 0 ? users.getById(peerID) : chats.getById(-peerID);

    console.warn(peerID, peer.photo);

    return (
      <div>
        <img src={avatar} />
      </div>
    );
  }
}

const mapStateToProps = ({ chatList: { chats, users }}) => ({ chats, users });
const PeerPhoto = connect<Partial<IConnectedState>, IConnectedActions, IOwnProps>(mapStateToProps)(PeerPhotoImpl);

export { PeerPhoto }
