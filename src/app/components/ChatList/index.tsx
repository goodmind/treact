import * as React from 'react';
import { ChatListSearch } from 'components';
import * as InfiniteScroll from 'react-infinite-scroller';

const style = require('./style.css');

interface IProps {
  loading: boolean;
  loadMore: Function;
}

const LoadingPane = () => (
  <div className={style.chatlist}>
    <div className={style.loading}>Loading...</div>
  </div>
);

class ChatList extends React.Component<IProps, {}> {
  public render() {
    const { loading, children, loadMore } = this.props;

    console.debug('ChatList', loadMore.toString());

    return (
      <div className={style.chatlist}>
        <ChatListSearch />
        <div className={style.chatbody}>
          <InfiniteScroll
            className={style.box}
            pageStart={0}
            loadMore={loadMore}
            initialLoad={false}
            hasMore={true}
            useWindow={false}>
            {loading
              ? <LoadingPane />
              : children}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export { ChatList };
