import { Dispatch } from 'redux';
// NOTE This type coming from redux-thunk module, not from redux itself

import { IAuth } from 'models/auth';
import { ICurrentUser } from 'models/currentUser';
import { IChatList } from 'models/chatList';
import { ILoadingList } from 'models/loadingList';
import { IActiveChat } from 'models/activeChat';
import { IAuthKey } from 'models/authKey';
import { IMessages } from '../models/messages';
import { IStoreChats } from './modules/chats';

export interface IStore {
  authKey: IAuthKey;
  auth: IAuth;
  currentUser: ICurrentUser;
  messages: IMessages;
  chatList: IChatList;
  loadingList: ILoadingList;
  activeChat: IActiveChat;
  chats: IStoreChats;
};

export type IThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState?: () => S, extraArgument?: E) => R;

export type IAsyncAction<R> = IThunkAction<R, IStore, undefined>;

export type IDispatch = Dispatch<IStore>;
