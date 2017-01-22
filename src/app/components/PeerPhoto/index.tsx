import * as React from 'react';

import picStore from 'helpers/FileManager/picStore'

const defPhoto = require('./usercolor1.png')

export const PeerPhotoEmpty = ({ className }) =>
  <img
    className={className}
    src={defPhoto} />;

export const PeerPhoto = ({ id, className }) =>
  <img
    className={className}
    src={picStore.get(id)} />
// NOTE Sending blob through props is definitely slower
