/**
 * Type declerations for global development variables
 */

declare module '' {}

/// <reference path="ramda.d.ts" />
/// <reference path="redux-act.d.ts" />
/// <reference path="redux-connect.d.ts" />
/// <reference path="react-autosize-textarea.d.ts" />
/// <reference path="normalizr.d.ts" />
/// <reference path="universal-router.d.ts" />

// TODO: move to reduce wrapper
interface Array<T> {
  reduce<U, V>(callbackfn: (previousValue: U | V, currentValue: T, currentIndex: number, array: T[]) => U | V, initialValue: V): U;
}

declare module '*.png' {
  const image: any;
  export = image;
}

declare module '*.css' {
  const classes: { [className: string]: string };
  export = classes;
}

declare module '@goodmind/*' {
  const module: any;
  export = module;
}

declare module 'telegram-mtproto/lib/plugins/math-help' {
  export function getRandomId(): [number, number];
}

declare module 'telegram-mtproto/lib/bin' {
  export function bufferConcat(b1: ArrayBuffer | Uint8Array | string, b2: ArrayBuffer | Uint8Array | string): ArrayBuffer;
  export function sha256HashSync(b: ArrayBuffer): string;
  export function bigint(i: number): any;
  export function nextRandomInt(i: number): number;
}

declare module 'telegram-mtproto/lib/service/time-manager' {
  export function tsNow(bool: boolean): number;
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
  api?: any;
}
