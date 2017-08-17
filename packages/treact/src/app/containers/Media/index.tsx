import {
  MediaPreview,
  MessageMediaContact,
  MessageMediaDocument,
  MessageMediaEmpty,
  MessageMediaGame,
  MessageMediaGeo,
  MessageMediaInvoice,
  MessageMediaPhoto,
  MessageMediaUnsupported,
  MessageMediaVenue,
  MessageMediaWebPage,
} from 'components/Media';
import * as React from 'react';
import { MtpMessage } from 'redux/mtproto';

const mappings: { [key: string]: [React.StatelessComponent<Props['media']>, string] } = {
  messageMediaEmpty: [MessageMediaEmpty, 'Empty Message'],
  messageMediaGeo: [MessageMediaGeo, 'Location'],
  messageMediaContact: [MessageMediaContact, 'Contact'],
  messageMediaUnsupported: [MessageMediaUnsupported, 'Unsupported message'],
  messageMediaVenue: [MessageMediaVenue, 'Venue'],
  messageMediaPhoto: [MessageMediaPhoto, 'Photo'],
  messageMediaDocument: [MessageMediaDocument, 'Document'],
  messageMediaWebPage: [MessageMediaWebPage, 'Webpage'],
  messageMediaGame: [MessageMediaGame, 'Game'],
  messageMediaInvoice: [MessageMediaInvoice, 'Invoice'],
};

type Props = Pick<MtpMessage, 'media'> & { preview?: boolean };
const Media = ({ media, preview }: Props) => {
  const [Attachment, Preview] = mappings[media._];
  const text = typeof Preview === 'function'
    ? Preview(media)
    : Preview;

  return preview
    ? <MediaPreview>{text}</MediaPreview>
    : React.createElement(Attachment, media);
};

export { Media };
