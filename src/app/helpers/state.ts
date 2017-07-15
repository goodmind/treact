import { complement, find, isNil, pipe as P, props } from 'ramda';
import { IMtpPeer, TById } from 'redux/mtproto';

export interface IStoreList<T> {
  ids: number[];
  byId: TById<T>;
}

const idProps = [
  'user_id',
  'chat_id',
  'channel_id',
];

const notNil = complement(isNil);

/**
 * Unified function to get ID from any peer
 * (with `user_id`, `chat_id` or `channel_id`)
 * @function unifiedGetId
 */
export const unifiedGetId: (obj: IMtpPeer) => string = P(
  props(idProps),
  find(notNil),
  // e => +e,
);
