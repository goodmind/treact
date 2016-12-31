import * as MTProto from '@goodmind/telegram-mt-node';

export function restoreAuthKey() {
  const storageKey = JSON.parse(localStorage.getItem('reduxPersist:authKey'));
  if (!storageKey) {
    return null;
  }

  const [id, value] = restoreAuthKeyWithSaltFromStorableBuffer(
    Buffer.from(storageKey));

  return new MTProto.auth.AuthKey(id, value);
}

export function authKeyWithSaltToStorableBuffer(authKey, serverSalt) {
  return Buffer.concat([authKey.id, authKey.value, serverSalt], 272);
}

// returnedArray[0] ... authKey.id
// returnedArray[1] ... authKey.value
// returnedArray[2] ... serverSalt
export function restoreAuthKeyWithSaltFromStorableBuffer(buffer) {
  return [buffer.slice(0, 8), buffer.slice(8, 264), buffer.slice(264, 272)];
}
