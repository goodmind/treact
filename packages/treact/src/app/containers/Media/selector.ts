import { media as schema } from 'modules/media/entities'
import { denormalize } from 'normalizr'
import getEntities from 'normalizr-entities'
import { equals, mapObjIndexed } from 'ramda'
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'
import { Store } from 'store/store.h'
import { Props } from './index.h'

// TODO: split into different connects instead of one selector
// with deep equal checking

// TODO: sometimes throws error

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals,
)

type SelectedStore = Pick<Store,
  | 'media'
  | 'documents'
  | 'photos'
  | 'photoSizes'
  | 'photoCachedSizes'
  | 'files'>

const dataSelector = (_: Store, { media }: Props) => media

export const memoizeStore = createSelector(
  ({ media }: SelectedStore) => media.byId,
  ({ documents }) => documents.byId,
  ({ photos }) => photos.byId,
  ({ photoSizes }) => photoSizes.byId,
  ({ photoCachedSizes }) => photoCachedSizes.byId,
  ({ files }) => files.locations.byId,
  (media, documents, photos, photoSizes, photoCachedSizes, fileLocations) => ({
    media, documents, photos, photoSizes, photoCachedSizes, fileLocations,
  }),
)

export const entitiesSelector = createSelector(
  memoizeStore,
  dataSelector,
  (store, data) => {
    const entities = getEntities<typeof store, number>(data, schema, store)
    const o = mapObjIndexed(
      (v, key) => v.reduce(
        (acc, id) => ({ ...acc, [id]: store[key][id] }),
        {}),
      entities,
    )
    console.debug('entities', o, entities)
    return o
  },
)

export const makeMediaSelector = () => createDeepEqualSelector(
  entitiesSelector,
  dataSelector,
  (entities, data) => denormalize(
    data,
    schema,
    entities,
  ),
)

export const mediaSelector = makeMediaSelector()
