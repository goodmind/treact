import { fetchChatList } from 'api/chatList';
import * as React from 'react';
import { Context } from 'universal-router';
import history from '../../history';
import { asyncRoute } from './asyncRoute';

export type Route = {
  Component: JSX.Element | null,
};

export type AsyncRoute = {
  guard?: boolean,
  render<T>(): Promise<React.ComponentClass<T>>,
};

declare module 'universal-router' {
  export interface ActionResult {
    guard?: boolean;
    render<T>(): Promise<React.ComponentClass<T>>;
  }
}

export default [
  {
    path: '/',

    async action({ next, store: { getState } }: Context): Promise<Route> {
      const { App } = await import ('containers/App');
      const { auth } = getState();
      const { guard, render } = await next();

      if (guard && !auth.authenticated) {
        history.push('/login');
        return { Component: null };
      }

      const Component = await render();
      return { Component: <App><Component /></App> };
    },

    children: [
      asyncRoute('/', async () => {
        const { Home } = await import ('containers/Home');
        return Home;
      }),

      asyncRoute('/im', async ({ store: { dispatch } }) => {
        const { InstantMessages } = await import ('containers/InstantMessages');
        await dispatch(fetchChatList());
        return InstantMessages;
      }, { guard: true }),

      asyncRoute('/login', async () => {
        const { Login } = await import ('containers/Login');
        return Login;
      }),
    ],
  },
];
