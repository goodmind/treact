import * as React from 'react';
const s = require('./style.css');

interface IProps {
  children?: React.ReactNode;
}

const InstantMessages = ({ children }: IProps) => (
  <div className={s.main}>
    {children}
  </div>
);
export { InstantMessages }
