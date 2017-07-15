export { Intro } from './Intro';
export { PhoneNumber } from './PhoneNumber';
export { AuthCode } from './AuthCode';
export { Password } from './Password';

import { IStepNext } from 'containers/Login';
import { IAuthError } from 'redux/modules/auth';

export type ICommonProps = {
  error: IAuthError | null,
  change: React.ChangeEventHandler<{}>,
} & Pick<IStepNext, 'nextStep'>;
