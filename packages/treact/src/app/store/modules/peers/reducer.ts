import { CHATS } from 'actions'
import { modelDefaults } from 'helpers/reselector'
import { Payload } from 'helpers/reselector.h'
import { StoreList } from 'helpers/state'
import { apply, evolve, flip, isEmpty, keys, map, merge, omit,
  pipe, prop, props, union } from 'ramda'
import { createReducer } from 'redux-act'
import { MtpUser } from 'store/mtproto'
const { GET_DIALOGS, LOAD_SLICE } = CHATS
// import { Store } from 'redux/store.h';

// TODO: reintegrate into selectTypeNames func
// respresent chatForbidden as chat
export type TPeersTypeObjects =
  | { _: 'user' }
  | { _: 'channel' }
  | { _: 'chat' }
  | { _: 'chatForbidden' }
export type TPeersType = TPeersTypeObjects['_']
export type StorePeers = StoreList<TPeersType>


const unionf = flip(union)
const mergef = flip(merge)

const payloadProcess = pipe(
  prop('entities'),
  props(['users', 'chats']),
  apply<{}, TPeersTypeObjects[]>(merge),
  map(prop('_')),
)

const peerReducer = (store: StorePeers, payload: Payload<MtpUser>): StorePeers => {
  const peersMap = payloadProcess(payload)
  const filteredMap = omit(keys(store), peersMap)
  return isEmpty(filteredMap)
    ? store
    : evolve({
    ids: pipe(keys, map(e => +e), unionf)(filteredMap),
    byId: mergef(filteredMap),
  }, store)
}

export const peers = createReducer<StorePeers>({
  [LOAD_SLICE.DONE]: peerReducer,
  [GET_DIALOGS.DONE]: peerReducer,
}, modelDefaults)
