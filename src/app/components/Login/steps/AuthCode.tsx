import { FormState } from 'containers/Login';
import * as React from 'react';
import * as t from '../style.css';
import { CommonProps } from './';

type Props = CommonProps & {
  form: FormState,
};

const AuthCode = ({ form, error, nextStep, change }: Props) => (
  <div className={t.loginStep}>
    <h1>{form.phoneNumber}</h1>
    <p>
      Please enter the code you've just received in the previous <strong>Telegram</strong> app.
    </p>
    <div className={`row center-xs ${t.formGroupLogin}`}>
      <input
        onChange={change}
        name="authCode"
        className="col-xs-4 form-control form-control-lg"
        placeholder="Your code" type="text" maxLength={5} />
    </div>
    {error && <div>Error type: {error.description}</div>}
    <button onClick={nextStep} className={`${t.btn} ${t.primary}`}>Next</button>
  </div>
);

export { AuthCode };
