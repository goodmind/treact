import { App } from 'components/App'
import { Header } from 'containers/Header'
import * as React from 'react'
//import Helmet from 'react-helmet'
//import * as appConfig from '../../../../config/main'

interface Props {
  children: React.ReactNode
}

const AppContainer = ({ children }: Props) =>
  <App>
    {/*<Helmet {...appConfig.app} {...appConfig.app.head}/>*/}
    <Header />
    {children}
  </App>

export { AppContainer as App }
