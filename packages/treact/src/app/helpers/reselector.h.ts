import {
  MtpChat,
  MtpDialog,
  MtpDocument,
  MtpFileLocation,
  MtpMessage,
  MtpUser,
  TMtpMessageMediaRecord,
} from 'redux/mtproto'
import { ObjectOverwrite } from 'typelevel-ts'
export type Payload<T> = {
  entities: {
    [K in keyof T]: {
      [key: number]: T[K];
    }
  };
  result: {
    [K in keyof T]: number[]
  };
}

export type TLAvatar = {
  photo_id?: string;
  photo_small: number;
  photo_big: number;
}

export type TLAttrImageSize = {
  w: number,
  h: number,
}
export type TLAttrFileName = { file_name: string }
export type TLAttrDocument = {
  type: 'document',
}
export type TLAttrSticker = {
  type: 'sticker',
  sticker: boolean,
  emoji: string,
  // tslint:disable-next-line
  stickerset: any,
  // tslint:disable-next-line
  stickerSetInput: any,
}
export type TLAttrGIF = {
  type: 'gif',
  animated: boolean,
}
export type TLAttrVoice = {
  type: 'voice',
  duration: number,
}
export type TLAttrAudio = {
  type: 'audio',
  duration: number,
  audioTitle?: string,
  audioPerformer?: string,
}
export type TLAttrRound = {
  type: 'round',
  duration: number,
  w: number,
  h: number,
}
export type TLAttrVideo = {
  type: 'video',
  duration: number,
  w: number,
  h: number,
}
export type TLDocumentRecord = {
  audio: TLAttrAudio,
  voice: TLAttrVoice,
  round: TLAttrRound,
  video: TLAttrVideo,
  sticker: TLAttrSticker & TLAttrImageSize,
  gif: TLAttrGIF & TLAttrImageSize,
  document: TLAttrDocument,
}
export type TLDocument<T = TLDocumentRecord> =
  T[keyof T] & MtpDocument & TLAttrFileName

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
}
export type TLMediaDocumentRecord = {
  [K in TLDocument['type']]:
    TMtpMessageMediaRecord['messageMediaDocument']
    & {
      type: K,
      document: TLDocumentRecord[K] & MtpDocument & TLAttrFileName,
    }
}
export type TLMediaRecord = ObjectOverwrite<
  TMtpMessageMediaRecord & {
    [K in keyof TLMediaTypes]: { type: TLMediaTypes[K] }
  },
  {
    messageMediaDocument: TLMediaDocumentRecord[TLDocument['type']],
  }
>
export type TLMedia<T = TLMediaRecord> = T[keyof T]

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
  photoCachedSizes: {},
}

export type SlicePayload = Payload<Slice>

export type SelectedPayload<T> = {
  entities: {
    [key: number]: T;
  }
  result: number[];
}

export type StoredPayload<T> = {
  byId: {
    [key: number]: T;
  }
  ids: number[];
}

export type SelectModel = <T, P>(modelName: string) =>
  (payload: Payload<P>) =>
    SelectedPayload<T>

export type ReducerCreator = <T, P>(modelName: string) =>
  (store: StoredPayload<T>, payload: Payload<P>) =>
    StoredPayload<T>
