import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './app/redux/store';
import { persistStore } from 'redux-persist';
const { Router, browserHistory } = require('react-router');
const { ReduxAsyncConnect } = require('redux-connect');
import routes from './app/routes';

const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__,
);
const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

class AppProvider extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  public componentWillMount() {
    persistStore(store, {whitelist: ['authKey', 'currentUser']}, () => {
      this.setState({ rehydrated: true });
    });
  }

  public render() {
    if (!this.state.rehydrated) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store} key="provider">
        {this.props.children}
      </Provider>
    );
  }
}

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

render(routes)

if ((module as any).hot) {
  (module as any).hot.accept('./app/routes', () => {
    const NewApp = require('./app/routes').default
    render(NewApp)
  });
}
