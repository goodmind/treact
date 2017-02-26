import { serverConfig, appSettings } from './config';
import { ApiManager, AsyncStorage } from 'telegram-mtproto';
import { pipe, map, apply, toPairs, mapObjIndexed } from 'ramda';
import * as localforage from 'localforage';

export const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
});

const LocalStorage: AsyncStorage = {
  get: (...keys) => Promise.all(map<string, Promise<any>>(storage.getItem.bind(storage), keys)),
  remove: (...keys) => Promise.all(map<string, Promise<any>>(storage.removeItem.bind(storage), keys)),
  set: pipe<any, any>(toPairs, map(apply(storage.setItem.bind(storage)))),
  clear: (): Promise<any> => storage.clear(),
};

const app = {
  debug: true,
  storage: LocalStorage,
};

const pool = new ApiManager({
  server: serverConfig,
  api: appSettings,
  app,
});

// TODO: remove this hack
const wrapVectors = value => Array.isArray(value)
  ? { list: value }
  : value;
export const api = async <T>(method: string, params?: Object, options?: Object): Promise<T> =>
  mapObjIndexed(wrapVectors, await pool.mtpInvokeApi<T>(method, params, options));
export default pool;
