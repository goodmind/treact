import { TLDocument, TLMedia, TLMediaRecord, TLMediaTypes } from 'helpers/reselector.h';
import { MtpMessage } from 'redux/mtproto';

export { TLMedia };

type Obj<T> = { [k: string]: T };
type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];
type If<Cond extends '0'|'1', Then, Else> = { 1: Then, 0: Else }[Cond];
type Swap<
  T extends { [k: string]: string },
  Keys extends keyof T = keyof T,
  Vals extends string = T[Keys]
> = {
  [P1 in Vals]: {
    [P2 in Keys]: If<UnionHasKey<T[P2], P1>, P2, never>
  }[Keys]
};

export type StoredMedia = {
  [K in keyof Swap<TLMediaTypes>]: TLMediaRecord[Swap<TLMediaTypes>[K]]
} & {
  document: { document: TLDocument },
};

type MediaComponent<T = TLMedia> = React.SFC<T>;

export type Mappings = {
  [K in keyof Swap<TLMediaTypes>]: [
    MediaComponent<StoredMedia[K]>,
    string | ((media: StoredMedia[K]) => React.ReactNode)
  ];
};

export type Props = Pick<MtpMessage, 'media'>;

export type ConnectedState = { media: TLMedia };

export type FullProps = { Attachment: MediaComponent, media: TLMedia };
