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
import { denormalize } from 'normalizr';
import { map, prop } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import { media as schema } from 'redux/api/chatList';
import { MtpMessage, MtpMessageMedia, TMtpMessageMediaRecord } from 'redux/mtproto';
import { Store } from 'redux/store.h';

import { TLDocument } from 'helpers/reselector.h';

type StoredMedia = {
  [K in keyof TMtpMessageMediaRecord]: TMtpMessageMediaRecord[K]
} & {
  messageMediaDocument: { document: TLDocument },
};

type Mappings = {
  [K in keyof TMtpMessageMediaRecord]: [
    React.StatelessComponent<MtpMessageMedia>,
    string | ((media: StoredMedia[K]) => string)
  ];
};

// TODO: move preview to another component or not?
const mappings: Mappings = {
  messageMediaEmpty: [MessageMediaEmpty, 'Empty Message'],
  messageMediaGeo: [MessageMediaGeo, 'Location'],
  messageMediaContact: [MessageMediaContact, 'Contact'],
  messageMediaUnsupported: [MessageMediaUnsupported, 'Unsupported message'],
  messageMediaVenue: [MessageMediaVenue, 'Venue'],
  messageMediaPhoto: [MessageMediaPhoto, 'Photo'],
  messageMediaDocument: [MessageMediaDocument, ({ document }) => ({
    'sticker' : 'Sticker',
    'gif'     : 'GIF',
    'round'   : 'Video message',
    'audio'   : 'Audio',
    'voice'   : 'Voice message',
    'video'   : 'Video',
    'document': document.file_name,
  }[document.type])],
  messageMediaWebPage: [MessageMediaWebPage, 'Webpage'],
  messageMediaGame: [MessageMediaGame, 'Game'],
  messageMediaInvoice: [MessageMediaInvoice, 'Invoice'],
};

type Props = Pick<MtpMessage, 'media'> & { preview?: boolean };
const Media = ({ media, preview }: Props) => {
  console.log(media);

  const [Attachment, Preview] = mappings[media._];
  const text = typeof Preview === 'function'
    ? Preview(media)
    : Preview;

  return preview
    ? <MediaPreview>{text}</MediaPreview>
    : React.createElement(Attachment, media);
};

const mapStateToProps = (state: Store, { media }: Props) => {
  const entities = map(prop('byId'), state);
  return { media: denormalize(media, schema, entities) };
};

export default connect(mapStateToProps)(Media);
