type TMtpVectorSubType = 'User'|'Message';

type TMtpVector = 'Vector';
type TMtpMessagesSlice = 'Telegram.type.messages.MessagesSlice';
type TMtpMessage = 'Telegram.type.Message';
type TMtpUser = 'Telegram.type.User';
type TMtpChat = 'Telegram.type.Chat';
type TMtpChannel = 'Telegram.type.Channel';
type TMtpDcOption = 'Telegram.type.DcOption';
type TMtpType = TMtpVector|TMtpMessagesSlice|TMtpMessage|TMtpUser|
  TMtpChat|TMtpChannel|TMtpDcOption;

type TMtpNearestDc = 'Telegram.type.NearestDc';
type TMtpConfig = 'Telegram.type.Config';
type TMtpHelpType = TMtpConfig|TMtpNearestDc;

type TMtpPeerUser = 'Telegram.type.PeerUser';
type TMtpPeerChat = 'Telegram.type.PeerChat';
type TMtpPeerChannel = 'Telegram.type.PeerChannel';
type TMtpInputPeerUser = 'Telegram.type.InputPeerUser';
type TMtpInputPeerChat = 'Telegram.type.InputPeerChat';
type TMtpInputPeerChannel = 'Telegram.type.InputPeerChannel';
type TMtpPeerType = TMtpPeerUser|TMtpInputPeerUser|TMtpPeerChat|TMtpInputPeerChat|
  TMtpPeerChannel|TMtpInputPeerChannel;

interface IMtpPrimitive<T> {
  _typeName: T;
}

export interface IMtpHelpObject<T extends TMtpHelpType> extends IMtpPrimitive<T> { }

export interface IMtpPeerObject<T extends TMtpPeerType> extends IMtpPrimitive<T> { }

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

export interface IMtpMessage extends IMtpObject<TMtpMessage> {
  from_id: number;
  date: number; // Unix time
  message: string;
  to_id: IMtpPeerUser;
  mentioned?: true;
  via_bot_id?: number;
  entities?: any; // Vector of message markdown if any
}

export interface IMtpUser extends IMtpObject<TMtpUser> {
  access_hash: string;
  first_name: string;
  phone: string;

  contact: boolean;
  verifed: boolean;
}

export interface IMtpChat extends IMtpObject<TMtpChat> { }

export interface IMtpMessagesSlice extends IMtpObject<TMtpMessagesSlice> {
  chats: IMtpVector<IMtpChat>;
  messages: IMtpVector<IMtpMessage>;
  users: IMtpVector<IMtpUser>;
}

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

export type TById<T> = {[id: number]: T};
