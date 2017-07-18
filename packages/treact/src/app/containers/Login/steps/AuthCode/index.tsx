import { signIn } from 'api/auth';
import { AuthCode } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { AuthError, isAuthError } from 'redux/modules/auth';
import { Dispatch, Store } from 'redux/store.h';
import { StepSkip as OwnProps } from '../..';

type ConnectedState = Pick<Store, 'auth'>;
type ConnectedActions = { dispatch: Dispatch };
type Props = ConnectedState & ConnectedActions & OwnProps;
type State = {
  authCode: string;
  error: AuthError | null;
};

class AuthCodeImpl extends React.Component<Props, State> {
  public state: State = {
    authCode: '',
    error: null,
  };

  // TODO: can't type computed properties
  // tslint:disable-next-line
  public handleChange = (e: any) =>
    this.setState({ [e.target.name]: e.target.value })

  public handleNextStep = () => {
    const { update, skipStep, dispatch } = this.props;
    const { authCode } = this.state;

    update({ authCode });
    dispatch(signIn(this.state.authCode))
      .then(({payload: error}) => isAuthError(error)
        ? this.setState({ error })
        : this.setState({ error: null }))
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

const mapStateToProps = (state: Store) => ({ auth: state.auth });
const AuthCodeContainer =
  connect<ConnectedState, ConnectedActions, OwnProps>(mapStateToProps)(AuthCodeImpl);

export { AuthCodeContainer as AuthCode };
