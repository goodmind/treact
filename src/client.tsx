import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from './app/routes';
import AppProvider, { store } from './AppProvider';

const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = function <T>(props: T) {
  return <ReduxAsyncConnect {...props} />;
};

const render = function <T extends JSX.Element>(Component: T) {
  return ReactDOM.render((
    <AppContainer>
      <AppProvider>
        <Router
          history={history}
          render={connectedCmp}>
          {Component}
        </Router>
      </AppProvider>
    </AppContainer>
  ), document.getElementById('app'));
};

render(routes);

if (module.hot) {
  module.hot.accept('./app/routes', () => {
    const NewApp = require('./app/routes').default;
    render(NewApp);
  });
}
