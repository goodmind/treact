import { getInputPeerById, getOutputPeer } from 'helpers/Telegram/Peers';
import { api } from 'helpers/Telegram/pool';
import { normalize, schema } from 'normalizr';
import { pick } from 'ramda';
import { bigint, nextRandomInt } from 'telegram-mtproto/lib/bin';
import { tsNow } from 'telegram-mtproto/lib/service/time-manager';

import { IDispatch, IStore } from 'redux/IStore';
import { MESSAGES } from '../actions';
const { SEND_TEXT } = MESSAGES;

let tempId = -1;

const messages = new schema.Entity('messages');
const sliceSchema = {
  messages: [ messages ],
};

type Flags = {
  out?: boolean,
};

const buildMessage =
  // TODO: generate types from TL
  // tslint:disable-next-line
  (id: number, text: string, randomId: number[], self: /*peerUser*/any, outputPeer: /*peer*/any) =>
    // tslint:disable-next-line
    (message: any) => {
  const messageId = tempId--;
  const randomIds = bigint(randomId[0]).shiftLeft(32).add(bigint(randomId[1])).toString();
  const fromID = self.id;
  const pFlags: Flags = {};
  let flags = 0;
  if (id !== fromID) {
    flags |= 2;
    pFlags.out = true;
  }
  flags |= 256;
  console.debug('buildMessage', message);
  const newMessage = {
    _: 'message',
    id: messageId,
    from_id: fromID,
    to_id: outputPeer,
    flags,
    ...pFlags,
    date: tsNow(true),
    message: text,
    random_id: randomIds,
    pending: true, ...(message._ === 'updateShortSentMessage'
    ? pick(['flags', 'date', 'id', 'media', 'entities'], message)
    : {})};

  const normalized = normalize({ messages: [newMessage] }, sliceSchema);
  normalized.result.histories = [id];
  normalized.entities.histories = { [id]: normalized.result.messages };
  // tslint:disable-next-line
  (normalized as any).id = id;
  return normalized;
};

export function sendText(id: number, text: string) {
  return (dispatch: IDispatch, getState: () => IStore) => {
    const state = getState();
    const inputPeer = dispatch(getInputPeerById(id));
    const outputPeer = dispatch(getOutputPeer(id));
    const randomId = [nextRandomInt(0xFFFFFFFF), nextRandomInt(0xFFFFFFFF)];

    dispatch(SEND_TEXT.INIT());
    return api('messages.sendMessage', {
      peer: inputPeer,
      message: text,
      random_id: randomId,
    })
      .then(buildMessage(id, text, randomId, state.currentUser, outputPeer))
      .then(SEND_TEXT.DONE, SEND_TEXT.FAIL)
      // TODO: why promise loses type here?
      // tslint:disable-next-line
      .then(dispatch as any);
  };
}
