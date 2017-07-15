import * as React from 'react';
import * as s from './style.css';

interface IProps {
  children?: React.ReactNode;
}

const Login = ({ children }: IProps) => (
  <div className={s.main}>
    {children}
  </div>
);

export { Login };
