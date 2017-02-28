import * as React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'api/auth';
import { IStore, IDispatch } from 'redux/IStore';
import { IStepSkip as IOwnProps } from '../..';
import { IAuthError } from 'redux/modules/auth';
const t = require('../../style.css');

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IProps = IConnectedState & IConnectedActions & IOwnProps;
type IState = {
  authCode: string;
  error: IAuthError;
};

class AuthCodeImpl extends React.Component<IProps, IState> {
  public state: IState = {
    authCode: '',
    error: null,
  };

  public handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  public handleNextStep = () => {
    const { update, skipStep, dispatch } = this.props;
    const { authCode } = this.state;

    update({ authCode });
    dispatch(signIn(this.state.authCode))
      .then(({payload: error}) => (error && error.code) ? this.setState({ error }) : this.setState({error: null}))
      .then(() => skipStep(this.props.auth.error.type === 'SESSION_PASSWORD_NEEDED' ? 1 : 2));
  }

  public render() {
    const { form } = this.props;
    const { error } = this.state;

    return (
      <div className={t.loginStep}>
        <h1>{form.phoneNumber}</h1>
        <p>
          Please enter the code you've just received in the previous <strong>Telegram</strong> app.
        </p>
        <div className={`row center-xs ${t.formGroupLogin}`}>
          <input
            onChange={this.handleChange}
            name="authCode"
            className="col-xs-4 form-control form-control-lg"
            placeholder="Your code" type="text" maxLength={5} />
        </div>
        {error && <div>Error type: {error.description}</div>}
        <button onClick={this.handleNextStep} className={`${t.btn} ${t.primary}`}>Next</button>
      </div>
    );
  }
}

const AuthCode = connect<IConnectedState, IConnectedActions, IOwnProps>(state => ({ auth: state.auth }))(AuthCodeImpl);

export { AuthCode }
