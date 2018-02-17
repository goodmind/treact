import * as localforage from 'localforage'
import BrowserStorage from 'mtproto-storage-browser'
import MTProto from 'telegram-mtproto'
import { appSettings, serverConfig } from './config'

export const storage = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
})

const app = {
  debug: true,
  storage: new BrowserStorage(storage),
}

const pool = MTProto({
  server: serverConfig,
  api: appSettings,
  app,
  schema: require('./api-tlschema-57.json'),
})

//const ATTEMPTS = 5
//const TIMEOUT = 40e3
//const timer = () => new Promise<symbol>(rs => setTimeout(rs, TIMEOUT, timeoutToken))
//const timeoutToken = Symbol('timeout')

// TODO: use generic params and options
export async function api<T>(method: string, params?: object, options?: object): Promise<T> {
  //let count = 0
  //do {
    //const result = await Promise.race([
      //timer(),
      return pool<T>(method, params, options)//,
    //])
    //if (typeof result !== 'symbol') return result
  //} while (count++ > ATTEMPTS)
  //throw new Error(`Api timeout. ${method}`)
}

if (process.env.NODE_ENV === 'development') {
  window.api = api
}

export default pool
