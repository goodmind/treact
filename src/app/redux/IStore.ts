import { IAuth } from 'models/auth';
import { ICurrentUser } from 'models/currentUser';
import { IChatList } from 'models/chatList';
import { ILoadingList } from 'models/loadingList';
import { IActiveChat } from 'models/activeChat';
import { IAuthKey } from '../models/authKey';

export interface IStore {
  authKey: IAuthKey;
  auth: IAuth;
  currentUser: ICurrentUser;
  chatList: IChatList;
  loadingList: ILoadingList;
  activeChat: IActiveChat;
};
