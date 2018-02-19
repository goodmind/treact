import { ChatListSearch } from 'components';
import { InfiniteScroll } from 'components/InfiniteScroll';
import styled from 'glamorous';
import * as React from 'react';

const StyledChatList = styled.div(({ theme }) => ({
  backgroundColor: theme.dialogsBg,
  flex: 35,
  minWidth: '260px',
}));

const Loader = styled.div({
  color: '#767676',
  fontSize: '14px',
  marginTop: '45px',
  textAlign: 'center',
});

const ChatBody = styled.div({
  display: 'flex',
  flex: 1,
  height: '92%', /* TODO: remove this hack */
  overflowY: 'auto',
});

const StyledInfiniteScroll = styled(InfiniteScroll)({
  width: '100%',
  minHeight: 'min-content',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

interface Props {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  children?: React.ReactNode;
}

const LoadingPane = () => (
  <StyledChatList>
    <Loader>Loading...</Loader>
  </StyledChatList>
);

const ChatList = ({ children, loadMore, hasMore }: Props) => (
  <StyledChatList>
    <ChatListSearch />
    <ChatBody>
      <StyledInfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        initialLoad={false}
        hasMore={hasMore}
        loader={<LoadingPane />}
        useWindow={false}>
        {children}
      </StyledInfiniteScroll>
    </ChatBody>
  </StyledChatList>
);

export { ChatList };
