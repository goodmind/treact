import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IDispatch } from 'redux/IStore';

interface IConnectedState {
  auth: any;
}

interface IConnectedActions {
  dispatch: IDispatch;
}

interface IOwnProps {}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class HomeImpl extends React.Component<IProps, any> {
  public componentDidMount() {
    const { auth, dispatch } = this.props;

    if (auth.authenticated) {
      dispatch(push('/im'));
      return;
    }

    dispatch(push('/login'));
  }

  public render() {
    return null;
  }
}

const mapStateToProps = state => ({ auth: state.auth });
const Home = connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)(HomeImpl);

export { Home }
