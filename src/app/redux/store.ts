// import { History } from 'history';
import { effectorMiddleware } from 'effector'
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
import rootReducer from './reducers'
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
    effectorMiddleware,
  ]

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger()
    middlewares.push(logger)
  }

  const composeEnhancers: typeof compose = (appConfig.env !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  const storeEnhancer = composeEnhancers<Enhancer, Enhancer, Enhancer>(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  )

  const store = createStore<Store>(rootReducer, storeEnhancer)

  rootDomain.register(store)

  if (appConfig.env === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer((require('./reducers')))
    })
  }

  return store
}
