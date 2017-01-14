import * as React from 'react';
import { Link } from 'react-router';

const logo = require('./title-logo.png');
const s = require('./style.css');

import { logOut } from 'api/auth';
import { connect } from 'react-redux';

interface IConnectedActions {
  logOut(e: any): void;
}

const Header = ({ logOut }: IConnectedActions) => (
  <header className={s.header}>
    <img className={s.headerIcon} src={logo} />
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
    <a className={s.logout} onClick={logOut}>Logout</a>
  </header>
);

function dispatchToProps(dispatch) {
  return {
    logOut: () => {
      dispatch(logOut());
      setTimeout(() => dispatch(logOut()), 500);
    },
  };
}

const connected = connect<{}, IConnectedActions, {}>(null, dispatchToProps)(Header);

export { connected as Header }
