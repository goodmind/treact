import * as React from 'react';
import { Link } from 'react-router';

const logo = require('./title-logo.png');
const s = require('./style.css');

import { logOut } from 'modules/auth';
import { connect } from 'react-redux';

interface IConnectedState {}

interface IConnectedActions {
  logOut(e: any): void;
}

interface IOwnProps {}

type IProps = IConnectedState & IConnectedActions & IOwnProps;

class HeaderImpl extends React.Component<IProps, any> {
  public render() {
    return (
      <header className={s.header}>
        <img className={s.headerIcon} src={logo} />
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
        <a className={s.logout} onClick={this.props.logOut}>Logout</a>
      </header>
    );
  }
}

function dispatchToProps(dispatch) {
  return {
    logOut: () => {
      dispatch(logOut());
      setTimeout(() => dispatch(logOut()), 500);
    },
  };
}

const Header = connect<IConnectedState, IConnectedActions, IOwnProps>(null, dispatchToProps)(HeaderImpl);

export { Header }
