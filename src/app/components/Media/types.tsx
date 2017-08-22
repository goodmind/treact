import { PeerPhoto } from 'containers';
import * as React from 'react';
import {
  MtpMessageMediaContact,
  MtpMessageMediaDocument,
  MtpMessageMediaEmpty,
  MtpMessageMediaGame,
  MtpMessageMediaGeo,
  MtpMessageMediaInvoice,
  MtpMessageMediaPhoto,
  MtpMessageMediaVenue,
  MtpMessageMediaWebPage,
} from 'redux/mtproto';

// Text
export const MessageMediaEmpty = (props: MtpMessageMediaEmpty) => (
  <div>
    {props._}
  </div>
);

export const MessageMediaGeo = (props: MtpMessageMediaGeo) => (
  <div>
    {props._}
  </div>
);

export const MessageMediaContact = ({ phone_number, user_id, first_name, last_name }: MtpMessageMediaContact) => (
  <div>
    {user_id > 0 && <PeerPhoto peerID={user_id} />}
    <div>{first_name} {last_name}</div>
    <div>{phone_number}</div>
  </div>
);

export const MessageMediaUnsupported = () => (
  <div>
    This message is not supported by your version of Telegram
  </div>
);

export const MessageMediaVenue = (props: MtpMessageMediaVenue) => (
  <div>
    {props._}
  </div>
);

// Media content
export const MessageMediaPhoto = (props: MtpMessageMediaPhoto) => (
  <div>
    {props._}
  </div>
);

export const MessageMediaDocument = (props: MtpMessageMediaDocument) => (
  <div>
    {props._}
  </div>
);

export const MessageMediaWebPage = (props: MtpMessageMediaWebPage) => (
  <div>
    Webpage type: {props.webpage.type}
  </div>
);

export const MessageMediaGame = (props: MtpMessageMediaGame) => (
  <div>
    {props._}
  </div>
);

export const MessageMediaInvoice = (props: MtpMessageMediaInvoice) => (
  <div>
    {props._}
  </div>
);
