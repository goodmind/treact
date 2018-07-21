import { getPeerData, getPeerName } from 'helpers/Telegram/Peers'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { Store } from 'store/store.h'

type Props = {
  id: number,
  name: string,
}


type M<K extends string, T> = {
  [P in K]: T
}
const s: 'Meme' = 'wrong'

class PeerName extends React.Component<Props> {
  public render() {
    return this.props.name
  }

  public static defaultProps = {
    name: 'Unknown name',
    id: -1,
  }
}

const mapStateToProps = (state: Store, { id }: Props) => {
  const peer = state.peers.byId[id]
  const peerData = getPeerData(id, peer, state)
  const peerName = getPeerName(peer, peerData)
  return {
    name: peerName,
  }
}

const ConnectedPeerName = compose(
  lifecycle({
    componentDidCatch(...args) {
      console.error('error here', args)
    }
  }),
  connect(mapStateToProps),
)(PeerName)

export { ConnectedPeerName as PeerName }
