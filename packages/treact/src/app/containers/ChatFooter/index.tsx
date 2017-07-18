import * as React from 'react';
import { connect } from 'react-redux';

import { ChatFooter } from 'components/ChatFooter';
import { sendText } from 'redux/api/messages';
import { Dispatch, Store } from 'redux/store.h';

type State = {
  message: string,
};

type Props = {
  selected: number,
  sendMessage(id: number, text: string): Promise<void>,
};

class ChatFooterContainer extends React.Component<Props, State> {
  public state = {
    message: '',
  };

  public onChange: React.ChangeEventHandler<HTMLInputElement> =
    e => this.setState({ message: e.target.value })

  public onSubmit = async () => {
    const { sendMessage, selected } = this.props;
    await sendMessage(selected, this.state.message);
    this.setState({ message: '' });
  }

  public render() {
    return (
      <ChatFooter
        value={this.state.message}
        change={this.onChange}
        submit={this.onSubmit} />
    );
  }
}

const mapState = (state: Store) => ({ selected: state.selected.dialog });
const mapDispatch = (dispatch: Dispatch) => ({
  sendMessage: (id: number, text: string) => dispatch(sendText(id, text)),
});
const connected = connect(mapState, mapDispatch)<{}>(ChatFooterContainer);

export { connected as ChatFooter };
