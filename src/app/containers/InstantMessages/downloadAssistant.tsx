import { equals, filter, isEmpty, isNil, keys, map,
  pick, pipe, unless, when } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-act';

import picStore from 'helpers/FileManager/picStore';
import { api } from 'helpers/Telegram/pool';
import { CACHE } from 'redux/actions';
import { IDispatch, IStore } from 'redux/IStore';
import { IMtpFileLocation, IMtpUploadFile } from 'redux/mtproto';

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
  photoCache: number[];
  files: {
    [key: number]: IMtpFileLocation;
  };
};

interface IPropsDispatch {
  load(list: number[]): Action<{}, {}>;
  done(id: number): Action<{}, {}>;
}

const beginLoad = async (id: number, loc: IMtpFileLocation) => {
  const { dc_id = 2, volume_id, secret, local_id } = loc;
  const inputLocation = { _: 'inputFileLocation', dc_id, volume_id, secret, local_id };
  console.warn(`idle`, loc);
  const cached = picStorage.getItem<Blob>(id.toString())
    .then(when(isNil, Promise.reject))
    .then(blob => picStore.addBlob(id, blob), () => ({}));
  const loader = () => api<IMtpUploadFile>('upload.getFile', {
    location: inputLocation,
    offset: 0,
    limit: 1024 * 1024,
  }, {
    dcID: loc.dc_id || 2,
    fileDownload: true,
    createNetworker: true,
    noErrorBox: true,
  }).then(data => picStorage.setItem(id.toString(), picStore.addPic(id, data.bytes)), () => ({}));
  return unless(isNil, loader, await cached);
};
// tslint:disable:no-debugger
const DownloadAssistant = ({ photoCache, files, load, done }: IPropsStore & IPropsDispatch) => {
  console.count('DownloadAssistant');
  if (isEmpty(photoCache)) return <span />;
  const mapLoad = (id: number) => {
    const file = files[id];
    return beginLoad(id, file)
    .then(() => done(id), () => ({}));
  };
  const run = () => {
    load(photoCache);
    photoCache.map(mapLoad);
  };
  setTimeout(run, 10);
  return <span />;
};

const queueList = pipe(
  filter(equals('queue')) as any,
  keys,
  map(e => +e),
);

const stateProps = ({ files: { status, locations } }: IStore) => {
  const photoCache = queueList(status);
  const files = pick(photoCache as any, locations.byId);
  return {
    photoCache,
    files,
  };
};
const dispatchProps = (dispatch: IDispatch) => ({
  load: (list: number[]) => dispatch(LOAD(list)),
  done: (id: number) => dispatch(DONE(id)),
});

const connected = connect(stateProps, dispatchProps)(DownloadAssistant);

export default connected;
