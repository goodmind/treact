import * as isObject from 'lodash/isObject';

/*import { getUser, getUserString } from '../Users';
import { getChat, getChatString } from '../Chats';

export function getPeerString(peerID) {
  return peerID > 0
    ? getUserString(peerID)
    : getChatString(-peerID);
}

export function getPeer(peerID) {
  return peerID > 0
    ? getUser(peerID)
    : getChat(-peerID);
}*/
export function getPeerID(peerString) {
  if (isObject(peerString)) {
    return peerString.user_id
      ? peerString.user_id
      : -(peerString.channel_id || peerString.chat_id);
  }
  const isUser = peerString.charAt(0) === 'u';
  const peerParams = peerString.substr(1).split('_');
  return isUser ? peerParams[0] : -peerParams[0] || 0;
}

export const retrieveId = (peer): number => {
  switch (peer.getTypeName()) {
    case 'Telegram.type.Channel': return -peer.id;
    case 'Telegram.type.Chat': return -peer.id;
    case 'Telegram.type.User': return peer.id;
    default: throw new Error('Unknown peer type' + peer.getTypeName());
  }
};
