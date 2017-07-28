import { fetchChatList } from 'api/chatList';
import * as React from 'react';
import { Options, Route } from 'universal-router';
import history from '../../history';

export interface Route {
  Component: JSX.Element | null;
}

export const resolveRoute: Options['resolveRoute'] = async (context, params) => {
  const { route, store } = context;
  const { App } = await import (/* webpackChunkName: "app" */ 'containers/App');
  const { auth } = store.getState();

  if (typeof route.action === 'function') {
    if (route.guard && !auth.authenticated) {
      history.push('/login');
      return null;
    }

    const Comp = await route.action(context, params);
    return <App><Comp/></App>;
  }

  return null;
};

const routes: Route[] = [
  {
    path: '/',
    children: [
      {
        path: '/',
        guard: false,
        async action() {
          const { Home } = await import (/* webpackChunkName: "home" */ 'containers/Home');
          return Home;
        },
      },

      {
        path: '/im',
        guard: true,
        async action({ store: { dispatch } }) {
          const { InstantMessages } = await import (/* webpackChunkName: "im" */ 'containers/InstantMessages');
          await dispatch(fetchChatList());
          return InstantMessages;
        },
      },

      {
        path: '/login',
        guard: false,
        async action() {
          const { Login } = await import (/* webpackChunkName: "login" */ 'containers/Login');
          return Login;
        },
      },
    ],
  },
];

export default routes;
