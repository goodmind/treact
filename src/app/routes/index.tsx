import { App, Home, InstantMessages, Login } from 'containers';
import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="im" component={InstantMessages} />
    <Route path="login" component={Login} />
  </Route>
);
