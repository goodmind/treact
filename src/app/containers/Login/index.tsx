import * as React from 'react';
import * as Steps from './steps';
import { connect } from 'react-redux';
const s = require('./style.css');

class LoginImpl extends React.Component<any, any> {
  constructor(...args) {
    super(...args);

    this.nextStep = this.nextStep.bind(this);
    this.skipStep = this.skipStep.bind(this);
    this.updateForm = this.updateForm.bind(this);

    this.state = {
      step: 1,
      form: {
        phoneNumber: '',
        authCode: '',
        password: '',
      },
    };
  }

  public nextStep() {
    this.setState({
      step: this.state.step + 1,
    });
  }

  public skipStep(steps: number = 1) {
    this.setState({
      step: this.state.step + steps,
    });
  }

  public updateForm(state) {
    this.state.form = Object.assign(this.state.form, {}, state);
  }

  public render() {
    const form = () => {
      const { authKey } = this.props;
      let step = this.state.step;
      if (authKey !== null) {
        step = 5;
      }

      switch (step) {
        case 1:
          return <Steps.Intro
            nextStep={this.nextStep} />;
        case 2:
          return <Steps.PhoneNumber
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />;
        case 3:
          return <Steps.AuthCode
            form={this.state.form}
            update={this.updateForm}
            skipStep={this.skipStep} />;
        case 4:
          return <Steps.Password
            form={this.state.form}
            update={this.updateForm}
            nextStep={this.nextStep} />;
        case 5:
          return <Steps.Success />;
        default:
          return <div />;
      }
    };

    return (
      <div className={s.main}>
        {form()}
      </div>
    );
  }
}

const Login = connect<any, any, any>(state => ({ authKey: state.authKey }))(LoginImpl);

export { Login }
