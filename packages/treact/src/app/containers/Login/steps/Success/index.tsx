import * as React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'redux/IStore';

type IConnectedState = Pick<IStore, 'currentUser'>;
type IProps = IConnectedState;

class SuccessImpl extends React.Component<IProps, {}> {
  public static defaultPhrase = 'No current user';
  public toPrintable = () => this.props.currentUser
    ? JSON.stringify(this.props.currentUser)
    : SuccessImpl.defaultPhrase

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

const mapStateToProps = (state: IStore) => ({ currentUser: state.currentUser });
const Success = connect<IConnectedState, {}, {}>(mapStateToProps)<{}>(SuccessImpl);

export { Success };
