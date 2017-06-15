import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Middleware, StoreEnhancerStoreCreator } from 'redux';
import { createLogger } from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import * as appConfig from '../../../config/main';
import { batchUpdate } from './batchUpdate';
import { IStore } from './IStore';
import { autoRehydrate } from 'redux-persist';
const createLogger = require('redux-logger');

import { CACHE } from 'actions';
const { DONE } = CACHE;

const doneType = DONE.toString();

const batchUpdate = ({ dispatch }) => next => {
  let pool = [];
  const flush = () => {
    if (pool.length === 0) return;
    const action = { type: doneType, payload: [...pool] };
    pool = [];
    return dispatch(action);
  };
  setInterval(flush, 300);
  return action => {
    if (action.type === doneType && typeof action.payload === 'number') {
      pool.push(action.payload);
      return;
    }

    return next(action);
  };
};
export function configureStore(history, initialState?: IStore): Redux.Store<IStore> {

  const middlewares: Redux.Middleware[] = [
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
