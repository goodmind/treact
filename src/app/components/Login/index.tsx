import styled from 'glamorous'
import { Themeable } from 'themes/theme.h'

export const Login = styled.div<Themeable>(({ theme }) => ({
  backgroundColor: theme.introBg,
  color: theme.introDescriptionFg,
  width: '100%',
  flex: '1 100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))



