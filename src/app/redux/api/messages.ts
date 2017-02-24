import { pick } from 'ramda';
import { api } from 'helpers/Telegram/pool';
import { getInputPeerById, getOutputPeer } from 'helpers/Telegram/Peers';
import { nextRandomInt, bigint } from 'telegram-mtproto/lib/bin';
import { tsNow } from 'telegram-mtproto/lib/service/time-manager';

import { IDispatch } from 'redux/IStore';
import { MESSAGES } from '../actions';
const { SEND_TEXT } = MESSAGES;

let tempId = -1;

const buildMessage = (id: number, text: string, randomId: any, self: any) => (message) => {
  const messageId = tempId--;
  const randomIds = bigint(randomId[0]).shiftLeft(32).add(bigint(randomId[1])).toString();
  const fromID = self.id;
  const pFlags: any = {};
  let flags = 0;
  if (id !== fromID) {
    flags |= 2;
    pFlags.out = true;
  }
  flags |= 256;
  console.debug('buildMessage', message);
  const newMessage = Object.assign({
    _: 'message',
    id: messageId,
    from_id: fromID,
    to_id: getOutputPeer(id),
    flags,
    pFlags,
    date: tsNow(true),
    message: text,
    random_id: randomIds,
    pending: true,
  }, message._ === 'updateShortSentMessage' ? pick(['flags', 'date', 'id', 'media', 'entities'], message) : {});

  return {
    id,
    messages: [newMessage],
  };
};

export function sendText(id: number, text: string) {
  return (dispatch: IDispatch, getState) => {
    const state = getState();
    const inputPeer = dispatch(getInputPeerById(id));
    const randomId = [nextRandomInt(0xFFFFFFFF), nextRandomInt(0xFFFFFFFF)];

    dispatch(SEND_TEXT.INIT());
    return api<any>('messages.sendMessage', {
      peer: inputPeer,
      message: text,
      random_id: randomId,
    })
      .then(buildMessage(id, text, randomId, state.currentUser))
      .then(SEND_TEXT.DONE, SEND_TEXT.FAIL)
      .then(dispatch);
  };
}
