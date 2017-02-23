import * as React from 'react';
import { checkPassword } from 'api/auth';
import { connect } from 'react-redux';
import { IStore, IDispatch } from 'redux/IStore';
import { IStepNext as IOwnProps } from '../..';
import { IAuthError } from 'redux/modules/auth';
const t = require('../../style.css');

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IProps = IConnectedState & IConnectedActions & IOwnProps;
type IState = {
  password: string;
  error: IAuthError;
};

class PasswordImpl extends React.Component<IProps, IState> {
  public state: IState = {
    password: '',
    error: null,
  };

  public handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  public handleNextStep = () => {
    const { update, nextStep, dispatch } = this.props;
    const { password } = this.state;

    update({ password });
    console.log(this.state, this.props);
    dispatch(checkPassword(this.state.password))
      .then(({payload: error}) => error.code ? this.setState({ error }) : this.setState({error: null}))
      .then(() => this.state.error || nextStep());
  }

  public render() {
    const { error } = this.state;

    return (
      <div className={t.loginStep}>
        <h1>Cloud password check</h1>
        <p>
          Please enter your cloud password.
        </p>
        <div className={t.formGroupLogin}>
          <input
            onChange={this.handleChange}
            name="password"
            className="form-control form-control-lg"
            placeholder="Your cloud password" type="password" />
        </div>
        {error && <div>Error type: {error.description}</div>}
        <button onClick={this.handleNextStep} className={`${t.btn} ${t.primary}`}>Submit</button>
      </div>
    );
  }
}

const Password = connect<IConnectedState, IConnectedActions, IOwnProps>(state => ({ auth: state.auth }))(PasswordImpl);

export { Password }
