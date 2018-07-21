import { PeerPhoto } from 'containers/PeerPhoto'
import styled from 'glamorous'
import * as React from 'react'
import { MtpMessage } from 'store/mtproto'

const Styled = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
})

const StyledPeerPhoto = styled<{ peerID: number }>(PeerPhoto)({
  position: 'sticky',
  bottom: '8px',
  top: '8px',
  marginLeft: '13px',
  marginTop: '8px',
  borderRadius: '33px',
  height: '33px',
  width: '33px',
})

const Group = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

interface Props {
  messages: MtpMessage[],
  first: MtpMessage,
  message(m: MtpMessage): JSX.Element
}

export const MessageGroup = ({ messages, first, message }: Props) => (
  <Styled>
    <StyledPeerPhoto peerID={first.from_id} />
    <Group>
      {messages.map(message)}
    </Group>
  </Styled>
)
