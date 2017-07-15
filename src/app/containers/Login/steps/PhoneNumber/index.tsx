import { sendCode } from 'api/auth';
import { PhoneNumber } from 'components/Login/steps';
import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch, IStore } from 'redux/IStore';
import { IAuthError, isAuthError } from 'redux/modules/auth';
import { IStepNext as IOwnProps } from '../..';

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IProps = IConnectedState & IConnectedActions & IOwnProps;
type IState = {
  phoneCode: string;
  phoneNumber: string;
  error: IAuthError | null;
};

class PhoneNumberImpl extends React.Component<IProps, IState> {
  public state: IState = {
    phoneCode: '+7',
    phoneNumber: '',
    error: null,
  };

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

const mapStateToProps = (state: IStore) => ({ auth: state.auth });
const PhoneNumberContainer =
  connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)<IOwnProps>(PhoneNumberImpl);

export { PhoneNumberContainer as PhoneNumber };
