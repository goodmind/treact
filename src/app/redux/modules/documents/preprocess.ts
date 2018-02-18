import { TLDocument } from 'helpers/reselector.h'
import { pipe } from 'ramda'
import { MtpDocument, MtpDocumentAttribute, TMtpDocumentAttributeRecord } from 'redux/mtproto'

type Mappings = {
  [K in keyof TMtpDocumentAttributeRecord]: <T extends {}>(
    attribute: TMtpDocumentAttributeRecord[K],
    document: MtpDocument,
    prev: TLDocument,
  ) => T
}
const mappings: Mappings = {
  documentAttributeFilename: ({ file_name }, _, { type }) => ({
    type: type || 'document',
    file_name,
  }),
  documentAttributeAudio: ({ voice, title, performer, duration }) => ({
    type: voice ? 'voice' : 'audio',
    duration,
    audioTitle: title,
    audioPerformer: performer,
  }),
  documentAttributeVideo: ({ round_message, w, h, duration }, { thumb }) => ({
    type: thumb && round_message ? 'round' : 'video',
    duration, w, h,
  }),
  documentAttributeSticker: ({ alt, stickerset }, { thumb, mime_type }) => ({
    type: thumb && mime_type === 'image/webp' ? 'sticker' : undefined,
    sticker: true,
    emoji: alt,
    stickerset: stickerset._ === 'inputStickerSetEmpty' ? undefined : stickerset,
    stickerSetInput: stickerset._ === 'inputStickerSetID' ? stickerset : undefined,
  }),
  documentAttributeImageSize: ({ w, h }) => ({ w, h }),
  documentAttributeAnimated: (_, { mime_type, thumb }) => ({
    type: (mime_type === 'image/gif' || mime_type === 'video/mp4') && thumb ? 'gif' : undefined,
    animated: true,
  }),
  documentAttributeHasStickers: () => ({}),
}
type Value = {
  f: <T>(attribute: MtpDocumentAttribute, document: MtpDocument, prev?: Partial<TLDocument>) => T,
  attribute: MtpDocumentAttribute,
}

export const processDoc = pipe(
  (doc: MtpDocument) => doc.thumb && doc.thumb._ === 'photoSizeEmpty'
    ? Object.assign({}, doc, { thumb: undefined })
    : doc,
  (doc: MtpDocument) =>
    doc.attributes
      .map(attribute => ({ f: mappings[attribute._], attribute }))
      .reduce<TLDocument, MtpDocument>(
        (acc, { f, attribute }: Value) =>
          Object.assign({}, acc, f(attribute, doc, acc)),
        doc,
      ),
)

