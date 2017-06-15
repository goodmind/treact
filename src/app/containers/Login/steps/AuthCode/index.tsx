import { signIn } from 'api/auth';
import { AuthCode } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch, IStore } from 'redux/IStore';
import { IAuthError, isAuthError } from 'redux/modules/auth';
import { IStepSkip as IOwnProps } from '../..';

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
      <AuthCode
        form={form}
        error={error}
        nextStep={this.handleNextStep}
        change={this.handleChange} />
    );
  }
}

const AuthCodeContainer = connect<IConnectedState, IConnectedActions, IOwnProps>(
  state => ({ auth: state.auth }),
)(AuthCodeImpl);

export { AuthCodeContainer as AuthCode }
