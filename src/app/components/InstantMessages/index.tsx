import * as React from 'react';
import * as s from './style.css';

interface Props {
  children?: React.ReactNode;
}

const InstantMessages = ({ children }: Props) => (
  <div className={s.main}>
    {children}
  </div>
);
export { InstantMessages };
