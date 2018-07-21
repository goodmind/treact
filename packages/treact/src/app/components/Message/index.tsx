import { Time as FormattedTime } from 'components/Time'
import { FullMedia } from 'containers/Media'
import { PeerName } from 'containers/PeerName'
import styled from 'glamorous'
import * as React from 'react'
import { MtpMessageMedia } from 'store/mtproto'
import { Themeable } from 'themes/theme.h'

const Time = styled(FormattedTime)<Themeable>(({ theme }) => ({
  marginLeft: '13px',
  marginTop: '4px',
  whiteSpace: 'nowrap',
  color: theme.msgInDateFg,
  alignSelf: 'flex-end',
}))

const Body = styled.div<Themeable>(({ theme }) => ({
  backgroundColor: theme.msgInBg,
  borderRadius: '16px',
  float: 'left',
  fontSize: '13px',
  margin: '10px 36px 2px 7px',
  maxWidth: '404px',
  // minWidth: '115px',
  padding: '7px 13px 4px 13px',
  wordWrap: 'break-word',
}))

const Text = styled.div<Themeable>(({ theme }) => ({
  color: theme.historyTextInFg,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  [`& pre, & code`]: {
    color: theme.msgInMonoFg,
  },
}))

const TextBody = styled.div({
  display: 'flex',
})

const sender = 'sender'
const Sender = styled.div<Themeable>(sender, ({ theme }) => ({
  color: theme.historyTextInFg,
  fontWeight: 600,
}))
Sender.toString = () => `.${sender}`

const StyledMessage = styled.div({
  width: '100%',
  display: 'flex',
  [`&:not(:first-child) ${Sender}`]: {
    display: 'none',
  },
})

interface OwnProps {
  id: number,
  date: number,
  user: number,
  // TODO: Should be children?
  text: React.ReactNode,
  media?: MtpMessageMedia,
  own?: boolean
}

const formatTime = (date: number) => {
  const dateObject = new Date(date * 1000)
  return {
    dateString: dateObject.toLocaleDateString(),
    timeString: dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
  }
}

export class Message extends React.Component<OwnProps> {
  public render() {
    const { user, date, text, media, own } = this.props
    console.debug(`Message`, user, text, own)
    return (
      <StyledMessage>
        <Body>
          <Sender>
            <PeerName id={user} />
          </Sender>
          <TextBody>
            <Text>
              {text}
              {media && <FullMedia media={media} />}
            </Text>
            <Time date={date} />
          </TextBody>
        </Body>
      </StyledMessage>
    )
  }

  public static defaultProps = {
    own: false,
  }
}
