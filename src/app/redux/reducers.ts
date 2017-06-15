import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { IStore } from './IStore';
import { authReducer } from './modules/auth';
import { authKeyReducer } from './modules/authKey';
import chats from './modules/chats';
import { currentDcReducer } from './modules/currentDc';
import { currentUserReducer } from './modules/currentUser';
import dialogs from './modules/dialogs';
import files from './modules/files';
import histories from './modules/histories';
import loadings from './modules/loadings';
import messages from './modules/messages';
import peers from './modules/peers';
import photos from './modules/photos';
import selected from './modules/selected';
import users from './modules/users';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  authKey: authKeyReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  currentDc: currentDcReducer,
  reduxAsyncConnect: reducer,
  histories,
  users,
  chats,
  dialogs,
  peers,
  loadings,
  selected,
  messages,
  files,
  photos,
});

export default rootReducer;
