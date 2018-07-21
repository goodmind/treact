import { join, pipe, trim } from 'ramda'
import { TPeersType } from 'store/modules/peers'
import { MtpChat, MtpUser } from 'store/mtproto'
import { Dispatch, Store } from 'store/store.h'

export const retrieveInputPeer = (id: number, peer: TPeersType, peerData: MtpUser | MtpChat) => {
  switch (peer) {
    case 'channel':
      return {
        _: 'inputPeerChannel' as 'inputPeerChannel',
        channel_id: id,
        access_hash: peerData.access_hash,
      }

    case 'chat':
      return {
        _: 'inputPeerChat' as 'inputPeerChat',
        chat_id: id,
      }

    case 'user':
      return {
        _: 'inputPeerUser' as 'inputPeerUser',
        user_id: id,
        access_hash: peerData.access_hash,
      }

    default: throw new TypeError(`Unknown peer type ${peer}`)
  }
}

// HACK: wrong type
type PeerString = { user_id?: number, chat_id: number, channel_id: number }
// tslint:disable-next-line
function isPeerString(v: any): v is PeerString {
  return v.user_id || v.channel_id || v.chat_id
}
export function getPeerID(peerString: string | PeerString) {
  if (isPeerString(peerString)) {
    return peerString.user_id
      ? peerString.user_id
      : -(peerString.channel_id || peerString.chat_id)
  }
  const isUser = peerString.charAt(0) === 'u'
  const peerParams = peerString.substr(1).split('_')
  return isUser ? peerParams[0] : -peerParams[0] || 0
}

/*
export const resolveUsername = (username: string) => (dispatch): Promise<number | boolean> => {
  const searchUserName = cleanUsername(username);
  if (searchUserName.match(/^\d+$/)) {
    return Promise.resolve(false);
  }
  const foundUserID = dispatch(Users.resolveUsername(searchUserName));
  const foundChatID = dispatch(Chats.resolveUsername(searchUserName));
  let foundPeerID;
  let foundUsername;
  if (foundUserID) {
    foundUsername = dispatch(getUser(foundUserID)).username
    if (cleanUsername(foundUsername) === searchUserName) {
      return Promise.resolve(foundUserID);
    }
  }
  if (foundChatID) {
    foundUsername = dispatch(getChat(foundChatID)).username
    if (cleanUsername(foundUsername) === searchUserName) {
      return Promise.resolve(-foundChatID);
    }
  }

  return invoke('contacts.resolveUsername', { username }).then(resolveResult => {
    saveApiUsers(resolveResult.users);
    saveApiChats(resolveResult.chats);
    return getPeerID(resolveResult.peer);
  });
};
*/

// TODO: peer should be MtpUser | MtpChat
// tslint:disable-next-line
export const retrieveId = (peer: any): number => {
  switch (peer._) {
    case 'channel': return -peer.id
    case 'chat': return -peer.id
    case 'user': return peer.id
    default: throw new Error('Unknown peer type' + peer._)
  }
}

export const getInputPeerById = (id: number) => (_: Dispatch, getState: () => Store) => {
  const state = getState()
  const peerType = state.peers.byId[id]
  const peerData = getPeerData(id, peerType, state)

  return retrieveInputPeer(id, peerType, peerData)
}

export const getOutputPeer = (id: number) => (_: Dispatch, getState: () => Store) => {
  const state = getState()
  const peer = state.peers.byId[id]
  switch (peer) {
    case 'user':
      return { _: 'peerUser', user_id: id }
    case 'channel':
      return { _: 'peerChannel', channel_id: -id }
    case 'chat':
      return { _: 'peerChat', chat_id: -id }
    default:
      throw new TypeError(`Unknown peer type ${peer}`)
  }
}

export const getPeerData = (id: number, peer: TPeersType, { users, chats }: Store) => {
  switch (peer) {
    case 'user': return users.byId[id]
    case 'chatForbidden':
    case 'channel':
    case 'chat': return chats.byId[id]
    default: throw new TypeError(`Unknown peer type ${peer}`)
  }
}

const joinNames = (...names: string[]): string => pipe(join(' '), trim)(names)

export const getPeerName = (peer: TPeersType, peerData: MtpUser | MtpChat) => {
  switch (peer) {
    case 'user': {
      const { first_name = '', username = '', last_name = '' } = (peerData as MtpUser)
      return joinNames(first_name, last_name, username)
    }
    case 'chatForbidden':
    case 'channel':
    case 'chat': {
      const { title = '' } = (peerData as MtpChat)
      return title
    }
    default: throw new TypeError(`Unknown peer type ${peer}`)
  }
}

// TODO: This is arguable (shouldn't be nullable)
export const getPeerShortName = (peer: TPeersType, peerData: MtpUser | MtpChat | null) => {
  switch (peer) {
    case 'user': {
      const { first_name = null, username = null, last_name = null } = (peerData as MtpUser)
      return first_name || username || last_name
    }
    case 'chatForbidden':
    case 'channel':
    case 'chat': {
      const { title = null } = (peerData as MtpChat)
      return title
    }
    default: throw new TypeError(`Unknown peer type ${peer}`)
  }
}
