import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

export type StoreSettings = {
  autoMediaDownload: {
    sticker: boolean,
    photo: boolean,
    voice: boolean,
    round: boolean,
    gif: boolean,
    document: boolean,
    video: boolean,
  },
};

const autoMediaDownload = createReducer<StoreSettings['autoMediaDownload']>({}, {
  sticker: true,
  photo: true,
  voice: true,
  round: true,
  gif: true,
  document: false,
  video: false,
});

const reducer = combineReducers<StoreSettings>({
  autoMediaDownload,
});

export default reducer;
