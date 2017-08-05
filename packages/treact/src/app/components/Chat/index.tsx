import { InfiniteScroll } from 'components';
import { ChatFooter } from 'containers';
import styled from 'glamorous';
import * as React from 'react';
import * as s from './style.css';

const StyledChat = styled.div(({ theme }) => ({
  backgroundImage: `url(${theme.__backgroundImage__})`,
  backgroundSize: 'cover',
  display: 'flex',
  flex: 65,
  height: '100%',
}));

const Header = styled.div(({ theme }) => ({
  backgroundColor: theme.topBarBg,
  borderBottom: `1px solid ${theme.shadowFg}`,
  display: 'flex',
  height: '54px',
  paddingLeft: '16px',
  borderLeft: `1px solid ${theme.shadowFg}`,
}));

export const DefaultScreen = () => (
  <StyledChat>
    <div className={s.bubble}>Please select a chat to start messaging</div>
  </StyledChat>
);

type BasicProps = {
  name: string;
  userCount: number;
};

const ChatHeader = ({ name, userCount }: BasicProps) => (
  <Header>
    <div className={s.left}>
      <div className={s.top}>{name}</div>
      <div className={s.bottom}>{userCount} members</div>
    </div>
    <div className={s.right} />
  </Header>
);

type Props = BasicProps & {
  loadMore(): void,
};

class Chat extends React.Component<Props, {}> {
  public render() {
    const { name, userCount, children, loadMore } = this.props;
    return (
      <StyledChat>
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
      </StyledChat>
    );
  }
}

export { Chat };
