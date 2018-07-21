import { createStoreObject } from 'effector'
import { combineReducers } from 'redux'
import { authReducer } from './modules/auth'
import { authKeyReducer } from './modules/authKey'
import avatars from './modules/avatars'
import currentDc from './modules/currentDc'
import { currentUserReducer } from './modules/currentUser'
import media from './modules/media'
import peers from './modules/peers'
import photos from './modules/photos'
import histories from './modules/histories'
import photoCachedSizes from './modules/photos/cachedSizes'
import photoSizes from './modules/photos/sizes'
import selected from './modules/selected'
import users from './modules/users'
import { Store } from './store.h'

import chats from './modules/chats'
import './modules/chats/reducer'
import dialogs from './modules/dialogs'
import './modules/dialogs/reducer'
import documents from './modules/documents'
import './modules/documents/reducer'
import files from './modules/files'
import './modules/files/reducer'
import loadings from './modules/loadings'
import './modules/loadings/reducer'
import messages from './modules/messages'
import './modules/messages/reducer'
import settings from './modules/settings'
import theme from './modules/theme'
import './modules/theme/reducer'

const rootReducer = combineReducers<Store>({
  // routing: routerReducer,
  currentDc,
  authKey: authKeyReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  users,
  peers,
  selected,
  histories,
  avatars,

  media,
  photos,
  photoSizes,
  photoCachedSizes,
})

export const rootStore = createStoreObject({
  messages,
  dialogs,
  documents,
  chats,
  theme,
  loadings,
  settings,
  files,
})

export default rootReducer
