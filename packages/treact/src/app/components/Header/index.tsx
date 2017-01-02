import * as React from 'react';
import { Link } from 'react-router';

const logo = require('./title-logo.png');
const s = require('./style.css');

class Header extends React.Component<any, any> {
  public render() {
    return (
      <header className={s.header}>
        <img className={s.headerIcon} src={logo} />
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
      </header>
    );
  }
}

export { Header }
