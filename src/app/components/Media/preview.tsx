import styled from 'glamorous';
import { TLDocument } from 'helpers/reselector.h';
import * as React from 'react';
import {
  MtpMessageMediaVenue,
} from 'redux/mtproto';
import { Themeable } from 'themes/theme.h';

const Caption = styled.span<Themeable>(({ theme }) => ({
  color: theme.dialogsTextFg,
  [`.active &`]: {
    color: theme.dialogsTextFgActive,
  },
}));

export const StyledPreview = styled.span<Themeable>(({ theme }) => ({
  color: theme.dialogsTextFgService,
  [`.active &`]: {
    color: theme.dialogsTextFgServiceActive,
  },
}));

export const Empty = 'Empty Message';
export const Geo = 'Location';
export const Contact = 'Contact';
export const Unsupported = 'Unsupported message';
export const Photo = 'Photo';
export const WebPage = 'Webpage';
export const Game = 'Game';
export const Invoice = 'Invoice';
export const Venue = ({ title }: MtpMessageMediaVenue) => (
  <span>Location, <Caption>{title}</Caption></span>
);
export const Document = ({ document }: { document: TLDocument }) => ({
  'sticker' : 'Sticker',
  'gif'     : 'GIF',
  'round'   : 'Video message',
  'audio'   : 'Audio',
  'voice'   : 'Voice message',
  'video'   : 'Video',
  'document': document.file_name,
}[document.type]);
