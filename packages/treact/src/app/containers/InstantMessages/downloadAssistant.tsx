import { equals, filter, isEmpty, isNil, keys, map,
  pick, pipe, unless, when } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-act';

import picStore from 'helpers/FileManager/picStore';
import { api } from 'helpers/Telegram/pool';
import { CACHE } from 'redux/actions';
import { MtpFileLocation, MtpUploadFile } from 'redux/mtproto';
import { Dispatch, Store } from 'redux/store.h';

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

interface PropsStore {
  photoCache: number[];
  files: {
    [key: number]: MtpFileLocation;
  };
}

interface PropsDispatch {
  load(list: number[]): Action<number[], {}>;
  done(id: number): Action<number, {}>;
}

const beginLoad = async (id: number, loc: MtpFileLocation) => {
  const { dc_id = 2, volume_id, secret, local_id } = loc;
  const inputLocation = { _: 'inputFileLocation', dc_id, volume_id, secret, local_id };
  console.warn(`idle`, loc);
  const cached = picStorage.getItem<Blob>(id.toString())
    .then(when(isNil, Promise.reject))
    .then(blob => picStore.addBlob(id, blob), () => ({}));
  const loader = () => api<MtpUploadFile>('upload.getFile', {
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
const DownloadAssistant = ({ photoCache, files, load, done }: PropsStore & PropsDispatch) => {
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
  filter(equals('queue')) as <T>(arr: { [key: number]: T }) => T[],
  keys,
  map(e => +e),
);

const stateProps = ({ files: { status, locations } }: Store) => {
  const photoCache = queueList(status);
  const files = pick(photoCache, locations.byId);
  return {
    photoCache,
    files,
  };
};
const dispatchProps = (dispatch: Dispatch) => ({
  load: (list: number[]) => dispatch(LOAD(list)),
  done: (id: number) => dispatch(DONE(id)),
});

const connected = connect(stateProps, dispatchProps)(DownloadAssistant);

export default connected;
