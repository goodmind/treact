import { createReducer } from 'redux-act';

import { CHATS, CACHE } from 'actions';
import { SlicePayload, TLPhoto } from 'helpers/reselector.h';


import { has, reject, isEmpty, merge, pipe, map, __,
  pluck, values, contains, into, repeat, zipObj, mergeWith } from 'ramda';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;
const { LOAD, DONE } = CACHE;

export type Status = 'idle' | 'queue' | 'download' | 'cached';
export type Store = { [key: number]: Status };
type Photos = { [key: number]: TLPhoto };

const getPhotoIds = pipe<Photos, TLPhoto[], number[]>(values, pluck('photo_small'));

const updater = (store: Store, payload: SlicePayload): Store => {
  const data = getPhotoIds(payload.entities.photos);
  const isPhoto = (id: number) => contains(id, data);
  const filesIds = payload.result.fileLocations;

  const inStore: (s: number) => boolean = has(__, store) as any;

  const onlyNew = reject(inStore, filesIds);

  const remap = (id: number): [number, Status] => isPhoto(id)
    ? [ id, 'queue' ]
    : [ id, 'idle' ];

  if (isEmpty(onlyNew))
    return store;
  const setStatus = pipe(
      into<number, any, Store>(store, map(remap)),
      merge(store),
    );
  return setStatus(onlyNew);
};

const fillDownload = repeat<Status>('download');
const fillCached = repeat<Status>('cached');

const loadMerge = (a: Status, b: Status) => a === 'cached'
  ? a
  : b;

const onLoad = (store: Store, payload: number[]): Store =>
  mergeWith(loadMerge,
    store,
    zipObj(payload, fillDownload(payload.length)));

const onDone = (store: Store, payload: number[]): Store =>
  mergeWith(loadMerge,
    store,
    zipObj(payload, fillCached(payload.length)));

const reducer = createReducer({
  [LOAD_SLICE.DONE]: updater,
  [GET_DIALOGS.DONE]: updater,
  [LOAD]: onLoad,
  [DONE]: onDone,
}, {});

export default reducer;
