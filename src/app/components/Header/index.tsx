import { logOut } from 'api/auth';
import * as React from 'react';
import { connect } from 'react-redux';
// TODO: use absolute paths
import { Link } from '../../../vendor/containers/Link';
import { IDispatch } from 'redux/IStore';
import * as s from './style.css';
import * as logo from './title-logo.png';

interface IConnectedActions {
  logOut: React.MouseEventHandler<HTMLAnchorElement>;
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
  },
});

const connected = connect<{}, IConnectedActions, {}>(null, dispatchToProps)<{}>(Header);

export { connected as Header };
