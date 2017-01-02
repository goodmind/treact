import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class HomeImpl extends React.Component<any, any> {
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

const Home = connect<any, any, any>(state => ({ currentUser: state.currentUser }))(HomeImpl);

export { Home }
