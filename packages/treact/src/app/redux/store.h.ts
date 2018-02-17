import * as Redux from 'redux'
// NOTE: This type coming from redux-thunk module, not from redux itself

import { Auth } from './modules/auth'
import { StoreAvatars } from './modules/avatars'
import { StoreChats } from './modules/chats'
import { StoreDialogs } from './modules/dialogs'
import { StoreDocuments } from './modules/documents'
import { StatusStore } from './modules/files'
import { StoreHistories } from './modules/histories'
import { StoreLoadings } from './modules/loadings'
import { StoreMedia } from './modules/media'
import { StoreMessages } from './modules/messages'
import { StorePeers } from './modules/peers'
import { StorePhotos } from './modules/photos'
import { StorePhotoCachedSizes } from './modules/photos/cachedSizes'
import { StorePhotoSizes } from './modules/photos/sizes'
import { StoreSelected } from './modules/selected'
import { StoreTheme } from './modules/theme'
import { StoreUsers } from './modules/users'

import { StoreList } from 'helpers/state'
import { MtpFileLocation, MtpUser } from 'redux/mtproto'
export interface Store {
  currentDc: number
  authKey: {}
  auth: Auth
  currentUser: MtpUser
  messages: StoreMessages
  histories: StoreHistories
  dialogs: StoreDialogs
  users: StoreUsers
  peers: StorePeers
  chats: StoreChats
  loadings: StoreLoadings
  selected: StoreSelected
  files: {
    status: StatusStore;
    locations: StoreList<MtpFileLocation>;
  }
  avatars: StoreAvatars
  theme: StoreTheme
  media: StoreMedia
  documents: StoreDocuments
  photos: StorePhotos
  photoSizes: StorePhotoSizes
  photoCachedSizes: StorePhotoCachedSizes
}

export type ThunkAction<R, S, E> = (dispatch: Redux.Dispatch<S>, getState: () => S, extraArgument?: E) => R

export type AsyncAction<R> = ThunkAction<R, Store, undefined>

export type Dispatch = Redux.Dispatch<Store>

export type Ids = number[]

export type Reducer<S, P> = (state: S, payload: P) => S

export type ReducerIds<P> = Reducer<Ids, P>
