import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-act';
import { isNil, isEmpty, unless, when, any } from 'ramda';

import { IStorePhotoCache } from 'redux/modules/photoCache';
import { IStore, IDispatch } from 'redux/IStore';
import { CACHE } from 'redux/actions';
import { IMtpFileLocation, IMtpUploadFile } from 'redux/mtproto';
import { api } from 'helpers/Telegram/pool';
import picStore from 'helpers/FileManager/picStore';

import * as localForage from 'localforage';
// import * as Knack from 'knack';
// const knack = Knack({ concurrency: 6, interval: 100 })
// const invoke = knack(api, { onTimeout: Knack.timeouts.reject })

const { LOAD, DONE } = CACHE;

const picStorage = localForage.createInstance({
  driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'cachedFiles',
  version: 2.0,
  size: 500 * 1024 * 1024, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'files',
});

interface IPropsStore {
  photoCache: IStorePhotoCache;
}

interface IPropsDispatch {
  load(list: string[]): Action<{}, {}>;
  done(id: string): Action<{}, {}>;
}

const beginLoad = async (id: string, loc: IMtpFileLocation) => {
  const { dc_id, volume_id, secret, local_id } = loc;
  const inputLocation = { _: 'inputFileLocation', dc_id, volume_id, secret, local_id };
  console.warn(`idle`, loc);
  const cached = picStorage.getItem<Blob>(id.toString())
    .then(when(isNil, Promise.reject))
    .then(blob => picStore.addBlob(id, blob), () => ({}));
  const loader = () => api<IMtpUploadFile>('upload.getFile', {
    location: inputLocation,
    offset: 0,
    limit: 1024 * 1024,
    dcID: loc.dc_id,
    fileDownload: true,
    createNetworker: true,
    noErrorBox: true,
  }).then(data => picStorage.setItem(id.toString(), picStore.addPic(id, data.bytes)), () => ({}));
  return unless(isNil, loader, await cached);
};
// tslint:disable:no-debugger
const DownloadAssistant = ({ photoCache, load, done }: IPropsStore & IPropsDispatch) => {
  const { idle, downloaded } = photoCache.cache;
  console.count('DownloadAssistant');
  console.log(idle.length);
  if (any(e => !picStore.has(e), downloaded)) {
    console.warn('no in picStore!');
  }
  const mapLoad = (id: string) => {
    let ab = 0;
    ab++;
    const photo = photoCache.photos.byId[id];
    if (!photo) {
      return;
    }
    return beginLoad(id, photo.photo_small)
    .then(() => done(id), () => ({}));
  };
  idle.map(mapLoad);
  unless(isEmpty, load)(idle);

  return <span />;
};

const stateProps = ({ photoCache }: IStore) => ({ photoCache });
const dispatchProps = (dispatch: IDispatch) => ({
  load: (list: string[]) => dispatch(LOAD(list)),
  done: (id: string) => dispatch(DONE(id)),
});

const connected = connect(stateProps, dispatchProps)(DownloadAssistant);

export default connected;
