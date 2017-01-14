import { CHATS } from 'actions';
import { invoke } from 'helpers/Telegram';
import { IMtpMessagesSlice, IMtpPeer } from '../mtproto';
import { IDispatch, IAsyncAction } from 'redux/IStore';
import { TById, IMtpMessage, IMtpUser } from 'redux/mtproto';
import { TPeersType } from 'redux/modules/peers';
import { client } from 'helpers/Telegram';
import { getPeerData } from 'helpers/Telegram/Peers';
import { rejectDashAndFuncs } from 'helpers/treeProcess';

const { LOAD_SLICE, SELECT } = CHATS;

// tslint:disable:curly

export interface IDialogPayload {
  messages: TById<IMtpMessage>;
  users: IMtpUser[];
}

export const loadSliceRange = (dispatch: IDispatch) =>
  (id: number, peer: IMtpPeer, offset: number = 0, limit: number = 10) => {
    const adapter = (slice: IMtpMessagesSlice) => {
      const pure = rejectDashAndFuncs(slice);
      console.warn(`slice`, pure);
      return LOAD_SLICE.DONE({
        id,
        count: pure.count,
        chats: pure.chats,
        users: pure.users,
        messages: pure.messages.list,
      });
    };
    const data = {
      peer,
      offset_id: offset,
      max_id: 0,
      limit,
    };
    dispatch(LOAD_SLICE.INIT(id));
    return invoke('messages.getHistory', data)
      .then(adapter, LOAD_SLICE.FAIL)
      .then(dispatch);
  };

const retrieveInputPeer = (id: number, peer: TPeersType, peerData) => {
  switch (peer) {
    case 'channel':
      return new client.schema.type.InputPeerChannel({
        props: {
          channel_id: id,
          access_hash: peerData.access_hash,
        },
      });

    case 'chat':
      return new client.schema.type.InputPeerChat({
        props: {
          chat_id: id,
        },
      });

    case 'user':
      return new client.schema.type.InputPeerUser({
        props: {
          user_id: id,
          access_hash: peerData.access_hash,
        },
      });

    default: throw new TypeError(`Unknown peer type ${peer}`);
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
