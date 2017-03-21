import * as React from 'react';
import { checkPassword } from 'api/auth';
import { connect } from 'react-redux';
import { IStore, IDispatch } from 'redux/IStore';
import { IStepNext as IOwnProps } from '../..';
import { IAuthError } from 'redux/modules/auth';
import { Password } from 'components/Login/steps';

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
      <Password
        error={error}
        change={this.handleChange}
        nextStep={this.handleNextStep} />
    );
  }
}

const PasswordContainer = connect<IConnectedState, IConnectedActions, IOwnProps>(
  state => ({ auth: state.auth }),
)(PasswordImpl);

export { PasswordContainer as Password }
