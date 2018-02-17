import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, Store } from 'redux/store.h'
// TODO: use absolute paths
import history from '../../../history'

type ConnectedState = Pick<Store, 'auth'>
type ConnectedActions = { dispatch: Dispatch }
type OwnProps = {}
type Props = ConnectedState & ConnectedActions & OwnProps

class HomeImpl extends React.Component<Props, {}> {
  public componentWillMount() {
    const { auth } = this.props
    const route = auth.authenticated
      ? '/im'
      : '/login'
    return history.push(route)
  }

  public render() {
    return null
  }
}

const mapStateToProps = (state: Store) => ({ auth: state.auth })
const Home = connect<ConnectedState, ConnectedActions, OwnProps>(mapStateToProps)(HomeImpl)

export { Home }
