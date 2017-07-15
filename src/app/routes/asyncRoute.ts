import * as React from 'react';
import { Context } from 'universal-router';
// import { AsyncRoute } from './';

type Render = (context: Context) => Promise<React.ComponentClass<{}>>;

// TODO: remove this in favor of resolveRoute

export const asyncRoute = (
  path: string,
  render: Render,
  opts: object = { guard: false },
) => ({
  path,
  action: async (ctx: Context) => {
    const route = { ...opts, render: () => render(ctx) };
    return route;
  },
});
