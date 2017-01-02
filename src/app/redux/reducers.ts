import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './modules/auth';
import { currentUserReducer } from './modules/currentUser';
import { authKeyReducer } from './modules/authKey';
import { IStore } from './IStore';
import { chatListReducer } from './modules/chatList';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  authKey: authKeyReducer,
  chatList: chatListReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
