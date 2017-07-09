import * as React from 'react';
import { connect } from 'react-redux';
import { IDispatch, IStore } from 'redux/IStore';
// TODO: use absolute paths
import history from '../../../history';

type IConnectedState = Pick<IStore, 'auth'>;
type IConnectedActions = { dispatch: IDispatch };
type IOwnProps = {};
type IProps = IConnectedState & IConnectedActions & IOwnProps;

class HomeImpl extends React.Component<IProps, {}> {
  public componentWillMount() {
    const { auth } = this.props;
    const route = auth.authenticated
      ? '/im'
      : '/login';
    return history.push(route);
  }

  public render() {
    return null;
  }
}

const mapStateToProps = (state: IStore) => ({ auth: state.auth });
const Home = connect<IConnectedState, IConnectedActions, IOwnProps>(mapStateToProps)(HomeImpl);

export { Home };
