import * as localforage from 'localforage';
import BrowserStorage from 'mtproto-storage-browser';
import MTProto from 'telegram-mtproto';
import { appSettings, serverConfig } from './config';

export const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
});

const app = {
  debug: true,
  storage: new BrowserStorage(storage),
};

const pool = MTProto({
  server: serverConfig,
  api: appSettings,
  app,
});

// TODO: use generic params and options
export const api = <T>(method: string, params?: object, options?: object): Promise<T> =>
  pool<T>(method, params, options);

if (process.env.NODE_ENV === 'development') {
  window.api = api;
}

export default pool;
