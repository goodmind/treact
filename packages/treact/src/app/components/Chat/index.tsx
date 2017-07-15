import { InfiniteScroll } from 'components';
import { ChatFooter } from 'containers';
import * as React from 'react';
import * as s from './style.css';

export const DefaultScreen = () => (
  <div className={s.chat}>
    <div className={s.bubble}>Please select a chat to start messaging</div>
  </div>
);

type IBasicProps = {
  name: string;
  userCount: number;
};

const ChatHeader = ({ name, userCount }: IBasicProps) => (
  <div className={s.chatheader}>
    <div className={s.left}>
      <div className={s.top}>{name}</div>
      <div className={s.bottom}>{userCount} members</div>
    </div>
    <div className={s.right} />
  </div>
);

type IProps = IBasicProps & {
  loadMore(): void,
};

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

export { Chat };
