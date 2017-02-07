import { defaultTo } from 'ramda';

import apiConnect from './connection';
import { ITelegramClient, mtproto, tl } from 'telegram-mtproto';
import { rejectDashAndFuncs } from 'helpers/treeProcess';
import { config } from './config';
import { getFromStore, byIdGetter, restoreAuthKey } from './helpers';
import { DC_OPTIONS, DEFAULT_DC_ID } from './constants';

import { IMtpHelpNearestDc } from 'redux/mtproto';

class ClientCache {
  constructor(client: ITelegramClient, mainDC: number) {
    this.cachedClients[mainDC] = client;
    this.cachedUploadClients[mainDC] = client;
  }
  private cachedClients = {};
  private cachedUploadClients = {};
  public dcConnect = async (dcID: number, authKey?: any) => {
    const dcOpts = await getDataCenters();
    const dc = dcOpts[`DC_${dcID}`];
    return apiConnect(dc, authKey ? { ...config, authKey: restoreAuthKey(authKey) } : config);
  }
  public getClient = async (dcID: number, options: any = {}) => {
    const cache = (options.fileUpload || options.fileDownload)
      ? this.cachedUploadClients
      : this.cachedClients;
    if (!dcID)
      throw new Error('getClient without dcID');
    if (cache[dcID] !== undefined)
      return cache[dcID];
    const authKey = byIdGetter(dcID)<any>(getFromStore('authKey'));
    if (authKey) {
      cache[dcID] = this.dcConnect(dcID, authKey);
      return cache[dcID];
    }
    if (!options.createNetworker)
      throw { error_message: 'AUTH_KEY_EMPTY', error_code: 401 };
    cache[dcID] = this.dcConnect(dcID);
    cache[dcID].then(client => console.log(client));
    return cache[dcID];
  }
}

export class Pool {
  private cache: ClientCache;
  private mainDC: number = DEFAULT_DC_ID;
  public client: ITelegramClient = null;
  public get inited() {
    return !!this.client;
  }
  public dcConnect = () => this.runInit();
  private runInit() {
    if (this.inited) return Promise.resolve(this.client);
    const connectPromise = apiConnect();
    const onDone = (client: ITelegramClient) => {
      this.client = client;
      this.mainDC = getFromStore('currentDc') || this.mainDC;
      this.cache = new ClientCache(client, this.mainDC);
      return client;
    };
    return connectPromise.then(onDone);
  }
  public apiN = <R>(method: string, options?: Object) => (networker: ITelegramClient): Promise<R> => {
    if (!this.inited) throw new Error('Connection wasn\'t established');
    const opts = defaultTo(null, options);
    return networker
      .callApi<R>(method, opts)
      .then(
        r => isRpcError(r)
          ? Promise.reject(r)
          : rejectDashAndFuncs(r))
      .catch(err => {
        console.error('Got networker error', err, err.stack);
        console.debug('Errored args', opts);

        if (!isWaitFailed(err)) return Promise.reject(err);
        const now = mtproto.time.getLocalTime();
        if (stopTime) {
          if (now >= stopTime) return Promise.reject(err);
        } else
          stopTime = now + 10 * 1000;
        return new Promise((r, j) =>
          setTimeout(() =>
            this.apiN<R>(method, opts)(networker).then(r, j), 1000));
      });
  }
  public api = <R>(method: string, options?: any): Promise<R> => {
    const dcID = options.dcID || this.mainDC;
    return this.cache.getClient(dcID, options)
      .then(this.apiN<R>(method, options));
  }
}

let stopTime;

const isRpcError: (r: any) => boolean = r =>
  typeof r !== 'boolean' &&
  r.instanceOf('mtproto.type.Rpc_error');

const isWaitFailed = err => err.error_message === 'MSG_WAIT_FAILED';

const pool = new Pool();

export const api = pool.api;

export const getDataCenters = () => {
  const promises = Promise.all([
    {
      dc_options: {
        list: DC_OPTIONS,
      },
    },
    pool.apiN<IMtpHelpNearestDc>('help.getNearestDc')(pool.client),
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
};

export default pool;
