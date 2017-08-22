import { ChatFooter } from 'containers';
import styled from 'glamorous';
import * as React from 'react';
import { Themeable } from 'themes/theme.h';
import InfiniteScroll from './scroll';
import * as s from './style.css';

type StyledChatProps = { selected?: boolean } & Themeable;
const StyledChat = styled.div<StyledChatProps>(({ theme, selected }) => ({
  backgroundImage: `url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: selected ? 'column' : 'row',
  flex: 65,
  width: '100%',
  height: '100%',
}));

const Header = styled.div<Themeable>(({ theme }) => ({
  color: theme.dialogsNameFg,
  backgroundColor: theme.topBarBg,
  borderBottom: `1px solid ${theme.shadowFg}`,
  display: 'flex',
  height: '54px',
  paddingLeft: '16px',
  borderLeft: `1px solid ${theme.shadowFg}`,
}));

const Bubble = styled.div<Themeable>(({ theme }) => ({
  alignSelf: 'center',
  backgroundColor: theme.msgServiceBg,
  color: theme.msgServiceFg,
  borderRadius: '27px',
  fontSize: '14px',
  fontWeight: 600,
  margin: '0 auto',
  padding: '3px 12px 4px 12px',
}));

const ChatBody = styled.div<Themeable>(({ theme }) => ({
  alignItems: 'flex-start',
  display: 'flex',
  flex: 1,
  height: '100%',
  overflow: 'auto',
  paddingBottom: '8px',
  borderLeft: `1px solid ${theme.shadowFg}`,
}));

export const DefaultScreen = () => (
  <StyledChat>
    <Bubble>Please select a chat to start messaging</Bubble>
  </StyledChat>
);

interface BasicProps {
  name: string;
  userCount: number;
}

const ChatHeader = ({ name, userCount }: BasicProps) => (
  <Header>
    <div className={s.left}>
      <div className={s.top}>{name}</div>
      <div className={s.bottom}>{userCount} members</div>
    </div>
    <div className={s.right} />
  </Header>
);

interface Props extends BasicProps {
  loadMore(): void;
  children?: React.ReactNode;
}

const Chat = ({ name, userCount, children, loadMore }: Props) => (
  <StyledChat selected>
    <ChatHeader name={name} userCount={userCount} />
    <ChatBody>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        initialLoad={false}
        hasMore={true}
        isReverse={true}
        useWindow={false}>
        {children}
      </InfiniteScroll>
    </ChatBody>
    <ChatFooter />
  </StyledChat>
);

export { Chat };
