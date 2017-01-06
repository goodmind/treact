const appConfig = require('../../../../config/main');
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Header } from 'components';
const s = require('./style.css');

interface IProps {
  children: React.ReactChildren;
}

const App = (props: IProps) => {
  return (
    <section className={s.app}>
      <Helmet {...appConfig.app} {...appConfig.app.head}/>
      <Header />
      {props.children}
    </section>
  );
};

export { App }
