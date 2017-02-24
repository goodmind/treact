import { is, pipe, join, trim } from 'ramda';

import { client } from 'helpers/Telegram';
import { IStore } from 'redux/IStore';
import { TPeersType } from 'redux/modules/peers';
import { IMtpUser, IMtpChat } from 'redux/mtproto';

export const retrieveInputPeer = (id: number, peer: TPeersType, peerData) => {
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

export function getPeerID(peerString) {
  if (is(Object, peerString)) {
    return peerString.user_id
      ? peerString.user_id
      : -(peerString.channel_id || peerString.chat_id);
  }
  const isUser = peerString.charAt(0) === 'u';
  const peerParams = peerString.substr(1).split('_');
  return isUser ? peerParams[0] : -peerParams[0] || 0;
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

export const retrieveId = (peer): number => {
  switch (peer.getTypeName()) {
    case 'Telegram.type.Channel': return -peer.id;
    case 'Telegram.type.Chat': return -peer.id;
    case 'Telegram.type.User': return peer.id;
    default: throw new Error('Unknown peer type' + peer.getTypeName());
  }
};

export const getInputPeerById = (id: number) => (_, getState) => {
  const state = getState();
  const peerType = state.peers.byId[id];
  const peerData = getPeerData(id, peerType, state);

  return retrieveInputPeer(id, peerType, peerData);
};

export const getOutputPeer = (id: number) => (_, getState) => {
  const state = getState();
  const peer = state.peers.byId[id];
  switch (peer) {
    case 'user':
      return { _: 'peerUser', user_id: id };
    case 'channel':
      return { _: 'peerChannel', channel_id: -id };
    case 'chat':
      return { _: 'peerChat', chat_id: -id };
    default:
      throw new TypeError(`Unknown peer type ${peer}`);
  }
};

export const getPeerData = (id: number, peer: TPeersType, { users, chats }: IStore) => {
  switch (peer) {
    case 'user': return users.byId[id];
    case 'channel':
    case 'chat': return chats.byId[id];
    default: throw new TypeError(`Unknown peer type ${peer}`);
  }
};

const joinNames = (...names: string[]): string => pipe( join(' '), trim )(names);

export const getPeerName = (peer: TPeersType, peerData: IMtpUser|IMtpChat) => {
  switch (peer) {
    case 'user': {
      const { first_name = '', username = '', last_name = '' } = (peerData as IMtpUser);
      return joinNames(first_name, last_name, username);
    }
    case 'channel':
    case 'chat': {
      const { title = '' } = (peerData as IMtpChat);
      return title;
    }
    default: throw new TypeError(`Unknown peer type ${peer}`);
  }
};

export const getPeerShortName = (peer: TPeersType, peerData: IMtpUser|IMtpChat) => {
  switch (peer) {
    case 'user': {
      const { first_name = null, username = null, last_name = null } = (peerData as IMtpUser);
      return first_name || username || last_name;
    }
    case 'channel':
    case 'chat': {
      const { title = null } = (peerData as IMtpChat);
      return title;
    }
    default: throw new TypeError(`Unknown peer type ${peer}`);
  }
};
