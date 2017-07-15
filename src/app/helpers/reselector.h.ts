import { IMtpFileLocation, IMtpChat, IMtpUser, IMtpMessage, IMtpDialog } from 'redux/mtproto';
export interface IPayload<T> {
  entities: {
    [K in keyof T]: {
      [key: number]: T[K];
    }
  };
  result: {
    [K in keyof T]: number[]
  };
};

export type TLPhoto = {
  photo_id?: string;
  photo_small: number;
  photo_big: number;
};

export type Slice = {
  histories: number,
  chats: IMtpChat,
  users: IMtpUser,
  messages: IMtpMessage,
  dialogs: IMtpDialog,
  photos: TLPhoto,
  fileLocations: IMtpFileLocation,
};

export type SlicePayload = IPayload<Slice>;

export type SelectedPayload<T> = {
  entities: {
    [key: number]: T;
  }
  result: number[];
};

export type StoredPayload<T> = {
  byId: {
    [key: number]: T;
  }
  ids: number[];
};

export type SelectModel = <T, P>(modelName: string) =>
  (payload: IPayload<P>) =>
    SelectedPayload<T>;

export type ReducerCreator = <T, P>(modelName: string) =>
  (store: StoredPayload<T>, payload: IPayload<P>) =>
    StoredPayload<T>;
