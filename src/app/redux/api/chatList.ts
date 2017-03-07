import { normalize, schema } from 'normalizr';
import { map, when, prop, isNil, pipe,
  of, nthArg, pathOr,
  keys, assocPath, pathSatisfies, converge, identity,
  flip, reduce } from 'ramda';

import { CHATS } from 'actions';
import { api } from 'helpers/Telegram/pool';
import { unifiedGetId } from 'helpers/state';
import { IMtpMessagesSlice, IMtpPeer } from '../mtproto';
import { IDispatch, IAsyncAction } from 'redux/IStore';
import { TById, IMtpMessage, IMtpUser, IMtpDialog } from 'redux/mtproto';

import { getPeerData, retrieveInputPeer } from 'helpers/Telegram/Peers';

const { LOAD_SLICE, SELECT, GET_DIALOGS } = CHATS;

export interface IDialogPayload {
  messages: TById<IMtpMessage>;
  users: IMtpUser[];
}

const fileLocations  = new schema.Entity('fileLocations', {}, {
  idAttribute: 'local_id',
});
const photos = new schema.Entity('photos', {
  photo_small: fileLocations,
  photo_big: fileLocations,
}, {
  idAttribute: pipe<any, any>(nthArg(1), prop('id'), e => +e),
});
const users = new schema.Entity('users', { photo: photos });
const messages = new schema.Entity('messages');
const chats = new schema.Entity('chats', { photo: photos });

const dialogs = new schema.Entity('dialogs', {}, {
  idAttribute: pipe<IMtpPeer, string>( prop('peer'), unifiedGetId ),
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

const fullNormalize = (obj: any) => indexation(normalize(obj, sliceSchema));

const mapTopMessage = map(pipe<IMtpDialog, number[]>(prop('top_message'), of));


export const loadSliceRange = (dispatch: IDispatch) =>
  (id: number, peer: IMtpPeer, offset: number = 0, limit: number = 10) => {
    const adapter = (slice: IMtpMessagesSlice) => {
      const normalized = fullNormalize(slice);
      normalized.result.histories = [id];
      normalized.entities.histories = { [id]: normalized.result.messages };
      (normalized as any).id = id; //NOTE This needs because we cant infer id later
      return LOAD_SLICE.DONE(normalized);
    };
    const data = {
      peer,
      offset_id: offset,
      max_id: 0,
      limit,
    };
    dispatch(LOAD_SLICE.INIT(id));
    return api<IMtpMessagesSlice>('messages.getHistory', data)
      .then(adapter, LOAD_SLICE.FAIL)
      .then(dispatch);
  };

export const loadOffset = (id: number, offset: number): IAsyncAction<Promise<any>|void> =>
  async (dispatch, getState) => {
    const store = getState();
    const peer = store.peers.byId[id];
    const peerData = getPeerData(id, peer, store);
    const inputPeer = retrieveInputPeer(id, peer, peerData);
    const currentActive = store.selected.dialog;
    try {
      if (currentActive === id)
        return loadSliceRange(dispatch)(id, inputPeer, offset);
    } catch (err) {
      console.warn(err);
    }
  };

export const selectChat = (id: number): IAsyncAction<Promise<any>|void> =>
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

export function fetchChatList(limit: number = 20) {
  return async (dispatch: IDispatch) => {
    dispatch(GET_DIALOGS.INIT());
    try {
      const result = await api('messages.getDialogs', {
        offset_date: 0,
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
}
