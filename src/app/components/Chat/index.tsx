import * as React from 'react';
import { /*ChatMessage,*/ AutoSizeTextarea } from 'components';

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

const ChatFooter = () => (
  <div className={s.chatfooter}>
    <AutoSizeTextarea
      className={s.editText}
      rows={1}
      placeholder="  Write a message" />
    <div className={s.sendbutton}>Send</div>
  </div>
);

class Chat extends React.Component<IProps, {}> {
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
