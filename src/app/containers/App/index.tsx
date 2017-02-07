const appConfig = require('../../../../config/main');
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Header } from 'components';
const s = require('./style.css');

interface IProps {
  children: React.ReactNode;
}

const App = ({ children }: IProps) =>
  <section className={s.app}>
    <Helmet {...appConfig.app} {...appConfig.app.head}/>
    <Header />
    {children}
  </section>;
export { App }
