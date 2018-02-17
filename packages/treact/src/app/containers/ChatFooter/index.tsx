import * as React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, withProps, withState } from 'recompose'

import { ChatFooter, Props as ChatFooterProps } from 'components/ChatFooter'
import { sendText } from 'redux/api/messages'
import { Dispatch, Store } from 'redux/store.h'

type State = {
  message: string,
}

type ConnectedState = {
  selected: number,
}
type ConnectedActions = {
  sendMessage(id: number, text: string): Promise<{}>,
  setMessage(s: string): string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  onSubmit: React.MouseEventHandler<{}>,
}
type OwnProps = {}
type Props = ConnectedState & ConnectedActions & OwnProps & State

const enhance = compose(
  connect<ConnectedState, Pick<ConnectedActions, 'sendMessage'>, OwnProps>(
    (state: Store) => ({ selected: state.selected.dialog }),
    (dispatch: Dispatch) => ({
      sendMessage: (id: number, text: string) => dispatch(sendText(id, text)),
    })),
  withState('message', 'setMessage', ''),
  withHandlers<Props, {}>({
    onChange: ({ setMessage }) => e => setMessage(e.target.value),
    onSubmit: ({ sendMessage, selected, setMessage, message }) => async () => {
      await sendMessage(selected, message)
      setMessage('')
    },
  }),
  withProps<ChatFooterProps, Props>(props => ({
    value: props.message,
    change: props.onChange,
    submit: props.onSubmit,
  })),
)

const connected = enhance(ChatFooter)

export { connected as ChatFooter }
