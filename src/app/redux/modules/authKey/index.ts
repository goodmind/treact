import { AUTH } from 'actions';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

const ids = createReducer<number[]>({
  [AUTH.LOG_OUT.DONE]: () => ([]),
  [AUTH.SIGN_IN.DONE]: (s, { dcID }) => s.concat([dcID]),
}, []);

const byId = createReducer<{ [key: number]: string }>({
  [AUTH.LOG_OUT.DONE]: () => ({}),
  [AUTH.SIGN_IN.DONE]: (s, { dcID, authKey }) => ({...s,  [dcID]: authKey}),
}, {});

export const authKeyReducer = combineReducers({
  ids,
  byId,
});
