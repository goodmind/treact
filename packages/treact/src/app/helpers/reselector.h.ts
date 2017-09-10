import {
  MtpChat,
  MtpDialog,
  MtpDocument,
  MtpFileLocation,
  MtpMessage,
  MtpUser,
  TMtpMessageMediaRecord,
} from 'redux/mtproto';
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

export type TLAvatar = {
  photo_id?: string;
  photo_small: number;
  photo_big: number;
};

export type TLDocument = ({
  type: 'voice' | 'audio',
  duration: number,
  audioTitle?: string,
  audioPerformer?: string,
} | {
  type: 'round' | 'video',
  duration: number,
  w: number,
  h: number,
} | {
  type: 'sticker',
  sticker: boolean,
  emoji: string,
  // tslint:disable-next-line
  stickerset: any,
  // tslint:disable-next-line
  stickerSetInput: any,
} | {
  type: 'gif',
  animated: boolean,
} | {
  type: 'document',
  file_name: string,
}) & MtpDocument & {
  file_name: string,
};

export type TLMediaTypes = {
  messageMediaEmpty: 'empty',
  messageMediaGeo: 'geo';
  messageMediaContact: 'contact';
  messageMediaUnsupported: 'unsupported';
  messageMediaVenue: 'venue';
  messageMediaPhoto: 'photo';
  messageMediaDocument: TLDocument['type'];
  messageMediaWebPage: 'webpage';
  messageMediaGame: 'game';
  messageMediaInvoice: 'invoice';
};
export type TLMediaRecord =
  TMtpMessageMediaRecord
  & {
    [K in keyof TLMediaTypes]: { type: TLMediaTypes[K] }
  };
export type TLMedia<T = TLMediaRecord> = T[keyof T];

export type Slice = {
  histories: number,
  chats: MtpChat,
  users: MtpUser,
  messages: MtpMessage,
  dialogs: MtpDialog,
  avatars: TLAvatar,
  fileLocations: MtpFileLocation,

  media: TLMedia,
  documents: TLDocument,
  // TODO: add types
  photos: {},
  photoSizes: {},
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
