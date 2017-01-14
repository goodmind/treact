import * as React from 'react';

import classes from 'helpers/classes';

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

export const Message = ({ date, text }: IOwnProps) => {
  const { block, message } = classes({
    block: style.block,
    message: style.message,
  });
  return (
    <div className={block}>
      <Time date={date} />
      <div className={message}>
        {text}
      </div>
    </div>
  );
};
