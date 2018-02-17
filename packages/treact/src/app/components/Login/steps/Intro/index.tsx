import { StepNext } from 'containers/Login'
import * as React from 'react'
import { Button, Heading, Step } from '../'
import * as icon from './icon102.png'

type Props = Pick<StepNext, 'nextStep'>

const Logo = () => (
  <img
    width={102}
    height={102}
    src={icon} />
)

const Intro = ({ nextStep }: Props) => (
  <Step>
    <Logo />
    <Heading>Telegram Web</Heading>
    <p>
      Welcome to the unofficial <a href="https://telegram.org">Telegram</a> web app.
    </p>
    <p>
      It's <strong>fast</strong> and <strong>secure</strong>.
    </p>
    <Button onClick={nextStep} primary>Start messaging</Button>
  </Step>
)

export { Intro }
