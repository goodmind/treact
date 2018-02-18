import { fetchChatList } from 'api/chatList'
import { api } from 'helpers/Telegram/pool'
import * as React from 'react'
import { Context, Params, Route } from 'universal-router'
import history from '../../history'

export const resolveRoute = async (context: Context, params: Params) => {
  const { route, store } = context
  const { auth } = store.getState()

  if (typeof route.action === 'function') {
    if (route.guard && !auth.authenticated) {
      history.push('/login')
      return null
    }

    const Comp = await route.action(context, params)
    return <Comp/>
  }

  return null
}

const routes: [Route] = [
  {
    path: '',
    // TODO: remove this
    async action({ next }): Promise<React.ComponentType<{}>> {
      // TODO: remove this
      // tslint:disable-next-line
      const Child = await next();
      window.api = api
      await api('help.getConfig', {})
        .then(app => console.debug('init', app))
        .catch(err => console.error('init failed', err))

      return function Middleware() { return Child }
    },
    children: [
      {
        path: '',
        name: 'home',
        guard: false,
        async action() {
          const { Home } = await import (/* webpackChunkName: "home" */ 'containers/Home')
          return Home
        },
      },

      {
        path: '/im',
        guard: true,
        children: [
          {
            path: '',
            name: 'im',
            guard: true,
            async action({ store: { dispatch } }) {
              const { InstantMessages } = await import (/* webpackChunkName: "im" */ 'containers/InstantMessages')
              await dispatch(fetchChatList())
              return InstantMessages
            },
          },
          {
            path: '/:id',
            name: 'im/user',
            guard: true,
            action: async (context, { id }: { id: number }) => (props: {}) => {
              console.debug('im route', id, props, context)
              return <div>Memes</div>
            },
          },
        ],
      },

      {
        path: '/login',
        name: 'login',
        guard: false,
        async action() {
          const { Login } = await import (/* webpackChunkName: "login" */ 'containers/Login')
          return Login
        },
      },
    ],
  },
]

export default routes
