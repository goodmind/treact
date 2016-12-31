import * as React from 'react';
import { connect } from 'react-redux';
import { toPrintable } from 'helpers/Telegram';

class SuccessImpl extends React.Component<any, any> {
  public render() {
    const { currentUser } = this.props;

    return (
      <div>
        Success
        {toPrintable(currentUser)}
      </div>
    );
  }
}

const Success = connect<any, any, any>(state => ({ currentUser: state.currentUser }))(SuccessImpl);

export { Success }
