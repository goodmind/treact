import * as React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { persistStore } from 'redux-persist';
import { configureStore } from './app/redux/store';

export const store = configureStore(
  browserHistory,
);

class AppProvider extends React.Component<{ children?: React.ReactNode }, { rehydrated: boolean }> {
  public state = { rehydrated: false };

  public componentWillMount() {
    const onDone = () => this.setState({ rehydrated: true });
    persistStore(store,
      {whitelist: ['authKey', 'currentUser', 'currentDc']}, onDone);
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
