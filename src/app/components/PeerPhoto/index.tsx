import picStore from 'helpers/FileManager/picStore';
import * as React from 'react';
import * as defPhoto from './usercolor1.png';

interface IProps {
  id: number | 'default';
  className: string;
}

export const PeerPhotoEmpty = ({ className }: Pick<IProps, 'className'>) =>
  <img
    className={className}
    src={defPhoto} />;

export const PeerPhoto = ({ id, className }: IProps) =>
  <img
    className={className}
    src={picStore.get(id)} />;
// NOTE Sending blob through props is definitely slower
