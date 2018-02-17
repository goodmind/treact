import { Login } from 'components/Login'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, Store } from 'redux/store.h'
import * as Steps from './steps'

type ConnectedState = Pick<Store, 'auth'>
type ConnectedActions = { dispatch: Dispatch }
type OwnProps = {}
type Props = ConnectedState & ConnectedActions & OwnProps

export interface FormState {
  phoneNumber: string
  authCode: string
  password: string
}

interface State {
  step: number
  form: FormState
}

class LoginImpl extends React.Component<Props, State> {
  public state: State = {
    step: 1,
    form: {
      phoneNumber: '',
      authCode: '',
      password: '',
    },
  }

  public nextStep = () => {
    this.setState(prevState => ({
      step: prevState.step + 1,
    }))
  }

  public skipStep = (steps: number = 1) => {
    this.setState(prevState => ({
      step: prevState.step + steps,
    }))
  }

  public updateForm = <K extends keyof FormState>(state: Pick<FormState, K>) => {
    this.setState(prevState => ({
      form: Object.assign({}, prevState.form, state),
    }))
  }

  public form = (step: number) => {
    switch (step) {
      case 1:
        return (
          <Steps.Intro
            nextStep={this.nextStep} />
        )
      case 2:
        return (
          <Steps.PhoneNumber
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        )
      case 3:
        return (
          <Steps.AuthCode
            form={this.state.form}
            update={this.updateForm}
            skipStep={this.skipStep} />
        )
      case 4:
        return (
          <Steps.Password
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        )
      case 5:
        return <Steps.Success />
      default:
        return <div />
    }
  }

  public render() {
    const { auth } = this.props

    return (
      <Login>
        {this.form(auth.authenticated ? 5 : this.state.step)}
      </Login>
    )
  }
}

interface Step {
  update: LoginImpl['updateForm']
  form: FormState
}

export interface StepNext extends Step {
  nextStep: LoginImpl['nextStep']
}

export interface StepSkip extends Step {
  skipStep: LoginImpl['skipStep']
}

const mapStateToProps = (state: Store) => ({ auth: state.auth })
const LoginContainer =
  connect<ConnectedState, ConnectedActions, OwnProps>(mapStateToProps)(LoginImpl)

export { LoginContainer as Login }
