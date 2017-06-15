import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Middleware, StoreEnhancerStoreCreator } from 'redux';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import * as appConfig from '../../../config/main';
import { batchUpdate } from './batchUpdate';
import { IStore } from './IStore';
import rootReducer from './reducers';

export function configureStore(history: History) {
  type Enhancer = StoreEnhancerStoreCreator<IStore>;

  const middlewares: Middleware[] = [
    routerMiddleware(history),
    batchUpdate,
    thunk,
  ];

  /** Add Only Dev. Middlewares */
  if (appConfig.env !== 'production' && process.env.BROWSER) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = (appConfig.env !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ));

  if (appConfig.env === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer((require('./reducers')));
    });
  }

  return store;
}
