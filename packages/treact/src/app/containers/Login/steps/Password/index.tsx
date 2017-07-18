import { checkPassword } from 'api/auth';
import { Password } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { AuthError, isAuthError } from 'redux/modules/auth';
import { Dispatch, Store } from 'redux/store.h';
import { StepNext as OwnProps } from '../..';

type ConnectedState = Pick<Store, 'auth'>;
type ConnectedActions = { dispatch: Dispatch };
type Props = ConnectedState & ConnectedActions & OwnProps;
type State = {
  password: string;
  error: AuthError | null;
};

class PasswordImpl extends React.Component<Props, State> {
  public state: State = {
    password: '',
    error: null,
  };

  // TODO: can't type computed properties
  // tslint:disable-next-line
  public handleChange = (e: any) =>
    this.setState({ [e.target.name]: e.target.value })

  public handleNextStep = () => {
    const { update, nextStep, dispatch } = this.props;
    const { password } = this.state;

    update({ password });
    console.log(this.state, this.props);
    dispatch(checkPassword(this.state.password))
      .then(({ payload: error }) => isAuthError(error)
        ? this.setState({ error })
        : this.setState({ error: null }))
      .then(() => this.state.error || nextStep());
  }

  public render() {
    const { error } = this.state;

    return (
      <Password
        error={error}
        change={this.handleChange}
        nextStep={this.handleNextStep} />
    );
  }
}

const PasswordContainer = connect<ConnectedState, ConnectedActions, OwnProps>(
  state => ({ auth: state.auth }),
)<OwnProps>(PasswordImpl);

export { PasswordContainer as Password };
