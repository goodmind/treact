import * as React from 'react';
import { connect } from 'react-redux';

import { StyledPreview } from 'components/Media';
import * as Preview from 'components/Media/preview';
import * as Full from 'components/Media/types';
import { Store } from 'redux/store.h';
import { ConnectedState, FullProps, Mappings, Props } from './index.h';
import { makeMediaSelector } from './selector';

// TODO: do something with this?
const mappings: Mappings = {
  unsupported: [Full.Unsupported, Preview.Unsupported],
  contact: [Full.Contact, Preview.Contact],
  empty: [Full.Empty, Preview.Empty],
  venue: [Full.Venue, Preview.Venue],
  geo: [Full.Geo, Preview.Geo],

  document: [Full.Document, Preview.Document],
  sticker: [Full.Document, Preview.Sticker],
  webpage: [Full.WebPage, Preview.WebPage],
  invoice: [Full.Invoice, Preview.Invoice],
  voice: [Full.Document, Preview.Voice],
  audio: [Full.Document, Preview.Audio],
  round: [Full.Document, Preview.Round],
  video: [Full.Document, Preview.Video],
  photo: [Full.Photo, Preview.Photo],
  game: [Full.Game, Preview.Game],
  gif: [Full.Document, Preview.GIF],
};

const mapMedia = () => {
  const mediaSelector = makeMediaSelector();
  return (state: Store, props: Props): ConnectedState => {
    const media = mediaSelector(state, props);
    return {
      media,
    };
  };
};

const preview =
  (Base: React.ComponentType) => {
    const Comp: React.SFC<{ media: TLMedia }> = ({ media }) => {
      const [, Preview] = mappings[media.type];
      const text: React.ReactNode = typeof Preview === 'function'
        // TODO: wait until https://github.com/Microsoft/TypeScript/pull/17790 lands
        // tslint:disable-next-line
        ? (Preview as any)(media)
        : Preview;

      return <Base>{text}</Base>;
    };
    Comp.displayName = `preview(${Base.displayName})`;
    return Comp;
  };

type FullProps = { Attachment: React.SFC<TLMedia>, media: TLMedia };
const full =
  (Base: React.SFC<FullProps>) => {
    const Comp: React.SFC<{ media: TLMedia }> = ({ media }) => {
      const [Attachment] = mappings[media.type];
      Base.displayName = `full(${Attachment.name})`;
      return <Base Attachment={Attachment} media={media} />;
    };
    return Comp;
  };


// TODO: move from containers
export const PreviewMediaComp = preview(StyledPreview);
export const FullMediaComp = full(({ Attachment, media }) =>
  React.createElement(Attachment, media));

export const PreviewMedia = connect(mapMedia)(PreviewMediaComp);
export const FullMedia = connect(mapMedia)(FullMediaComp);


