import * as cx from 'classnames';
import { PeerPhoto } from 'containers/PeerPhoto';
import styled from 'glamorous';
import * as React from 'react';
import * as style from './style.css';

interface ChatListBasicProps {
  id: number;
  name: string;
  selected: boolean;
  click: React.MouseEventHandler<{}>;
  children?: React.ReactNode;
}

interface ChatListFullProps extends ChatListBasicProps {
  isYou: boolean;
  previewName: string;
  text: string;
  unreadCount: number;
}

const Counter = styled.div({
  backgroundColor: '#bbb',
  borderRadius: '19px',
  fontSize: '12px',
  fontWeight: 700,
  minWidth: '9px',
  padding: '1px 5px',
  textAlign: 'center',
  [`.${style.active} &`]: {
    backgroundColor: '#c6e1f7',
  },
});

const StyledUnreadBadge = styled.div<UnreadProps>(props => ({
  display: props.unread ? 'block' : 'none',
  color: '#fff',
  [`.${style.active} &`]: {
    color: '#419fd9',
  },
}));

const StyledSenderPreview = styled.div<SenderProps>(props => ({
  display: props.userName ? 'inline-block' : 'none',
  color: '#538bb4',
  paddingRight: '4px',
  [`.${style.active} &`]: {
    color: '#fff',
  },
}));

const StyledMessagePreview = styled.div({
  color: '#888888',
  flex: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  [`.${style.active} &`]: {
    color: '#fff',
  },
});

type UnreadProps = { unread: number };
const UnreadBadge = ({ unread }: UnreadProps) => (
  <StyledUnreadBadge unread={unread}>
    <Counter>{unread}</Counter>
  </StyledUnreadBadge>
);

type SenderProps = { userName: string };
const SenderPreview = ({ userName }: SenderProps) => (
  <StyledSenderPreview userName={userName}>
    <span>{userName}</span>
    <span>:</span>
  </StyledSenderPreview>
);

type MessageProps = { text: string, userName: string, isYou: boolean };
const MessagePreview = ({ text, userName, isYou }: MessageProps) => (
  <StyledMessagePreview>
    <SenderPreview userName={isYou ? 'You' : userName} />
    <span>{text}</span>
  </StyledMessagePreview>
);

export const ChatListItemEmpty = ({
  id,
  name,
  click,
  selected,
  children,
}: ChatListBasicProps) => {
  const block = cx({
    [style.item]: true,
    [style.active]: selected,
  });
  return (
    <div
      onClick={click}
      className={block}>
      <PeerPhoto peerID={id} />
      <div className={style.info}>
        <div className={style.top}>
          <div className={style.chatname}>{name}</div>
          <div className={style.time}>00:00</div>
        </div>
        <div className={style.bottom}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ChatListItem = ({
  id, name, click, selected,
  previewName, text, unreadCount, isYou }: ChatListFullProps) => (
  <ChatListItemEmpty id={id} name={name} click={click} selected={selected}>
    <MessagePreview text={text} userName={previewName} isYou={isYou} />
    <UnreadBadge unread={unreadCount}/>
  </ChatListItemEmpty>
);
