import * as React from 'react';
import { connect } from 'react-redux';
import { toPrintable } from 'helpers/Telegram';

class SuccessImpl extends React.Component<any, any> {
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

const Success = connect<any, any, any>(state => ({ currentUser: state.currentUser }))(SuccessImpl);

export { Success }
