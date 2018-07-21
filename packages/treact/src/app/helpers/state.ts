import { complement, find, isNil, pipe as P, props } from 'ramda'
import { MtpPeer, TById } from 'store/mtproto'

// TODO: this looks like duplicate of StoredPayload from reselector
export interface StoreList<T> {
  ids: number[]
  byId: TById<T>
}

const idProps = [
  'user_id',
  'chat_id',
  'channel_id',
]

const notNil = complement(isNil)

/**
 * Unified function to get ID from any peer
 * (with `user_id`, `chat_id` or `channel_id`)
 * @function unifiedGetId
 */
export const unifiedGetId: (obj: MtpPeer) => string = P(
  props(idProps),
  find(notNil),
  // e => +e,
)
