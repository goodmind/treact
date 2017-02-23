// import { restoreAuthKeyFromLocalStorage } from './helpers';
import { APP_ID, APP_HASH, SERVER, DEFAULT_DC_ID } from './constants';

export const appSettings = {
  invokeWithLayer: 0xda9b0d0d,
  layer          : 57,
  initConnection : 0x69796de9,
  api_id         : APP_ID,
  app_version    : '1.0.1',
  lang_code      : 'en',
};

export const serverConfig = {};

export const config = {
  // NOTE: if you FORK the project you MUST use your APP ID.
  // Otherwise YOUR APPLICATION WILL BE BLOCKED BY TELEGRAM
  // You can obtain your own APP ID for your application here: https://my.telegram.org
  id: APP_ID,
  hash: APP_HASH,
  // authKey: restoreAuthKeyFromLocalStorage(),
};

export { SERVER, APP_ID, APP_HASH, DEFAULT_DC_ID }
