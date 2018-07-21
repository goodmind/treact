import { createStore, createStoreObject } from 'effector'

import { modelDefaults } from 'helpers/reselector'
import { StoreList } from 'helpers/state'

import { MtpFileLocation } from 'store/mtproto'

export type Status = 'idle' | 'queue' | 'download' | 'cached'
export type StoreStatus = { [key: number]: Status }

export type StoreFiles = {
  status: StoreStatus,
  locations: StoreList<MtpFileLocation>,
}

export const status = createStore<StoreStatus>({})

export const locations = createStore<StoreList<MtpFileLocation>>(modelDefaults)

export const files = createStoreObject({
  locations,
  status,
})
