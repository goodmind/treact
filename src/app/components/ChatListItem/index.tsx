import * as React from 'react';
import * as classNames from 'classnames';

const style = require('./style.css');

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
  public css = {
    block: classNames({
      [style.item]: true,
      [style.active]: this.props.active,
    }),
  };
  public render() {
    const {
      name,
      avatar,
      lastMsg,
      unreadCount,
      onClick,
    } = this.props;
    const { block } = this.css;
    return (
      <div
        onClick={onClick}
        className={block}>
        <img src={avatar} />
        <div className={style.info}>
          <div className={style.top}>
            <div className={style.chattime}>{name}</div>
            {lastMsg[0] && <div className={style.time}>{lastMsg[0].sent}</div>}
          </div>
          <div className={style.bottom}>
            <div className={style.message}>
              {lastMsg[0] && <div className={style.sender}>{lastMsg[0].fromUser.displayName.split(' ')[0] + ':'}</div>}
              {(lastMsg[0] && lastMsg[0].text) || ''}
            </div>
            {unreadCount > 0 && <div className={style.unread}><div className={style.counter}>{unreadCount}</div></div>}
          </div>
        </div>
      </div>
    );
  }
}

export { ChatListItem }
