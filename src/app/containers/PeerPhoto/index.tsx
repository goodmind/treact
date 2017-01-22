import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';
import { pathOr } from 'ramda'
import { PeerPhotoEmpty, PeerPhoto } from 'components/PeerPhoto'
import picStore from 'helpers/FileManager/picStore'
import * as classNames from 'classnames';

interface IProps {
  withPhoto: boolean;
  photoId?: number;
  className?: string;
}

const PeerPhotoContainer = ({ photoId, className = '' }: IProps) => {
  const css = classNames('avatar', className)
  return picStore.has(photoId)
    ? <PeerPhoto id={photoId} className={css} />
    : <PeerPhotoEmpty className={css}/>
}


const photoFromState = (state, peerID) => pathOr('default',
  ['photoCache', 'peer', peerID, 'current'])(state)

const propsState = (state: IStore, { peerID }) => {
  return {
    photoId: photoFromState(state, peerID),
  }
}

const connected = connect<any, any, any>(propsState)(PeerPhotoContainer)

export { connected as PeerPhoto }
