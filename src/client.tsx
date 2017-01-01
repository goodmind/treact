import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './app/redux/store';
const { Router, hashHistory } = require('react-router');
const { ReduxAsyncConnect } = require('redux-connect');
import routes from './app/routes';

const store = configureStore(
  hashHistory,
  window.__INITIAL_STATE__
);
const history = syncHistoryWithStore(hashHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router
      history={history}
      render={connectedCmp}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

export { store }
