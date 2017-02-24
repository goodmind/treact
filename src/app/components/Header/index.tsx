import * as React from 'react';
import { Link } from 'react-router';
import { IDispatch } from 'redux/IStore';
import { logOut } from 'api/auth';
import { connect } from 'react-redux';
const logo = require('./title-logo.png');
const s = require('./style.css');

interface IConnectedActions {
  logOut: React.EventHandler<React.MouseEvent<HTMLAnchorElement>>;
}

const Header = ({ logOut }: IConnectedActions) => (
  <header className={s.header}>
    <img className={s.headerIcon} src={logo} />
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
    <a className={s.logout} onClick={logOut}>Logout</a>
  </header>
);

const dispatchToProps = (dispatch: IDispatch) => ({
  logOut() {
    dispatch(logOut());
    setTimeout(dispatch, 500, logOut());
  },
});

const connected = connect<{}, IConnectedActions, {}>(null, dispatchToProps)(Header);

export { connected as Header }
