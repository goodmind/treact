import styled from 'glamorous'
import { TLDocument } from 'helpers/reselector.h'
import * as React from 'react'
import {
  MtpMessageMediaPhoto,
  MtpMessageMediaVenue,
} from 'redux/mtproto'
import { Themeable } from 'themes/theme.h'

const Caption = styled.span<Themeable>(({ theme }) => ({
  color: theme.dialogsTextFg,
  [`.active &`]: {
    color: theme.dialogsTextFgActive,
  },
}))

type PreviewProps = { children: React.ReactNode } & Themeable
export const StyledPreview = styled.span<PreviewProps>(({ theme }) => ({
  color: theme.dialogsTextFgService,
  [`.active &`]: {
    color: theme.dialogsTextFgServiceActive,
  },
}))

export const Empty = 'Empty Message'
export const Geo = 'Location'
export const Contact = 'Contact'
export const Unsupported = 'Unsupported message'
export const WebPage = 'Webpage'
export const Game = 'Game'
export const Invoice = 'Invoice'
export const Photo = ({ caption }: MtpMessageMediaPhoto) => caption ? (
  <span>Photo, <Caption>{caption}</Caption></span>
) : (
  <span>Photo</span>
)
export const Venue = ({ title }: MtpMessageMediaVenue) => (
  <span>Location, <Caption>{title}</Caption></span>
)

export const Sticker = 'Sticker'
export const GIF = 'GIF'
export const Round = 'Video message'
export const Audio = 'Audio'
export const Voice = 'Voice message'
export const Video = 'Video'
export const Document = ({ document }: { document: TLDocument }) => document.file_name
