import { combineReducers } from 'redux';
import { authReducer } from './modules/auth';
import { authKeyReducer } from './modules/authKey';
import chats from './modules/chats';
import { currentDcReducer } from './modules/currentDc';
import { currentUserReducer } from './modules/currentUser';
import dialogs from './modules/dialogs';
import documents from './modules/documents/index';
import files from './modules/files';
import histories from './modules/histories';
import loadings from './modules/loadings';
import messages from './modules/messages';
import peers from './modules/peers';
import photos from './modules/photos';
import selected from './modules/selected';
import theme from './modules/theme';
import users from './modules/users';
import { Store } from './store.h';

const rootReducer = combineReducers<Store>({
  // routing: routerReducer,
  authKey: authKeyReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  currentDc: currentDcReducer,
  histories,
  users,
  chats,
  dialogs,
  peers,
  loadings,
  selected,
  messages,
  documents,
  files,
  photos,
  theme,
});

export default rootReducer;
