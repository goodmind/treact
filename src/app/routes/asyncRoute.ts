import * as React from 'react';
import { Context } from 'universal-router';
import { AsyncRoute } from './';

type Render = (context: Context) => Promise<React.ComponentClass<{}>>;

// TODO: remove this in favor of resolveRoute

export const asyncRoute = (
  path: string,
  render: Render,
  opts: object = { guard: false },
) => ({
  path,
  action: async <R>(ctx: Context): Promise<R> => {
    const route = { ...opts, render: () => render(ctx) };
    return route as AsyncRoute;
  },
});
