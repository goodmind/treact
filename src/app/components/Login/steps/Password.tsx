import * as React from 'react'
import { Button, CommonProps, FormGroup, Heading, Step } from './'

type Props = CommonProps

const Password = ({ error, change, nextStep }: Props) => (
  <Step>
    <Heading>Cloud password check</Heading>
    <p>
      Please enter your cloud password.
    </p>
    <FormGroup>
      <input
        onChange={change}
        name="password"
        className="form-control form-control-lg"
        placeholder="Your cloud password" type="password" />
    </FormGroup>
    {error && <div>Error type: {error.message}</div>}
    <Button onClick={nextStep} primary>Submit</Button>
  </Step>
)

export { Password }
