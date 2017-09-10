import { media as schema } from 'modules/media/entities';
import { denormalize } from 'normalizr';
import getEntities from 'normalizr-entities';
import { equals, mapObjIndexed } from 'ramda';
import { Store } from 'redux/store.h';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { Props } from './index.h';

// TODO: split into different connects instead of one selector
// with deep equal checking

// TODO: sometimes throws error

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  equals,
);

type SelectedStore = Pick<Store, 'media' | 'documents' | 'photos' | 'photoSizes' | 'files'>;

const dataSelector = (_: Store, { media }: Props) => media;

export const memoizeStore = createSelector(
  ({ media }: SelectedStore) => media.byId,
  ({ documents }) => documents.byId,
  ({ photos }) => photos.byId,
  ({ photoSizes }) => photoSizes.byId,
  ({ files }) => files.locations.byId,
  (media, documents, photos, photoSizes, fileLocations) => ({
    media, documents, photos, photoSizes, fileLocations,
  }),
);

export const entitiesSelector = createSelector(
  memoizeStore,
  dataSelector,
  (store, data) => mapObjIndexed(
    (v, key) => v.reduce(
      (acc, id) => ({ ...acc, [id]: store[key][id] }),
      {}),
    getEntities<typeof store, number>(data, schema, store),
  ),
);

export const makeMediaSelector = () => createDeepEqualSelector(
  entitiesSelector,
  dataSelector,
  (entities, data) => denormalize(
    data,
    schema,
    entities,
  ),
);

export const mediaSelector = makeMediaSelector();
