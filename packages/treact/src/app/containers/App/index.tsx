import { App } from 'components';
import { Header } from 'containers';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as appConfig from '../../../../config/main';

interface Props {
  children: React.ReactNode;
}

const AppContainer = ({ children }: Props) =>
  <App>
    <Helmet {...appConfig.app} {...appConfig.app.head}/>
    <Header />
    {children}
  </App>;

export { AppContainer as App };
