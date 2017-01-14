import * as React from 'react';
import { connect } from 'react-redux';
import { getPeerData } from 'helpers/Telegram/Peers';

interface IConnectedState {
  peers: any;
  peerData: any;
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
    const { avatar, peerData } = this.props;
    const { photo } = peerData;

    console.warn(peerData, photo && photo.photo_small);

    return (
      <div>
        <img src={avatar} />
      </div>
    );
  }
}

const mapStateToProps =
  (state, { peerID }) => ({ peerData: getPeerData(peerID, state.peers.byId[peerID], state) });
const PeerPhoto = connect<Partial<IConnectedState>, IConnectedActions, IOwnProps>(mapStateToProps)(PeerPhotoImpl);

export { PeerPhoto }
