import * as React from 'react'

function formatTime(date: number) {
  const dateObject = new Date(date * 1000)
  return {
    dateString: dateObject.toLocaleDateString(),
    timeString: dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
  }
}

type Props = {
  date?: number,
}

export class Time extends React.Component<Props> {
  public render() {
    const { date, ...props } = this.props
    const { timeString } = formatTime(date!)
    return (
      <div {...props}>
        {timeString}
      </div>
    )
  }

  public static defaultProps = {
    date: 0,
  }
}
