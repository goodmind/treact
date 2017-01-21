import * as React from 'react';
import { connect } from 'react-redux';
// import { getPeerData } from 'helpers/Telegram/Peers';

// import { Files } from 'helpers/Telegram/Files';
// import { FileManager } from 'helpers/FileManager';
import { IStore } from 'redux/IStore';
import { pathOr } from 'ramda'
import { PeerPhotoEmpty, PeerPhoto } from 'components/PeerPhoto'
import picStore from 'helpers/FileManager/picStore'

// interface IConnectedState {
//   peers: any;
//   peerData: any;
// }

// interface IConnectedActions {}

// interface IOwnProps {
//   avatar?: string;
//   peerID: number;
//   className?: any;
// }

// type IProps = IConnectedState & IConnectedActions & IOwnProps;

// class PeerPhotoImpl extends React.Component<IProps, any> {
//   public static defaultProps = {
//     avatar: require('./usercolor1.png'),
//   };

//   public state = {
//     avatar: this.props.avatar,
//   };

//   public componentDidMount() {
//     const { photo } = this.props.peerData;
//     const peerPhoto = photo && photo.photo_small;
//     const hasPhoto = peerPhoto !== undefined;

//     if (hasPhoto) {
//       const cachedBlob = Files.getCachedFile(peerPhoto);
//       if (cachedBlob) {
//         this.setState({ avatar: FileManager.getUrl(cachedBlob, 'image/jpeg') });
//         return;
//       }
//     }

//     // if (hasPhoto) {
//     //   Files.downloadSmallFile(peerPhoto).then(blob => {
//     //     this.setState({ avatar: FileManager.getUrl(blob, 'image/jpeg') });
//     //   }, err => console.error(err));
//     // }
//   }

//   public render() {
//     return <img className={this.props.className} src={this.state.avatar} />;
//   }
// }

// const mapStateToProps =
//   (state, { peerID }) => ({ peerData: getPeerData(peerID, state.peers.byId[peerID], state) });
// const PeerPhotoConn = connect<Partial<
// IConnectedState>, IConnectedActions, IOwnProps>(mapStateToProps)(PeerPhotoImpl);

// const hasPhoto = has('photo')

class PeerPhotoContainer extends React.Component<any, any> {
  public render() {
    return !this.props.withPhoto || !picStore.has(this.props.photoId)
      ? <PeerPhotoEmpty className="avatar"/>
      : <PeerPhoto id={this.props.photoId} className="avatar" />
  }
}

// const getPhotoId = path(['photo', 'photo_id'])

// const defaultPropsState = { withPhoto: false }

const photoFromState = (state, peerID) => pathOr('default',
  ['photoCache', 'peer', peerID, 'current'])(state)

const propsState = (state: IStore, { peerID }) => {
  // const peer = state.peers.byId[peerID]
  // if (!peer) return defaultPropsState
  // const peerData = getPeerData(peerID, peer, state)
  // if (!hasPhoto(peerData)) return defaultPropsState
  // const photoId = getPhotoId(peerData)
  return {
    withPhoto: true,
    photoId: photoFromState(state, peerID),
  }
}

const connected = connect(propsState)(PeerPhotoContainer)

export { connected as PeerPhoto }
