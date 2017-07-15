import * as React from 'react';
import AutoSizeTextarea from 'react-autosize-textarea';
const s = require('../Chat/style.css');

export const ChatFooter = ({ value, change, submit }) => (
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
