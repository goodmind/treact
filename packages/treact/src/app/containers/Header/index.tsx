import { logOut } from 'api/auth'
import { switchNightMode } from 'api/theme'
import { Header } from 'components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux/store.h'

interface ConnectedActions {
  logOut(): void
  switchNightMode(): void
}

const dispatchToProps = (dispatch: Dispatch) => ({
  logOut() {
    dispatch(logOut())
  },
  switchNightMode() {
    dispatch(switchNightMode())
  },
})

const connected = connect<{}, ConnectedActions, {}>(null, dispatchToProps)(Header)

export { connected as Header }
