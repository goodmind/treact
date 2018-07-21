import { createStore, createStoreObject } from 'effector'

export type StoreLoadings = {
  chatList: boolean;
}

export const chatList = createStore(false)

export const loadings = createStoreObject({
  chatList,
})

