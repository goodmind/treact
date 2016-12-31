import * as React from 'react';
import { Link } from 'react-router';

class Header extends React.Component<any, any> {
  public render() {
    const s = require('./style.css');

    return (
      <header className={s.header}>
        <img className={s.headerIcon} src={require('./title-logo.png')} />
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
      </header>
    );
  }
}

export { Header }
