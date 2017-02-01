import { restoreAuthKeyFromLocalStorage } from './helpers';
import { APP_ID, APP_HASH, SERVER, DEFAULT_DC_ID } from './constants';

export const config = {
  // NOTE: if you FORK the project you MUST use your APP ID.
  // Otherwise YOUR APPLICATION WILL BE BLOCKED BY TELEGRAM
  // You can obtain your own APP ID for your application here: https://my.telegram.org
  id: APP_ID,
  hash: APP_HASH,
  version: '1.0.1',
  langCode: 'en',
  deviceModel: '',
  systemVersion: '',
  authKey: restoreAuthKeyFromLocalStorage(),
};

export { SERVER, APP_ID, APP_HASH, DEFAULT_DC_ID }
