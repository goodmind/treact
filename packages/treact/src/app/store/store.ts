// import { History } from 'history';
import {
  applyMiddleware, compose, createStore, Middleware,
  Store as ReduxStore, StoreEnhancerStoreCreator,
} from 'redux'
import { createLogger } from 'redux-logger'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import * as appConfig from '../../../config/main'
import { batchUpdate } from './batchUpdate'
import { rootDomain } from './domain'
import { combineStores, connectDomain, effectorMiddleware } from './effector-redux'
import rootReducer, { rootStore } from './reducers'
import { Store } from './store.h'

declare module 'universal-router' {
  export interface Context {
    store: ReduxStore<Store>
  }
}

export function configureStore(/*history: History*/) {
  type Enhancer = StoreEnhancerStoreCreator<Store>

  const middlewares: Middleware[] = [
    // routerMiddleware(history),
    batchUpdate,
    thunk,
    effectorMiddleware(),
  ]

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger()
    middlewares.push(logger)
  }

  const composeEnhancers = compose

  const storeEnhancer = composeEnhancers<Enhancer, Enhancer, Enhancer>(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  )

  const reduxStore = createStore<Store>(rootReducer, storeEnhancer)

  connectDomain(rootDomain, reduxStore)

  if (appConfig.env === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      reduxStore.replaceReducer((require('./reducers')))
    })
  }

  const store = combineStores(reduxStore, rootStore, (a, b) => ({...a, ...b}))

  store.watch((state, payload, type) => {
    console.warn('state update', state, payload, type)
  })

  return store
}
