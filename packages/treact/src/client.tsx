import { Location } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { configureStore } from 'redux/store';
import routes, { resolveRoute } from 'routes';
import UniversalRouter from 'universal-router';
// TODO: use absolute paths
import history from './history';

let currentRoutes = routes;

// TODO: move to another file?
export const store = configureStore();

const renderComponent = (Component: JSX.Element | null) => {
  return ReactDOM.render((
    <AppContainer>
      <Provider store={store} key="provider">
        {Component}
      </Provider>
    </AppContainer>
  ), document.getElementById('app'));
};

const onPersist = () => render(history.location, currentRoutes);
const onHistory = (location: Location) => render(location, currentRoutes);
const init = () => {
  history.listen(onHistory);
  renderComponent(<div>Loading...</div>);
  persistStore(store,
    {whitelist: ['authKey', 'currentUser', 'currentDc']}, onPersist);

  console.log(history.location);
};

const render = async (location: Location, Routes: typeof routes) => {
  if (routes)
    currentRoutes = Routes;
  const Router = new UniversalRouter(currentRoutes, { resolveRoute, context: { store } });
  const Route = await Router.resolve<JSX.Element>({ path: location.pathname });
  return renderComponent(Route);
};

init();

if (module.hot) {
  module.hot.accept('./app/routes', () => {
    const NewApp = require('./app/routes').default;
    render(history.location, NewApp);
  });
}
