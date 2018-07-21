import { logOut } from 'api/auth'
import { switchNightMode } from 'api/theme'
import { Header } from 'components/Header'
import { connect } from 'react-redux'
import { Dispatch } from 'store/store.h'

interface ConnectedActions {
  logOut(): void
  switchNightMode(): void
}

const dispatchToProps = {
  logOut,
  switchNightMode,
}

const connected = connect<{}, ConnectedActions, {}>(null, dispatchToProps)(Header)

export { connected as Header }
