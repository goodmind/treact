import * as Redux from 'redux';
// NOTE: This type coming from redux-thunk module, not from redux itself

import { Auth } from './modules/auth';
import { StoreChats } from './modules/chats';
import { StoreDialogs } from './modules/dialogs';
import { StatusStore } from './modules/files';
import { StoreHistories } from './modules/histories';
import { StoreLoadings } from './modules/loadings';
import { StoreMessages } from './modules/messages';
import { StorePeers } from './modules/peers';
import { StorePhotos } from './modules/photos';
import { StoreSelected } from './modules/selected';
import { StoreUsers } from './modules/users';

import { StoreList } from 'helpers/state';
import { MtpFileLocation, MtpUser } from 'redux/mtproto';
export interface Store {
  currentDc: number;
  authKey: {};
  auth: Auth;
  currentUser: MtpUser;
  messages: StoreMessages;
  histories: StoreHistories;
  dialogs: StoreDialogs;
  users: StoreUsers;
  peers: StorePeers;
  chats: StoreChats;
  loadings: StoreLoadings;
  selected: StoreSelected;
  files: {
    status: StatusStore;
    locations: StoreList<MtpFileLocation>;
  };
  photos: StorePhotos;
}

export type ThunkAction<R, S, E> = (dispatch: Redux.Dispatch<S>, getState: () => S, extraArgument?: E) => R;

export type AsyncAction<R> = ThunkAction<R, Store, undefined>;

export type Dispatch = Redux.Dispatch<Store>;

export type Ids = number[];

export type Reducer<S, P> = (state: S, payload: P) => S;

export type ReducerIds<P> = Reducer<Ids, P>;
