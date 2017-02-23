import { DEFAULT_DC_ID } from './constants';
import { path } from 'ramda';

export const getFromStore = key => JSON.parse(localStorage.getItem(`reduxPersist:${key}`));
export const byIdGetter = id => path(['byId', id]);

export function restoreAuthKeyFromLocalStorage() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const currentDc = getFromStore('currentDc') || DEFAULT_DC_ID;
  const storageKey = byIdGetter(currentDc)<any>(getFromStore('authKey'));
  if (!storageKey) {
    return undefined;
  }

  return restoreAuthKey(storageKey);
}

export function restoreAuthKey(storageKey) {
  // const [id, value] = restoreAuthKeyWithSaltFromStorableBuffer(
  //  Buffer.from(storageKey));

  return storageKey; // new mtproto.auth.AuthKey(id, value);
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

