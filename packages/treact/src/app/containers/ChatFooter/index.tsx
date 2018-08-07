import * as React from 'react'
import { connect as connectRedux } from 'react-redux'
import { compose, withHandlers, withProps, withState } from 'recompose'

import { ChatFooter, Props as ChatFooterProps } from 'components/ChatFooter'
import { sendText } from 'store/api/messages'
import { Dispatch, Store } from 'store/store.h'

type State = {
  message: string
  setMessage(s: string): string
}

type Handlers = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.MouseEventHandler<{}>
}

type EnhancedProps = State & ChatFooterProps & ConnectedActions & ConnectedState

const enhance = compose<ChatFooterProps, Connected>(
  withState('message', 'setMessage', ''),
  withHandlers<EnhancedProps, Handlers>({
    onChange: ({ setMessage }) => e => setMessage(e.target.value),
    onSubmit: ({ sendMessage, selected, setMessage, message }) => async () => {
      await sendMessage(selected, message)
      setMessage('')
    },
  }),
  withProps<ChatFooterProps, EnhancedProps & Handlers>(props => ({
    value: props.message,
    change: props.onChange,
    submit: props.onSubmit,
  })),
)

type ConnectedState = {
  selected: number
}

type ConnectedActions = {
  sendMessage: typeof sendText
}

type Connected = ConnectedState & ConnectedActions

type OwnProps = {}

const connect = connectRedux<ConnectedState, ConnectedActions, OwnProps, Store>(
  state => ({ selected: state.selected.dialog }),
  { sendMessage: sendText },
)

const enhanced = enhance(ChatFooter)
const connected = connect(enhanced)

export { enhanced }
export { connected as ChatFooter }
