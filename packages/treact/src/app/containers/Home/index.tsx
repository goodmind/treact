import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

interface IConnectedState {
  currentUser: any;
}

interface IConnectedActions {
  dispatch: any;
}

interface IOwnProps {}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class HomeImpl extends React.Component<IProps, any> {
  public componentDidMount() {
    const { currentUser, dispatch } = this.props;

    if (currentUser && currentUser.id) {
      dispatch(push('/im'));
      return;
    }

    dispatch(push('/login'));
  }

  public render() {
    return null;
  }
}

const mapStateToProps = state => ({ currentUser: state.currentUser });
const Home = connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)(HomeImpl);

export { Home }
