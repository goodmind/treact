import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './modules/auth';
import { currentUserReducer } from './modules/currentUser';
import { currentDcReducer } from './modules/currentDc';
import { authKeyReducer } from './modules/authKey';
import histories from './modules/histories';
import users from './modules/users';
import dialogs from './modules/dialogs';
import peers from './modules/peers';
import chats from './modules/chats';
import loadings from './modules/loadings';
import selected from './modules/selected';
import photoCache from './modules/photoCache';
import { IStore } from './IStore';

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
  photoCache,
});

export default rootReducer;
