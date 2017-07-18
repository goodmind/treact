import * as React from 'react';
import * as s from './style.css';

interface Props {
  children?: React.ReactNode;
}

const App = ({ children }: Props) => (
  <section className={s.app}>
    {children}
  </section>
);

export { App };
