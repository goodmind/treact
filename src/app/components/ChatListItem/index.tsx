import * as React from 'react';

interface IProps {
  name: string;
  avatar?: string;
  lastMsg?: any[];
  unreadCount: number;
  active: boolean;
  onClick: React.EventHandler<React.MouseEvent<any>>;
}

class ChatListItem extends React.Component<IProps, any> {
  public static defaultProps = {
    avatar: require('./usercolor1.png'),
    lastMsg: [],
  };

  public render() {
    const s = require('./style.css');
    const {
      name,
      avatar,
      lastMsg,
      unreadCount,
      active,
      onClick,
    } = this.props;

    const dateParse = i => i;

    return (
      <div
        onClick={onClick}
        className={`${s.chatlistitem} ${active && s.active}`}>
        <img src={avatar} />
        <div className={s.info}>
          <div className={s.top}>
            <div className={s.chattime}>{name}</div>
            {lastMsg[0] && <div className={s.time}>{dateParse(lastMsg[0].sent)}</div>}
          </div>
          <div className={s.bottom}>
            <div className={s.message}>
              {lastMsg[0] && <div className={s.sender}>{lastMsg[0].fromUser.displayName.split(' ')[0] + ':'}</div>}
              {(lastMsg[0] && lastMsg[0].text) || ''}
            </div>
            {unreadCount > 0 && <div className={s.unread}><div className={s.counter}>{unreadCount}</div></div>}
          </div>
        </div>
      </div>
    );
  }
}

export { ChatListItem }
