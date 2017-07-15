import * as React from 'react';
const s = require('./style.css');

interface IProps {
  children?: React.ReactNode;
}

const App = ({ children }: IProps) => (
  <section className={s.app}>
    {children}
  </section>
);

export { App }
