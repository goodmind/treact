import * as React from 'react';
import * as classNames from 'classnames';
import { PeerPhoto } from 'containers/PeerPhoto';

const style = require('./style.css');

interface IChatListBasicProps {
  id: number;
  name: string;
  selected: boolean;
  click: React.EventHandler<React.MouseEvent<any>>;
}

interface IChatListFullProps extends IChatListBasicProps {
  previewName: string;
  text: string;
  unreadCount: number;
}

type UnreadProps = { unread: number };
const UnreadBadge = ({ unread }: UnreadProps) => {
  const block = classNames({
    [style.unread]: true,
    [style.hidden]: unread === 0,
  });
  return (
    <div className={block}>
      <div className={style.counter}>{unread}</div>
    </div>
  );
};

type MessageProps = { text: string, userName: string };
const MessagePreview = ({ text, userName }: MessageProps) => (
  <div className={style.message}>
    <div className={style.sender}>
      <span>{userName}</span>
      <span>:</span>
    </div>
    <span>{text}</span>
  </div>
);

// <PeerPhoto peerID={id} />

export class ChatListItemEmpty extends React.Component<IChatListBasicProps, {}> {
  public render() {
    const {
      id,
      name,
      click,
      selected,
      children,
    } = this.props;
    const block = classNames({
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
            <div className={style.chattime}>{name}</div>
          </div>
          <div className={style.bottom}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export const ChatListItem = ({ id, name, click, selected, previewName, text, unreadCount }: IChatListFullProps) => (
  <ChatListItemEmpty id={id} name={name} click={click} selected={selected}>
    <MessagePreview text={text} userName={previewName}/>
    <UnreadBadge unread={unreadCount}/>
  </ChatListItemEmpty>
);
