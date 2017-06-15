import * as React from 'react';
import * as s from './style.css';

interface IProps {
  children?: React.ReactNode;
}

const App = ({ children }: IProps) => (
  <section className={s.app}>
    {children}
  </section>
);

export { App };
