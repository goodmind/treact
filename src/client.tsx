// TODO: remove fetch
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import AppProvider, { store } from './AppProvider';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from './app/routes';

const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

const render = Component =>
  ReactDOM.render((
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

render(routes);

if (module.hot) {
  module.hot.accept('./app/routes', () => {
    const NewApp = require('./app/routes').default;
    render(NewApp);
  });
}
