import * as React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { browserHistory } from 'react-router';

import pool from 'helpers/Telegram/pool';
import { configureStore } from './app/redux/store';

export const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__,
);



class AppProvider extends React.Component<{ children?: React.ReactChildren }, { rehydrated: boolean }> {
  public state = { rehydrated: false };

  public componentWillMount() {
    const onDone = () => this.setState({ rehydrated: true });
    const onConnect = () => persistStore(store,
      {whitelist: ['authKey', 'currentUser', 'currentDc']}, onDone);
    pool.dcConnect().then(onConnect);
  }

  public render() {
    return this.state.rehydrated
      ? <Provider store={store} key="provider">
          {this.props.children}
        </Provider>
      : <div>Loading...</div>;
  }
}

export default AppProvider;
