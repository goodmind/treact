import { fetchChatList } from 'api/chatList';
import * as React from 'react';
import { Context, Params, Route } from 'universal-router';
import history from '../../history';

export const resolveRoute = async (context: Context, params: Params) => {
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
        children: [
          {
            path: '/',
            guard: true,
            async action({ store: { dispatch } }) {
              const { InstantMessages } = await import (/* webpackChunkName: "im" */ 'containers/InstantMessages');
              await dispatch(fetchChatList());
              return InstantMessages;
            },
          },
          {
            path: '/:id',
            guard: true,
            action: async (context, { id }: { id: number }) => (props: {}) => {
              console.debug('im route', id, props, context);
              return <div>Memes</div>;
            },
          },
        ],
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
