import { bufferConcat, sha256HashSync } from 'telegram-mtproto/lib/bin';

const ready = null;

export function isReady() {
  return ready;
}

export function makePasswordHash(salt, password) {
  const passwordUTF8 = decodeURIComponent(encodeURIComponent(password));
  let buffer: any = new ArrayBuffer(passwordUTF8.length);
  const byteView: any = new Uint8Array(buffer);
  const len = passwordUTF8.length;
  for (let i = 0; i < len; i++) {
    byteView[i] = passwordUTF8.charCodeAt(i);
  }

  buffer = bufferConcat(
    bufferConcat(
      salt,
      byteView,
    ),
    salt,
  );

  return sha256HashSync(buffer);
}

export { APP_ID, APP_HASH } from './constants';
export { authKeyWithSaltToStorableBuffer } from './helpers';
export { ready as client }
