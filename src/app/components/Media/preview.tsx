import styled from 'glamorous';
import { Themeable } from 'themes/theme.h';

export const MediaPreview = styled.span<Themeable>(({ theme }) => ({
  color: theme.dialogsTextFgService,
  [`.active &`]: {
    color: theme.dialogsTextFgServiceActive,
  },
}));
