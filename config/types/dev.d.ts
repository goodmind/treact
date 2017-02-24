/**
 * Type declerations for global development variables
 */

declare module ''

/// <reference path="ramda.d.ts" />
/// <reference path="redux-act.d.ts" />

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
