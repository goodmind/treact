import { Dispatch } from 'redux';
// NOTE: This type coming from redux-thunk module, not from redux itself

import { IAuth } from './modules/auth';
import { IStoreChats } from './modules/chats';
import { IStoreDialogs } from './modules/dialogs';
import { StatusStore } from './modules/files';
import { IStoreHistories } from './modules/histories';
import { IStoreLoadings } from './modules/loadings';
import { IStoreMessages } from './modules/messages';
import { IStorePeers } from './modules/peers';
import { IStorePhotos } from './modules/photos';
import { IStoreSelected } from './modules/selected';
import { IStoreUsers } from './modules/users';

import { IStoreList } from 'helpers/state';
import { IMtpFileLocation, IMtpUser } from 'redux/mtproto';
export interface IStore {
  currentDc: number;
  authKey: {};
  auth: IAuth;
  currentUser: IMtpUser;
  messages: IStoreMessages;
  histories: IStoreHistories;
  dialogs: IStoreDialogs;
  users: IStoreUsers;
  peers: IStorePeers;
  chats: IStoreChats;
  loadings: IStoreLoadings;
  selected: IStoreSelected;
  files: {
    status: StatusStore;
    locations: IStoreList<IMtpFileLocation>;
  };
  photos: IStorePhotos;
}

export type IThunkAction<R, S, E> = (dispatch: Dispatch<S>, getState: () => S, extraArgument?: E) => R;

export type IAsyncAction<R> = IThunkAction<R, IStore, undefined>;

export type IDispatch = Dispatch<IStore>;

export type IIds = number[];

export type IReducer<S, P> = (state: S, payload: P) => S;

export type IReducerIds<P> = IReducer<IIds, P>;
