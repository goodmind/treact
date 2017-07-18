import { logOut } from 'api/auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux/store.h';
// TODO: use absolute paths
import { Link } from '../../../vendor/containers/Link';
import * as s from './style.css';
import * as logo from './title-logo.png';

interface ConnectedActions {
  logOut: React.MouseEventHandler<HTMLAnchorElement>;
}

const Header = ({ logOut }: ConnectedActions) => (
  <header className={s.header}>
    <img className={s.headerIcon} src={logo} />
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
    <a className={s.logout} onClick={logOut}>Logout</a>
  </header>
);

const dispatchToProps = (dispatch: Dispatch) => ({
  logOut() {
    dispatch(logOut());
  },
});

const connected = connect<{}, ConnectedActions, {}>(null, dispatchToProps)<{}>(Header);

export { connected as Header };
