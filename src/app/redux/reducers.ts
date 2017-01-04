import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { authReducer } from './modules/auth';
import { currentUserReducer } from './modules/currentUser';
import { authKeyReducer } from './modules/authKey';
import { chatListReducer } from './modules/chatList';
import { messagesReducer } from './modules/messages';
import { IStore } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<IStore> = combineReducers<IStore>({
  routing: routerReducer,
  authKey: authKeyReducer,
  chatList: chatListReducer,
  messages: messagesReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
