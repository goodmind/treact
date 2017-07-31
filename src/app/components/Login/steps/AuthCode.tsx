import { FormState } from 'containers/Login';
import * as React from 'react';
import { Button, Heading, RowFormGroup, Step } from './';
import { CommonProps } from './';

type Props = CommonProps & {
  form: FormState,
};

const AuthCode = ({ form, error, nextStep, change }: Props) => (
  <Step>
    <Heading>{form.phoneNumber}</Heading>
    <p>
      Please enter the code you've just received in the previous <strong>Telegram</strong> app.
    </p>
    <RowFormGroup className="center-xs">
      <input
        onChange={change}
        name="authCode"
        className="col-xs-4 form-control form-control-lg"
        placeholder="Your code" type="text" maxLength={5} />
    </RowFormGroup>
    {error && <div>Error type: {error.message}</div>}
    <Button onClick={nextStep} primary>Next</Button>
  </Step>
);

export { AuthCode };
