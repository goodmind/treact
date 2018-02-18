import * as React from 'react'
import { Button, CommonProps, Heading, RowFormGroup, Step } from '../'
import * as s from './style.css'

type Props = CommonProps & {
  phoneCode: string,
}

const PhoneNumber = ({ error, nextStep, change, phoneCode }: Props) => (
  <Step>
    <Heading>Your Phone</Heading>
    <p>
      Please confirm your country code and enter your phone number.
    </p>
    <RowFormGroup>
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
    </RowFormGroup>
    {error && <div>Error type: {error.message}</div>}
    <Button onClick={nextStep} primary>Next</Button>
  </Step>
)

export { PhoneNumber }
