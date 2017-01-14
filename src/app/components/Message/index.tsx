import * as React from 'react';

const style = require('./style.css');

interface IOwnProps {
  id: number;
  date: number;
  user: number;
  text: string;
};

const formatTime = (date: number) => {
  const dateObject = new Date(date * 1000);
  return {
    dateString: dateObject.toLocaleDateString(),
    timeString: dateObject.toLocaleTimeString(),
  };
};

const Time = ({ date }: { date: number }) => {
  const { timeString } = formatTime(date);
  return (
    <div className={style.time}>
      <span>{timeString}</span>
    </div>
  );
};

export const Message = ({ user, date, text }: IOwnProps) => {
  return (
    <div className={style.message}>
      <div className={style.flexcontainer}>
        <img
          src={require('../ChatListItem/usercolor1.png')}
          className={style.messageavatar} />
        <div
          className={style.messagebody}>
          <div className={style.sender}>{user}</div>
          <div className={style.textbody}>
            <div className={style.text}>{text}</div>
            <Time date={date} />
          </div>
        </div>
      </div>
    </div>
  );
};
