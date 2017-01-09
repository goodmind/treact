import { CHATS } from 'actions';
import { invoke } from 'helpers/Telegram';
import { IMtpMessagesSlice, IMtpPeer } from '../mtproto';
import { IDispatch } from 'redux/IStore';

const { LOAD_SLICE } = CHATS;

export const loadSliceRange = (dispatch: IDispatch) =>
  (id: number, peer: IMtpPeer, offset: number = 0, limit: number = 10) => {
    const adapter = (slice: IMtpMessagesSlice) => LOAD_SLICE.DONE({
      messages: slice.messages.list,
      users: slice.users.list,
      id,
    });
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
