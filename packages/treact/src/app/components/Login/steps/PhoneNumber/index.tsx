import * as React from 'react';
import { CommonProps } from '../';
import * as t from '../../style.css';
import * as s from './style.css';

type Props = CommonProps & {
  phoneCode: string,
};

const PhoneNumber = ({ error, nextStep, change, phoneCode }: Props) => (
  <div className={t.loginStep}>
    <h1>Your Phone</h1>
    <p>
      Please confirm your country code and enter your phone number.
    </p>
    <div className={`row ${t.formGroupLogin}`}>
      <input
        onChange={change}
        name="phoneCode"
        className={`${s.phoneCode} col-xs-2 form-control form-control-lg`}
        value={phoneCode} type="tel" />
      <input
        onChange={change}
        name="phoneNumber"
        className="col-xs-10 form-control form-control-lg"
        placeholder="--- --- -- --" type="tel" />
    </div>
    {error && <div>Error type: {error.message}</div>}
    <button onClick={nextStep} className={`${t.btn} ${t.primary}`}>Next</button>
  </div>
);

export { PhoneNumber };
