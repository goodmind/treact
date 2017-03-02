import { normalize, schema } from 'normalizr';
import { map, when, has, prop, props, isNil, complement, find, pipe,
  applySpec, of, path, __ } from 'ramda';

import { CHATS } from 'actions';
import { api } from 'helpers/Telegram/pool';
import { IMtpMessagesSlice, IMtpPeer } from '../mtproto';
import { IDispatch, IAsyncAction } from 'redux/IStore';
import { TById, IMtpMessage, IMtpUser } from 'redux/mtproto';

import { getPeerData, retrieveInputPeer } from 'helpers/Telegram/Peers';

const { LOAD_SLICE, SELECT, GET_DIALOGS } = CHATS;

export interface IDialogPayload {
  messages: TById<IMtpMessage>;
  users: IMtpUser[];
}

const unnestLists = map(when(
  has('list'),
  prop('list')));

const idProps = [
  'user_id',
  'chat_id',
  'channel_id',
];

const notNil = complement(isNil);

const invariantGetId: (obj: any) => string = pipe(
  props(idProps),
  find(notNil),
);

const dialogNormalize = list => normalize(list, [ histories ]);

const unnestMessages = applySpec({
  byId: path(['entities', 'histories']),
  ids: prop('result'),
});

const groupMessages = ({ entities: { messages, dialogs } }) => {
  const mapMessageId = pipe(
    prop('top_message'),
    prop(__, messages),
    of,
    dialogNormalize,
    unnestMessages,
  );
  const mappedMessages = map(mapMessageId, dialogs);
  return mappedMessages;
};

const users = new schema.Entity('users');
const messages = new schema.Entity('messages');
const chats = new schema.Entity('chats');
const histories  = new schema.Entity('histories');
const dialogs = new schema.Entity('dialogs', {}, {
  idAttribute: pipe( prop('peer'), invariantGetId ),
});

const sliceSchema = {
  chats: [ chats ],
  users: [ users ],
  messages: [ messages ],
  dialogs: [ dialogs ],
};

export const loadSliceRange = (dispatch: IDispatch) =>
  (id: number, peer: IMtpPeer, offset: number = 0, limit: number = 10) => {
    const adapter = (slice: IMtpMessagesSlice) => {
      const unnested = unnestLists(slice as any);
      const normalized = normalize(unnested, sliceSchema);
      (normalized as any).messages = slice.messages.list;
      (normalized as any).count = slice.count;
      (normalized as any).id = id;
      console.warn(`slice`, slice, normalized);
      return LOAD_SLICE.DONE(normalized);
      /*return LOAD_SLICE.DONE({
        id,
        count: slice.count,
        chats: slice.chats,
        users: slice.users,
        messages: slice.messages.list,
      });*/
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
      const unnested = unnestLists(result as any);
      const normalized = normalize(unnested, sliceSchema);
      (normalized as any).messages = (result as any).messages;
      (normalized as any).users = (result as any).users;
      (normalized as any).chats = (result as any).chats;
      (normalized as any).dialogs = (result as any).dialogs;
      const histList = groupMessages(normalized);
      normalized.entities.histories = histList;
      normalized.result.histories = Object.keys(histList).map(e => +e);
      return dispatch(GET_DIALOGS.DONE(normalized));
    } catch (err) {
      return dispatch(GET_DIALOGS.FAIL(err));
    }
  };
}
