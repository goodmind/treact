import { PeerPhoto } from 'containers/PeerPhoto';
import styled from 'glamorous';
import * as React from 'react';
import { Themeable } from 'themes/theme.h';
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

const active = 'active';

const Counter = styled.div<Themeable>(({ theme }) => ({
  backgroundColor: theme.dialogsUnreadBg,
  borderRadius: '19px',
  fontSize: '12px',
  fontWeight: 700,
  minWidth: '9px',
  padding: '1px 5px',
  textAlign: 'center',
  [`.${active} &`]: {
    backgroundColor: theme.dialogsUnreadBgActive,
  },
}));

const StyledUnreadBadge = styled.div<UnreadProps & Themeable>(({ unread, theme }) => ({
  display: unread ? 'block' : 'none',
  color: theme.dialogsUnreadFg,
  [`.${active} &`]: {
    color: theme.dialogsUnreadFgActive,
  },
}));

const StyledSenderPreview = styled.div<SenderProps>(props => ({
  display: props.userName ? 'inline-block' : 'none',
  color: '#538bb4',
  paddingRight: '4px',
  [`.${active} &`]: {
    color: '#fff',
  },
}));

const StyledMessagePreview = styled.div({
  color: '#888888',
  flex: 1,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  [`.${active} &`]: {
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

type DialogItemProps = { active: boolean };
const StyledDialogItem = styled.div<DialogItemProps & Themeable>({
  height: '62px',
  paddingRight: '10px',
}
, props => props.active ? active : {}
, ({ theme }) => ({
  backgroundColor: theme.dialogsBg,
  ':hover': {
    backgroundColor: theme.dialogsBgOver,
  },
  [`&.${active}, &.${active}:hover`]: {
    backgroundColor: theme.dialogsBgActive,
    marginRight: '-1px',
  },
}));

const StyledPeerPhoto = styled(PeerPhoto)({
  borderRadius: '50px',
  float: 'left',
  height: '46px',
  width: '46px',
  margin: '8px 10px',
  marginRight: '12px',
});

const Name = styled.div<Themeable>(({ theme }) => ({
  alignSelf: 'center',
  color: theme.dialogsNameFg,
  flex: '1 100%',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  [`.${active} &`]: {
    color: theme.dialogsNameFgActive,
  },
}));

export const ChatListItemEmpty = ({
  id,
  name,
  click,
  selected,
  children,
}: ChatListBasicProps) => {
  return (
    <StyledDialogItem
      active={selected}
      onClick={click}>
      <StyledPeerPhoto peerID={id} />
      <div className={style.info}>
        <div className={style.top}>
          <Name>{name}</Name>
          <div className={style.time}>00:00</div>
        </div>
        <div className={style.bottom}>
          {children}
        </div>
      </div>
    </StyledDialogItem>
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
