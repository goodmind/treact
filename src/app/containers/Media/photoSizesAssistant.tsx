import picStore from 'helpers/FileManager/picStore'
import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from 'redux/store.h'
import { createSelector } from 'reselect'

// TODO: move assistants to middlewares?

type ConnectedState = {
  cached: {
    ids: number[],
    sizes: Store['photoCachedSizes']['byId'],
  },
  // TODO: describe TL types in redux/mtproto
  // TODO: WHERE IS TL PARSERRRR
  sizes: Store['photoSizes']['byId'],
}

const PhotoSizesAssistant = ({ cached }: ConnectedState) => {
  console.count('PhotoSizesAssistant')
  const addCached = (id: number) => {
    const photo = cached.sizes[id]
    console.warn(`cached size`, photo)
    picStore.addPic(id, photo.bytes)
  }
  const run = () => {
    cached.ids.map(addCached)
  }
  setTimeout(run, 10)
  return <span />
}

const mapState = createSelector(
  ({ photoCachedSizes }: Store) => photoCachedSizes.ids,
  ({ photoCachedSizes }) => photoCachedSizes.byId,
  (cachedIds, cachedById) => ({
    cached: {
      ids: cachedIds,
      sizes: cachedById,
    },
  }),
)

export default connect(mapState)(PhotoSizesAssistant)
