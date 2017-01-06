import * as React from 'react';
import { connect } from 'react-redux';
import { signIn } from 'modules/auth';
const t = require('../../style.css');

interface IConnectedState {
  auth: any;
}

interface IConnectedActions {
  dispatch: any;
}

interface IOwnProps {
  update: any;
  skipStep: any;
  form: any;
}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

interface IState {
  authCode?: string;
  error?: any;
}

class AuthCodeImpl extends React.Component<IProps, IState> {
  public state = {
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
      .then(({payload: error}) => (error && error.error_code) ? this.setState({ error }) : this.setState({error: null}))
      .then(() => skipStep(this.props.auth.error.error_message === 'SESSION_PASSWORD_NEEDED' ? 1 : 2));
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
            placeholder="Your code" type="text" />
        </div>
        {error && <div>Error type: {error.error_message}</div>}
        <button onClick={this.handleNextStep} className={`${t.btn} ${t.primary}`}>Next</button>
      </div>
    );
  }
}

const AuthCode = connect<IConnectedState, IConnectedActions, IOwnProps>(state => ({ auth: state.auth }))(AuthCodeImpl);

export { AuthCode }
