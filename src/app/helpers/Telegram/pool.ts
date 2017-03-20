import { serverConfig, appSettings } from './config';
import MTProto, { AsyncStorage } from 'telegram-mtproto';
import { /* pipe, */ map /*, apply, toPairs*/ } from 'ramda';
import * as localforage from 'localforage';

export const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
});

const LocalStorage: AsyncStorage = {
  get: storage.getItem, // (...keys) => Promise.all(map<string, Promise<any>>(storage.getItem.bind(storage), keys)),
  remove: (...keys) => Promise.all(map<string, Promise<any>>(storage.removeItem.bind(storage), keys)),
  set: storage.setItem, // pipe<any, any>(toPairs, map(apply(storage.setItem.bind(storage)))),
  clear: (): Promise<any> => storage.clear(),
};

const app = {
  debug: true,
  storage: LocalStorage,
};

const pool = MTProto({
  server: serverConfig,
  api: appSettings,
  app,
});

// TODO: use generic params and options
export const api = async <T>(method: string, params?: object, options?: object): Promise<T> =>
  pool<T>(method, params, options);
export default pool;
