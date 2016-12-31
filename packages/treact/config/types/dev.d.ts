/**
 * Type declerations for global development variables
 */

declare module 'telegram-js' {
  export const Telegram: ITelegramStatic
  export interface ITelegramStatic {
    new (mt: any, tl: any): ITelegram;
  }
  export interface ITelegramClient {
    setConnection(conn: any): void;
    callApi(method: string, args: any[]): void;
    callApi(...args: any[]): void;
    setup(config: any): Promise<ITelegramClient>;
  }
  export interface ITelegram {
    addPublicKey(key: any): void;
    createClient(): ITelegramClient;
    useSchema(schema: any): void;
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
}

interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}
