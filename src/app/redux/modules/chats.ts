import { createReducer } from 'redux-act';
import { combineReducers } from 'redux';
import { includes } from 'lodash';

import { TById, IMtpMessage } from '../mtproto';
import { CHATS } from 'actions';

const { LOAD_SLICE, SELECT } = CHATS;

export interface IStoreMessage {
  user: number;
  date: number;
  text: string;
}

export interface IStoreChat {
  messages: TById<IStoreMessage>;
  ids: number[];
}

export interface IStoreChats {
  ids: number[];
  selected: number;
  byId: TById<IStoreChat>;
};

const selected = createReducer({
  [SELECT]: (_, payload: number) => payload,
}, NaN); // TODO Warn!! Redux strictly incompatible with NaN values!

const ids = createReducer({
  [LOAD_SLICE.INIT]: (state: number[], id) => includes(state, id)
    ? state
    : [...state, id],
}, []);

const newSlice = () => {
  const res: any = {
    ids: [],
    messages: {},
  };
  return res;
};

const onSliceInit = (state: TById<IStoreChat>, id: number) =>
  state[id]
    ? state
    : Object.assign({}, state, { [id]: newSlice() });

const addMessage = (state: IStoreChat, message: IMtpMessage) =>
  includes(state.ids, message.id)
    ? state
    : {
      ids: [...state.ids, message.id],
      messages: Object.assign({}, state.messages, {
        [message.id]: {
          user: message.from_id,
          date: message.date,
          text: message.message,
        },
      }),
    };
const addMessages = (state: IStoreChat, messages: IMtpMessage[]) =>
  messages.reduceRight(addMessage, state);
// NOTE reduceRight is used because of reversed new-to-old order in message window
// And best place to reverse order is here

type TMessageRecord = {
  id: number;
  messages: IMtpMessage[]
};

const onSliceDone = (state: TById<IStoreChat>, { id, messages }: TMessageRecord) =>
  Object.assign({}, state, { [id]: addMessages(state[id], messages) });

const byId = createReducer({
  [LOAD_SLICE.INIT]: onSliceInit,
  [LOAD_SLICE.DONE]: onSliceDone,
}, {});

const reducer = combineReducers({
  ids,
  selected,
  byId,
});

export default reducer;
