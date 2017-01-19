import * as React from 'react';
import { ChatFooter } from 'containers';

const s = require('./style.css');

export const DefaultScreen = () => (
  <div className={s.chat}>
    <div className={s.bubble}>Please select a chat to start messaging</div>
  </div>
);

type IProps = {
  name: string;
  userCount: number;
};

const ChatHeader = ({ name, userCount }) => (
  <div className={s.chatheader}>
    <div className={s.left}>
      <div className={s.top}>{name}</div>
      <div className={s.bottom}>{userCount} members</div>
    </div>
    <div className={s.right} />
  </div>
);

class Chat extends React.Component<IProps, any> {
  public render() {
    const { name, userCount, children } = this.props;
    return (
      <div className={s.chat}>
        <div className={s.chatcontainer}>
          <ChatHeader name={name} userCount={userCount} />
          <div className={s.chatbody}>
            <div className={s.box}>
              {children}
            </div>
          </div>
          <ChatFooter />
        </div>
      </div>
    );
  }
}

export { Chat }
