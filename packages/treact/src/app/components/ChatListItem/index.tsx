import * as React from 'react';
import * as classNames from 'classnames';
import { PeerPhoto } from 'containers/PeerPhoto';

const style = require('./style.css');

interface IProps {
  id: number;
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
    const {
      id,
      name,
      lastMsg,
      unreadCount,
      onClick,
    } = this.props;
    const block = classNames({
      [style.item]: true,
      [style.active]: this.props.active,
    });
    return (
      <div
        onClick={onClick}
        className={block}>
        <PeerPhoto peerID={id} />
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
