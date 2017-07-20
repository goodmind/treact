import * as React from 'react';
// TODO: use absolute paths
import { Link } from '../../../vendor/containers/Link';
import * as s from './style.css';
import * as logo from './title-logo.png';

interface Props {
  logOut: React.MouseEventHandler<HTMLAnchorElement>;
}

const Header = ({ logOut }: Props) => (
  <header className={s.header}>
    <img className={s.headerIcon} src={logo} />
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
    <a className={s.logout} onClick={logOut}>Logout</a>
  </header>
);

export { Header };
