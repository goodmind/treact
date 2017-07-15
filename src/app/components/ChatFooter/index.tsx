import * as React from 'react';
import AutoSizeTextarea from 'react-autosize-textarea';
import * as s from '../Chat/style.css';

type IProps = {
  value: string,
  change: React.ChangeEventHandler<{}>,
  submit: React.MouseEventHandler<{}>,
};

export const ChatFooter = ({ value, change, submit }: IProps) => (
  <div className={s.chatfooter}>
    <AutoSizeTextarea
      onChange={change}
      className={s.editText}
      value={value}
      rows={1}
      placeholder="  Write a message" />
    <div className={s.sendbutton} onClick={submit}>Send</div>
  </div>
);
