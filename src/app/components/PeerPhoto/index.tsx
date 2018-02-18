import picStore from 'helpers/FileManager/picStore'
import * as React from 'react'
import * as defPhoto from './usercolor1.png'

interface Props {
  id: number | 'default',
  className: string
}

export const PeerPhotoEmpty = ({ className }: Pick<Props, 'className'>) =>
  <img
    className={className}
    src={defPhoto} />

export const PeerPhoto = ({ id, className }: Props) =>
  <img
    className={className}
    src={picStore.get(id)} />
// HACK:  Sending blob through props is definitely slower
