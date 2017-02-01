import { ITelegramClient } from 'telegram-js';
import * as MTProto from '@goodmind/telegram-mt-node';
import * as TypeLanguage from '@goodmind/telegram-tl-node';

import apiConnect from './connection';
import { getFromStore, byIdGetter, restoreAuthKey } from './helpers';
import { config } from './config';
import { DC_OPTIONS } from './constants';
import { IMtpHelpNearestDc } from 'redux/mtproto';
import { rejectDashAndFuncs } from 'helpers/treeProcess';

const baseDcID = getFromStore('currentDc');

let client: ITelegramClient;
const ready = apiConnect();
ready.then(value => {
  value._mainClient = true;
  client = value;
});
// NOTE Node connection function is deleted
// } else {
//   const os = require('os');
//   client = telegram.createClient();
//   ready = Promise.resolve({});
//   config.deviceModel = os.type();
//   config.systemVersion = os.platform() + '/' + os.release();
// }

export function isReady() {
  return ready;
}

function readyApiCall(method, params, networker) {
  console.debug('Passed networker', networker.then, !!networker._mainClient);
  return networker.callApi(method, params);
}

export function makePasswordHash (salt, password) {
  const passwordUTF8 = decodeURIComponent(encodeURIComponent(password));
  let buffer: any = new ArrayBuffer(passwordUTF8.length);
  const byteView: any = new Uint8Array(buffer);
  const len = passwordUTF8.length;
  for (let i = 0; i < len; i++) {
    byteView[i] = passwordUTF8.charCodeAt(i);
  }

  buffer = Buffer.concat([Buffer.concat([salt, Buffer.from(byteView)]), salt]);

  return MTProto.utility.createSHAHash(buffer, 'sha256');
}

let stopTime;
const performRequest = <R>(method, params?, options?) => (networker): Promise<R> => {
  return readyApiCall(method, params, networker)
    .then((r: any) => {
      console.debug('Got response', r);
      if (typeof r !== 'boolean' && r._typeName === 'mtproto.type.Rpc_error') {
        return Promise.reject(r);
      } else {
        return rejectDashAndFuncs(r);
      }
    })
    .catch(err => {
      console.error('Got networker error', err, Buffer.from(err).toString());
      console.debug('Errored args', method, params, options);

      if (err.error_message === 'MSG_WAIT_FAILED') {
        const now = MTProto.time.getLocalTime();
        if (stopTime) {
          if (now >= stopTime) {
            return Promise.reject(err);
          }
        } else {
          stopTime = now + 10 * 1000;
        }
        return new Promise((r, j) =>
          setTimeout(() =>
            performRequest<R>(method, params, options)(networker).then(r, j), 1000));
      }

      return Promise.reject(err);
    });
}

export function invoke<R>(method, params?, options: any = {}): Promise<R> {
  const dcID = options.dcID || baseDcID;
  if (dcID) {
    return getNetworker(dcID, options)
      .then(performRequest<R>(method, params, options));
  }
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

const cachedUploadNetworkers = {};
const cachedNetworkers = {};

const connectToDc = async (dcID: number, authKey?: any) => {
  const dcOptions = await getDataCenters();
  const server = dcOptions[`DC_${dcID}`];

  console.debug('connectToDc', dcID, authKey);

  return apiConnect(server, authKey ? { ...config, authKey: restoreAuthKey(authKey) } : config);
};

export const getNetworker = async (dcID, options: any = {}) => {
  const cache = (options.fileUpload || options.fileDownload)
    ? cachedUploadNetworkers
    : cachedNetworkers;
  if (!dcID) {
    throw new Error('getNetworker without dcID')
  }
  if (cache[dcID] !== undefined) {
    return cache[dcID];
  }
  const authKey = byIdGetter(dcID)<any>(getFromStore('authKey'));
  if (authKey) {
    cache[dcID] = connectToDc(dcID, authKey);
    return cache[dcID];
  }
  if (!options.createNetworker) {
    throw {type: 'AUTH_KEY_EMPTY', code: 401};
  }
  cache[dcID] = connectToDc(dcID);
  cache[dcID].then(client => {
    console.log(client.authKey);
  });
  return cache[dcID];
};

export function getDataCenters() {
  const tl = TypeLanguage;
  const promises = Promise.all([
    {
      dc_options: {
        list: DC_OPTIONS,
      },
    },
    performRequest<IMtpHelpNearestDc>('help.getNearestDc')(client),
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

export { APP_ID, APP_HASH } from './constants';
export { authKeyWithSaltToStorableBuffer } from './helpers';
export { client, MTProto, TypeLanguage }
