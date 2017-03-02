import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { getListOf, newIdsFromList, reduceSequence, changeReducer, IStoreList } from 'helpers/state';

import { CHATS } from 'actions';
import { props, map, pipe } from 'ramda';
import { IIds } from 'redux/IStore';
import { IMtpGetDialogs, TById, IMtpPeer } from 'redux/mtproto';
const { GET_DIALOGS } = CHATS;

// TODO: reintegrate into selectTypeNames func
// respresent chatForbidden as chat
export type TPeersType = 'user'|'channel'|'chat'|'chatForbidden';
export type IStorePeers = IStoreList<TPeersType>;

const fieldsGetters = {
  users: getListOf('users'),
  chats: getListOf('chats'),
};

const refreshUsersIds = newIdsFromList(fieldsGetters.users);
const refreshChatsIds = newIdsFromList(fieldsGetters.chats);

const idsGetDialogs = reduceSequence<IIds, IMtpGetDialogs>(refreshUsersIds, refreshChatsIds);

const ids = createReducer({
  [GET_DIALOGS.DONE]: idsGetDialogs,
}, []);


const selectTypeNames = map<IMtpPeer, [number, string]>(pipe<IMtpPeer, any, [number, string]>(
  props(['id', '_']),
  ([id, typeName]) => [id, typeName],
));

const peerReducer = changeReducer(selectTypeNames);

const chatsReducer = peerReducer<TPeersType, IMtpGetDialogs>(fieldsGetters.chats);
const usersReducer = peerReducer<TPeersType, IMtpGetDialogs>(fieldsGetters.users);

const byIdGetDialogs = reduceSequence<TById<TPeersType>, IMtpGetDialogs>(chatsReducer, usersReducer);

const byId = createReducer({
  [GET_DIALOGS.DONE]: byIdGetDialogs,
}, {});

const reducer = combineReducers({
  ids,
  byId,
});

export default reducer;
