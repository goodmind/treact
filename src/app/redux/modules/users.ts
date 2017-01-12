import { __, contains, pluck, where, pipe, reject,
  unless, isEmpty, concat, prop, merge } from 'ramda';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { CHATS } from 'actions';

import { getReduce, getListOf,
  appendNew, changePayload, listToIdMap } from 'helpers/state';
import { rejectDashAndFuncs } from 'helpers/treeProcess';
import { IMtpUser } from '../mtproto';

const { LOAD_SLICE, GET_DIALOGS } = CHATS;

const getUsers = getListOf('users');

const getId = prop('id');

const addNewId = changePayload(getId, appendNew);

const onDialogsDone = getReduce(getUsers, addNewId);

const onlyNew = ids => reject(  where( { id: contains(__, ids) } ) );
const getNewIds = (ids, users): number[] => pipe(onlyNew(ids), pluck('id'))(users);

type IPayload = { users: { list: IMtpUser[] } };

const addNewIds = (ids: number[], { users: { list } }: IPayload): number[] => {
  const newList = getNewIds(ids, list);
  return unless(isEmpty, concat( ids ))(newList);
};

const ids = createReducer({
  [LOAD_SLICE.DONE]: addNewIds,
  [GET_DIALOGS.DONE]: onDialogsDone,
}, []);

const byId = createReducer({
  [GET_DIALOGS.DONE]: (state, { users }) => {
    const pure = rejectDashAndFuncs(users);
    return merge(state, listToIdMap(pure.list));
  },
}, {});

const reducer = combineReducers({
  ids,
  byId,
});

export default reducer;
