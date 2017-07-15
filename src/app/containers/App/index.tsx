import { App, Header } from 'components';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as appConfig from '../../../../config/main';

interface IProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: IProps) =>
  <App>
    <Helmet {...appConfig.app} {...appConfig.app.head}/>
    <Header />
    {children}
  </App>;

export { AppContainer as App };
