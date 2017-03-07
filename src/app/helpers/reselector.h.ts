import { IMtpFileLocation } from 'redux/mtproto';
export interface IPayload <T>{
  entities: {
    [K in keyof T]: {
      [key: number]: T[K];
    };
  };
  result: {
    [K in keyof T]: number[];
  };
};

export type TLPhoto = {
  photo_id?: string;
  photo_small: number;
  photo_big: number;
};

export type SlicePayload = IPayload<{
  chats: {},
  users: {},
  messages: {},
  dialogs: {},
  photos: TLPhoto,
  fileLocations: IMtpFileLocation,
}>;

type SelectedPayload = {
  entities: {
    [key: number]: any,
  },
  result: number[],
};

type StoredPayload = {
  byId: {
    [key: number]: any,
  },
  ids: number[],
};

export type SelectModel = (modelName: string) =>
  (payload: IPayload<any>) =>
    SelectedPayload;

export type ReducerCreator = (modelName: string) =>
  (store: StoredPayload, payload: IPayload<any>) =>
    StoredPayload;
