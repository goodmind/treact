import * as React from 'react';
import * as s from './style.css';

interface Props {
  children?: React.ReactNode;
}

const Login = ({ children }: Props) => (
  <div className={s.main}>
    {children}
  </div>
);

export { Login };
