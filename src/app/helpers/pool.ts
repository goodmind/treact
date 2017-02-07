import { defaultTo } from 'ramda'

import apiConnect from './Telegram/connection'
import { ITelegramClient, mtproto } from 'telegram-mtproto'
import { rejectDashAndFuncs } from 'helpers/treeProcess'

export class Pool {
  public client: ITelegramClient = null
  public get inited() {
    return !!this.client
  }
  public dcConnect = () => this.runInit()
  private runInit() {
    if (this.inited) return Promise.resolve(this.client)
    const connectPromise = apiConnect()
    const onDone = (client: ITelegramClient) => this.client = client
    return connectPromise.then(onDone)
  }
  public api = <R>(method: string, options?: Object) => {
    if (!this.inited) throw new Error('Connection wasn\'t established')
    const opts = defaultTo(null, options)
    return this.client
      .callApi<R>(method, opts)
      .then(
        (r: any) => isRpcError(r)
          ? Promise.reject(r)
          : rejectDashAndFuncs(r))
      .catch(err => {
        console.error('Got networker error', err, err.stack)
        console.debug('Errored args', opts)

        if (!isWaitFailed(err)) return Promise.reject(err)
        const now = mtproto.time.getLocalTime()
        if (stopTime) {
          if (now >= stopTime) return Promise.reject(err)
        } else
          stopTime = now + 10 * 1000
        return new Promise((r, j) =>
          setTimeout(() =>
            this.api<R>(method, opts).then(r, j), 1000))
      })
  }
}

let stopTime

const isRpcError: (r: any) => boolean = r =>
  typeof r !== 'boolean' &&
  r.instanceOf('mtproto.type.Rpc_error')

const isWaitFailed = err => err.error_message === 'MSG_WAIT_FAILED'

const pool = new Pool()

export const api = pool.api

export default pool
