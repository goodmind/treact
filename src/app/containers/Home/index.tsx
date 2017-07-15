import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IStore, IDispatch } from 'redux/IStore';

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IOwnProps = {};
type IProps = IConnectedState & IConnectedActions & IOwnProps;

class HomeImpl extends React.Component<IProps, {}> {
  public componentDidMount() {
    const { auth, dispatch } = this.props;
    const route = auth.authenticated
      ? '/im'
      : '/login';
    return dispatch(push(route));
  }

  public render() {
    return null;
  }
}

const mapStateToProps = state => ({ auth: state.auth });
const Home = connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)(HomeImpl);

export { Home }
