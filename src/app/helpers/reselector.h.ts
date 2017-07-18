import { MtpChat, MtpDialog, MtpFileLocation, MtpMessage, MtpUser } from 'redux/mtproto';
export type Payload<T> = {
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
  chats: MtpChat,
  users: MtpUser,
  messages: MtpMessage,
  dialogs: MtpDialog,
  photos: TLPhoto,
  fileLocations: MtpFileLocation,
};

export type SlicePayload = Payload<Slice>;

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
  (payload: Payload<P>) =>
    SelectedPayload<T>;

export type ReducerCreator = <T, P>(modelName: string) =>
  (store: StoredPayload<T>, payload: Payload<P>) =>
    StoredPayload<T>;
