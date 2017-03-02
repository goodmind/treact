import { pluck, isEmpty, equals, evolve, concat, merge, pick, __ } from 'ramda';

import { SelectModel, ReducerCreator } from './reselector.h';

const selectModel: SelectModel = pluck as any;

export const updateStoreList: ReducerCreator = (modelName: string) => {
  const selector = selectModel(modelName);
  return (store, payload) => {
    const changed = [];
    const unnested = selector(payload);

    for (const key of unnested.result)
      if (!equals(store.byId[key], unnested.entities[key]))
        changed.push(key);

    return isEmpty(changed)
      ? store
      : evolve({
        ids: concat(__, changed),
        byId: merge(__, pick(changed as any, unnested.entities)),
      }, store);
  };
};

export const modelDefaults = {
  ids: [],
  byId: {},
};
