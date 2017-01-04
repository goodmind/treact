import { IAuth } from 'models/auth';
import { ICurrentUser } from 'models/currentUser';
import { IChatList } from 'models/chatList';
import { ILoadingList } from 'models/loadingList';
import { IActiveChat } from 'models/activeChat';
import { IAuthKey } from 'models/authKey';
import { IMessages } from '../models/messages';

export interface IStore {
  authKey: IAuthKey;
  auth: IAuth;
  currentUser: ICurrentUser;
  messages: IMessages;
  chatList: IChatList;
  loadingList: ILoadingList;
  activeChat: IActiveChat;
};
