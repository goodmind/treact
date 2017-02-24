import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import picStore from 'helpers/FileManager/picStore';
import { CHATS, CACHE } from 'actions';
import { IMtpGetDialogs, IMtpUser, IMtpPhoto } from 'redux/mtproto';
import { getListOf, modelHandler, addChangedProp, appendNew } from 'helpers/state';
// import { Files } from 'helpers/Telegram/Files'

import { complement, isNil, pathSatisfies, filter, prop, pipe,
  pair, converge, path, dissoc, contains, evolve, append, any, difference,
  flip, concat, uniq, without, assoc, propOr, propSatisfies, equals,
  assocPath, reduce, toPairs } from 'ramda';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;
const { LOAD, DONE } = CACHE;

const exists = complement(isNil);
const hasPhoto = pathSatisfies(exists, ['photo', 'photo_small', 'local_id']);
const hasPhotoFilter = filter(hasPhoto);
const idPath = path(['photo', 'photo_small', 'local_id']);

interface IStoreCache {
  downloaded: string[];
  inProgress: string[];
  idle: string[];
}

export interface IStorePhotoCache {
  cache: IStoreCache;
  photos: {
    ids: string[],
    byId: {
      [key: string]: IMtpPhoto,
    },
  };
}

// type [string, IMtpFileLocation]

const cacheSave: any = (state: IStoreCache, id: string ) => {
  const includes: (list: string[]) => boolean = (contains(id) as any);
  return any(includes, [state.downloaded, state.inProgress, state.idle])
    ? state
    : evolve({
      idle: append(id),
    })(state);
};

const getUsersChats = getListOf<IMtpUser>('users', 'chats');

const cacheDialogs = modelHandler<IMtpUser, string, IMtpGetDialogs>({
  get: getUsersChats,
  filter: hasPhotoFilter,
  edit: idPath,
  save: cacheSave,
});

const cacheOnLoad = (state: IStoreCache, payload: string[]) => evolve({
  idle: flip(difference)(payload),
  inProgress: pipe(concat(payload), uniq),
})(state);

const cacheOnDone = (state: IStoreCache, payload: string) => evolve({
  inProgress: without([payload]),
  downloaded: append(payload),
})(state);

const cache = createReducer<any>({
  [LOAD_SLICE.DONE]: cacheDialogs,
  [GET_DIALOGS.DONE]: cacheDialogs,
  [LOAD]: cacheOnLoad,
  [DONE]: cacheOnDone,
}, {
  downloaded: [],
  inProgress: [],
  idle: [],
});

const idsDialogs = modelHandler<IMtpUser, string, IMtpGetDialogs>({
  get: getUsersChats,
  filter: hasPhotoFilter,
  edit: idPath,
  save: appendNew,
});

const ids = createReducer({
  [LOAD_SLICE.DONE]: idsDialogs,
  [GET_DIALOGS.DONE]: idsDialogs,
}, []);

const conPair = (func1, func2) => (...data) =>
  converge(pair, [func1, func2])(...data);

const byIdEdit: any = model => conPair(
  idPath,
  pipe(prop('photo'), dissoc('photo_id')))(model);

const byIdDialogs = modelHandler<IMtpUser, IMtpPhoto, IMtpGetDialogs>({
  get: getUsersChats,
  filter: hasPhotoFilter,
  edit: byIdEdit,
  save: addChangedProp,
});
const byId = createReducer({
  [LOAD_SLICE.DONE]: byIdDialogs,
  [GET_DIALOGS.DONE]: byIdDialogs,
}, {});

const photos = combineReducers({
  ids,
  byId,
});

const Merger = (state, id) => value => assoc(id, value, state);

const getCurrent = propOr('default', 'current');

const peerEdit = (state, [ id, photoId ]) => {
  const oldVal = state[id];
  const merger = Merger(state, id);
  const current = getCurrent(oldVal);
  if (picStore.has(photoId))
    return photoId === current
      ? state
      : merger({ real: photoId, current });
  else return oldVal
    ? state
    : merger({ real: photoId, current });
};

const peerByIdDialogs = modelHandler<any, any, any>({
  get: getUsersChats,
  filter: hasPhotoFilter,
  edit: conPair(prop('id') , idPath),
  save: peerEdit,
});

// const peerByIdDone = modelHandler<any, any, any>({
//   get: getUsers,
//   filter: hasPhotoFilter,
//   edit: conPair(prop('id') , idPath),
//   save: peerEdit,
// })

const isUserCurrent = (photoId, value) =>
  propSatisfies(equals(photoId), 'real')(value);
const peerByIdDone = (state, photoId) => pipe(
  toPairs,
  reduce(
    (acc, [id, value]) => isUserCurrent(photoId, value)
      ? assocPath([id, 'current'], photoId, acc)
      : acc,
    state,
  ),
)(state);


const peer = createReducer({
  [LOAD_SLICE.DONE]: peerByIdDialogs,
  [GET_DIALOGS.DONE]: peerByIdDialogs,
  [DONE]: peerByIdDone,
}, {});

const reducer = combineReducers({
  cache,
  photos,
  peer,
});

export default reducer;
