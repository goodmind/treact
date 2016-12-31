import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, Login } from 'containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
  </Route>
);
