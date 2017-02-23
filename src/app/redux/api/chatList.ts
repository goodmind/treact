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

export const loadSliceRange = (dispatch: IDispatch) =>
  (id: number, peer: IMtpPeer, offset: number = 0, limit: number = 10) => {
    const adapter = (slice: IMtpMessagesSlice) => {
      console.warn(`slice`, slice);
      return LOAD_SLICE.DONE({
        id,
        count: slice.count,
        chats: slice.chats,
        users: slice.users,
        messages: slice.messages.list,
      });
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
      return dispatch(GET_DIALOGS.DONE(result));
    } catch (err) {
      return dispatch(GET_DIALOGS.FAIL(err));
    }
  };
}
