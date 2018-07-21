export { Intro } from './Intro'
export { PhoneNumber } from './PhoneNumber'
export { AuthCode } from './AuthCode'
export { Password } from './Password'

import { StepNext } from 'containers/Login'
import styled from 'glamorous'
import { AuthError } from 'store/modules/auth'
import { Themeable } from 'themes/theme.h'

export const Step = styled.div({
  textAlign: 'center',
  width: '300px',
})

export const Heading = styled.h1<Themeable>(({ theme }) => ({
  color: theme.introTitleFg,
  fontWeight: 400,
}))

type ButtonProps = { primary?: boolean } & Themeable
export const Button = styled.button<ButtonProps>({
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: '#ccc',
  lineHeight: '54px',
  padding: '1px 75px',
  width: '100%',
  borderRadius: '3px',
  fontSize: '16px',
  textAlign: 'center',
  textTransform: 'uppercase',
  ':active': {
    paddingTop: '2px',
    paddingBottom: '0px',
  },
}, ({ primary, theme }) => primary ? {
  backgroundColor: theme.activeButtonBg,
  color: theme.activeButtonFg,
  ':hover': {
    color: theme.activeButtonFgOver,
    backgroundColor: theme.activeButtonBgOver,
  },
} : {})

export const FormGroup = styled.div('form-group', {
  marginBottom: '42px',
})

export const RowFormGroup = styled(FormGroup)('row')

export type CommonProps = {
  error: AuthError | null,
  change: React.ChangeEventHandler<{}>,
} & Pick<StepNext, 'nextStep'>
