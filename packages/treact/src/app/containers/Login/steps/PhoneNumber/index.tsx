import { sendCode } from 'api/auth';
import { PhoneNumber } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { AuthError, isAuthError } from 'redux/modules/auth';
import { Dispatch, Store } from 'redux/store.h';
import { StepNext as OwnProps } from '../..';

type ConnectedState = Pick<Store, 'auth'>;
type ConnectedActions = { dispatch: Dispatch };
type Props = ConnectedState & ConnectedActions & OwnProps;
type State = {
  phoneCode: string;
  phoneNumber: string;
  error: AuthError | null;
};

class PhoneNumberImpl extends React.Component<Props, State> {
  public state: State = {
    phoneCode: '+7',
    phoneNumber: '',
    error: null,
  };

  // TODO: can't type computed properties
  // tslint:disable-next-line
  private handleChange = (e: any) =>
    this.setState({ [e.target.name]: e.target.value })

  public handleNextStep = () => {
    const { dispatch, nextStep, update } = this.props;
    const phoneNumber = this.state.phoneCode + this.state.phoneNumber;

    update({ phoneNumber });
    dispatch(sendCode(phoneNumber))
      .then(({ payload: error }) => isAuthError(error)
        ? this.setState({ error })
        : this.setState({ error: null }))
      .then(() => this.state.error || nextStep());
  }

  public render() {
    const { error, phoneCode } = this.state;

    return (
      <PhoneNumber
        phoneCode={phoneCode}
        error={error}
        change={this.handleChange}
        nextStep={this.handleNextStep} />
    );
  }
}

const mapStateToProps = (state: Store) => ({ auth: state.auth });
const PhoneNumberContainer =
  connect<ConnectedState, ConnectedActions, OwnProps>(mapStateToProps)(PhoneNumberImpl);

export { PhoneNumberContainer as PhoneNumber };
