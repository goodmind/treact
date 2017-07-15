import * as React from 'react';
import { ChatFooter } from 'containers';
import * as InfiniteScroll from 'react-infinite-scroller';

const s = require('./style.css');

export const DefaultScreen = () => (
  <div className={s.chat}>
    <div className={s.bubble}>Please select a chat to start messaging</div>
  </div>
);

type IProps = {
  name: string;
  userCount: number;
  loadMore: () => void;
};

const ChatHeader = ({ name, userCount }) => (
  <div className={s.chatheader}>
    <div className={s.left}>
      <div className={s.top}>{name}</div>
      <div className={s.bottom}>{userCount} members</div>
    </div>
    <div className={s.right} />
  </div>
);

class Chat extends React.Component<IProps, {}> {
  public render() {
    const { name, userCount, children, loadMore } = this.props;
    return (
      <div className={s.chat}>
        <div className={s.chatcontainer}>
          <ChatHeader name={name} userCount={userCount} />
          <div className={s.chatbody}>
            <InfiniteScroll
              className={s.box}
              pageStart={0}
              loadMore={loadMore}
              initialLoad={false}
              hasMore={true}
              isReverse={true}
              useWindow={false}>
              {children}
            </InfiniteScroll>
          </div>
          <ChatFooter />
        </div>
      </div>
    );
  }
}

export { Chat }
