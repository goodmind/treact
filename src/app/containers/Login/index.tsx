import * as React from 'react';
import * as Steps from './steps';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';
const s = require('./style.css');

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = {};
type IOwnProps = {};
type IProps = IConnectedState & IConnectedActions & IOwnProps;

export interface IFormState {
  phoneNumber: string;
  authCode: string;
  password: string;
}

interface IState {
  step: number;
  form: IFormState;
}

class LoginImpl extends React.Component<IProps, IState> {
  public state: IState = {
    step: 1,
    form: {
      phoneNumber: '',
      authCode: '',
      password: '',
    },
  };

  public nextStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  }

  public skipStep = (steps: number = 1) => {
    this.setState({
      step: this.state.step + steps,
    });
  }

  public updateForm = <K extends keyof IFormState>(state: Pick<IFormState, K>) => {
    this.setState({
      form: Object.assign({}, this.state.form, state),
    });
  }

  public form = step => {
    switch (step) {
      case 1:
        return (
          <Steps.Intro
            nextStep={this.nextStep} />
        );
      case 2:
        return (
          <Steps.PhoneNumber
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        );
      case 3:
        return (
          <Steps.AuthCode
            form={this.state.form}
            update={this.updateForm}
            skipStep={this.skipStep} />
        );
      case 4:
        return (
          <Steps.Password
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />
        );
      case 5:
        return <Steps.Success />;
      default:
        return <div />;
    }
  }

  public render() {
    const { auth } = this.props;

    return (
      <div className={s.main}>
        {this.form(auth.authenticated ? 5 : this.state.step)}
      </div>
    );
  }
}

interface IStep {
  update: LoginImpl['updateForm'];
  form: IFormState;
}

export interface IStepNext extends IStep {
  nextStep: LoginImpl['nextStep'];
}

export interface IStepSkip extends IStep {
  skipStep: LoginImpl['skipStep'];
}

const Login = connect<IConnectedState, IConnectedActions, IOwnProps>(state => ({ auth: state.auth }))(LoginImpl);

export { Login }
