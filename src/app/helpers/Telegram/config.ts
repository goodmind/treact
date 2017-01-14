import { trim } from 'ramda';
import { restoreAuthKey } from './helpers';

export const APP_ID = 49631;
export const APP_HASH = 'fb050b8f6771e15bfda5df2409931569';
export const SERVER = {
  host: trim(process.env.DC_SERVER) || '149.154.167.50',
  port: '443',
};

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
  authKey: restoreAuthKey(),
};
