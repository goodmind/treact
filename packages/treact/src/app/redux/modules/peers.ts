import { createReducer } from 'redux-act';

import { IStoreList } from 'helpers/state';

import { CHATS } from 'actions';
import { props, map, pipe, prop, merge, apply, omit, isEmpty,
  union, flip, keys, evolve } from 'ramda';
import { modelDefaults } from 'helpers/reselector';
const { GET_DIALOGS, LOAD_SLICE } = CHATS;

// TODO: reintegrate into selectTypeNames func
// respresent chatForbidden as chat
export type TPeersType = 'user'|'channel'|'chat'|'chatForbidden';
export type IStorePeers = IStoreList<TPeersType>;


const unionf = flip(union);
const mergef = flip(merge);

const payloadProcess = pipe(
  prop('entities'),
  props(['users', 'chats']),
  apply(merge),
  map(prop('_')),
);

const peerReducer = (store, payload) => {
  const peersMap = payloadProcess(payload);
  const filteredMap = omit(keys(store), peersMap);
  return isEmpty(filteredMap)
    ? store
    : evolve({
    ids: pipe(keys, map(e => +e), unionf)(filteredMap),
    byId: mergef(filteredMap),
  }, store);
};

export default createReducer({
  [LOAD_SLICE.DONE]: peerReducer,
  [GET_DIALOGS.DONE]: peerReducer,
}, modelDefaults);
