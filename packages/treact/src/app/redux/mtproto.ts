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

interface MtpPrimitive<T> {
  _: T;
}

type Bytes = Uint8Array;

export interface MtpHelpObject<T extends TMtpHelpType> extends MtpPrimitive<T> { }
export interface MtpPeerObject<T extends TMtpPeerType> extends MtpPrimitive<T> { }
export interface MtpUploadObject<T extends TMtpUploadType> extends MtpPrimitive<T> { }
export interface MtpStorageObject<T extends TMtpStorageType> extends MtpPrimitive<T> { }

export interface MtpObject<T extends TMtpType> extends MtpPrimitive<T> {
  id: number;
  flags: number; // NOTE: I'm not shure thats any object has it
}

export interface MtpVector<T extends MtpObject<TMtpType>> extends MtpObject<TMtpVector> {
  type: TMtpVectorSubType;
  list: T[];
  _byId: TById<T>;
}

// STANDART OBJECTS

export interface MtpDcOption extends MtpObject<TMtpDcOption> {
  ipv6?: true;
  tcpo_only?: true;
  ip_address: string;
  port: number;
}

// TODO: generate from TL
// tslint:disable-next-line
type MtpMessageEntity = any;

export interface MtpMessage extends MtpObject<TMtpMessage> {
  from_id: number;
  date: number; // Unix time
  message: string;
  to_id: MtpPeer;
  mentioned?: true;
  via_bot_id?: number;
  entities?: MtpVector<MtpMessageEntity>; // Vector of message markdown if any
  unread?: true;
  peerID?: true;
  out?: true;
}

export interface MtpDialog extends MtpObject<TMtpDialog> {
  read_inbox_max_id: number;
  read_outbox_max_id: number;
  top_message: number;
  unread_count: number;
}

export interface MtpFileLocation extends MtpObject<TMtpFileLocation> {
  dc_id: number;
  volume_id: string;
  local_id: number;
  secret: string;
}

export interface MtpPhoto extends MtpObject<TMtpPhoto> {
  photo_id: string;
  photo_small: MtpFileLocation;
  photo_big: MtpFileLocation;
}

export interface MtpUser extends MtpObject<TMtpUser> {
  access_hash: string;
  first_name?: string;
  last_name?: string;
  phone: string;
  username?: string;
  contact: boolean;
  verifed: boolean;
  bot?: true;
}

export interface MtpChat extends MtpObject<TMtpChat> {
  title: string;
  access_hash: string;
}

export interface MtpMessagesSlice extends MtpObject<TMtpMessagesSlice> {
  chats: MtpVector<MtpChat>;
  messages: MtpVector<MtpMessage>;
  users: MtpVector<MtpUser>;
  count: number;
}

export interface MtpGetDialogs extends MtpObject<TMtpGetDialogs> {
  chats: MtpVector<MtpChat>;
  messages: MtpVector<MtpMessage>;
  users: MtpVector<MtpUser>;
  dialogs: MtpVector<MtpDialog>;
  count: number;
}

export type MtpObjectGeneric = MtpDcOption|MtpMessage|MtpDialog|
  MtpFileLocation|MtpPhoto|MtpUser|MtpChat|MtpMessagesSlice|MtpGetDialogs;
// PEER OBJECTS

export type MtpPeer = MtpPeerUser|MtpPeerChat|MtpPeerChannel;

export interface MtpPeerUser extends MtpPeerObject<TMtpPeerUser|TMtpInputPeerUser> {
  user_id: number;
}

export interface MtpPeerChat extends MtpPeerObject<TMtpPeerChat|TMtpInputPeerChat> {
  chat_id: number;
}

export interface MtpPeerChannel extends MtpPeerObject<TMtpPeerChannel|TMtpInputPeerChannel> {
  channel_id: number;
}

// HELP OBJECTS

export interface MtpHelpNearestDc extends MtpHelpObject<TMtpNearestDc> {
  country: string;
  nearest_dc: number;
  this_dc: number;
}

export interface MtpHelpGetConfig extends MtpHelpObject<TMtpNearestDc> {
  chat_big_size: number;
  chat_size_max: number;
  date: number;
  dc_options: MtpVector<MtpDcOption>;
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

export interface MtpUploadFile extends MtpUploadObject<TMtpFile> {
  type: MtpStorageObject<TMtpStorageType>;
  mtime: number;
  bytes: Bytes;
}

export type TById<T> = {[id: number]: T};
