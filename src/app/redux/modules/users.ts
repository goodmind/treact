import { map, property, contains, conforms, pipe, reject } from 'lodash/fp';
import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';

import { CHATS } from 'actions';
import { IMtpUser } from '../mtproto';

const { LOAD_SLICE } = CHATS;

const selectIds = map(property('id'));
const onlyNew = ids => reject( conforms( { id: contains(ids) } ) );
const getNewIds = (ids, users) => pipe(onlyNew(ids), selectIds)(users);

const addNewIds = (ids: number[], users: IMtpUser[]) => {
  const newList: number[] = getNewIds(ids, users);
  return newList.length > 0
    ? [ ...ids, ...newList ]
    : ids;
};

const ids = createReducer({
  [LOAD_SLICE.DONE]: (state: number[], { users }: { users: IMtpUser[] }) =>
    addNewIds(state, users),
}, []);

// const byId =

const reducer = combineReducers({
  ids,
  // byId,
});

export default reducer;
