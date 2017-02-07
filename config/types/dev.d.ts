/**
 * Type declerations for global development variables
 */

declare module ''

/// <reference path="ramda.d.ts" />
/// <reference path="redux-act.d.ts" />

declare module 'telegram-mtproto' {
  namespace Ext {
    // External types

    interface IConnection {
      // HTTP | TCP
    }
    interface IChannel {
      // RpcChannel | RpcChannelEncrypted | RpcChannelUnencrypted
    }
    type IAuthKey = any;
    type IMTProto = any;
    type ITypeLanguage = any;
    type IPublicKey =  {
      fingerprint: string;
      modulus: string;
      exponent: string;
    } | {
      fingerprint: string;
      key: string;
      exponent: string;
    }
    interface IConfig {
      id: number;
      hash: string;
      version: string;
      langCode: string;
      deviceModel: string;
      systemVersion: string;
      authKey?: IAuthKey;
    }
    interface INetwork {
      http: any;
      tcp: any;
      wc: any;
    }
  }

  // Internal types
  type ITLTypes = { _id: string } & any;
  type ITLFuncs = { _id: string } & any;
  export interface ITelegramSchema {
    constructors: Array<Object>;
    methods: Array<Object>;
    type: ITLTypes;
    service: ITLFuncs;
  }

  export const Telegram: ITelegramStatic;
  export const mtproto: Ext.IMTProto;
  export const tl: Ext.ITypeLanguage;
  export const network: Ext.INetwork;

  export interface ITelegramStatic {
    new (schema: ITelegramSchema): ITelegram;
  }
  export class ITelegramClient {
    constructor (schema: ITelegramSchema, mtProto: Ext.IMTProto, typeLanguage: Ext.ITypeLanguage);
    schema: ITelegramSchema;
    channel: Ext.IChannel;
    authKey: Ext.IAuthKey;
    setConnection(conn: Ext.IConnection): void;
    // TODO: stricter types
    callApi<R>(method: string, args?: Object): Promise<R>;
    setup(config: Ext.IConfig): Promise<ITelegramClient>;
  }
  export interface ITelegram {
    addPublicKey(key: Ext.IPublicKey): void;
    createClient(): ITelegramClient;
    useSchema(schema: ITelegramSchema): void;
  }
}

declare module '@goodmind/*' {
  const s: any;
  export = s;
}

interface Window {
  // A hack for the Redux DevTools Chrome extension.
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <F extends Function>(...f: F[]) => F;
  __INITIAL_STATE__?: any;
  webkitURL?: any;
  BlobBuilder?: any;
  WebKitBlobBuilder?: any;
  MozBlobBuilder?: any;
  chrome?: any;
}
