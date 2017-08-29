import { processDoc } from 'modules/documents/preprocess';
import { schema } from 'normalizr';
import { map, path, pipe, prop, zipObj } from 'ramda';

import { MtpMessage, MtpMessageMedia } from 'redux/mtproto';

const mediaSettings = {
  processStrategy: (value: MtpMessageMedia) => ({
    type: value._.slice('messageMedia'.length).toLowerCase(),
    ...value,
  }),
  idAttribute: (_: void, parent: MtpMessage) => path<number>(['id'], parent),
};

const document = new schema.Entity('documents', {}, {
  processStrategy: processDoc,
  idAttribute: pipe(prop('id'), e => +e),
});

const photo = new schema.Entity('photos', {}, {
  idAttribute: pipe(prop('id'), e => +e),
});

const webpage = new schema.Object({
  document,
  photo,
});

const messageMediaDocument = new schema.Entity('media', {
  document,
}, {
  processStrategy: value => {
    const { type } = processDoc(value.document);
    return { type, ...value };
  },
  idAttribute: (_, parent) => path(['id'], parent),
});

const messageMediaPhoto = new schema.Entity('media', {
  photo,
}, mediaSettings);

const messageMediaWebPage = new schema.Entity('media', {
  webpage,
}, mediaSettings);

const messageMediaGame = new schema.Entity('media', {}, mediaSettings);

const messageMediaInvoice = new schema.Entity('media', {}, mediaSettings);

const textMedia = (
  keys: string[],
  entity = new schema.Entity('media', {}, mediaSettings),
) =>
  zipObj(keys, map(() => entity, keys));

export const mediaIndexation = [
  'media',
  'documents',
  'photos',
];

export const media = new schema.Union({
  ...textMedia([
    'messageMediaUnsupported',
    'messageMediaContact',
    'messageMediaEmpty',
    'messageMediaVenue',
    'messageMediaGeo',
  ]),
  messageMediaDocument,
  messageMediaPhoto,
  messageMediaGame,
  messageMediaInvoice,
  messageMediaWebPage,
}, '_');
