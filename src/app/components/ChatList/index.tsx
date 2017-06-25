import { ChatListSearch, InfiniteScroll } from 'components';
import * as React from 'react';
import * as style from './style.css';

interface IProps {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const LoadingPane = () => (
  <div className={style.chatlist}>
    <div className={style.loading}>Loading...</div>
  </div>
);

class ChatList extends React.Component<IProps, {}> {
  public render() {
    const { children, loadMore, hasMore } = this.props;

    return (
      <div className={style.chatlist}>
        <ChatListSearch />
        <div className={style.chatbody}>
          <InfiniteScroll
            className={style.box}
            pageStart={0}
            loadMore={loadMore}
            initialLoad={false}
            hasMore={hasMore}
            loader={<LoadingPane />}
            useWindow={false}>
            {children}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export { ChatList };
