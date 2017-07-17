import { checkPassword } from 'api/auth';
import { Password } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch, IStore } from 'redux/IStore';
import { IAuthError, isAuthError } from 'redux/modules/auth';
import { IStepNext as IOwnProps } from '../..';

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IProps = IConnectedState & IConnectedActions & IOwnProps;
type IState = {
  password: string;
  error: IAuthError | null;
};

class PasswordImpl extends React.Component<IProps, IState> {
  public state: IState = {
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

const PasswordContainer = connect<IConnectedState, IConnectedActions, IOwnProps>(
  state => ({ auth: state.auth }),
)<IOwnProps>(PasswordImpl);

export { PasswordContainer as Password };
