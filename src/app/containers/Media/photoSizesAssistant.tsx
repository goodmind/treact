import picStore from 'helpers/FileManager/picStore';
import { filter } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux/store.h';

// TODO: move assistants to middlewares?

type ConnectedState = {
  cachedIds: number[],
  // TODO: describe TL types in redux/mtproto
  // TODO: WHERE IS TL PARSERRRR
  photoSizes: Store['photoSizes']['byId'],
};

const PhotoSizesAssistant = ({ cachedIds, photoSizes }: ConnectedState) => {
  console.count('PhotoSizesAssistant');
  const addCached = (id: number) => {
    const photo = photoSizes[id];
    console.warn(`cached size`, photo);
    picStore.addPic(id, photo.bytes);
  };
  const run = () => {
    cachedIds.map(addCached);
  };
  setTimeout(run, 10);
  return <span />;
};

const mapState = ({ photoSizes }: Store): ConnectedState => ({
  cachedIds: filter(
    id => photoSizes.byId[id]._ === 'photoCachedSize',
    photoSizes.ids,
  ),
  photoSizes: photoSizes.byId,
});

export default connect(mapState)(PhotoSizesAssistant);
