import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, Store } from 'redux/store.h'

type ConnectedState = Pick<Store, 'currentUser'>
type ConnectedActions = { dispatch: Dispatch }
type Props = ConnectedState & ConnectedActions

class SuccessImpl extends React.Component<Props, {}> {
  public static defaultPhrase = 'No current user'
  public toPrintable = () => this.props.currentUser
    ? JSON.stringify(this.props.currentUser)
    : SuccessImpl.defaultPhrase

  public render() {
    const print = this.toPrintable()
    return (
      <div>
        Success
        {print}
      </div>
    )
  }
}

const mapStateToProps = (state: Store) => ({ currentUser: state.currentUser })
const Success = connect(mapStateToProps)(SuccessImpl)

export { Success }
