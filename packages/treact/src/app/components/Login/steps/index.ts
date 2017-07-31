export { Intro } from './Intro';
export { PhoneNumber } from './PhoneNumber';
export { AuthCode } from './AuthCode';
export { Password } from './Password';

import { StepNext } from 'containers/Login';
import styled from 'glamorous';
import { AuthError } from 'redux/modules/auth';

export const Step = styled.div({
  textAlign: 'center',
  width: '300px',
});

export const Heading = styled.h1({
  fontWeight: 400,
});

type ButtonProps = { primary?: boolean };
export const Button = styled.button<ButtonProps>({
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: '#ccc',
  lineHeight: '54px',
  color: '#fff',
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
}, props => props.primary ? {
  backgroundColor: '#2fa9e2',
  ':hover': {
    backgroundColor: '#279ad0',
  },
} : {});

export const FormGroup = styled.div('form-group', {
  marginBottom: '42px',
});

export const RowFormGroup = styled(FormGroup)('row');

export type CommonProps = {
  error: AuthError | null,
  change: React.ChangeEventHandler<{}>,
} & Pick<StepNext, 'nextStep'>;
