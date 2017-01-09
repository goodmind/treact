import * as React from 'react';

import classes from 'helpers/classes';

const style = require('./message.css');

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

class Message extends React.Component<IOwnProps, any> {
  public css = () => classes({
    block: {
      [style.block]: true,
    },
    message: {
      [style.message]: true,
    },
  })
  public render() {
    const { date, text } = this.props;
    const { block, message } = this.css();
    return (
      <div className={block}>
        <Time date={date} />
        <div className={message}>
          {text}
        </div>
      </div>
    );
  }
}

export default Message;
