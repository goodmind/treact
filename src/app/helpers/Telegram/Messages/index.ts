const channelLocals = {};
const channelsByLocals = {};
let channelCurLocal = 0;
const fullMsgIDModulus = 4294967296;

export function getFullMessageID(msgID, channelID) {
  if (!channelID || msgID <= 0) {
    return msgID;
  }
  msgID = getMessageLocalID(msgID);
  let localStart = channelLocals[channelID];
  if (!localStart) {
    localStart = (++channelCurLocal) * fullMsgIDModulus;
    channelsByLocals[localStart] = channelID;
    channelLocals[channelID] = localStart;
  }

  return localStart + msgID;
}

export function getMessageIDInfo(fullMsgID) {
  if (fullMsgID < fullMsgIDModulus) {
    return [fullMsgID, 0];
  }
  const msgID = fullMsgID % fullMsgIDModulus;
  const channelID = channelsByLocals[fullMsgID - msgID];
  return [msgID, channelID];
}

export function getMessageLocalID (fullMsgID) {
  if (!fullMsgID) {
    return 0;
  }
  return fullMsgID % fullMsgIDModulus;
}

export function splitMessageIDsByChannels (mids) {
  const msgIDsByChannels = {};
  const midsByChannels = {};
  let i;
  let mid;
  let msgChannel;
  let channelID;

  for (i = 0; i < mids.length; i++) {
    mid = mids[i];
    msgChannel = getMessageIDInfo(mid);
    channelID = msgChannel[1];
    if (msgIDsByChannels[channelID] === undefined) {
      msgIDsByChannels[channelID] = [];
      midsByChannels[channelID] = [];
    }
    msgIDsByChannels[channelID].push(msgChannel[0]);
    midsByChannels[channelID].push(mid);
  }

  return {
    msgIDs: msgIDsByChannels,
    mids: midsByChannels,
  };
}
