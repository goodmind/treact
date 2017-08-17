import styled from 'glamorous';

export const MediaPreview = styled.span(({ theme }) => ({
  color: theme.dialogsTextFgService,
  [`.active &`]: {
    color: theme.dialogsTextFgServiceActive,
  },
}));
