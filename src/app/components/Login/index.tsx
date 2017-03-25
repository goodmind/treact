import * as React from 'react';
const s = require('./style.css');

const Login = ({ children }) => (
  <div className={s.main}>
    {children}
  </div>
);

export { Login }