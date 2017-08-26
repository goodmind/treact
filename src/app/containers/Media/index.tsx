import * as Preview from 'components/Media/preview';
import * as Full from 'components/Media/types';

import { StyledPreview } from 'components/Media';
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
    string | ((media: StoredMedia[K]) => React.ReactNode)
  ];
};

// TODO: do something with this?
const mappings: Mappings = {
  messageMediaEmpty: [Full.Empty, Preview.Empty],
  messageMediaGeo: [Full.Geo, Preview.Geo],
  messageMediaContact: [Full.Contact, Preview.Contact],
  messageMediaUnsupported: [Full.Unsupported, Preview.Unsupported],
  messageMediaVenue: [Full.Venue, Preview.Venue],
  messageMediaPhoto: [Full.Photo, Preview.Photo],
  messageMediaDocument: [Full.Document, Preview.Document],
  messageMediaWebPage: [Full.WebPage, Preview.WebPage],
  messageMediaGame: [Full.Game, Preview.Game],
  messageMediaInvoice: [Full.Invoice, Preview.Invoice],
};

type Props = Pick<MtpMessage, 'media'>;
const mediaSelector = (state: Store, { media }: Props): MtpMessageMedia => {
  const entities = map(prop('byId'), state);
  return denormalize(media, schema, entities);
};

const mapPreview = (state: Store, props: Props) => {
  const media = mediaSelector(state, props);
  const [, Preview] = mappings[media._];
  const text = typeof Preview === 'function'
    ? Preview(media)
    : Preview;

  return { children: text };
};

const mapFull = (state: Store, props: Props) => {
  const media = mediaSelector(state, props);
  const [Attachment] = mappings[media._]
  return { Attachment, media };
};

export const PreviewMedia = connect(mapPreview)(StyledPreview);

export const FullMedia = connect(mapFull)(({ Attachment, media }) =>
  React.createElement(Attachment, media));
