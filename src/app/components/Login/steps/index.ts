export { Intro } from './Intro';
export { PhoneNumber } from './PhoneNumber';
export { AuthCode } from './AuthCode';
export { Password } from './Password';

import { StepNext } from 'containers/Login';
import { AuthError } from 'redux/modules/auth';

export type CommonProps = {
  error: AuthError | null,
  change: React.ChangeEventHandler<{}>,
} & Pick<StepNext, 'nextStep'>;
