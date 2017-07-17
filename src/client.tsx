
import { Location } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as UniversalRouter from 'universal-router';
import routes, { resolveRoute } from './app/routes';
import AppProvider, { store } from './AppProvider';
// TODO: use absolute paths
import history from './history';

let currentRoutes = routes;

const renderComponent = (Component: JSX.Element | null) => {
  return ReactDOM.render((
    <AppContainer>
      <AppProvider>
        {Component}
      </AppProvider>
    </AppContainer>
  ), document.getElementById('app'));
};

const render = async (location: Location, Routes: typeof routes) => {
  if (routes)
    currentRoutes = Routes;
  const Router = new UniversalRouter(currentRoutes, { resolveRoute, context: { store } });
  const Route = await Router.resolve<JSX.Element>({ path: location.pathname });
  return renderComponent(Route);
};

const onHistory = (location: Location) => render(location, currentRoutes);

history.listen(onHistory);
render(history.location, currentRoutes);

console.log(history.location);

if (module.hot) {
  module.hot.accept('./app/routes', () => {
    const NewApp = require('./app/routes').default;
    render(history.location, NewApp);
  });
}
