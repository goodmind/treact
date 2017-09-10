import { LocationMap } from 'components/LocationMap';
import { PeerPhoto } from 'containers';
// import { FullMediaComp } from 'containers/Media';
import picStore from 'helpers/FileManager/picStore';
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
export const Photo = ({ _, caption }: MtpMessageMediaPhoto) => (
  <div>
    {_}
    {caption}
  </div>
);

// TODO: use normalized types, split document to different types
export const Document = ({ document: { type, thumb, w, h }, caption }: MtpMessageMediaDocument) => (
  <div>
    {type}
    {caption}
    {thumb && <div>
      Thumb: <img
        style={{ height: h, width: w }}
        src={picStore.get(thumb.location.local_id)} />
    </div>}
  </div>
);

export const WebPage = ({ webpage }: MtpMessageMediaWebPage) => (
  <div>
    Webpage type: {webpage.type}
    {/*webpage.type !== 'article' && <FullMediaComp media={webpage} />*/}
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
