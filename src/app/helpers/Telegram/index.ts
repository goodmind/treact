import { Telegram } from 'telegram-js';
import * as MTProto from '@goodmind/telegram-mt-node';
import * as TypeLanguage from '@goodmind/telegram-tl-node';
import { addPublicKeys } from './publickeys';
import { config, SERVER } from './config';

export const schema = require('./api-tlschema-57.json');

const telegram = new Telegram(MTProto, TypeLanguage);
telegram.useSchema(schema);
addPublicKeys(telegram);

let connection;
let client;
let ready;

if (typeof window !== 'undefined') {
  connection = new MTProto.net.HttpConnection(SERVER);
  client = telegram.createClient();
  client.setConnection(connection);
  connection.connect(() => {
    console.log('Connected to Telegram');
    console.log('Client config: ');
    invoke('messages.getDialogs', {
      offset_date: 0,
      offset_id: 0,
      offset_peer: new client.schema.type.InputPeerEmpty(),
      limit: 0,
    }).then(config => console.log(config));
  });
  ready = client.setup(config);
  config.deviceModel = navigator.vendor;
  config.systemVersion = navigator.userAgent;
} else {
  const os = require('os');
  client = {
    callApi() {
      return Promise.resolve({});
    },
  };
  ready = Promise.resolve({});
  config.deviceModel = os.type();
  config.systemVersion = os.platform() + '/' + os.release();
}

function readyApiCall(...args: any[]) {
  return ready.then(client => client.callApi(...args));
}

export function makePasswordHash (salt, password) {
  const passwordUTF8 = decodeURIComponent(encodeURIComponent(password));
  let buffer = new ArrayBuffer(passwordUTF8.length);
  const byteView = new Uint8Array(buffer);

  for (let i = 0, len = passwordUTF8.length; i < len; i++) {
    byteView[i] = passwordUTF8.charCodeAt(i);
  }

  buffer = Buffer.concat([Buffer.concat([salt, Buffer.from(byteView)]), salt]);

  return MTProto.utility.createSHAHash(buffer, 'sha256');
}

export function invoke(...args: any[]) {
  return readyApiCall(...args)
    .then((r: any) => r.error_code ? Promise.reject(r) : r);
}

export const toPrintable =
  (type, ...args) => TypeLanguage.utility.toPrintable.bind(type)(...args);

export { APP_ID, APP_HASH } from './config';
export { authKeyWithSaltToStorableBuffer } from './helpers';
export { client }
