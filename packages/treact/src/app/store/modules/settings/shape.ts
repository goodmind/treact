import { createStore, createStoreObject, Store } from 'effector'

export type StoreSettings = {
  autoMediaDownload: {
    sticker: boolean,
    photo: boolean,
    voice: boolean,
    round: boolean,
    gif: boolean,
    document: boolean,
    video: boolean,
  },
}

export const autoMediaDownload = createStore<StoreSettings['autoMediaDownload']>({
  sticker: true,
  photo: true,
  voice: true,
  round: true,
  gif: true,
  document: false,
  video: false,
})

export const settings: Store<StoreSettings> = createStoreObject({
  autoMediaDownload,
})

