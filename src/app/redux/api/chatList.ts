import { normalize, schema } from 'normalizr';
import { assocPath, converge, flip, identity, isNil,
  keys, map, nthArg,
  of, pathOr, pathSatisfies, pipe, prop,
  reduce, when } from 'ramda';

import { CHATS } from 'actions';
import { unifiedGetId } from 'helpers/state';
import { api } from 'helpers/Telegram/pool';
import { MtpDialog, MtpMessage, MtpUser, TById } from 'redux/mtproto';
import { AsyncAction, Dispatch } from 'redux/store.h';
import { MtpMessagesSlice, MtpPeer } from '../mtproto';

import { getPeerData, retrieveInputPeer } from 'helpers/Telegram/Peers';

const { LOAD_SLICE, SELECT, GET_DIALOGS } = CHATS;

export interface DialogPayload {
  messages: TById<MtpMessage>;
  users: MtpUser[];
}

const fileLocations  = new schema.Entity('fileLocations', {}, {
  idAttribute: 'local_id',
});
const photos = new schema.Entity('photos', {
  photo_small: fileLocations,
  photo_big: fileLocations,
}, {
  idAttribute: pipe(nthArg(1), prop('id'), e => +e),
});
const users = new schema.Entity('users', { photo: photos });
const messages = new schema.Entity('messages');
const chats = new schema.Entity('chats', { photo: photos });

const dialogs = new schema.Entity('dialogs', {}, {
  idAttribute: pipe( prop('peer'), unifiedGetId ),
});

const sliceSchema = {
  chats: [ chats ],
  users: [ users ],
  messages: [ messages ],
  dialogs: [ dialogs ],
};



/**
 * Add index list in `result` for model values in `entities`
 * @function addModelIndex
 */
// TODO: fix types
// tslint:disable-next-line
const addModelIndex = (obj: any, modelName: string) =>
  when(
    pathSatisfies(isNil, ['result', modelName]),
    converge(
      assocPath(['result', modelName]), [
      pipe(pathOr({}, ['entities', modelName]), keys, map(e => +e)),
      identity,
    ]),
  )(obj);

const modelsIndexation = flip(reduce(addModelIndex));

const indexation = modelsIndexation(['photos', 'fileLocations']);

const fullNormalize = <T>(obj: T) => indexation(normalize(obj, sliceSchema));

const mapTopMessage = map(pipe<MtpDialog, number, number[]>(prop('top_message'), of));


export const loadSliceRange = (dispatch: Dispatch) =>
  (id: number, peer: MtpPeer, offset: number = 0, limit: number = 15) => {
    const adapter = (slice: MtpMessagesSlice) => {
      const normalized = fullNormalize(slice);
      normalized.result.histories = [id];
      normalized.entities.histories = { [id]: normalized.result.messages };

      // tslint:disable-next-line
      (normalized as any).id = id; // NOTE This needs because we cant infer id later
      return LOAD_SLICE.DONE(normalized);
    };
    const data = {
      peer,
      offset_id: offset,
      max_id: 0,
      limit,
    };
    dispatch(LOAD_SLICE.INIT(id));
    return api<MtpMessagesSlice>('messages.getHistory', data)
      .then(adapter, LOAD_SLICE.FAIL)
      // TODO: propogate type here
      .then(dispatch);
  };

export const loadOffset = (id: number, offset: number, limit?: number): AsyncAction<Promise<{}>> =>
  async (dispatch, getState) => {
    const store = getState();
    const peer = store.peers.byId[id];
    const peerData = getPeerData(id, peer, store);
    const inputPeer = retrieveInputPeer(id, peer, peerData);
    const currentActive = store.selected.dialog;
    try {
      if (currentActive === id)
        return loadSliceRange(dispatch)(id, inputPeer, offset, limit);
    } catch (err) {
      console.warn(err);
    }
  };

export const selectChat = (id: number): AsyncAction<void> =>
  (dispatch, getState) => {
    const store = getState();
    const peer = store.peers.byId[id];
    const peerData = getPeerData(id, peer, store);
    const inputPeer = retrieveInputPeer(id, peer, peerData);
    const currentActive = store.selected.dialog;
    dispatch(SELECT(id));
    try {
      if (currentActive !== id)
        loadSliceRange(dispatch)(id, inputPeer);
    } catch (err) {
      console.warn(err);
    }
  };

export const fetchChatList = (limit: number = 20, date: number = 0) =>
  async (dispatch: Dispatch) => {
    dispatch(GET_DIALOGS.INIT());
    try {
      const result = await api('messages.getDialogs', {
        offset_date: date,
        offset_id: 0,
        offset_peer: { _: 'inputPeerEmpty' },
        limit,
      });
      const normalized = fullNormalize(result);
      const histories = mapTopMessage(normalized.entities.dialogs);
      normalized.entities.histories = histories;
      normalized.result.histories = normalized.result.dialogs;
      return dispatch(GET_DIALOGS.DONE(normalized));
    } catch (err) {
      return dispatch(GET_DIALOGS.FAIL(err));
    }
  };
