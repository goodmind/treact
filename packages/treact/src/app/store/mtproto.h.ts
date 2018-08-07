type int = number
type double = number
type bytes = string | Uint8Array
type long = number[] | string
type int128 = number
type int256 = number

type InvokeOptions = {
  dcID: number
  createNetworker: boolean
  noErrorBox: boolean
}

export type resPQ = {
  _: "resPQ",
  nonce: int128,
  server_nonce: int128,
  pq: string,
  server_public_key_fingerprints: Vector<long>,
}
export type p_q_inner_data = {
  _: "p_q_inner_data",
  pq: string,
  p: string,
  q: string,
  nonce: int128,
  server_nonce: int128,
  new_nonce: int256,
}
export type server_DH_params_fail = {
  _: "server_DH_params_fail",
  nonce: int128,
  server_nonce: int128,
  new_nonce_hash: int128,
}
export type server_DH_params_ok = {
  _: "server_DH_params_ok",
  nonce: int128,
  server_nonce: int128,
  encrypted_answer: string,
}
export type server_DH_inner_data = {
  _: "server_DH_inner_data",
  nonce: int128,
  server_nonce: int128,
  g: int,
  dh_prime: string,
  g_a: string,
  server_time: int,
}
export type client_DH_inner_data = {
  _: "client_DH_inner_data",
  nonce: int128,
  server_nonce: int128,
  retry_id: long,
  g_b: string,
}
export type dh_gen_ok = {
  _: "dh_gen_ok",
  nonce: int128,
  server_nonce: int128,
  new_nonce_hash1: int128,
}
export type dh_gen_retry = {
  _: "dh_gen_retry",
  nonce: int128,
  server_nonce: int128,
  new_nonce_hash2: int128,
}
export type dh_gen_fail = {
  _: "dh_gen_fail",
  nonce: int128,
  server_nonce: int128,
  new_nonce_hash3: int128,
}
export type destroy_auth_key_ok = {
  _: "destroy_auth_key_ok",

}
export type destroy_auth_key_none = {
  _: "destroy_auth_key_none",

}
export type destroy_auth_key_fail = {
  _: "destroy_auth_key_fail",

}
export type msgs_ack = {
  _: "msgs_ack",
  msg_ids: Vector<long>,
}
export type bad_msg_notification = {
  _: "bad_msg_notification",
  bad_msg_id: long,
  bad_msg_seqno: int,
  error_code: int,
}
export type bad_server_salt = {
  _: "bad_server_salt",
  bad_msg_id: long,
  bad_msg_seqno: int,
  error_code: int,
  new_server_salt: long,
}
export type msgs_state_req = {
  _: "msgs_state_req",
  msg_ids: Vector<long>,
}
export type msgs_state_info = {
  _: "msgs_state_info",
  req_msg_id: long,
  info: string,
}
export type msgs_all_info = {
  _: "msgs_all_info",
  msg_ids: Vector<long>,
  info: string,
}
export type msg_detailed_info = {
  _: "msg_detailed_info",
  msg_id: long,
  answer_msg_id: long,
  bytes: int,
  status: int,
}
export type msg_new_detailed_info = {
  _: "msg_new_detailed_info",
  answer_msg_id: long,
  bytes: int,
  status: int,
}
export type msg_resend_req = {
  _: "msg_resend_req",
  msg_ids: Vector<long>,
}
export type rpc_error = {
  _: "rpc_error",
  error_code: int,
  error_message: string,
}
export type rpc_answer_unknown = {
  _: "rpc_answer_unknown",

}
export type rpc_answer_dropped_running = {
  _: "rpc_answer_dropped_running",

}
export type rpc_answer_dropped = {
  _: "rpc_answer_dropped",
  msg_id: long,
  seq_no: int,
  bytes: int,
}
export type future_salt = {
  _: "future_salt",
  valid_since: int,
  valid_until: int,
  salt: long,
}
export type future_salts = {
  _: "future_salts",
  req_msg_id: long,
  now: int,
  salts: vector<future_salt>,
}
export type pong = {
  _: "pong",
  msg_id: long,
  ping_id: long,
}
export type destroy_session_ok = {
  _: "destroy_session_ok",
  session_id: long,
}
export type destroy_session_none = {
  _: "destroy_session_none",
  session_id: long,
}
export type new_session_created = {
  _: "new_session_created",
  first_msg_id: long,
  unique_id: long,
  server_salt: long,
}
export type http_wait = {
  _: "http_wait",
  max_delay: int,
  wait_after: int,
  max_wait: int,
}
export type vector<t> = Array<t>
export type error = {
  _: "error",
  code: int,
  text: string,
}
export type inputPeerEmpty = {
  _: "inputPeerEmpty",

}
export type inputPeerSelf = {
  _: "inputPeerSelf",

}
export type inputPeerChat = {
  _: "inputPeerChat",
  chat_id: int,
}
export type inputPeerUser = {
  _: "inputPeerUser",
  user_id: int,
  access_hash: long,
}
export type inputPeerChannel = {
  _: "inputPeerChannel",
  channel_id: int,
  access_hash: long,
}
export type inputUserEmpty = {
  _: "inputUserEmpty",

}
export type inputUserSelf = {
  _: "inputUserSelf",

}
export type inputUser = {
  _: "inputUser",
  user_id: int,
  access_hash: long,
}
export type inputPhoneContact = {
  _: "inputPhoneContact",
  client_id: long,
  phone: string,
  first_name: string,
  last_name: string,
}
export type inputFile = {
  _: "inputFile",
  id: long,
  parts: int,
  name: string,
  md5_checksum: string,
}
export type inputFileBig = {
  _: "inputFileBig",
  id: long,
  parts: int,
  name: string,
}
export type inputMediaEmpty = {
  _: "inputMediaEmpty",

}
export type inputMediaUploadedPhoto = {
  _: "inputMediaUploadedPhoto",
  flags: number,
  file: InputFile,
  caption: string,
  stickers?: Vector<InputDocument>,
}
export type inputMediaPhoto = {
  _: "inputMediaPhoto",
  id: InputPhoto,
  caption: string,
}
export type inputMediaGeoPoint = {
  _: "inputMediaGeoPoint",
  geo_point: InputGeoPoint,
}
export type inputMediaContact = {
  _: "inputMediaContact",
  phone_number: string,
  first_name: string,
  last_name: string,
}
export type inputMediaUploadedDocument = {
  _: "inputMediaUploadedDocument",
  flags: number,
  file: InputFile,
  mime_type: string,
  attributes: Vector<DocumentAttribute>,
  caption: string,
  stickers?: Vector<InputDocument>,
}
export type inputMediaUploadedThumbDocument = {
  _: "inputMediaUploadedThumbDocument",
  flags: number,
  file: InputFile,
  thumb: InputFile,
  mime_type: string,
  attributes: Vector<DocumentAttribute>,
  caption: string,
  stickers?: Vector<InputDocument>,
}
export type inputMediaDocument = {
  _: "inputMediaDocument",
  id: InputDocument,
  caption: string,
}
export type inputMediaVenue = {
  _: "inputMediaVenue",
  geo_point: InputGeoPoint,
  title: string,
  address: string,
  provider: string,
  venue_id: string,
}
export type inputMediaGifExternal = {
  _: "inputMediaGifExternal",
  url: string,
  q: string,
}
export type inputMediaPhotoExternal = {
  _: "inputMediaPhotoExternal",
  url: string,
  caption: string,
}
export type inputMediaDocumentExternal = {
  _: "inputMediaDocumentExternal",
  url: string,
  caption: string,
}
export type inputMediaGame = {
  _: "inputMediaGame",
  id: InputGame,
}
export type inputMediaInvoice = {
  _: "inputMediaInvoice",
  flags: number,
  title: string,
  description: string,
  photo?: InputWebDocument,
  invoice: Invoice,
  payload: bytes,
  provider: string,
  start_param: string,
}
export type inputChatPhotoEmpty = {
  _: "inputChatPhotoEmpty",

}
export type inputChatUploadedPhoto = {
  _: "inputChatUploadedPhoto",
  file: InputFile,
}
export type inputChatPhoto = {
  _: "inputChatPhoto",
  id: InputPhoto,
}
export type inputGeoPointEmpty = {
  _: "inputGeoPointEmpty",

}
export type inputGeoPoint = {
  _: "inputGeoPoint",
  lat: double,
  long: double,
}
export type inputPhotoEmpty = {
  _: "inputPhotoEmpty",

}
export type inputPhoto = {
  _: "inputPhoto",
  id: long,
  access_hash: long,
}
export type inputFileLocation = {
  _: "inputFileLocation",
  volume_id: long,
  local_id: int,
  secret: long,
}
export type inputEncryptedFileLocation = {
  _: "inputEncryptedFileLocation",
  id: long,
  access_hash: long,
}
export type inputDocumentFileLocation = {
  _: "inputDocumentFileLocation",
  id: long,
  access_hash: long,
  version: int,
}
export type inputAppEvent = {
  _: "inputAppEvent",
  time: double,
  type: string,
  peer: long,
  data: string,
}
export type peerUser = {
  _: "peerUser",
  user_id: int,
}
export type peerChat = {
  _: "peerChat",
  chat_id: int,
}
export type peerChannel = {
  _: "peerChannel",
  channel_id: int,
}
export type storage$fileUnknown = {
  _: "storage.fileUnknown",

}
export type storage$filePartial = {
  _: "storage.filePartial",

}
export type storage$fileJpeg = {
  _: "storage.fileJpeg",

}
export type storage$fileGif = {
  _: "storage.fileGif",

}
export type storage$filePng = {
  _: "storage.filePng",

}
export type storage$filePdf = {
  _: "storage.filePdf",

}
export type storage$fileMp3 = {
  _: "storage.fileMp3",

}
export type storage$fileMov = {
  _: "storage.fileMov",

}
export type storage$fileMp4 = {
  _: "storage.fileMp4",

}
export type storage$fileWebp = {
  _: "storage.fileWebp",

}
export type fileLocationUnavailable = {
  _: "fileLocationUnavailable",
  volume_id: long,
  local_id: int,
  secret: long,
}
export type fileLocation = {
  _: "fileLocation",
  dc_id: int,
  volume_id: long,
  local_id: int,
  secret: long,
}
export type userEmpty = {
  _: "userEmpty",
  id: int,
}
export type user = {
  _: "user",
  flags: number,
  self?: true,
  contact?: true,
  mutual_contact?: true,
  deleted?: true,
  bot?: true,
  bot_chat_history?: true,
  bot_nochats?: true,
  verified?: true,
  restricted?: true,
  min?: true,
  bot_inline_geo?: true,
  id: int,
  access_hash?: long,
  first_name?: string,
  last_name?: string,
  username?: string,
  phone?: string,
  photo?: UserProfilePhoto,
  status?: UserStatus,
  bot_info_version?: int,
  restriction_reason?: string,
  bot_inline_placeholder?: string,
  lang_code?: string,
}
export type userProfilePhotoEmpty = {
  _: "userProfilePhotoEmpty",

}
export type userProfilePhoto = {
  _: "userProfilePhoto",
  photo_id: long,
  photo_small: FileLocation,
  photo_big: FileLocation,
}
export type userStatusEmpty = {
  _: "userStatusEmpty",

}
export type userStatusOnline = {
  _: "userStatusOnline",
  expires: int,
}
export type userStatusOffline = {
  _: "userStatusOffline",
  was_online: int,
}
export type userStatusRecently = {
  _: "userStatusRecently",

}
export type userStatusLastWeek = {
  _: "userStatusLastWeek",

}
export type userStatusLastMonth = {
  _: "userStatusLastMonth",

}
export type chatEmpty = {
  _: "chatEmpty",
  id: int,
}
export type chat = {
  _: "chat",
  flags: number,
  creator?: true,
  kicked?: true,
  left?: true,
  admins_enabled?: true,
  admin?: true,
  deactivated?: true,
  id: int,
  title: string,
  photo: ChatPhoto,
  participants_count: int,
  date: int,
  version: int,
  migrated_to?: InputChannel,
}
export type chatForbidden = {
  _: "chatForbidden",
  id: int,
  title: string,
}
export type channel = {
  _: "channel",
  flags: number,
  creator?: true,
  kicked?: true,
  left?: true,
  editor?: true,
  moderator?: true,
  broadcast?: true,
  verified?: true,
  megagroup?: true,
  restricted?: true,
  democracy?: true,
  signatures?: true,
  min?: true,
  id: int,
  access_hash?: long,
  title: string,
  username?: string,
  photo: ChatPhoto,
  date: int,
  version: int,
  restriction_reason?: string,
}
export type channelForbidden = {
  _: "channelForbidden",
  flags: number,
  broadcast?: true,
  megagroup?: true,
  id: int,
  access_hash: long,
  title: string,
}
export type chatFull = {
  _: "chatFull",
  id: int,
  participants: ChatParticipants,
  chat_photo: Photo,
  notify_settings: PeerNotifySettings,
  exported_invite: ExportedChatInvite,
  bot_info: Vector<BotInfo>,
}
export type channelFull = {
  _: "channelFull",
  flags: number,
  can_view_participants?: true,
  can_set_username?: true,
  id: int,
  about: string,
  participants_count?: int,
  admins_count?: int,
  kicked_count?: int,
  read_inbox_max_id: int,
  read_outbox_max_id: int,
  unread_count: int,
  chat_photo: Photo,
  notify_settings: PeerNotifySettings,
  exported_invite: ExportedChatInvite,
  bot_info: Vector<BotInfo>,
  migrated_from_chat_id?: int,
  migrated_from_max_id?: int,
  pinned_msg_id?: int,
}
export type chatParticipant = {
  _: "chatParticipant",
  user_id: int,
  inviter_id: int,
  date: int,
}
export type chatParticipantCreator = {
  _: "chatParticipantCreator",
  user_id: int,
}
export type chatParticipantAdmin = {
  _: "chatParticipantAdmin",
  user_id: int,
  inviter_id: int,
  date: int,
}
export type chatParticipantsForbidden = {
  _: "chatParticipantsForbidden",
  flags: number,
  chat_id: int,
  self_participant?: ChatParticipant,
}
export type chatParticipants = {
  _: "chatParticipants",
  chat_id: int,
  participants: Vector<ChatParticipant>,
  version: int,
}
export type chatPhotoEmpty = {
  _: "chatPhotoEmpty",

}
export type chatPhoto = {
  _: "chatPhoto",
  photo_small: FileLocation,
  photo_big: FileLocation,
}
export type messageEmpty = {
  _: "messageEmpty",
  id: int,
}
export type message = {
  _: "message",
  flags: number,
  out?: true,
  mentioned?: true,
  media_unread?: true,
  silent?: true,
  post?: true,
  id: int,
  from_id?: int,
  to_id: Peer,
  fwd_from?: MessageFwdHeader,
  via_bot_id?: int,
  reply_to_msg_id?: int,
  date: int,
  message: string,
  media?: MessageMedia,
  reply_markup?: ReplyMarkup,
  entities?: Vector<MessageEntity>,
  views?: int,
  edit_date?: int,
}
export type messageService = {
  _: "messageService",
  flags: number,
  out?: true,
  mentioned?: true,
  media_unread?: true,
  silent?: true,
  post?: true,
  id: int,
  from_id?: int,
  to_id: Peer,
  reply_to_msg_id?: int,
  date: int,
  action: MessageAction,
}
export type messageMediaEmpty = {
  _: "messageMediaEmpty",

}
export type messageMediaPhoto = {
  _: "messageMediaPhoto",
  photo: Photo,
  caption: string,
}
export type messageMediaGeo = {
  _: "messageMediaGeo",
  geo: GeoPoint,
}
export type messageMediaContact = {
  _: "messageMediaContact",
  phone_number: string,
  first_name: string,
  last_name: string,
  user_id: int,
}
export type messageMediaUnsupported = {
  _: "messageMediaUnsupported",

}
export type messageMediaDocument = {
  _: "messageMediaDocument",
  document: Document,
  caption: string,
}
export type messageMediaWebPage = {
  _: "messageMediaWebPage",
  webpage: WebPage,
}
export type messageMediaVenue = {
  _: "messageMediaVenue",
  geo: GeoPoint,
  title: string,
  address: string,
  provider: string,
  venue_id: string,
}
export type messageMediaGame = {
  _: "messageMediaGame",
  game: Game,
}
export type messageMediaInvoice = {
  _: "messageMediaInvoice",
  flags: number,
  shipping_address_requested?: true,
  test?: true,
  title: string,
  description: string,
  photo?: WebDocument,
  receipt_msg_id?: int,
  currency: string,
  total_amount: long,
  start_param: string,
}
export type messageActionEmpty = {
  _: "messageActionEmpty",

}
export type messageActionChatCreate = {
  _: "messageActionChatCreate",
  title: string,
  users: Vector<int>,
}
export type messageActionChatEditTitle = {
  _: "messageActionChatEditTitle",
  title: string,
}
export type messageActionChatEditPhoto = {
  _: "messageActionChatEditPhoto",
  photo: Photo,
}
export type messageActionChatDeletePhoto = {
  _: "messageActionChatDeletePhoto",

}
export type messageActionChatAddUser = {
  _: "messageActionChatAddUser",
  users: Vector<int>,
}
export type messageActionChatDeleteUser = {
  _: "messageActionChatDeleteUser",
  user_id: int,
}
export type messageActionChatJoinedByLink = {
  _: "messageActionChatJoinedByLink",
  inviter_id: int,
}
export type messageActionChannelCreate = {
  _: "messageActionChannelCreate",
  title: string,
}
export type messageActionChatMigrateTo = {
  _: "messageActionChatMigrateTo",
  channel_id: int,
}
export type messageActionChannelMigrateFrom = {
  _: "messageActionChannelMigrateFrom",
  title: string,
  chat_id: int,
}
export type messageActionPinMessage = {
  _: "messageActionPinMessage",

}
export type messageActionHistoryClear = {
  _: "messageActionHistoryClear",

}
export type messageActionGameScore = {
  _: "messageActionGameScore",
  game_id: long,
  score: int,
}
export type messageActionPaymentSentMe = {
  _: "messageActionPaymentSentMe",
  flags: number,
  currency: string,
  total_amount: long,
  payload: bytes,
  info?: PaymentRequestedInfo,
  shipping_option_id?: string,
  charge: PaymentCharge,
}
export type messageActionPaymentSent = {
  _: "messageActionPaymentSent",
  currency: string,
  total_amount: long,
}
export type messageActionPhoneCall = {
  _: "messageActionPhoneCall",
  flags: number,
  call_id: long,
  reason?: PhoneCallDiscardReason,
  duration?: int,
}
export type dialog = {
  _: "dialog",
  flags: number,
  pinned?: true,
  peer: Peer,
  top_message: int,
  read_inbox_max_id: int,
  read_outbox_max_id: int,
  unread_count: int,
  notify_settings: PeerNotifySettings,
  pts?: int,
  draft?: DraftMessage,
}
export type photoEmpty = {
  _: "photoEmpty",
  id: long,
}
export type photo = {
  _: "photo",
  flags: number,
  has_stickers?: true,
  id: long,
  access_hash: long,
  date: int,
  sizes: Vector<PhotoSize>,
}
export type photoSizeEmpty = {
  _: "photoSizeEmpty",
  type: string,
}
export type photoSize = {
  _: "photoSize",
  type: string,
  location: FileLocation,
  w: int,
  h: int,
  size: int,
}
export type photoCachedSize = {
  _: "photoCachedSize",
  type: string,
  location: FileLocation,
  w: int,
  h: int,
  bytes: bytes,
}
export type geoPointEmpty = {
  _: "geoPointEmpty",

}
export type geoPoint = {
  _: "geoPoint",
  long: double,
  lat: double,
}
export type auth$checkedPhone = {
  _: "auth.checkedPhone",
  phone_registered: boolean,
}
export type auth$sentCode = {
  _: "auth.sentCode",
  flags: number,
  phone_registered?: true,
  type: auth$SentCodeType,
  phone_code_hash: string,
  next_type?: auth$CodeType,
  timeout?: int,
}
export type auth$authorization = {
  _: "auth.authorization",
  flags: number,
  tmp_sessions?: int,
  user: User,
}
export type auth$exportedAuthorization = {
  _: "auth.exportedAuthorization",
  id: int,
  bytes: bytes,
}
export type inputNotifyPeer = {
  _: "inputNotifyPeer",
  peer: InputPeer,
}
export type inputNotifyUsers = {
  _: "inputNotifyUsers",

}
export type inputNotifyChats = {
  _: "inputNotifyChats",

}
export type inputNotifyAll = {
  _: "inputNotifyAll",

}
export type inputPeerNotifyEventsEmpty = {
  _: "inputPeerNotifyEventsEmpty",

}
export type inputPeerNotifyEventsAll = {
  _: "inputPeerNotifyEventsAll",

}
export type inputPeerNotifySettings = {
  _: "inputPeerNotifySettings",
  flags: number,
  show_previews?: true,
  silent?: true,
  mute_until: int,
  sound: string,
}
export type peerNotifyEventsEmpty = {
  _: "peerNotifyEventsEmpty",

}
export type peerNotifyEventsAll = {
  _: "peerNotifyEventsAll",

}
export type peerNotifySettingsEmpty = {
  _: "peerNotifySettingsEmpty",

}
export type peerNotifySettings = {
  _: "peerNotifySettings",
  flags: number,
  show_previews?: true,
  silent?: true,
  mute_until: int,
  sound: string,
}
export type peerSettings = {
  _: "peerSettings",
  flags: number,
  report_spam?: true,
}
export type wallPaper = {
  _: "wallPaper",
  id: int,
  title: string,
  sizes: Vector<PhotoSize>,
  color: int,
}
export type wallPaperSolid = {
  _: "wallPaperSolid",
  id: int,
  title: string,
  bg_color: int,
  color: int,
}
export type inputReportReasonSpam = {
  _: "inputReportReasonSpam",

}
export type inputReportReasonViolence = {
  _: "inputReportReasonViolence",

}
export type inputReportReasonPornography = {
  _: "inputReportReasonPornography",

}
export type inputReportReasonOther = {
  _: "inputReportReasonOther",
  text: string,
}
export type userFull = {
  _: "userFull",
  flags: number,
  blocked?: true,
  phone_calls_available?: true,
  phone_calls_private?: true,
  user: User,
  about?: string,
  link: contacts$Link,
  profile_photo?: Photo,
  notify_settings: PeerNotifySettings,
  bot_info?: BotInfo,
  common_chats_count: int,
}
export type contact = {
  _: "contact",
  user_id: int,
  mutual: boolean,
}
export type importedContact = {
  _: "importedContact",
  user_id: int,
  client_id: long,
}
export type contactBlocked = {
  _: "contactBlocked",
  user_id: int,
  date: int,
}
export type contactStatus = {
  _: "contactStatus",
  user_id: int,
  status: UserStatus,
}
export type contacts$link = {
  _: "contacts.link",
  my_link: ContactLink,
  foreign_link: ContactLink,
  user: User,
}
export type contacts$contactsNotModified = {
  _: "contacts.contactsNotModified",

}
export type contacts$contacts = {
  _: "contacts.contacts",
  contacts: Vector<Contact>,
  users: Vector<User>,
}
export type contacts$importedContacts = {
  _: "contacts.importedContacts",
  imported: Vector<ImportedContact>,
  retry_contacts: Vector<long>,
  users: Vector<User>,
}
export type contacts$blocked = {
  _: "contacts.blocked",
  blocked: Vector<ContactBlocked>,
  users: Vector<User>,
}
export type contacts$blockedSlice = {
  _: "contacts.blockedSlice",
  count: int,
  blocked: Vector<ContactBlocked>,
  users: Vector<User>,
}
export type messages$dialogs = {
  _: "messages.dialogs",
  dialogs: Vector<Dialog>,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$dialogsSlice = {
  _: "messages.dialogsSlice",
  count: int,
  dialogs: Vector<Dialog>,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$messages = {
  _: "messages.messages",
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$messagesSlice = {
  _: "messages.messagesSlice",
  count: int,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$channelMessages = {
  _: "messages.channelMessages",
  flags: number,
  pts: int,
  count: int,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$chats = {
  _: "messages.chats",
  chats: Vector<Chat>,
}
export type messages$chatsSlice = {
  _: "messages.chatsSlice",
  count: int,
  chats: Vector<Chat>,
}
export type messages$chatFull = {
  _: "messages.chatFull",
  full_chat: ChatFull,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messages$affectedHistory = {
  _: "messages.affectedHistory",
  pts: int,
  pts_count: int,
  offset: int,
}
export type inputMessagesFilterEmpty = {
  _: "inputMessagesFilterEmpty",

}
export type inputMessagesFilterPhotos = {
  _: "inputMessagesFilterPhotos",

}
export type inputMessagesFilterVideo = {
  _: "inputMessagesFilterVideo",

}
export type inputMessagesFilterPhotoVideo = {
  _: "inputMessagesFilterPhotoVideo",

}
export type inputMessagesFilterPhotoVideoDocuments = {
  _: "inputMessagesFilterPhotoVideoDocuments",

}
export type inputMessagesFilterDocument = {
  _: "inputMessagesFilterDocument",

}
export type inputMessagesFilterUrl = {
  _: "inputMessagesFilterUrl",

}
export type inputMessagesFilterGif = {
  _: "inputMessagesFilterGif",

}
export type inputMessagesFilterVoice = {
  _: "inputMessagesFilterVoice",

}
export type inputMessagesFilterMusic = {
  _: "inputMessagesFilterMusic",

}
export type inputMessagesFilterChatPhotos = {
  _: "inputMessagesFilterChatPhotos",

}
export type inputMessagesFilterPhoneCalls = {
  _: "inputMessagesFilterPhoneCalls",
  flags: number,
  missed?: true,
}
export type inputMessagesFilterRoundVoice = {
  _: "inputMessagesFilterRoundVoice",

}
export type inputMessagesFilterRoundVideo = {
  _: "inputMessagesFilterRoundVideo",

}
export type updateNewMessage = {
  _: "updateNewMessage",
  message: Message,
  pts: int,
  pts_count: int,
}
export type updateMessageID = {
  _: "updateMessageID",
  id: int,
  random_id: long,
}
export type updateDeleteMessages = {
  _: "updateDeleteMessages",
  messages: Vector<int>,
  pts: int,
  pts_count: int,
}
export type updateUserTyping = {
  _: "updateUserTyping",
  user_id: int,
  action: SendMessageAction,
}
export type updateChatUserTyping = {
  _: "updateChatUserTyping",
  chat_id: int,
  user_id: int,
  action: SendMessageAction,
}
export type updateChatParticipants = {
  _: "updateChatParticipants",
  participants: ChatParticipants,
}
export type updateUserStatus = {
  _: "updateUserStatus",
  user_id: int,
  status: UserStatus,
}
export type updateUserName = {
  _: "updateUserName",
  user_id: int,
  first_name: string,
  last_name: string,
  username: string,
}
export type updateUserPhoto = {
  _: "updateUserPhoto",
  user_id: int,
  date: int,
  photo: UserProfilePhoto,
  previous: boolean,
}
export type updateContactRegistered = {
  _: "updateContactRegistered",
  user_id: int,
  date: int,
}
export type updateContactLink = {
  _: "updateContactLink",
  user_id: int,
  my_link: ContactLink,
  foreign_link: ContactLink,
}
export type updateNewEncryptedMessage = {
  _: "updateNewEncryptedMessage",
  message: EncryptedMessage,
  qts: int,
}
export type updateEncryptedChatTyping = {
  _: "updateEncryptedChatTyping",
  chat_id: int,
}
export type updateEncryption = {
  _: "updateEncryption",
  chat: EncryptedChat,
  date: int,
}
export type updateEncryptedMessagesRead = {
  _: "updateEncryptedMessagesRead",
  chat_id: int,
  max_date: int,
  date: int,
}
export type updateChatParticipantAdd = {
  _: "updateChatParticipantAdd",
  chat_id: int,
  user_id: int,
  inviter_id: int,
  date: int,
  version: int,
}
export type updateChatParticipantDelete = {
  _: "updateChatParticipantDelete",
  chat_id: int,
  user_id: int,
  version: int,
}
export type updateDcOptions = {
  _: "updateDcOptions",
  dc_options: Vector<DcOption>,
}
export type updateUserBlocked = {
  _: "updateUserBlocked",
  user_id: int,
  blocked: boolean,
}
export type updateNotifySettings = {
  _: "updateNotifySettings",
  peer: NotifyPeer,
  notify_settings: PeerNotifySettings,
}
export type updateServiceNotification = {
  _: "updateServiceNotification",
  flags: number,
  popup?: true,
  inbox_date?: int,
  type: string,
  message: string,
  media: MessageMedia,
  entities: Vector<MessageEntity>,
}
export type updatePrivacy = {
  _: "updatePrivacy",
  key: PrivacyKey,
  rules: Vector<PrivacyRule>,
}
export type updateUserPhone = {
  _: "updateUserPhone",
  user_id: int,
  phone: string,
}
export type updateReadHistoryInbox = {
  _: "updateReadHistoryInbox",
  peer: Peer,
  max_id: int,
  pts: int,
  pts_count: int,
}
export type updateReadHistoryOutbox = {
  _: "updateReadHistoryOutbox",
  peer: Peer,
  max_id: int,
  pts: int,
  pts_count: int,
}
export type updateWebPage = {
  _: "updateWebPage",
  webpage: WebPage,
  pts: int,
  pts_count: int,
}
export type updateReadMessagesContents = {
  _: "updateReadMessagesContents",
  messages: Vector<int>,
  pts: int,
  pts_count: int,
}
export type updateChannelTooLong = {
  _: "updateChannelTooLong",
  flags: number,
  channel_id: int,
  pts?: int,
}
export type updateChannel = {
  _: "updateChannel",
  channel_id: int,
}
export type updateNewChannelMessage = {
  _: "updateNewChannelMessage",
  message: Message,
  pts: int,
  pts_count: int,
}
export type updateReadChannelInbox = {
  _: "updateReadChannelInbox",
  channel_id: int,
  max_id: int,
}
export type updateDeleteChannelMessages = {
  _: "updateDeleteChannelMessages",
  channel_id: int,
  messages: Vector<int>,
  pts: int,
  pts_count: int,
}
export type updateChannelMessageViews = {
  _: "updateChannelMessageViews",
  channel_id: int,
  id: int,
  views: int,
}
export type updateChatAdmins = {
  _: "updateChatAdmins",
  chat_id: int,
  enabled: boolean,
  version: int,
}
export type updateChatParticipantAdmin = {
  _: "updateChatParticipantAdmin",
  chat_id: int,
  user_id: int,
  is_admin: boolean,
  version: int,
}
export type updateNewStickerSet = {
  _: "updateNewStickerSet",
  stickerset: messages$StickerSet,
}
export type updateStickerSetsOrder = {
  _: "updateStickerSetsOrder",
  flags: number,
  masks?: true,
  order: Vector<long>,
}
export type updateStickerSets = {
  _: "updateStickerSets",

}
export type updateSavedGifs = {
  _: "updateSavedGifs",

}
export type updateBotInlineQuery = {
  _: "updateBotInlineQuery",
  flags: number,
  query_id: long,
  user_id: int,
  query: string,
  geo?: GeoPoint,
  offset: string,
}
export type updateBotInlineSend = {
  _: "updateBotInlineSend",
  flags: number,
  user_id: int,
  query: string,
  geo?: GeoPoint,
  id: string,
  msg_id?: InputBotInlineMessageID,
}
export type updateEditChannelMessage = {
  _: "updateEditChannelMessage",
  message: Message,
  pts: int,
  pts_count: int,
}
export type updateChannelPinnedMessage = {
  _: "updateChannelPinnedMessage",
  channel_id: int,
  id: int,
}
export type updateBotCallbackQuery = {
  _: "updateBotCallbackQuery",
  flags: number,
  query_id: long,
  user_id: int,
  peer: Peer,
  msg_id: int,
  chat_instance: long,
  data?: bytes,
  game_short_name?: string,
}
export type updateEditMessage = {
  _: "updateEditMessage",
  message: Message,
  pts: int,
  pts_count: int,
}
export type updateInlineBotCallbackQuery = {
  _: "updateInlineBotCallbackQuery",
  flags: number,
  query_id: long,
  user_id: int,
  msg_id: InputBotInlineMessageID,
  chat_instance: long,
  data?: bytes,
  game_short_name?: string,
}
export type updateReadChannelOutbox = {
  _: "updateReadChannelOutbox",
  channel_id: int,
  max_id: int,
}
export type updateDraftMessage = {
  _: "updateDraftMessage",
  peer: Peer,
  draft: DraftMessage,
}
export type updateReadFeaturedStickers = {
  _: "updateReadFeaturedStickers",

}
export type updateRecentStickers = {
  _: "updateRecentStickers",

}
export type updateConfig = {
  _: "updateConfig",

}
export type updatePtsChanged = {
  _: "updatePtsChanged",

}
export type updateChannelWebPage = {
  _: "updateChannelWebPage",
  channel_id: int,
  webpage: WebPage,
  pts: int,
  pts_count: int,
}
export type updateDialogPinned = {
  _: "updateDialogPinned",
  flags: number,
  pinned?: true,
  peer: Peer,
}
export type updatePinnedDialogs = {
  _: "updatePinnedDialogs",
  flags: number,
  order?: Vector<Peer>,
}
export type updateBotWebhookJSON = {
  _: "updateBotWebhookJSON",
  data: DataJSON,
}
export type updateBotWebhookJSONQuery = {
  _: "updateBotWebhookJSONQuery",
  query_id: long,
  data: DataJSON,
  timeout: int,
}
export type updateBotShippingQuery = {
  _: "updateBotShippingQuery",
  query_id: long,
  user_id: int,
  payload: bytes,
  shipping_address: PostAddress,
}
export type updateBotPrecheckoutQuery = {
  _: "updateBotPrecheckoutQuery",
  flags: number,
  query_id: long,
  user_id: int,
  payload: bytes,
  info?: PaymentRequestedInfo,
  shipping_option_id?: string,
  currency: string,
  total_amount: long,
}
export type updatePhoneCall = {
  _: "updatePhoneCall",
  phone_call: PhoneCall,
}
export type updateLangPackTooLong = {
  _: "updateLangPackTooLong",

}
export type updateLangPack = {
  _: "updateLangPack",
  difference: LangPackDifference,
}
export type updates$state = {
  _: "updates.state",
  pts: int,
  qts: int,
  date: int,
  seq: int,
  unread_count: int,
}
export type updates$differenceEmpty = {
  _: "updates.differenceEmpty",
  date: int,
  seq: int,
}
export type updates$difference = {
  _: "updates.difference",
  new_messages: Vector<Message>,
  new_encrypted_messages: Vector<EncryptedMessage>,
  other_updates: Vector<Update>,
  chats: Vector<Chat>,
  users: Vector<User>,
  state: updates$State,
}
export type updates$differenceSlice = {
  _: "updates.differenceSlice",
  new_messages: Vector<Message>,
  new_encrypted_messages: Vector<EncryptedMessage>,
  other_updates: Vector<Update>,
  chats: Vector<Chat>,
  users: Vector<User>,
  intermediate_state: updates$State,
}
export type updates$differenceTooLong = {
  _: "updates.differenceTooLong",
  pts: int,
}
export type updatesTooLong = {
  _: "updatesTooLong",

}
export type updateShortMessage = {
  _: "updateShortMessage",
  flags: number,
  out?: true,
  mentioned?: true,
  media_unread?: true,
  silent?: true,
  id: int,
  user_id: int,
  message: string,
  pts: int,
  pts_count: int,
  date: int,
  fwd_from?: MessageFwdHeader,
  via_bot_id?: int,
  reply_to_msg_id?: int,
  entities?: Vector<MessageEntity>,
}
export type updateShortChatMessage = {
  _: "updateShortChatMessage",
  flags: number,
  out?: true,
  mentioned?: true,
  media_unread?: true,
  silent?: true,
  id: int,
  from_id: int,
  chat_id: int,
  message: string,
  pts: int,
  pts_count: int,
  date: int,
  fwd_from?: MessageFwdHeader,
  via_bot_id?: int,
  reply_to_msg_id?: int,
  entities?: Vector<MessageEntity>,
}
export type updateShort = {
  _: "updateShort",
  update: Update,
  date: int,
}
export type updatesCombined = {
  _: "updatesCombined",
  updates: Vector<Update>,
  users: Vector<User>,
  chats: Vector<Chat>,
  date: int,
  seq_start: int,
  seq: int,
}
export type updates = {
  _: "updates",
  updates: Vector<Update>,
  users: Vector<User>,
  chats: Vector<Chat>,
  date: int,
  seq: int,
}
export type updateShortSentMessage = {
  _: "updateShortSentMessage",
  flags: number,
  out?: true,
  id: int,
  pts: int,
  pts_count: int,
  date: int,
  media?: MessageMedia,
  entities?: Vector<MessageEntity>,
}
export type photos$photos = {
  _: "photos.photos",
  photos: Vector<Photo>,
  users: Vector<User>,
}
export type photos$photosSlice = {
  _: "photos.photosSlice",
  count: int,
  photos: Vector<Photo>,
  users: Vector<User>,
}
export type photos$photo = {
  _: "photos.photo",
  photo: Photo,
  users: Vector<User>,
}
export type upload$file = {
  _: "upload.file",
  type: storage$FileType,
  mtime: int,
  bytes: bytes,
}
export type upload$fileCdnRedirect = {
  _: "upload.fileCdnRedirect",
  dc_id: int,
  file_token: bytes,
  encryption_key: bytes,
  encryption_iv: bytes,
}
export type dcOption = {
  _: "dcOption",
  flags: number,
  ipv6?: true,
  media_only?: true,
  tcpo_only?: true,
  cdn?: true,
  id: int,
  ip_address: string,
  port: int,
}
export type config = {
  _: "config",
  flags: number,
  phonecalls_enabled?: true,
  date: int,
  expires: int,
  test_mode: boolean,
  this_dc: int,
  dc_options: Vector<DcOption>,
  chat_size_max: int,
  megagroup_size_max: int,
  forwarded_count_max: int,
  online_update_period_ms: int,
  offline_blur_timeout_ms: int,
  offline_idle_timeout_ms: int,
  online_cloud_timeout_ms: int,
  notify_cloud_delay_ms: int,
  notify_default_delay_ms: int,
  chat_big_size: int,
  push_chat_period_ms: int,
  push_chat_limit: int,
  saved_gifs_limit: int,
  edit_time_limit: int,
  rating_e_decay: int,
  stickers_recent_limit: int,
  tmp_sessions?: int,
  pinned_dialogs_count_max: int,
  call_receive_timeout_ms: int,
  call_ring_timeout_ms: int,
  call_connect_timeout_ms: int,
  call_packet_timeout_ms: int,
  me_url_prefix: string,
  suggested_lang_code?: string,
  lang_pack_version?: int,
  disabled_features: Vector<DisabledFeature>,
}
export type nearestDc = {
  _: "nearestDc",
  country: string,
  this_dc: int,
  nearest_dc: int,
}
export type help$appUpdate = {
  _: "help.appUpdate",
  id: int,
  critical: boolean,
  url: string,
  text: string,
}
export type help$noAppUpdate = {
  _: "help.noAppUpdate",

}
export type help$inviteText = {
  _: "help.inviteText",
  message: string,
}
export type encryptedChatEmpty = {
  _: "encryptedChatEmpty",
  id: int,
}
export type encryptedChatWaiting = {
  _: "encryptedChatWaiting",
  id: int,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
}
export type encryptedChatRequested = {
  _: "encryptedChatRequested",
  id: int,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  g_a: bytes,
}
export type encryptedChat = {
  _: "encryptedChat",
  id: int,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  g_a_or_b: bytes,
  key_fingerprint: long,
}
export type encryptedChatDiscarded = {
  _: "encryptedChatDiscarded",
  id: int,
}
export type inputEncryptedChat = {
  _: "inputEncryptedChat",
  chat_id: int,
  access_hash: long,
}
export type encryptedFileEmpty = {
  _: "encryptedFileEmpty",

}
export type encryptedFile = {
  _: "encryptedFile",
  id: long,
  access_hash: long,
  size: int,
  dc_id: int,
  key_fingerprint: int,
}
export type inputEncryptedFileEmpty = {
  _: "inputEncryptedFileEmpty",

}
export type inputEncryptedFileUploaded = {
  _: "inputEncryptedFileUploaded",
  id: long,
  parts: int,
  md5_checksum: string,
  key_fingerprint: int,
}
export type inputEncryptedFile = {
  _: "inputEncryptedFile",
  id: long,
  access_hash: long,
}
export type inputEncryptedFileBigUploaded = {
  _: "inputEncryptedFileBigUploaded",
  id: long,
  parts: int,
  key_fingerprint: int,
}
export type encryptedMessage = {
  _: "encryptedMessage",
  random_id: long,
  chat_id: int,
  date: int,
  bytes: bytes,
  file: EncryptedFile,
}
export type encryptedMessageService = {
  _: "encryptedMessageService",
  random_id: long,
  chat_id: int,
  date: int,
  bytes: bytes,
}
export type messages$dhConfigNotModified = {
  _: "messages.dhConfigNotModified",
  random: bytes,
}
export type messages$dhConfig = {
  _: "messages.dhConfig",
  g: int,
  p: bytes,
  version: int,
  random: bytes,
}
export type messages$sentEncryptedMessage = {
  _: "messages.sentEncryptedMessage",
  date: int,
}
export type messages$sentEncryptedFile = {
  _: "messages.sentEncryptedFile",
  date: int,
  file: EncryptedFile,
}
export type inputDocumentEmpty = {
  _: "inputDocumentEmpty",

}
export type inputDocument = {
  _: "inputDocument",
  id: long,
  access_hash: long,
}
export type documentEmpty = {
  _: "documentEmpty",
  id: long,
}
export type document = {
  _: "document",
  id: long,
  access_hash: long,
  date: int,
  mime_type: string,
  size: int,
  thumb: PhotoSize,
  dc_id: int,
  version: int,
  attributes: Vector<DocumentAttribute>,
}
export type help$support = {
  _: "help.support",
  phone_number: string,
  user: User,
}
export type notifyPeer = {
  _: "notifyPeer",
  peer: Peer,
}
export type notifyUsers = {
  _: "notifyUsers",

}
export type notifyChats = {
  _: "notifyChats",

}
export type notifyAll = {
  _: "notifyAll",

}
export type sendMessageTypingAction = {
  _: "sendMessageTypingAction",

}
export type sendMessageCancelAction = {
  _: "sendMessageCancelAction",

}
export type sendMessageRecordVideoAction = {
  _: "sendMessageRecordVideoAction",

}
export type sendMessageUploadVideoAction = {
  _: "sendMessageUploadVideoAction",
  progress: int,
}
export type sendMessageRecordAudioAction = {
  _: "sendMessageRecordAudioAction",

}
export type sendMessageUploadAudioAction = {
  _: "sendMessageUploadAudioAction",
  progress: int,
}
export type sendMessageUploadPhotoAction = {
  _: "sendMessageUploadPhotoAction",
  progress: int,
}
export type sendMessageUploadDocumentAction = {
  _: "sendMessageUploadDocumentAction",
  progress: int,
}
export type sendMessageGeoLocationAction = {
  _: "sendMessageGeoLocationAction",

}
export type sendMessageChooseContactAction = {
  _: "sendMessageChooseContactAction",

}
export type sendMessageGamePlayAction = {
  _: "sendMessageGamePlayAction",

}
export type sendMessageRecordRoundAction = {
  _: "sendMessageRecordRoundAction",

}
export type sendMessageUploadRoundAction = {
  _: "sendMessageUploadRoundAction",
  progress: int,
}
export type contacts$found = {
  _: "contacts.found",
  results: Vector<Peer>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type inputPrivacyKeyStatusTimestamp = {
  _: "inputPrivacyKeyStatusTimestamp",

}
export type inputPrivacyKeyChatInvite = {
  _: "inputPrivacyKeyChatInvite",

}
export type inputPrivacyKeyPhoneCall = {
  _: "inputPrivacyKeyPhoneCall",

}
export type privacyKeyStatusTimestamp = {
  _: "privacyKeyStatusTimestamp",

}
export type privacyKeyChatInvite = {
  _: "privacyKeyChatInvite",

}
export type privacyKeyPhoneCall = {
  _: "privacyKeyPhoneCall",

}
export type inputPrivacyValueAllowContacts = {
  _: "inputPrivacyValueAllowContacts",

}
export type inputPrivacyValueAllowAll = {
  _: "inputPrivacyValueAllowAll",

}
export type inputPrivacyValueAllowUsers = {
  _: "inputPrivacyValueAllowUsers",
  users: Vector<InputUser>,
}
export type inputPrivacyValueDisallowContacts = {
  _: "inputPrivacyValueDisallowContacts",

}
export type inputPrivacyValueDisallowAll = {
  _: "inputPrivacyValueDisallowAll",

}
export type inputPrivacyValueDisallowUsers = {
  _: "inputPrivacyValueDisallowUsers",
  users: Vector<InputUser>,
}
export type privacyValueAllowContacts = {
  _: "privacyValueAllowContacts",

}
export type privacyValueAllowAll = {
  _: "privacyValueAllowAll",

}
export type privacyValueAllowUsers = {
  _: "privacyValueAllowUsers",
  users: Vector<int>,
}
export type privacyValueDisallowContacts = {
  _: "privacyValueDisallowContacts",

}
export type privacyValueDisallowAll = {
  _: "privacyValueDisallowAll",

}
export type privacyValueDisallowUsers = {
  _: "privacyValueDisallowUsers",
  users: Vector<int>,
}
export type account$privacyRules = {
  _: "account.privacyRules",
  rules: Vector<PrivacyRule>,
  users: Vector<User>,
}
export type accountDaysTTL = {
  _: "accountDaysTTL",
  days: int,
}
export type documentAttributeImageSize = {
  _: "documentAttributeImageSize",
  w: int,
  h: int,
}
export type documentAttributeAnimated = {
  _: "documentAttributeAnimated",

}
export type documentAttributeSticker = {
  _: "documentAttributeSticker",
  flags: number,
  mask?: true,
  alt: string,
  stickerset: InputStickerSet,
  mask_coords?: MaskCoords,
}
export type documentAttributeVideo = {
  _: "documentAttributeVideo",
  flags: number,
  round_message?: true,
  duration: int,
  w: int,
  h: int,
}
export type documentAttributeAudio = {
  _: "documentAttributeAudio",
  flags: number,
  voice?: true,
  duration: int,
  title?: string,
  performer?: string,
  waveform?: bytes,
}
export type documentAttributeFilename = {
  _: "documentAttributeFilename",
  file_name: string,
}
export type documentAttributeHasStickers = {
  _: "documentAttributeHasStickers",

}
export type messages$stickersNotModified = {
  _: "messages.stickersNotModified",

}
export type messages$stickers = {
  _: "messages.stickers",
  hash: string,
  stickers: Vector<Document>,
}
export type stickerPack = {
  _: "stickerPack",
  emoticon: string,
  documents: Vector<long>,
}
export type messages$allStickersNotModified = {
  _: "messages.allStickersNotModified",

}
export type messages$allStickers = {
  _: "messages.allStickers",
  hash: int,
  sets: Vector<StickerSet>,
}
export type disabledFeature = {
  _: "disabledFeature",
  feature: string,
  description: string,
}
export type messages$affectedMessages = {
  _: "messages.affectedMessages",
  pts: int,
  pts_count: int,
}
export type contactLinkUnknown = {
  _: "contactLinkUnknown",

}
export type contactLinkNone = {
  _: "contactLinkNone",

}
export type contactLinkHasPhone = {
  _: "contactLinkHasPhone",

}
export type contactLinkContact = {
  _: "contactLinkContact",

}
export type webPageEmpty = {
  _: "webPageEmpty",
  id: long,
}
export type webPagePending = {
  _: "webPagePending",
  id: long,
  date: int,
}
export type webPage = {
  _: "webPage",
  flags: number,
  id: long,
  url: string,
  display_url: string,
  hash: int,
  type?: string,
  site_name?: string,
  title?: string,
  description?: string,
  photo?: Photo,
  embed_url?: string,
  embed_type?: string,
  embed_width?: int,
  embed_height?: int,
  duration?: int,
  author?: string,
  document?: Document,
  cached_page?: Page,
}
export type webPageNotModified = {
  _: "webPageNotModified",

}
export type authorization = {
  _: "authorization",
  hash: long,
  flags: int,
  device_model: string,
  platform: string,
  system_version: string,
  api_id: int,
  app_name: string,
  app_version: string,
  date_created: int,
  date_active: int,
  ip: string,
  country: string,
  region: string,
}
export type account$authorizations = {
  _: "account.authorizations",
  authorizations: Vector<Authorization>,
}
export type account$noPassword = {
  _: "account.noPassword",
  new_salt: bytes,
  email_unconfirmed_pattern: string,
}
export type account$password = {
  _: "account.password",
  current_salt: bytes,
  new_salt: bytes,
  hint: string,
  has_recovery: boolean,
  email_unconfirmed_pattern: string,
}
export type account$passwordSettings = {
  _: "account.passwordSettings",
  email: string,
}
export type account$passwordInputSettings = {
  _: "account.passwordInputSettings",
  flags: number,
  new_salt?: bytes,
  new_password_hash?: bytes,
  hint?: string,
  email?: string,
}
export type auth$passwordRecovery = {
  _: "auth.passwordRecovery",
  email_pattern: string,
}
export type receivedNotifyMessage = {
  _: "receivedNotifyMessage",
  id: int,
  flags: int,
}
export type chatInviteEmpty = {
  _: "chatInviteEmpty",

}
export type chatInviteExported = {
  _: "chatInviteExported",
  link: string,
}
export type chatInviteAlready = {
  _: "chatInviteAlready",
  chat: Chat,
}
export type chatInvite = {
  _: "chatInvite",
  flags: number,
  channel?: true,
  broadcast?: true,
  public?: true,
  megagroup?: true,
  title: string,
  photo: ChatPhoto,
  participants_count: int,
  participants?: Vector<User>,
}
export type inputStickerSetEmpty = {
  _: "inputStickerSetEmpty",

}
export type inputStickerSetID = {
  _: "inputStickerSetID",
  id: long,
  access_hash: long,
}
export type inputStickerSetShortName = {
  _: "inputStickerSetShortName",
  short_name: string,
}
export type stickerSet = {
  _: "stickerSet",
  flags: number,
  installed?: true,
  archived?: true,
  official?: true,
  masks?: true,
  id: long,
  access_hash: long,
  title: string,
  short_name: string,
  count: int,
  hash: int,
}
export type messages$stickerSet = {
  _: "messages.stickerSet",
  set: StickerSet,
  packs: Vector<StickerPack>,
  documents: Vector<Document>,
}
export type botCommand = {
  _: "botCommand",
  command: string,
  description: string,
}
export type botInfo = {
  _: "botInfo",
  user_id: int,
  description: string,
  commands: Vector<BotCommand>,
}
export type keyboardButton = {
  _: "keyboardButton",
  text: string,
}
export type keyboardButtonUrl = {
  _: "keyboardButtonUrl",
  text: string,
  url: string,
}
export type keyboardButtonCallback = {
  _: "keyboardButtonCallback",
  text: string,
  data: bytes,
}
export type keyboardButtonRequestPhone = {
  _: "keyboardButtonRequestPhone",
  text: string,
}
export type keyboardButtonRequestGeoLocation = {
  _: "keyboardButtonRequestGeoLocation",
  text: string,
}
export type keyboardButtonSwitchInline = {
  _: "keyboardButtonSwitchInline",
  flags: number,
  same_peer?: true,
  text: string,
  query: string,
}
export type keyboardButtonGame = {
  _: "keyboardButtonGame",
  text: string,
}
export type keyboardButtonBuy = {
  _: "keyboardButtonBuy",
  text: string,
}
export type keyboardButtonRow = {
  _: "keyboardButtonRow",
  buttons: Vector<KeyboardButton>,
}
export type replyKeyboardHide = {
  _: "replyKeyboardHide",
  flags: number,
  selective?: true,
}
export type replyKeyboardForceReply = {
  _: "replyKeyboardForceReply",
  flags: number,
  single_use?: true,
  selective?: true,
}
export type replyKeyboardMarkup = {
  _: "replyKeyboardMarkup",
  flags: number,
  resize?: true,
  single_use?: true,
  selective?: true,
  rows: Vector<KeyboardButtonRow>,
}
export type replyInlineMarkup = {
  _: "replyInlineMarkup",
  rows: Vector<KeyboardButtonRow>,
}
export type messageEntityUnknown = {
  _: "messageEntityUnknown",
  offset: int,
  length: int,
}
export type messageEntityMention = {
  _: "messageEntityMention",
  offset: int,
  length: int,
}
export type messageEntityHashtag = {
  _: "messageEntityHashtag",
  offset: int,
  length: int,
}
export type messageEntityBotCommand = {
  _: "messageEntityBotCommand",
  offset: int,
  length: int,
}
export type messageEntityUrl = {
  _: "messageEntityUrl",
  offset: int,
  length: int,
}
export type messageEntityEmail = {
  _: "messageEntityEmail",
  offset: int,
  length: int,
}
export type messageEntityBold = {
  _: "messageEntityBold",
  offset: int,
  length: int,
}
export type messageEntityItalic = {
  _: "messageEntityItalic",
  offset: int,
  length: int,
}
export type messageEntityCode = {
  _: "messageEntityCode",
  offset: int,
  length: int,
}
export type messageEntityPre = {
  _: "messageEntityPre",
  offset: int,
  length: int,
  language: string,
}
export type messageEntityTextUrl = {
  _: "messageEntityTextUrl",
  offset: int,
  length: int,
  url: string,
}
export type messageEntityMentionName = {
  _: "messageEntityMentionName",
  offset: int,
  length: int,
  user_id: int,
}
export type inputMessageEntityMentionName = {
  _: "inputMessageEntityMentionName",
  offset: int,
  length: int,
  user_id: InputUser,
}
export type inputChannelEmpty = {
  _: "inputChannelEmpty",

}
export type inputChannel = {
  _: "inputChannel",
  channel_id: int,
  access_hash: long,
}
export type contacts$resolvedPeer = {
  _: "contacts.resolvedPeer",
  peer: Peer,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type messageRange = {
  _: "messageRange",
  min_id: int,
  max_id: int,
}
export type updates$channelDifferenceEmpty = {
  _: "updates.channelDifferenceEmpty",
  flags: number,
  final?: true,
  pts: int,
  timeout?: int,
}
export type updates$channelDifferenceTooLong = {
  _: "updates.channelDifferenceTooLong",
  flags: number,
  final?: true,
  pts: int,
  timeout?: int,
  top_message: int,
  read_inbox_max_id: int,
  read_outbox_max_id: int,
  unread_count: int,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type updates$channelDifference = {
  _: "updates.channelDifference",
  flags: number,
  final?: true,
  pts: int,
  timeout?: int,
  new_messages: Vector<Message>,
  other_updates: Vector<Update>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type channelMessagesFilterEmpty = {
  _: "channelMessagesFilterEmpty",

}
export type channelMessagesFilter = {
  _: "channelMessagesFilter",
  flags: number,
  exclude_new_messages?: true,
  ranges: Vector<MessageRange>,
}
export type channelParticipant = {
  _: "channelParticipant",
  user_id: int,
  date: int,
}
export type channelParticipantSelf = {
  _: "channelParticipantSelf",
  user_id: int,
  inviter_id: int,
  date: int,
}
export type channelParticipantModerator = {
  _: "channelParticipantModerator",
  user_id: int,
  inviter_id: int,
  date: int,
}
export type channelParticipantEditor = {
  _: "channelParticipantEditor",
  user_id: int,
  inviter_id: int,
  date: int,
}
export type channelParticipantKicked = {
  _: "channelParticipantKicked",
  user_id: int,
  kicked_by: int,
  date: int,
}
export type channelParticipantCreator = {
  _: "channelParticipantCreator",
  user_id: int,
}
export type channelParticipantsRecent = {
  _: "channelParticipantsRecent",

}
export type channelParticipantsAdmins = {
  _: "channelParticipantsAdmins",

}
export type channelParticipantsKicked = {
  _: "channelParticipantsKicked",

}
export type channelParticipantsBots = {
  _: "channelParticipantsBots",

}
export type channelRoleEmpty = {
  _: "channelRoleEmpty",

}
export type channelRoleModerator = {
  _: "channelRoleModerator",

}
export type channelRoleEditor = {
  _: "channelRoleEditor",

}
export type channels$channelParticipants = {
  _: "channels.channelParticipants",
  count: int,
  participants: Vector<ChannelParticipant>,
  users: Vector<User>,
}
export type channels$channelParticipant = {
  _: "channels.channelParticipant",
  participant: ChannelParticipant,
  users: Vector<User>,
}
export type help$termsOfService = {
  _: "help.termsOfService",
  text: string,
}
export type foundGif = {
  _: "foundGif",
  url: string,
  thumb_url: string,
  content_url: string,
  content_type: string,
  w: int,
  h: int,
}
export type foundGifCached = {
  _: "foundGifCached",
  url: string,
  photo: Photo,
  document: Document,
}
export type messages$foundGifs = {
  _: "messages.foundGifs",
  next_offset: int,
  results: Vector<FoundGif>,
}
export type messages$savedGifsNotModified = {
  _: "messages.savedGifsNotModified",

}
export type messages$savedGifs = {
  _: "messages.savedGifs",
  hash: int,
  gifs: Vector<Document>,
}
export type inputBotInlineMessageMediaAuto = {
  _: "inputBotInlineMessageMediaAuto",
  flags: number,
  caption: string,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineMessageText = {
  _: "inputBotInlineMessageText",
  flags: number,
  no_webpage?: true,
  message: string,
  entities?: Vector<MessageEntity>,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineMessageMediaGeo = {
  _: "inputBotInlineMessageMediaGeo",
  flags: number,
  geo_point: InputGeoPoint,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineMessageMediaVenue = {
  _: "inputBotInlineMessageMediaVenue",
  flags: number,
  geo_point: InputGeoPoint,
  title: string,
  address: string,
  provider: string,
  venue_id: string,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineMessageMediaContact = {
  _: "inputBotInlineMessageMediaContact",
  flags: number,
  phone_number: string,
  first_name: string,
  last_name: string,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineMessageGame = {
  _: "inputBotInlineMessageGame",
  flags: number,
  reply_markup?: ReplyMarkup,
}
export type inputBotInlineResult = {
  _: "inputBotInlineResult",
  flags: number,
  id: string,
  type: string,
  title?: string,
  description?: string,
  url?: string,
  thumb_url?: string,
  content_url?: string,
  content_type?: string,
  w?: int,
  h?: int,
  duration?: int,
  send_message: InputBotInlineMessage,
}
export type inputBotInlineResultPhoto = {
  _: "inputBotInlineResultPhoto",
  id: string,
  type: string,
  photo: InputPhoto,
  send_message: InputBotInlineMessage,
}
export type inputBotInlineResultDocument = {
  _: "inputBotInlineResultDocument",
  flags: number,
  id: string,
  type: string,
  title?: string,
  description?: string,
  document: InputDocument,
  send_message: InputBotInlineMessage,
}
export type inputBotInlineResultGame = {
  _: "inputBotInlineResultGame",
  id: string,
  short_name: string,
  send_message: InputBotInlineMessage,
}
export type botInlineMessageMediaAuto = {
  _: "botInlineMessageMediaAuto",
  flags: number,
  caption: string,
  reply_markup?: ReplyMarkup,
}
export type botInlineMessageText = {
  _: "botInlineMessageText",
  flags: number,
  no_webpage?: true,
  message: string,
  entities?: Vector<MessageEntity>,
  reply_markup?: ReplyMarkup,
}
export type botInlineMessageMediaGeo = {
  _: "botInlineMessageMediaGeo",
  flags: number,
  geo: GeoPoint,
  reply_markup?: ReplyMarkup,
}
export type botInlineMessageMediaVenue = {
  _: "botInlineMessageMediaVenue",
  flags: number,
  geo: GeoPoint,
  title: string,
  address: string,
  provider: string,
  venue_id: string,
  reply_markup?: ReplyMarkup,
}
export type botInlineMessageMediaContact = {
  _: "botInlineMessageMediaContact",
  flags: number,
  phone_number: string,
  first_name: string,
  last_name: string,
  reply_markup?: ReplyMarkup,
}
export type botInlineResult = {
  _: "botInlineResult",
  flags: number,
  id: string,
  type: string,
  title?: string,
  description?: string,
  url?: string,
  thumb_url?: string,
  content_url?: string,
  content_type?: string,
  w?: int,
  h?: int,
  duration?: int,
  send_message: BotInlineMessage,
}
export type botInlineMediaResult = {
  _: "botInlineMediaResult",
  flags: number,
  id: string,
  type: string,
  photo?: Photo,
  document?: Document,
  title?: string,
  description?: string,
  send_message: BotInlineMessage,
}
export type messages$botResults = {
  _: "messages.botResults",
  flags: number,
  gallery?: true,
  query_id: long,
  next_offset?: string,
  switch_pm?: InlineBotSwitchPM,
  results: Vector<BotInlineResult>,
  cache_time: int,
}
export type exportedMessageLink = {
  _: "exportedMessageLink",
  link: string,
}
export type messageFwdHeader = {
  _: "messageFwdHeader",
  flags: number,
  from_id?: int,
  date: int,
  channel_id?: int,
  channel_post?: int,
}
export type auth$codeTypeSms = {
  _: "auth.codeTypeSms",

}
export type auth$codeTypeCall = {
  _: "auth.codeTypeCall",

}
export type auth$codeTypeFlashCall = {
  _: "auth.codeTypeFlashCall",

}
export type auth$sentCodeTypeApp = {
  _: "auth.sentCodeTypeApp",
  length: int,
}
export type auth$sentCodeTypeSms = {
  _: "auth.sentCodeTypeSms",
  length: int,
}
export type auth$sentCodeTypeCall = {
  _: "auth.sentCodeTypeCall",
  length: int,
}
export type auth$sentCodeTypeFlashCall = {
  _: "auth.sentCodeTypeFlashCall",
  pattern: string,
}
export type messages$botCallbackAnswer = {
  _: "messages.botCallbackAnswer",
  flags: number,
  alert?: true,
  has_url?: true,
  message?: string,
  url?: string,
  cache_time: int,
}
export type messages$messageEditData = {
  _: "messages.messageEditData",
  flags: number,
  caption?: true,
}
export type inputBotInlineMessageID = {
  _: "inputBotInlineMessageID",
  dc_id: int,
  id: long,
  access_hash: long,
}
export type inlineBotSwitchPM = {
  _: "inlineBotSwitchPM",
  text: string,
  start_param: string,
}
export type messages$peerDialogs = {
  _: "messages.peerDialogs",
  dialogs: Vector<Dialog>,
  messages: Vector<Message>,
  chats: Vector<Chat>,
  users: Vector<User>,
  state: updates$State,
}
export type topPeer = {
  _: "topPeer",
  peer: Peer,
  rating: double,
}
export type topPeerCategoryBotsPM = {
  _: "topPeerCategoryBotsPM",

}
export type topPeerCategoryBotsInline = {
  _: "topPeerCategoryBotsInline",

}
export type topPeerCategoryCorrespondents = {
  _: "topPeerCategoryCorrespondents",

}
export type topPeerCategoryGroups = {
  _: "topPeerCategoryGroups",

}
export type topPeerCategoryChannels = {
  _: "topPeerCategoryChannels",

}
export type topPeerCategoryPeers = {
  _: "topPeerCategoryPeers",
  category: TopPeerCategory,
  count: int,
  peers: Vector<TopPeer>,
}
export type contacts$topPeersNotModified = {
  _: "contacts.topPeersNotModified",

}
export type contacts$topPeers = {
  _: "contacts.topPeers",
  categories: Vector<TopPeerCategoryPeers>,
  chats: Vector<Chat>,
  users: Vector<User>,
}
export type draftMessageEmpty = {
  _: "draftMessageEmpty",

}
export type draftMessage = {
  _: "draftMessage",
  flags: number,
  no_webpage?: true,
  reply_to_msg_id?: int,
  message: string,
  entities?: Vector<MessageEntity>,
  date: int,
}
export type messages$featuredStickersNotModified = {
  _: "messages.featuredStickersNotModified",

}
export type messages$featuredStickers = {
  _: "messages.featuredStickers",
  hash: int,
  sets: Vector<StickerSetCovered>,
  unread: Vector<long>,
}
export type messages$recentStickersNotModified = {
  _: "messages.recentStickersNotModified",

}
export type messages$recentStickers = {
  _: "messages.recentStickers",
  hash: int,
  stickers: Vector<Document>,
}
export type messages$archivedStickers = {
  _: "messages.archivedStickers",
  count: int,
  sets: Vector<StickerSetCovered>,
}
export type messages$stickerSetInstallResultSuccess = {
  _: "messages.stickerSetInstallResultSuccess",

}
export type messages$stickerSetInstallResultArchive = {
  _: "messages.stickerSetInstallResultArchive",
  sets: Vector<StickerSetCovered>,
}
export type stickerSetCovered = {
  _: "stickerSetCovered",
  set: StickerSet,
  cover: Document,
}
export type stickerSetMultiCovered = {
  _: "stickerSetMultiCovered",
  set: StickerSet,
  covers: Vector<Document>,
}
export type maskCoords = {
  _: "maskCoords",
  n: int,
  x: double,
  y: double,
  zoom: double,
}
export type inputStickeredMediaPhoto = {
  _: "inputStickeredMediaPhoto",
  id: InputPhoto,
}
export type inputStickeredMediaDocument = {
  _: "inputStickeredMediaDocument",
  id: InputDocument,
}
export type game = {
  _: "game",
  flags: number,
  id: long,
  access_hash: long,
  short_name: string,
  title: string,
  description: string,
  photo: Photo,
  document?: Document,
}
export type inputGameID = {
  _: "inputGameID",
  id: long,
  access_hash: long,
}
export type inputGameShortName = {
  _: "inputGameShortName",
  bot_id: InputUser,
  short_name: string,
}
export type highScore = {
  _: "highScore",
  pos: int,
  user_id: int,
  score: int,
}
export type messages$highScores = {
  _: "messages.highScores",
  scores: Vector<HighScore>,
  users: Vector<User>,
}
export type textEmpty = {
  _: "textEmpty",

}
export type textPlain = {
  _: "textPlain",
  text: string,
}
export type textBold = {
  _: "textBold",
  text: RichText,
}
export type textItalic = {
  _: "textItalic",
  text: RichText,
}
export type textUnderline = {
  _: "textUnderline",
  text: RichText,
}
export type textStrike = {
  _: "textStrike",
  text: RichText,
}
export type textFixed = {
  _: "textFixed",
  text: RichText,
}
export type textUrl = {
  _: "textUrl",
  text: RichText,
  url: string,
  webpage_id: long,
}
export type textEmail = {
  _: "textEmail",
  text: RichText,
  email: string,
}
export type textConcat = {
  _: "textConcat",
  texts: Vector<RichText>,
}
export type pageBlockUnsupported = {
  _: "pageBlockUnsupported",

}
export type pageBlockTitle = {
  _: "pageBlockTitle",
  text: RichText,
}
export type pageBlockSubtitle = {
  _: "pageBlockSubtitle",
  text: RichText,
}
export type pageBlockAuthorDate = {
  _: "pageBlockAuthorDate",
  author: RichText,
  published_date: int,
}
export type pageBlockHeader = {
  _: "pageBlockHeader",
  text: RichText,
}
export type pageBlockSubheader = {
  _: "pageBlockSubheader",
  text: RichText,
}
export type pageBlockParagraph = {
  _: "pageBlockParagraph",
  text: RichText,
}
export type pageBlockPreformatted = {
  _: "pageBlockPreformatted",
  text: RichText,
  language: string,
}
export type pageBlockFooter = {
  _: "pageBlockFooter",
  text: RichText,
}
export type pageBlockDivider = {
  _: "pageBlockDivider",

}
export type pageBlockAnchor = {
  _: "pageBlockAnchor",
  name: string,
}
export type pageBlockList = {
  _: "pageBlockList",
  ordered: boolean,
  items: Vector<RichText>,
}
export type pageBlockBlockquote = {
  _: "pageBlockBlockquote",
  text: RichText,
  caption: RichText,
}
export type pageBlockPullquote = {
  _: "pageBlockPullquote",
  text: RichText,
  caption: RichText,
}
export type pageBlockPhoto = {
  _: "pageBlockPhoto",
  photo_id: long,
  caption: RichText,
}
export type pageBlockVideo = {
  _: "pageBlockVideo",
  flags: number,
  autoplay?: true,
  loop?: true,
  video_id: long,
  caption: RichText,
}
export type pageBlockCover = {
  _: "pageBlockCover",
  cover: PageBlock,
}
export type pageBlockEmbed = {
  _: "pageBlockEmbed",
  flags: number,
  full_width?: true,
  allow_scrolling?: true,
  url?: string,
  html?: string,
  poster_photo_id?: long,
  w: int,
  h: int,
  caption: RichText,
}
export type pageBlockEmbedPost = {
  _: "pageBlockEmbedPost",
  url: string,
  webpage_id: long,
  author_photo_id: long,
  author: string,
  date: int,
  blocks: Vector<PageBlock>,
  caption: RichText,
}
export type pageBlockCollage = {
  _: "pageBlockCollage",
  items: Vector<PageBlock>,
  caption: RichText,
}
export type pageBlockSlideshow = {
  _: "pageBlockSlideshow",
  items: Vector<PageBlock>,
  caption: RichText,
}
export type pageBlockChannel = {
  _: "pageBlockChannel",
  channel: Chat,
}
export type pagePart = {
  _: "pagePart",
  blocks: Vector<PageBlock>,
  photos: Vector<Photo>,
  videos: Vector<Document>,
}
export type pageFull = {
  _: "pageFull",
  blocks: Vector<PageBlock>,
  photos: Vector<Photo>,
  videos: Vector<Document>,
}
export type phoneCallDiscardReasonMissed = {
  _: "phoneCallDiscardReasonMissed",

}
export type phoneCallDiscardReasonDisconnect = {
  _: "phoneCallDiscardReasonDisconnect",

}
export type phoneCallDiscardReasonHangup = {
  _: "phoneCallDiscardReasonHangup",

}
export type phoneCallDiscardReasonBusy = {
  _: "phoneCallDiscardReasonBusy",

}
export type dataJSON = {
  _: "dataJSON",
  data: string,
}
export type labeledPrice = {
  _: "labeledPrice",
  label: string,
  amount: long,
}
export type invoice = {
  _: "invoice",
  flags: number,
  test?: true,
  name_requested?: true,
  phone_requested?: true,
  email_requested?: true,
  shipping_address_requested?: true,
  flexible?: true,
  currency: string,
  prices: Vector<LabeledPrice>,
}
export type paymentCharge = {
  _: "paymentCharge",
  id: string,
  provider_charge_id: string,
}
export type postAddress = {
  _: "postAddress",
  street_line1: string,
  street_line2: string,
  city: string,
  state: string,
  country_iso2: string,
  post_code: string,
}
export type paymentRequestedInfo = {
  _: "paymentRequestedInfo",
  flags: number,
  name?: string,
  phone?: string,
  email?: string,
  shipping_address?: PostAddress,
}
export type paymentSavedCredentialsCard = {
  _: "paymentSavedCredentialsCard",
  id: string,
  title: string,
}
export type webDocument = {
  _: "webDocument",
  url: string,
  access_hash: long,
  size: int,
  mime_type: string,
  attributes: Vector<DocumentAttribute>,
  dc_id: int,
}
export type inputWebDocument = {
  _: "inputWebDocument",
  url: string,
  size: int,
  mime_type: string,
  attributes: Vector<DocumentAttribute>,
}
export type inputWebFileLocation = {
  _: "inputWebFileLocation",
  url: string,
  access_hash: long,
}
export type upload$webFile = {
  _: "upload.webFile",
  size: int,
  mime_type: string,
  file_type: storage$FileType,
  mtime: int,
  bytes: bytes,
}
export type payments$paymentForm = {
  _: "payments.paymentForm",
  flags: number,
  can_save_credentials?: true,
  password_missing?: true,
  bot_id: int,
  invoice: Invoice,
  provider_id: int,
  url: string,
  native_provider?: string,
  native_params?: DataJSON,
  saved_info?: PaymentRequestedInfo,
  saved_credentials?: PaymentSavedCredentials,
  users: Vector<User>,
}
export type payments$validatedRequestedInfo = {
  _: "payments.validatedRequestedInfo",
  flags: number,
  id?: string,
  shipping_options?: Vector<ShippingOption>,
}
export type payments$paymentResult = {
  _: "payments.paymentResult",
  updates: Updates,
}
export type payments$paymentVerficationNeeded = {
  _: "payments.paymentVerficationNeeded",
  url: string,
}
export type payments$paymentReceipt = {
  _: "payments.paymentReceipt",
  flags: number,
  date: int,
  bot_id: int,
  invoice: Invoice,
  provider_id: int,
  info?: PaymentRequestedInfo,
  shipping?: ShippingOption,
  currency: string,
  total_amount: long,
  credentials_title: string,
  users: Vector<User>,
}
export type payments$savedInfo = {
  _: "payments.savedInfo",
  flags: number,
  has_saved_credentials?: true,
  saved_info?: PaymentRequestedInfo,
}
export type inputPaymentCredentialsSaved = {
  _: "inputPaymentCredentialsSaved",
  id: string,
  tmp_password: bytes,
}
export type inputPaymentCredentials = {
  _: "inputPaymentCredentials",
  flags: number,
  save?: true,
  data: DataJSON,
}
export type account$tmpPassword = {
  _: "account.tmpPassword",
  tmp_password: bytes,
  valid_until: int,
}
export type shippingOption = {
  _: "shippingOption",
  id: string,
  title: string,
  prices: Vector<LabeledPrice>,
}
export type inputStickerSetItem = {
  _: "inputStickerSetItem",
  flags: number,
  document: InputDocument,
  emoji: string,
  mask_coords?: MaskCoords,
}
export type inputPhoneCall = {
  _: "inputPhoneCall",
  id: long,
  access_hash: long,
}
export type phoneCallEmpty = {
  _: "phoneCallEmpty",
  id: long,
}
export type phoneCallWaiting = {
  _: "phoneCallWaiting",
  flags: number,
  id: long,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  protocol: PhoneCallProtocol,
  receive_date?: int,
}
export type phoneCallRequested = {
  _: "phoneCallRequested",
  id: long,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  g_a_hash: bytes,
  protocol: PhoneCallProtocol,
}
export type phoneCallAccepted = {
  _: "phoneCallAccepted",
  id: long,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  g_b: bytes,
  protocol: PhoneCallProtocol,
}
export type phoneCall = {
  _: "phoneCall",
  id: long,
  access_hash: long,
  date: int,
  admin_id: int,
  participant_id: int,
  g_a_or_b: bytes,
  key_fingerprint: long,
  protocol: PhoneCallProtocol,
  connection: PhoneConnection,
  alternative_connections: Vector<PhoneConnection>,
  start_date: int,
}
export type phoneCallDiscarded = {
  _: "phoneCallDiscarded",
  flags: number,
  need_rating?: true,
  need_debug?: true,
  id: long,
  reason?: PhoneCallDiscardReason,
  duration?: int,
}
export type phoneConnection = {
  _: "phoneConnection",
  id: long,
  ip: string,
  ipv6: string,
  port: int,
  peer_tag: bytes,
}
export type phoneCallProtocol = {
  _: "phoneCallProtocol",
  flags: number,
  udp_p2p?: true,
  udp_reflector?: true,
  min_layer: int,
  max_layer: int,
}
export type phone$phoneCall = {
  _: "phone.phoneCall",
  phone_call: PhoneCall,
  users: Vector<User>,
}
export type upload$cdnFileReuploadNeeded = {
  _: "upload.cdnFileReuploadNeeded",
  request_token: bytes,
}
export type upload$cdnFile = {
  _: "upload.cdnFile",
  bytes: bytes,
}
export type cdnPublicKey = {
  _: "cdnPublicKey",
  dc_id: int,
  public_key: string,
}
export type cdnConfig = {
  _: "cdnConfig",
  public_keys: Vector<CdnPublicKey>,
}
export type langPackString = {
  _: "langPackString",
  key: string,
  value: string,
}
export type langPackStringPluralized = {
  _: "langPackStringPluralized",
  flags: number,
  key: string,
  zero_value?: string,
  one_value?: string,
  two_value?: string,
  few_value?: string,
  many_value?: string,
  other_value: string,
}
export type langPackStringDeleted = {
  _: "langPackStringDeleted",
  key: string,
}
export type langPackDifference = {
  _: "langPackDifference",
  lang_code: string,
  from_version: int,
  version: int,
  strings: Vector<LangPackString>,
}
export type langPackLanguage = {
  _: "langPackLanguage",
  name: string,
  native_name: string,
  lang_code: string,
}
export type ResPQ = resPQ
export type P_Q_inner_data = p_q_inner_data
export type Server_DH_Params = server_DH_params_fail | server_DH_params_ok
export type Server_DH_inner_data = server_DH_inner_data
export type Client_DH_Inner_Data = client_DH_inner_data
export type Set_client_DH_params_answer = dh_gen_ok | dh_gen_retry | dh_gen_fail
export type DestroyAuthKeyRes = destroy_auth_key_ok | destroy_auth_key_none | destroy_auth_key_fail
export type MsgsAck = msgs_ack
export type BadMsgNotification = bad_msg_notification | bad_server_salt
export type MsgsStateReq = msgs_state_req
export type MsgsStateInfo = msgs_state_info
export type MsgsAllInfo = msgs_all_info
export type MsgDetailedInfo = msg_detailed_info | msg_new_detailed_info
export type MsgResendReq = msg_resend_req
export type RpcError = rpc_error
export type RpcDropAnswer = rpc_answer_unknown | rpc_answer_dropped_running | rpc_answer_dropped
export type FutureSalt = future_salt
export type FutureSalts = future_salts
export type Pong = pong
export type DestroySessionRes = destroy_session_ok | destroy_session_none
export type NewSession = new_session_created
export type HttpWait = http_wait
export type Vector<t> = vector<t>
export type Error = error
export type InputPeer = inputPeerEmpty | inputPeerSelf | inputPeerChat | inputPeerUser | inputPeerChannel
export type InputUser = inputUserEmpty | inputUserSelf | inputUser
export type InputContact = inputPhoneContact
export type InputFile = inputFile | inputFileBig
export type InputMedia = inputMediaEmpty | inputMediaUploadedPhoto | inputMediaPhoto | inputMediaGeoPoint | inputMediaContact | inputMediaUploadedDocument | inputMediaUploadedThumbDocument | inputMediaDocument | inputMediaVenue | inputMediaGifExternal | inputMediaPhotoExternal | inputMediaDocumentExternal | inputMediaGame | inputMediaInvoice
export type InputChatPhoto = inputChatPhotoEmpty | inputChatUploadedPhoto | inputChatPhoto
export type InputGeoPoint = inputGeoPointEmpty | inputGeoPoint
export type InputPhoto = inputPhotoEmpty | inputPhoto
export type InputFileLocation = inputFileLocation | inputEncryptedFileLocation | inputDocumentFileLocation
export type InputAppEvent = inputAppEvent
export type Peer = peerUser | peerChat | peerChannel
export type storage$FileType = storage$fileUnknown | storage$filePartial | storage$fileJpeg | storage$fileGif | storage$filePng | storage$filePdf | storage$fileMp3 | storage$fileMov | storage$fileMp4 | storage$fileWebp
export type FileLocation = fileLocationUnavailable | fileLocation
export type User = userEmpty | user
export type UserProfilePhoto = userProfilePhotoEmpty | userProfilePhoto
export type UserStatus = userStatusEmpty | userStatusOnline | userStatusOffline | userStatusRecently | userStatusLastWeek | userStatusLastMonth
export type Chat = chatEmpty | chat | chatForbidden | channel | channelForbidden
export type ChatFull = chatFull | channelFull
export type ChatParticipant = chatParticipant | chatParticipantCreator | chatParticipantAdmin
export type ChatParticipants = chatParticipantsForbidden | chatParticipants
export type ChatPhoto = chatPhotoEmpty | chatPhoto
export type Message = messageEmpty | message | messageService
export type MessageMedia = messageMediaEmpty | messageMediaPhoto | messageMediaGeo | messageMediaContact | messageMediaUnsupported | messageMediaDocument | messageMediaWebPage | messageMediaVenue | messageMediaGame | messageMediaInvoice
export type MessageAction = messageActionEmpty | messageActionChatCreate | messageActionChatEditTitle | messageActionChatEditPhoto | messageActionChatDeletePhoto | messageActionChatAddUser | messageActionChatDeleteUser | messageActionChatJoinedByLink | messageActionChannelCreate | messageActionChatMigrateTo | messageActionChannelMigrateFrom | messageActionPinMessage | messageActionHistoryClear | messageActionGameScore | messageActionPaymentSentMe | messageActionPaymentSent | messageActionPhoneCall
export type Dialog = dialog
export type Photo = photoEmpty | photo
export type PhotoSize = photoSizeEmpty | photoSize | photoCachedSize
export type GeoPoint = geoPointEmpty | geoPoint
export type auth$CheckedPhone = auth$checkedPhone
export type auth$SentCode = auth$sentCode
export type auth$Authorization = auth$authorization
export type auth$ExportedAuthorization = auth$exportedAuthorization
export type InputNotifyPeer = inputNotifyPeer | inputNotifyUsers | inputNotifyChats | inputNotifyAll
export type InputPeerNotifyEvents = inputPeerNotifyEventsEmpty | inputPeerNotifyEventsAll
export type InputPeerNotifySettings = inputPeerNotifySettings
export type PeerNotifyEvents = peerNotifyEventsEmpty | peerNotifyEventsAll
export type PeerNotifySettings = peerNotifySettingsEmpty | peerNotifySettings
export type PeerSettings = peerSettings
export type WallPaper = wallPaper | wallPaperSolid
export type ReportReason = inputReportReasonSpam | inputReportReasonViolence | inputReportReasonPornography | inputReportReasonOther
export type UserFull = userFull
export type Contact = contact
export type ImportedContact = importedContact
export type ContactBlocked = contactBlocked
export type ContactStatus = contactStatus
export type contacts$Link = contacts$link
export type contacts$Contacts = contacts$contactsNotModified | contacts$contacts
export type contacts$ImportedContacts = contacts$importedContacts
export type contacts$Blocked = contacts$blocked | contacts$blockedSlice
export type messages$Dialogs = messages$dialogs | messages$dialogsSlice
export type messages$Messages = messages$messages | messages$messagesSlice | messages$channelMessages
export type messages$Chats = messages$chats | messages$chatsSlice
export type messages$ChatFull = messages$chatFull
export type messages$AffectedHistory = messages$affectedHistory
export type MessagesFilter = inputMessagesFilterEmpty | inputMessagesFilterPhotos | inputMessagesFilterVideo | inputMessagesFilterPhotoVideo | inputMessagesFilterPhotoVideoDocuments | inputMessagesFilterDocument | inputMessagesFilterUrl | inputMessagesFilterGif | inputMessagesFilterVoice | inputMessagesFilterMusic | inputMessagesFilterChatPhotos | inputMessagesFilterPhoneCalls | inputMessagesFilterRoundVoice | inputMessagesFilterRoundVideo
export type Update = updateNewMessage | updateMessageID | updateDeleteMessages | updateUserTyping | updateChatUserTyping | updateChatParticipants | updateUserStatus | updateUserName | updateUserPhoto | updateContactRegistered | updateContactLink | updateNewEncryptedMessage | updateEncryptedChatTyping | updateEncryption | updateEncryptedMessagesRead | updateChatParticipantAdd | updateChatParticipantDelete | updateDcOptions | updateUserBlocked | updateNotifySettings | updateServiceNotification | updatePrivacy | updateUserPhone | updateReadHistoryInbox | updateReadHistoryOutbox | updateWebPage | updateReadMessagesContents | updateChannelTooLong | updateChannel | updateNewChannelMessage | updateReadChannelInbox | updateDeleteChannelMessages | updateChannelMessageViews | updateChatAdmins | updateChatParticipantAdmin | updateNewStickerSet | updateStickerSetsOrder | updateStickerSets | updateSavedGifs | updateBotInlineQuery | updateBotInlineSend | updateEditChannelMessage | updateChannelPinnedMessage | updateBotCallbackQuery | updateEditMessage | updateInlineBotCallbackQuery | updateReadChannelOutbox | updateDraftMessage | updateReadFeaturedStickers | updateRecentStickers | updateConfig | updatePtsChanged | updateChannelWebPage | updateDialogPinned | updatePinnedDialogs | updateBotWebhookJSON | updateBotWebhookJSONQuery | updateBotShippingQuery | updateBotPrecheckoutQuery | updatePhoneCall | updateLangPackTooLong | updateLangPack
export type updates$State = updates$state
export type updates$Difference = updates$differenceEmpty | updates$difference | updates$differenceSlice | updates$differenceTooLong
export type Updates = updatesTooLong | updateShortMessage | updateShortChatMessage | updateShort | updatesCombined | updates | updateShortSentMessage
export type photos$Photos = photos$photos | photos$photosSlice
export type photos$Photo = photos$photo
export type upload$File = upload$file | upload$fileCdnRedirect
export type DcOption = dcOption
export type Config = config
export type NearestDc = nearestDc
export type help$AppUpdate = help$appUpdate | help$noAppUpdate
export type help$InviteText = help$inviteText
export type EncryptedChat = encryptedChatEmpty | encryptedChatWaiting | encryptedChatRequested | encryptedChat | encryptedChatDiscarded
export type InputEncryptedChat = inputEncryptedChat
export type EncryptedFile = encryptedFileEmpty | encryptedFile
export type InputEncryptedFile = inputEncryptedFileEmpty | inputEncryptedFileUploaded | inputEncryptedFile | inputEncryptedFileBigUploaded
export type EncryptedMessage = encryptedMessage | encryptedMessageService
export type messages$DhConfig = messages$dhConfigNotModified | messages$dhConfig
export type messages$SentEncryptedMessage = messages$sentEncryptedMessage | messages$sentEncryptedFile
export type InputDocument = inputDocumentEmpty | inputDocument
export type Document = documentEmpty | document
export type help$Support = help$support
export type NotifyPeer = notifyPeer | notifyUsers | notifyChats | notifyAll
export type SendMessageAction = sendMessageTypingAction | sendMessageCancelAction | sendMessageRecordVideoAction | sendMessageUploadVideoAction | sendMessageRecordAudioAction | sendMessageUploadAudioAction | sendMessageUploadPhotoAction | sendMessageUploadDocumentAction | sendMessageGeoLocationAction | sendMessageChooseContactAction | sendMessageGamePlayAction | sendMessageRecordRoundAction | sendMessageUploadRoundAction
export type contacts$Found = contacts$found
export type InputPrivacyKey = inputPrivacyKeyStatusTimestamp | inputPrivacyKeyChatInvite | inputPrivacyKeyPhoneCall
export type PrivacyKey = privacyKeyStatusTimestamp | privacyKeyChatInvite | privacyKeyPhoneCall
export type InputPrivacyRule = inputPrivacyValueAllowContacts | inputPrivacyValueAllowAll | inputPrivacyValueAllowUsers | inputPrivacyValueDisallowContacts | inputPrivacyValueDisallowAll | inputPrivacyValueDisallowUsers
export type PrivacyRule = privacyValueAllowContacts | privacyValueAllowAll | privacyValueAllowUsers | privacyValueDisallowContacts | privacyValueDisallowAll | privacyValueDisallowUsers
export type account$PrivacyRules = account$privacyRules
export type AccountDaysTTL = accountDaysTTL
export type DocumentAttribute = documentAttributeImageSize | documentAttributeAnimated | documentAttributeSticker | documentAttributeVideo | documentAttributeAudio | documentAttributeFilename | documentAttributeHasStickers
export type messages$Stickers = messages$stickersNotModified | messages$stickers
export type StickerPack = stickerPack
export type messages$AllStickers = messages$allStickersNotModified | messages$allStickers
export type DisabledFeature = disabledFeature
export type messages$AffectedMessages = messages$affectedMessages
export type ContactLink = contactLinkUnknown | contactLinkNone | contactLinkHasPhone | contactLinkContact
export type WebPage = webPageEmpty | webPagePending | webPage | webPageNotModified
export type Authorization = authorization
export type account$Authorizations = account$authorizations
export type account$Password = account$noPassword | account$password
export type account$PasswordSettings = account$passwordSettings
export type account$PasswordInputSettings = account$passwordInputSettings
export type auth$PasswordRecovery = auth$passwordRecovery
export type ReceivedNotifyMessage = receivedNotifyMessage
export type ExportedChatInvite = chatInviteEmpty | chatInviteExported
export type ChatInvite = chatInviteAlready | chatInvite
export type InputStickerSet = inputStickerSetEmpty | inputStickerSetID | inputStickerSetShortName
export type StickerSet = stickerSet
export type messages$StickerSet = messages$stickerSet
export type BotCommand = botCommand
export type BotInfo = botInfo
export type KeyboardButton = keyboardButton | keyboardButtonUrl | keyboardButtonCallback | keyboardButtonRequestPhone | keyboardButtonRequestGeoLocation | keyboardButtonSwitchInline | keyboardButtonGame | keyboardButtonBuy
export type KeyboardButtonRow = keyboardButtonRow
export type ReplyMarkup = replyKeyboardHide | replyKeyboardForceReply | replyKeyboardMarkup | replyInlineMarkup
export type MessageEntity = messageEntityUnknown | messageEntityMention | messageEntityHashtag | messageEntityBotCommand | messageEntityUrl | messageEntityEmail | messageEntityBold | messageEntityItalic | messageEntityCode | messageEntityPre | messageEntityTextUrl | messageEntityMentionName | inputMessageEntityMentionName
export type InputChannel = inputChannelEmpty | inputChannel
export type contacts$ResolvedPeer = contacts$resolvedPeer
export type MessageRange = messageRange
export type updates$ChannelDifference = updates$channelDifferenceEmpty | updates$channelDifferenceTooLong | updates$channelDifference
export type ChannelMessagesFilter = channelMessagesFilterEmpty | channelMessagesFilter
export type ChannelParticipant = channelParticipant | channelParticipantSelf | channelParticipantModerator | channelParticipantEditor | channelParticipantKicked | channelParticipantCreator
export type ChannelParticipantsFilter = channelParticipantsRecent | channelParticipantsAdmins | channelParticipantsKicked | channelParticipantsBots
export type ChannelParticipantRole = channelRoleEmpty | channelRoleModerator | channelRoleEditor
export type channels$ChannelParticipants = channels$channelParticipants
export type channels$ChannelParticipant = channels$channelParticipant
export type help$TermsOfService = help$termsOfService
export type FoundGif = foundGif | foundGifCached
export type messages$FoundGifs = messages$foundGifs
export type messages$SavedGifs = messages$savedGifsNotModified | messages$savedGifs
export type InputBotInlineMessage = inputBotInlineMessageMediaAuto | inputBotInlineMessageText | inputBotInlineMessageMediaGeo | inputBotInlineMessageMediaVenue | inputBotInlineMessageMediaContact | inputBotInlineMessageGame
export type InputBotInlineResult = inputBotInlineResult | inputBotInlineResultPhoto | inputBotInlineResultDocument | inputBotInlineResultGame
export type BotInlineMessage = botInlineMessageMediaAuto | botInlineMessageText | botInlineMessageMediaGeo | botInlineMessageMediaVenue | botInlineMessageMediaContact
export type BotInlineResult = botInlineResult | botInlineMediaResult
export type messages$BotResults = messages$botResults
export type ExportedMessageLink = exportedMessageLink
export type MessageFwdHeader = messageFwdHeader
export type auth$CodeType = auth$codeTypeSms | auth$codeTypeCall | auth$codeTypeFlashCall
export type auth$SentCodeType = auth$sentCodeTypeApp | auth$sentCodeTypeSms | auth$sentCodeTypeCall | auth$sentCodeTypeFlashCall
export type messages$BotCallbackAnswer = messages$botCallbackAnswer
export type messages$MessageEditData = messages$messageEditData
export type InputBotInlineMessageID = inputBotInlineMessageID
export type InlineBotSwitchPM = inlineBotSwitchPM
export type messages$PeerDialogs = messages$peerDialogs
export type TopPeer = topPeer
export type TopPeerCategory = topPeerCategoryBotsPM | topPeerCategoryBotsInline | topPeerCategoryCorrespondents | topPeerCategoryGroups | topPeerCategoryChannels
export type TopPeerCategoryPeers = topPeerCategoryPeers
export type contacts$TopPeers = contacts$topPeersNotModified | contacts$topPeers
export type DraftMessage = draftMessageEmpty | draftMessage
export type messages$FeaturedStickers = messages$featuredStickersNotModified | messages$featuredStickers
export type messages$RecentStickers = messages$recentStickersNotModified | messages$recentStickers
export type messages$ArchivedStickers = messages$archivedStickers
export type messages$StickerSetInstallResult = messages$stickerSetInstallResultSuccess | messages$stickerSetInstallResultArchive
export type StickerSetCovered = stickerSetCovered | stickerSetMultiCovered
export type MaskCoords = maskCoords
export type InputStickeredMedia = inputStickeredMediaPhoto | inputStickeredMediaDocument
export type Game = game
export type InputGame = inputGameID | inputGameShortName
export type HighScore = highScore
export type messages$HighScores = messages$highScores
export type RichText = textEmpty | textPlain | textBold | textItalic | textUnderline | textStrike | textFixed | textUrl | textEmail | textConcat
export type PageBlock = pageBlockUnsupported | pageBlockTitle | pageBlockSubtitle | pageBlockAuthorDate | pageBlockHeader | pageBlockSubheader | pageBlockParagraph | pageBlockPreformatted | pageBlockFooter | pageBlockDivider | pageBlockAnchor | pageBlockList | pageBlockBlockquote | pageBlockPullquote | pageBlockPhoto | pageBlockVideo | pageBlockCover | pageBlockEmbed | pageBlockEmbedPost | pageBlockCollage | pageBlockSlideshow | pageBlockChannel
export type Page = pagePart | pageFull
export type PhoneCallDiscardReason = phoneCallDiscardReasonMissed | phoneCallDiscardReasonDisconnect | phoneCallDiscardReasonHangup | phoneCallDiscardReasonBusy
export type DataJSON = dataJSON
export type LabeledPrice = labeledPrice
export type Invoice = invoice
export type PaymentCharge = paymentCharge
export type PostAddress = postAddress
export type PaymentRequestedInfo = paymentRequestedInfo
export type PaymentSavedCredentials = paymentSavedCredentialsCard
export type WebDocument = webDocument
export type InputWebDocument = inputWebDocument
export type InputWebFileLocation = inputWebFileLocation
export type upload$WebFile = upload$webFile
export type payments$PaymentForm = payments$paymentForm
export type payments$ValidatedRequestedInfo = payments$validatedRequestedInfo
export type payments$PaymentResult = payments$paymentResult | payments$paymentVerficationNeeded
export type payments$PaymentReceipt = payments$paymentReceipt
export type payments$SavedInfo = payments$savedInfo
export type InputPaymentCredentials = inputPaymentCredentialsSaved | inputPaymentCredentials
export type account$TmpPassword = account$tmpPassword
export type ShippingOption = shippingOption
export type InputStickerSetItem = inputStickerSetItem
export type InputPhoneCall = inputPhoneCall
export type PhoneCall = phoneCallEmpty | phoneCallWaiting | phoneCallRequested | phoneCallAccepted | phoneCall | phoneCallDiscarded
export type PhoneConnection = phoneConnection
export type PhoneCallProtocol = phoneCallProtocol
export type phone$PhoneCall = phone$phoneCall
export type upload$CdnFile = upload$cdnFileReuploadNeeded | upload$cdnFile
export type CdnPublicKey = cdnPublicKey
export type CdnConfig = cdnConfig
export type LangPackString = langPackString | langPackStringPluralized | langPackStringDeleted
export type LangPackDifference = langPackDifference
export type LangPackLanguage = langPackLanguage

export type InvokeType = {

  (method: "req_pq", params: {
    nonce: int128,
  }, options?: InvokeOptions): Promise<ResPQ>;

  (method: "req_DH_params", params: {
    nonce: int128,
    server_nonce: int128,
    p: string,
    q: string,
    public_key_fingerprint: long,
    encrypted_data: string,
  }, options?: InvokeOptions): Promise<Server_DH_Params>;

  (method: "set_client_DH_params", params: {
    nonce: int128,
    server_nonce: int128,
    encrypted_data: string,
  }, options?: InvokeOptions): Promise<Set_client_DH_params_answer>;

  (method: "destroy_auth_key", params?: {

  }, options?: InvokeOptions): Promise<DestroyAuthKeyRes>;

  (method: "rpc_drop_answer", params: {
    req_msg_id: long,
  }, options?: InvokeOptions): Promise<RpcDropAnswer>;

  (method: "get_future_salts", params: {
    num: int,
  }, options?: InvokeOptions): Promise<FutureSalts>;

  (method: "ping", params: {
    ping_id: long,
  }, options?: InvokeOptions): Promise<Pong>;

  (method: "ping_delay_disconnect", params: {
    ping_id: long,
    disconnect_delay: int,
  }, options?: InvokeOptions): Promise<Pong>;

  (method: "destroy_session", params: {
    session_id: long,
  }, options?: InvokeOptions): Promise<DestroySessionRes>;

  (method: "contest.saveDeveloperInfo", params: {
    vk_id: int,
    name: string,
    phone_number: string,
    age: int,
    city: string,
  }, options?: InvokeOptions): Promise<boolean>;

  <X>(method: "invokeAfterMsg", params: {
    msg_id: long,
    query: X,
  }, options?: InvokeOptions): Promise<X>;

  <X>(method: "invokeAfterMsgs", params: {
    msg_ids: Vector<long>,
    query: X,
  }, options?: InvokeOptions): Promise<X>;

  <X>(method: "initConnection", params: {
    api_id: int,
    device_model: string,
    system_version: string,
    app_version: string,
    system_lang_code: string,
    lang_pack: string,
    lang_code: string,
    query: X,
  }, options?: InvokeOptions): Promise<X>;

  <X>(method: "invokeWithLayer", params: {
    layer: int,
    query: X,
  }, options?: InvokeOptions): Promise<X>;

  <X>(method: "invokeWithoutUpdates", params: {
    query: X,
  }, options?: InvokeOptions): Promise<X>;

  (method: "auth.checkPhone", params: {
    phone_number: string,
  }, options?: InvokeOptions): Promise<auth$CheckedPhone>;

  (method: "auth.sendCode", params: {
    allow_flashcall?: true,
    phone_number: string,
    current_number?: boolean,
    api_id: int,
    api_hash: string,
  }, options?: InvokeOptions): Promise<auth$SentCode>;

  (method: "auth.signUp", params: {
    phone_number: string,
    phone_code_hash: string,
    phone_code: string,
    first_name: string,
    last_name: string,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.signIn", params: {
    phone_number: string,
    phone_code_hash: string,
    phone_code: string,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.logOut", params?: {

  }, options?: InvokeOptions): Promise<boolean>;

  (method: "auth.resetAuthorizations", params?: {

  }, options?: InvokeOptions): Promise<boolean>;

  (method: "auth.sendInvites", params: {
    phone_numbers: Vector<string>,
    message: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "auth.exportAuthorization", params: {
    dc_id: int,
  }, options?: InvokeOptions): Promise<auth$ExportedAuthorization>;

  (method: "auth.importAuthorization", params: {
    id: int,
    bytes: bytes,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.bindTempAuthKey", params: {
    perm_auth_key_id: long,
    nonce: long,
    expires_at: int,
    encrypted_message: bytes,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "auth.importBotAuthorization", params: {
    api_id: int,
    api_hash: string,
    bot_auth_token: string,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.checkPassword", params: {
    password_hash: bytes,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.requestPasswordRecovery", params?: {

  }, options?: InvokeOptions): Promise<auth$PasswordRecovery>;

  (method: "auth.recoverPassword", params: {
    code: string,
  }, options?: InvokeOptions): Promise<auth$Authorization>;

  (method: "auth.resendCode", params: {
    phone_number: string,
    phone_code_hash: string,
  }, options?: InvokeOptions): Promise<auth$SentCode>;

  (method: "auth.cancelCode", params: {
    phone_number: string,
    phone_code_hash: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "auth.dropTempAuthKeys", params: {
    except_auth_keys: Vector<long>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.registerDevice", params: {
    token_type: int,
    token: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.unregisterDevice", params: {
    token_type: int,
    token: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.updateNotifySettings", params: {
    peer: InputNotifyPeer,
    settings: InputPeerNotifySettings,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getNotifySettings", params: {
    peer: InputNotifyPeer,
  }, options?: InvokeOptions): Promise<PeerNotifySettings>;

  (method: "account.resetNotifySettings", params?: {

  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.updateProfile", params: {
    first_name?: string,
    last_name?: string,
    about?: string,
  }, options?: InvokeOptions): Promise<User>;

  (method: "account.updateStatus", params: {
    offline: boolean,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getWallPapers", params?: {

  }, options?: InvokeOptions): Promise<Vector<WallPaper>>;

  (method: "account.reportPeer", params: {
    peer: InputPeer,
    reason: ReportReason,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.checkUsername", params: {
    username: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.updateUsername", params: {
    username: string,
  }, options?: InvokeOptions): Promise<User>;

  (method: "account.getPrivacy", params: {
    key: InputPrivacyKey,
  }, options?: InvokeOptions): Promise<account$PrivacyRules>;

  (method: "account.setPrivacy", params: {
    key: InputPrivacyKey,
    rules: Vector<InputPrivacyRule>,
  }, options?: InvokeOptions): Promise<account$PrivacyRules>;

  (method: "account.deleteAccount", params: {
    reason: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getAccountTTL", params?: {

  }, options?: InvokeOptions): Promise<AccountDaysTTL>;

  (method: "account.setAccountTTL", params: {
    ttl: AccountDaysTTL,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.sendChangePhoneCode", params: {
    allow_flashcall?: true,
    phone_number: string,
    current_number?: boolean,
  }, options?: InvokeOptions): Promise<auth$SentCode>;

  (method: "account.changePhone", params: {
    phone_number: string,
    phone_code_hash: string,
    phone_code: string,
  }, options?: InvokeOptions): Promise<User>;

  (method: "account.updateDeviceLocked", params: {
    period: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getAuthorizations", params?: {

  }, options?: InvokeOptions): Promise<account$Authorizations>;

  (method: "account.resetAuthorization", params: {
    hash: long,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getPassword", params?: {

  }, options?: InvokeOptions): Promise<account$Password>;

  (method: "account.getPasswordSettings", params: {
    current_password_hash: bytes,
  }, options?: InvokeOptions): Promise<account$PasswordSettings>;

  (method: "account.updatePasswordSettings", params: {
    current_password_hash: bytes,
    new_settings: account$PasswordInputSettings,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.sendConfirmPhoneCode", params: {
    allow_flashcall?: true,
    hash: string,
    current_number?: boolean,
  }, options?: InvokeOptions): Promise<auth$SentCode>;

  (method: "account.confirmPhone", params: {
    phone_code_hash: string,
    phone_code: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "account.getTmpPassword", params: {
    password_hash: bytes,
    period: int,
  }, options?: InvokeOptions): Promise<account$TmpPassword>;

  (method: "users.getUsers", params: {
    id: Vector<InputUser>,
  }, options?: InvokeOptions): Promise<Vector<User>>;

  (method: "users.getFullUser", params: {
    id: InputUser,
  }, options?: InvokeOptions): Promise<UserFull>;

  (method: "contacts.getStatuses", params?: {

  }, options?: InvokeOptions): Promise<Vector<ContactStatus>>;

  (method: "contacts.getContacts", params: {
    hash: string,
  }, options?: InvokeOptions): Promise<contacts$Contacts>;

  (method: "contacts.importContacts", params: {
    contacts: Vector<InputContact>,
    replace: boolean,
  }, options?: InvokeOptions): Promise<contacts$ImportedContacts>;

  (method: "contacts.deleteContact", params: {
    id: InputUser,
  }, options?: InvokeOptions): Promise<contacts$Link>;

  (method: "contacts.deleteContacts", params: {
    id: Vector<InputUser>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "contacts.block", params: {
    id: InputUser,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "contacts.unblock", params: {
    id: InputUser,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "contacts.getBlocked", params: {
    offset: int,
    limit: int,
  }, options?: InvokeOptions): Promise<contacts$Blocked>;

  (method: "contacts.exportCard", params?: {

  }, options?: InvokeOptions): Promise<Vector<int>>;

  (method: "contacts.importCard", params: {
    export_card: Vector<int>,
  }, options?: InvokeOptions): Promise<User>;

  (method: "contacts.search", params: {
    q: string,
    limit: int,
  }, options?: InvokeOptions): Promise<contacts$Found>;

  (method: "contacts.resolveUsername", params: {
    username: string,
  }, options?: InvokeOptions): Promise<contacts$ResolvedPeer>;

  (method: "contacts.getTopPeers", params: {
    correspondents?: true,
    bots_pm?: true,
    bots_inline?: true,
    groups?: true,
    channels?: true,
    offset: int,
    limit: int,
    hash: int,
  }, options?: InvokeOptions): Promise<contacts$TopPeers>;

  (method: "contacts.resetTopPeerRating", params: {
    category: TopPeerCategory,
    peer: InputPeer,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getMessages", params: {
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$Messages>;

  (method: "messages.getDialogs", params: {
    exclude_pinned?: true,
    offset_date: int,
    offset_id: int,
    offset_peer: InputPeer,
    limit: int,
  }, options?: InvokeOptions): Promise<messages$Dialogs>;

  (method: "messages.getHistory", params: {
    peer: InputPeer,
    offset_id: int,
    offset_date: int,
    add_offset: int,
    limit: int,
    max_id: int,
    min_id: int,
  }, options?: InvokeOptions): Promise<messages$Messages>;

  (method: "messages.search", params: {
    peer: InputPeer,
    q: string,
    filter: MessagesFilter,
    min_date: int,
    max_date: int,
    offset: int,
    max_id: int,
    limit: int,
  }, options?: InvokeOptions): Promise<messages$Messages>;

  (method: "messages.readHistory", params: {
    peer: InputPeer,
    max_id: int,
  }, options?: InvokeOptions): Promise<messages$AffectedMessages>;

  (method: "messages.deleteHistory", params: {
    just_clear?: true,
    peer: InputPeer,
    max_id: int,
  }, options?: InvokeOptions): Promise<messages$AffectedHistory>;

  (method: "messages.deleteMessages", params: {
    revoke?: true,
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$AffectedMessages>;

  (method: "messages.receivedMessages", params: {
    max_id: int,
  }, options?: InvokeOptions): Promise<Vector<ReceivedNotifyMessage>>;

  (method: "messages.setTyping", params: {
    peer: InputPeer,
    action: SendMessageAction,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.sendMessage", params: {
    no_webpage?: true,
    silent?: true,
    background?: true,
    clear_draft?: true,
    peer: InputPeer,
    reply_to_msg_id?: int,
    message: string,
    random_id: long,
    reply_markup?: ReplyMarkup,
    entities?: Vector<MessageEntity>,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.sendMedia", params: {
    silent?: true,
    background?: true,
    clear_draft?: true,
    peer: InputPeer,
    reply_to_msg_id?: int,
    media: InputMedia,
    random_id: long,
    reply_markup?: ReplyMarkup,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.forwardMessages", params: {
    silent?: true,
    background?: true,
    with_my_score?: true,
    from_peer: InputPeer,
    id: Vector<int>,
    random_id: Vector<long>,
    to_peer: InputPeer,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.reportSpam", params: {
    peer: InputPeer,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.hideReportSpam", params: {
    peer: InputPeer,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getPeerSettings", params: {
    peer: InputPeer,
  }, options?: InvokeOptions): Promise<PeerSettings>;

  (method: "messages.getChats", params: {
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$Chats>;

  (method: "messages.getFullChat", params: {
    chat_id: int,
  }, options?: InvokeOptions): Promise<messages$ChatFull>;

  (method: "messages.editChatTitle", params: {
    chat_id: int,
    title: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.editChatPhoto", params: {
    chat_id: int,
    photo: InputChatPhoto,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.addChatUser", params: {
    chat_id: int,
    user_id: InputUser,
    fwd_limit: int,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.deleteChatUser", params: {
    chat_id: int,
    user_id: InputUser,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.createChat", params: {
    users: Vector<InputUser>,
    title: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.forwardMessage", params: {
    peer: InputPeer,
    id: int,
    random_id: long,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.getDhConfig", params: {
    version: int,
    random_length: int,
  }, options?: InvokeOptions): Promise<messages$DhConfig>;

  (method: "messages.requestEncryption", params: {
    user_id: InputUser,
    random_id: int,
    g_a: bytes,
  }, options?: InvokeOptions): Promise<EncryptedChat>;

  (method: "messages.acceptEncryption", params: {
    peer: InputEncryptedChat,
    g_b: bytes,
    key_fingerprint: long,
  }, options?: InvokeOptions): Promise<EncryptedChat>;

  (method: "messages.discardEncryption", params: {
    chat_id: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.setEncryptedTyping", params: {
    peer: InputEncryptedChat,
    typing: boolean,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.readEncryptedHistory", params: {
    peer: InputEncryptedChat,
    max_date: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.sendEncrypted", params: {
    peer: InputEncryptedChat,
    random_id: long,
    data: bytes,
  }, options?: InvokeOptions): Promise<messages$SentEncryptedMessage>;

  (method: "messages.sendEncryptedFile", params: {
    peer: InputEncryptedChat,
    random_id: long,
    data: bytes,
    file: InputEncryptedFile,
  }, options?: InvokeOptions): Promise<messages$SentEncryptedMessage>;

  (method: "messages.sendEncryptedService", params: {
    peer: InputEncryptedChat,
    random_id: long,
    data: bytes,
  }, options?: InvokeOptions): Promise<messages$SentEncryptedMessage>;

  (method: "messages.receivedQueue", params: {
    max_qts: int,
  }, options?: InvokeOptions): Promise<Vector<long>>;

  (method: "messages.reportEncryptedSpam", params: {
    peer: InputEncryptedChat,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.readMessageContents", params: {
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$AffectedMessages>;

  (method: "messages.getAllStickers", params: {
    hash: int,
  }, options?: InvokeOptions): Promise<messages$AllStickers>;

  (method: "messages.getWebPagePreview", params: {
    message: string,
  }, options?: InvokeOptions): Promise<MessageMedia>;

  (method: "messages.exportChatInvite", params: {
    chat_id: int,
  }, options?: InvokeOptions): Promise<ExportedChatInvite>;

  (method: "messages.checkChatInvite", params: {
    hash: string,
  }, options?: InvokeOptions): Promise<ChatInvite>;

  (method: "messages.importChatInvite", params: {
    hash: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.getStickerSet", params: {
    stickerset: InputStickerSet,
  }, options?: InvokeOptions): Promise<messages$StickerSet>;

  (method: "messages.installStickerSet", params: {
    stickerset: InputStickerSet,
    archived: boolean,
  }, options?: InvokeOptions): Promise<messages$StickerSetInstallResult>;

  (method: "messages.uninstallStickerSet", params: {
    stickerset: InputStickerSet,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.startBot", params: {
    bot: InputUser,
    peer: InputPeer,
    random_id: long,
    start_param: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.getMessagesViews", params: {
    peer: InputPeer,
    id: Vector<int>,
    increment: boolean,
  }, options?: InvokeOptions): Promise<Vector<int>>;

  (method: "messages.toggleChatAdmins", params: {
    chat_id: int,
    enabled: boolean,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.editChatAdmin", params: {
    chat_id: int,
    user_id: InputUser,
    is_admin: boolean,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.migrateChat", params: {
    chat_id: int,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.searchGlobal", params: {
    q: string,
    offset_date: int,
    offset_peer: InputPeer,
    offset_id: int,
    limit: int,
  }, options?: InvokeOptions): Promise<messages$Messages>;

  (method: "messages.reorderStickerSets", params: {
    masks?: true,
    order: Vector<long>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getDocumentByHash", params: {
    sha256: bytes,
    size: int,
    mime_type: string,
  }, options?: InvokeOptions): Promise<Document>;

  (method: "messages.searchGifs", params: {
    q: string,
    offset: int,
  }, options?: InvokeOptions): Promise<messages$FoundGifs>;

  (method: "messages.getSavedGifs", params: {
    hash: int,
  }, options?: InvokeOptions): Promise<messages$SavedGifs>;

  (method: "messages.saveGif", params: {
    id: InputDocument,
    unsave: boolean,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getInlineBotResults", params: {
    bot: InputUser,
    peer: InputPeer,
    geo_point?: InputGeoPoint,
    query: string,
    offset: string,
  }, options?: InvokeOptions): Promise<messages$BotResults>;

  (method: "messages.setInlineBotResults", params: {
    gallery?: true,
    private?: true,
    query_id: long,
    results: Vector<InputBotInlineResult>,
    cache_time: int,
    next_offset?: string,
    switch_pm?: InlineBotSwitchPM,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.sendInlineBotResult", params: {
    silent?: true,
    background?: true,
    clear_draft?: true,
    peer: InputPeer,
    reply_to_msg_id?: int,
    random_id: long,
    query_id: long,
    id: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.getMessageEditData", params: {
    peer: InputPeer,
    id: int,
  }, options?: InvokeOptions): Promise<messages$MessageEditData>;

  (method: "messages.editMessage", params: {
    no_webpage?: true,
    peer: InputPeer,
    id: int,
    message?: string,
    reply_markup?: ReplyMarkup,
    entities?: Vector<MessageEntity>,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.editInlineBotMessage", params: {
    no_webpage?: true,
    id: InputBotInlineMessageID,
    message?: string,
    reply_markup?: ReplyMarkup,
    entities?: Vector<MessageEntity>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getBotCallbackAnswer", params: {
    game?: true,
    peer: InputPeer,
    msg_id: int,
    data?: bytes,
  }, options?: InvokeOptions): Promise<messages$BotCallbackAnswer>;

  (method: "messages.setBotCallbackAnswer", params: {
    alert?: true,
    query_id: long,
    message?: string,
    url?: string,
    cache_time: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getPeerDialogs", params: {
    peers: Vector<InputPeer>,
  }, options?: InvokeOptions): Promise<messages$PeerDialogs>;

  (method: "messages.saveDraft", params: {
    no_webpage?: true,
    reply_to_msg_id?: int,
    peer: InputPeer,
    message: string,
    entities?: Vector<MessageEntity>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getAllDrafts", params?: {

  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.getFeaturedStickers", params: {
    hash: int,
  }, options?: InvokeOptions): Promise<messages$FeaturedStickers>;

  (method: "messages.readFeaturedStickers", params: {
    id: Vector<long>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getRecentStickers", params: {
    attached?: true,
    hash: int,
  }, options?: InvokeOptions): Promise<messages$RecentStickers>;

  (method: "messages.saveRecentSticker", params: {
    attached?: true,
    id: InputDocument,
    unsave: boolean,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.clearRecentStickers", params: {
    attached?: true,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getArchivedStickers", params: {
    masks?: true,
    offset_id: long,
    limit: int,
  }, options?: InvokeOptions): Promise<messages$ArchivedStickers>;

  (method: "messages.getMaskStickers", params: {
    hash: int,
  }, options?: InvokeOptions): Promise<messages$AllStickers>;

  (method: "messages.getAttachedStickers", params: {
    media: InputStickeredMedia,
  }, options?: InvokeOptions): Promise<Vector<StickerSetCovered>>;

  (method: "messages.setGameScore", params: {
    edit_message?: true,
    force?: true,
    peer: InputPeer,
    id: int,
    user_id: InputUser,
    score: int,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "messages.setInlineGameScore", params: {
    edit_message?: true,
    force?: true,
    id: InputBotInlineMessageID,
    user_id: InputUser,
    score: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getGameHighScores", params: {
    peer: InputPeer,
    id: int,
    user_id: InputUser,
  }, options?: InvokeOptions): Promise<messages$HighScores>;

  (method: "messages.getInlineGameHighScores", params: {
    id: InputBotInlineMessageID,
    user_id: InputUser,
  }, options?: InvokeOptions): Promise<messages$HighScores>;

  (method: "messages.getCommonChats", params: {
    user_id: InputUser,
    max_id: int,
    limit: int,
  }, options?: InvokeOptions): Promise<messages$Chats>;

  (method: "messages.getAllChats", params: {
    except_ids: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$Chats>;

  (method: "messages.getWebPage", params: {
    url: string,
    hash: int,
  }, options?: InvokeOptions): Promise<WebPage>;

  (method: "messages.toggleDialogPin", params: {
    pinned?: true,
    peer: InputPeer,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.reorderPinnedDialogs", params: {
    force?: true,
    order: Vector<InputPeer>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.getPinnedDialogs", params?: {

  }, options?: InvokeOptions): Promise<messages$PeerDialogs>;

  (method: "messages.setBotShippingResults", params: {
    query_id: long,
    error?: string,
    shipping_options?: Vector<ShippingOption>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.setBotPrecheckoutResults", params: {
    success?: true,
    query_id: long,
    error?: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "messages.uploadMedia", params: {
    peer: InputPeer,
    media: InputMedia,
  }, options?: InvokeOptions): Promise<MessageMedia>;

  (method: "updates.getState", params?: {

  }, options?: InvokeOptions): Promise<updates$State>;

  (method: "updates.getDifference", params: {
    pts: int,
    pts_total_limit?: int,
    date: int,
    qts: int,
  }, options?: InvokeOptions): Promise<updates$Difference>;

  (method: "updates.getChannelDifference", params: {
    force?: true,
    channel: InputChannel,
    filter: ChannelMessagesFilter,
    pts: int,
    limit: int,
  }, options?: InvokeOptions): Promise<updates$ChannelDifference>;

  (method: "photos.updateProfilePhoto", params: {
    id: InputPhoto,
  }, options?: InvokeOptions): Promise<UserProfilePhoto>;

  (method: "photos.uploadProfilePhoto", params: {
    file: InputFile,
  }, options?: InvokeOptions): Promise<photos$Photo>;

  (method: "photos.deletePhotos", params: {
    id: Vector<InputPhoto>,
  }, options?: InvokeOptions): Promise<Vector<long>>;

  (method: "photos.getUserPhotos", params: {
    user_id: InputUser,
    offset: int,
    max_id: long,
    limit: int,
  }, options?: InvokeOptions): Promise<photos$Photos>;

  (method: "upload.saveFilePart", params: {
    file_id: long,
    file_part: int,
    bytes: bytes,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "upload.getFile", params: {
    location: InputFileLocation,
    offset: int,
    limit: int,
  }, options?: InvokeOptions): Promise<upload$File>;

  (method: "upload.saveBigFilePart", params: {
    file_id: long,
    file_part: int,
    file_total_parts: int,
    bytes: bytes,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "upload.getWebFile", params: {
    location: InputWebFileLocation,
    offset: int,
    limit: int,
  }, options?: InvokeOptions): Promise<upload$WebFile>;

  (method: "upload.getCdnFile", params: {
    file_token: bytes,
    offset: int,
    limit: int,
  }, options?: InvokeOptions): Promise<upload$CdnFile>;

  (method: "upload.reuploadCdnFile", params: {
    file_token: bytes,
    request_token: bytes,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "help.getConfig", params?: {

  }, options?: InvokeOptions): Promise<Config>;

  (method: "help.getNearestDc", params?: {

  }, options?: InvokeOptions): Promise<NearestDc>;

  (method: "help.getAppUpdate", params?: {

  }, options?: InvokeOptions): Promise<help$AppUpdate>;

  (method: "help.saveAppLog", params: {
    events: Vector<InputAppEvent>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "help.getInviteText", params?: {

  }, options?: InvokeOptions): Promise<help$InviteText>;

  (method: "help.getSupport", params?: {

  }, options?: InvokeOptions): Promise<help$Support>;

  (method: "help.getAppChangelog", params: {
    prev_app_version: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "help.getTermsOfService", params?: {

  }, options?: InvokeOptions): Promise<help$TermsOfService>;

  (method: "help.setBotUpdatesStatus", params: {
    pending_updates_count: int,
    message: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "help.getCdnConfig", params?: {

  }, options?: InvokeOptions): Promise<CdnConfig>;

  (method: "channels.readHistory", params: {
    channel: InputChannel,
    max_id: int,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "channels.deleteMessages", params: {
    channel: InputChannel,
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$AffectedMessages>;

  (method: "channels.deleteUserHistory", params: {
    channel: InputChannel,
    user_id: InputUser,
  }, options?: InvokeOptions): Promise<messages$AffectedHistory>;

  (method: "channels.reportSpam", params: {
    channel: InputChannel,
    user_id: InputUser,
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "channels.getMessages", params: {
    channel: InputChannel,
    id: Vector<int>,
  }, options?: InvokeOptions): Promise<messages$Messages>;

  (method: "channels.getParticipants", params: {
    channel: InputChannel,
    filter: ChannelParticipantsFilter,
    offset: int,
    limit: int,
  }, options?: InvokeOptions): Promise<channels$ChannelParticipants>;

  (method: "channels.getParticipant", params: {
    channel: InputChannel,
    user_id: InputUser,
  }, options?: InvokeOptions): Promise<channels$ChannelParticipant>;

  (method: "channels.getChannels", params: {
    id: Vector<InputChannel>,
  }, options?: InvokeOptions): Promise<messages$Chats>;

  (method: "channels.getFullChannel", params: {
    channel: InputChannel,
  }, options?: InvokeOptions): Promise<messages$ChatFull>;

  (method: "channels.createChannel", params: {
    broadcast?: true,
    megagroup?: true,
    title: string,
    about: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.editAbout", params: {
    channel: InputChannel,
    about: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "channels.editAdmin", params: {
    channel: InputChannel,
    user_id: InputUser,
    role: ChannelParticipantRole,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.editTitle", params: {
    channel: InputChannel,
    title: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.editPhoto", params: {
    channel: InputChannel,
    photo: InputChatPhoto,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.checkUsername", params: {
    channel: InputChannel,
    username: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "channels.updateUsername", params: {
    channel: InputChannel,
    username: string,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "channels.joinChannel", params: {
    channel: InputChannel,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.leaveChannel", params: {
    channel: InputChannel,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.inviteToChannel", params: {
    channel: InputChannel,
    users: Vector<InputUser>,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.kickFromChannel", params: {
    channel: InputChannel,
    user_id: InputUser,
    kicked: boolean,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.exportInvite", params: {
    channel: InputChannel,
  }, options?: InvokeOptions): Promise<ExportedChatInvite>;

  (method: "channels.deleteChannel", params: {
    channel: InputChannel,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.toggleInvites", params: {
    channel: InputChannel,
    enabled: boolean,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.exportMessageLink", params: {
    channel: InputChannel,
    id: int,
  }, options?: InvokeOptions): Promise<ExportedMessageLink>;

  (method: "channels.toggleSignatures", params: {
    channel: InputChannel,
    enabled: boolean,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.updatePinnedMessage", params: {
    silent?: true,
    channel: InputChannel,
    id: int,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "channels.getAdminedPublicChannels", params?: {

  }, options?: InvokeOptions): Promise<messages$Chats>;

  (method: "bots.sendCustomRequest", params: {
    custom_method: string,
    params: DataJSON,
  }, options?: InvokeOptions): Promise<DataJSON>;

  (method: "bots.answerWebhookJSONQuery", params: {
    query_id: long,
    data: DataJSON,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "payments.getPaymentForm", params: {
    msg_id: int,
  }, options?: InvokeOptions): Promise<payments$PaymentForm>;

  (method: "payments.getPaymentReceipt", params: {
    msg_id: int,
  }, options?: InvokeOptions): Promise<payments$PaymentReceipt>;

  (method: "payments.validateRequestedInfo", params: {
    save?: true,
    msg_id: int,
    info: PaymentRequestedInfo,
  }, options?: InvokeOptions): Promise<payments$ValidatedRequestedInfo>;

  (method: "payments.sendPaymentForm", params: {
    msg_id: int,
    requested_info_id?: string,
    shipping_option_id?: string,
    credentials: InputPaymentCredentials,
  }, options?: InvokeOptions): Promise<payments$PaymentResult>;

  (method: "payments.getSavedInfo", params?: {

  }, options?: InvokeOptions): Promise<payments$SavedInfo>;

  (method: "payments.clearSavedInfo", params: {
    credentials?: true,
    info?: true,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "stickers.createStickerSet", params: {
    masks?: true,
    user_id: InputUser,
    title: string,
    short_name: string,
    stickers: Vector<InputStickerSetItem>,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "phone.getCallConfig", params?: {

  }, options?: InvokeOptions): Promise<DataJSON>;

  (method: "phone.requestCall", params: {
    user_id: InputUser,
    random_id: int,
    g_a_hash: bytes,
    protocol: PhoneCallProtocol,
  }, options?: InvokeOptions): Promise<phone$PhoneCall>;

  (method: "phone.acceptCall", params: {
    peer: InputPhoneCall,
    g_b: bytes,
    protocol: PhoneCallProtocol,
  }, options?: InvokeOptions): Promise<phone$PhoneCall>;

  (method: "phone.confirmCall", params: {
    peer: InputPhoneCall,
    g_a: bytes,
    key_fingerprint: long,
    protocol: PhoneCallProtocol,
  }, options?: InvokeOptions): Promise<phone$PhoneCall>;

  (method: "phone.receivedCall", params: {
    peer: InputPhoneCall,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "phone.discardCall", params: {
    peer: InputPhoneCall,
    duration: int,
    reason: PhoneCallDiscardReason,
    connection_id: long,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "phone.setCallRating", params: {
    peer: InputPhoneCall,
    rating: int,
    comment: string,
  }, options?: InvokeOptions): Promise<Updates>;

  (method: "phone.saveCallDebug", params: {
    peer: InputPhoneCall,
    debug: DataJSON,
  }, options?: InvokeOptions): Promise<boolean>;

  (method: "langpack.getLangPack", params: {
    lang_code: string,
  }, options?: InvokeOptions): Promise<LangPackDifference>;

  (method: "langpack.getStrings", params: {
    lang_code: string,
    keys: Vector<string>,
  }, options?: InvokeOptions): Promise<Vector<LangPackString>>;

  (method: "langpack.getDifference", params: {
    from_version: int,
  }, options?: InvokeOptions): Promise<LangPackDifference>;

  (method: "langpack.getLanguages", params?: {

  }, options?: InvokeOptions): Promise<Vector<LangPackLanguage>>;
}
