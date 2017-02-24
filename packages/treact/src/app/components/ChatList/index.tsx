import * as React from 'react';
import { ChatListSearch } from 'components';

const style = require('./style.css');

interface IProps {
  loading: boolean;
}

const LoadingPane = () => (
  <div className={style.chatlist}>
    <div className={style.loading}>Loading...</div>
  </div>
);

class ChatList extends React.Component<IProps, {}> {
  public render() {
    const { loading, children } = this.props;

    return (
      <div className={style.chatlist}>
        <ChatListSearch />
        <div className={style.chatbox}>
          <div className={style.chatpane}>
            {loading
              ? <LoadingPane />
              : children}
          </div>
        </div>
      </div>
    );
  }
}

export { ChatList };
