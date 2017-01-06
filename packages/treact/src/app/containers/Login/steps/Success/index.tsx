import * as React from 'react';
import { connect } from 'react-redux';
import { toPrintable } from 'helpers/Telegram';

interface IConnectedState {
  currentUser: any;
}

interface IConnectedActions {}

interface IOwnProps {}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class SuccessImpl extends React.Component<IProps, any> {
  public static defaultPhrase = 'No current user';
  public toPrintable = () => this.props.currentUser
    ? toPrintable(this.props.currentUser)
    : SuccessImpl.defaultPhrase;

  public render() {
    const print = this.toPrintable();
    return (
      <div>
        Success
        {print}
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentUser: state.currentUser });
const Success = connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)(SuccessImpl);

export { Success }
