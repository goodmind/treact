type TMtpVectorSubType = 'User'|'Message'|'Chat'|'Dialog';

type TMtpVector = 'Vector';
type TMtpMessagesSlice = 'messages.MessagesSlice';
type TMtpDialogsSlice = 'messages.DialogsSlice';
type TMtpMessage = 'Message';
type TMtpUser = 'User';
type TMtpChat = 'Chat';
type TMtpChannel = 'Channel';
type TMtpDialog = 'Dialog';
type TMtpPhoto = 'UserProfilePhoto';
type TMtpFileLocation = 'FileLocation';
type TMtpDcOption = 'DcOption';
export type TMtpType = TMtpVector|TMtpMessagesSlice|TMtpMessage|TMtpUser|
  TMtpChat|TMtpChannel|TMtpDialog|TMtpDcOption|TMtpPhoto|TMtpFileLocation|
  TMtpDialogsSlice|TMtpGetDialogs;

type TMtpNearestDc = 'NearestDc';
type TMtpConfig = 'Config';
type TMtpGetDialogs = 'messages.Dialogs';
type TMtpHelpType = TMtpConfig|TMtpNearestDc;

type TMtpPeerUser = 'PeerUser';
type TMtpPeerChat = 'PeerChat';
type TMtpPeerChannel = 'PeerChannel';
type TMtpInputPeerUser = 'inputPeerUser';
type TMtpInputPeerChat = 'inputPeerChat';
type TMtpInputPeerChannel = 'inputPeerChannel';
type TMtpPeerType = TMtpPeerUser|TMtpInputPeerUser|TMtpPeerChat|TMtpInputPeerChat|
  TMtpPeerChannel|TMtpInputPeerChannel;

type TMtpFile = 'upload.File';
type TMtpUploadType = TMtpFile;

type TMtpFileUnknown = 'storage.FileUnknown';
type TMtpFileJpeg = 'storage.FileJpeg';
type TMtpFileGif = 'storage.FileGif';
type TMtpFilePng = 'storage.FilePng';
type TMtpFilePdf = 'storage.FilePdf';
type TMtpFileMp3 = 'storage.FileMp3';
type TMtpFileMov = 'storage.FileMov';
type TMtpFilePartial = 'storage.FilePartial';
type TMtpFileMp4 = 'storage.FileMp4';
type TMtpFileWebp = 'storage.FileWebp';
type TMtpStorageType =
  | TMtpFileUnknown
  | TMtpFileJpeg
  | TMtpFileGif
  | TMtpFilePng
  | TMtpFilePdf
  | TMtpFileMp3
  | TMtpFileMov
  | TMtpFilePartial
  | TMtpFileMp4
  | TMtpFileWebp;

interface IMtpPrimitive<T> {
  _: T;
}

type Bytes = Uint8Array;

export interface IMtpHelpObject<T extends TMtpHelpType> extends IMtpPrimitive<T> { }
export interface IMtpPeerObject<T extends TMtpPeerType> extends IMtpPrimitive<T> { }
export interface IMtpUploadObject<T extends TMtpUploadType> extends IMtpPrimitive<T> { }
export interface IMtpStorageObject<T extends TMtpStorageType> extends IMtpPrimitive<T> { }

export interface IMtpObject<T extends TMtpType> extends IMtpPrimitive<T> {
  id: number;
  flags: number; // NOTE I'm not shure thats any object has it
}

export interface IMtpVector<T extends IMtpObject<TMtpType>> extends IMtpObject<TMtpVector> {
  type: TMtpVectorSubType;
  list: T[];
  _byId: TById<T>;
}

// STANDART OBJECTS

export interface IMtpDcOption extends IMtpObject<TMtpDcOption> {
  ipv6?: true;
  tcpo_only?: true;
  ip_address: string;
  port: number;
}

type IMtpMessageEntity = any;

export interface IMtpMessage extends IMtpObject<TMtpMessage> {
  from_id: number;
  date: number; // Unix time
  message: string;
  to_id: IMtpPeerUser;
  mentioned?: true;
  via_bot_id?: number;
  entities?: IMtpVector<IMtpMessageEntity>; // Vector of message markdown if any
  unread?: true;
  peerID?: true;
}

export interface IMtpDialog extends IMtpObject<TMtpDialog> {
  read_inbox_max_id: number;
  read_outbox_max_id: number;
  top_message: number;
  unread_count: number;
}

export interface IMtpFileLocation extends IMtpObject<TMtpFileLocation> {
  dc_id: number;
  volume_id: string;
  local_id: number;
  secret: string;
}

export interface IMtpPhoto extends IMtpObject<TMtpPhoto> {
  photo_id: string;
  photo_small: IMtpFileLocation;
  photo_big: IMtpFileLocation;
}

export interface IMtpUser extends IMtpObject<TMtpUser> {
  access_hash: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  username?: string;
  contact: boolean;
  verifed: boolean;
  bot?: true;
}

export interface IMtpChat extends IMtpObject<TMtpChat> {
  title: string;
}

export interface IMtpMessagesSlice extends IMtpObject<TMtpMessagesSlice> {
  chats: IMtpVector<IMtpChat>;
  messages: IMtpVector<IMtpMessage>;
  users: IMtpVector<IMtpUser>;
  count: number;
}

export interface IMtpGetDialogs extends IMtpObject<TMtpGetDialogs> {
  chats: IMtpVector<IMtpChat>;
  messages: IMtpVector<IMtpMessage>;
  users: IMtpVector<IMtpUser>;
  dialogs: IMtpVector<IMtpDialog>;
  count: number;
};

export type IMtpObjectGeneric = IMtpDcOption|IMtpMessage|IMtpDialog|
  IMtpFileLocation|IMtpPhoto|IMtpUser|IMtpChat|IMtpMessagesSlice|IMtpGetDialogs;
// PEER OBJECTS

export type IMtpPeer = IMtpPeerUser|IMtpPeerChat|IMtpPeerChannel;

export interface IMtpPeerUser extends IMtpPeerObject<TMtpPeerUser|TMtpInputPeerUser> {
  user_id: number;
}

export interface IMtpPeerChat extends IMtpPeerObject<TMtpPeerChat|TMtpInputPeerChat> {
  chat_id: number;
}

export interface IMtpPeerChannel extends IMtpPeerObject<TMtpPeerChannel|TMtpInputPeerChannel> {
  channel_id: number;
}

// HELP OBJECTS

export interface IMtpHelpNearestDc extends IMtpHelpObject<TMtpNearestDc> {
  country: string;
  nearest_dc: number;
  this_dc: number;
}

export interface IMtpHelpGetConfig extends IMtpHelpObject<TMtpNearestDc> {
  chat_big_size: number;
  chat_size_max: number;
  date: number;
  dc_options: IMtpVector<IMtpDcOption>;
  edit_time_limit: number;
  expires: number;
  flags: number;
  forwarded_count_max: number;
  megagroup_size_max: number;
  notify_cloud_delay_ms: number;
  notify_default_delay_ms: number;
  offline_blur_timeout_ms: number;
  offline_idle_timeout_ms: number;
  online_cloud_timeout_ms: number;
  online_update_period_ms: number;
  push_chat_limit: number;
  push_chat_period_ms: number;
  rating_e_decay: number;
  saved_gifs_limit: number;
  stickers_recent_limit: number;
  test_mode: boolean;
  this_dc: number;
}

// UPLOAD OBJECTS

export interface IMtpUploadFile extends IMtpUploadObject<TMtpFile> {
  type: IMtpStorageObject<TMtpStorageType>;
  mtime: number;
  bytes: Bytes;
}

export type TById<T> = {[id: number]: T};
