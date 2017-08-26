import { LocationMap } from 'components/LocationMap';
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
export const Empty = (props: MtpMessageMediaEmpty) => (
  <div>
    {props._}
  </div>
);

export const Geo = ({ geo: { lat, long: lng } }: MtpMessageMediaGeo) => (
  <LocationMap geo={{ lat, lng }} />
);

export const Contact = ({ phone_number, user_id, first_name, last_name }: MtpMessageMediaContact) => (
  <div>
    {user_id > 0 && <PeerPhoto peerID={user_id} />}
    <div>{first_name} {last_name}</div>
    <div>{phone_number}</div>
  </div>
);

export const Unsupported = () => (
  <div>
    This message is not supported by your version of Telegram
  </div>
);

export const Venue = ({
  geo: { lat, long: lng },
  title, address,
}: MtpMessageMediaVenue) => (
  <div>
    <strong>{title}</strong>
    <div>{address}</div>
    <LocationMap
      geo={{ lat, lng }}
      place={{ title, address }} />
  </div>
);

// Media content
export const Photo = (props: MtpMessageMediaPhoto) => (
  <div>
    {props._}
  </div>
);

export const Document = (props: MtpMessageMediaDocument) => (
  <div>
    {props._}
  </div>
);

export const WebPage = (props: MtpMessageMediaWebPage) => (
  <div>
    Webpage type: {props.webpage.type}
  </div>
);

export const Game = (props: MtpMessageMediaGame) => (
  <div>
    {props._}
  </div>
);

export const Invoice = (props: MtpMessageMediaInvoice) => (
  <div>
    {props._}
  </div>
);
