import { Telegram } from 'telegram-js';
import * as MTProto from '@goodmind/telegram-mt-node';
import * as TypeLanguage from '@goodmind/telegram-tl-node';
import { addPublicKeys } from './publickeys';
import { config, SERVER } from './config';
import * as isObject from 'lodash/isObject';

/* tslint:disable:no-bitwise */

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
    console.log('Connected to Telegram on ', SERVER.host);
    console.log('Client config: ');
    console.log(client.schema, client);
    /*invoke('messages.getDialogs', {
      offset_date: 0,
      offset_id: 0,
      offset_peer: new client.schema.type.InputPeerEmpty(),
      limit: 20,
    }).then(config => console.log(config))
      .catch(err => console.error(err));*/
  });
  ready = client.setup(config);
  config.deviceModel = navigator.vendor;
  config.systemVersion = navigator.userAgent;
} else {
  const os = require('os');
  client = telegram.createClient();
  ready = Promise.resolve({});
  config.deviceModel = os.type();
  config.systemVersion = os.platform() + '/' + os.release();
}

export function isReady() {
  return ready;
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
    .then((r: any) => {
      if (typeof r !== 'boolean' && r.instanceOf('mtproto.type.Rpc_error')) {
        return Promise.reject(r);
      } else {
        return r;
      }
    })
    .catch(err => {
      console.error('Got networker error', err, err.stack);
      return Promise.reject(err);
    });
}

export const toPrintable =
  (type, ...args) => TypeLanguage.utility.toPrintable.bind(type)(...args);

let dialogsNum = 0;
export function generateDialogIndex(date) {
  console.log('dialogsNum', dialogsNum);
  if (date === undefined) {
    date = MTProto.time.getLocalTime();
  }
  return (date * 0x10000) + ((++dialogsNum) & 0xFFFF);
}

export function getPeerID (peerString) {
  if (isObject(peerString)) {
    return peerString.user_id
      ? peerString.user_id
      : -(peerString.channel_id || peerString.chat_id);
  }
  const isUser = peerString.charAt(0) === 'u';
  const peerParams = peerString.substr(1).split('_');
  return isUser ? peerParams[0] : -peerParams[0] || 0;
}

export function getDataCenters() {
  const tl = TypeLanguage;
  const promises = Promise.all([
    invoke('help.getConfig'),
    invoke('help.getNearestDc'),
  ]);
  return promises
    .then(([config, nearestDc]) => {
      const dcs = {
        current: `DC_${nearestDc.this_dc}`,
        nearestDc: `DC_${nearestDc.nearest_dc}`,
        toPrintable: tl.utility.toPrintable,
      };
      const dcList = config.dc_options.list;
      dcList.forEach(dc => {
        dcs[`DC_${dc.id}`] = {
          host: dc.ip_address,
          port: dc.port,
          toPrintable: tl.utility.toPrintable,
        };
      });
      return dcs;
    });
}

export { APP_ID, APP_HASH } from './config';
export { authKeyWithSaltToStorableBuffer } from './helpers';
export { client, MTProto, TypeLanguage }
