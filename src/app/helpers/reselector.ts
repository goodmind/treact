import { pluck, isEmpty, equals, evolve, merge, pick,
  mergeWith, union, flip } from 'ramda';

import { SelectModel, ReducerCreator } from './reselector.h';

const selectModel: SelectModel = pluck as any;

type FlipMergeLists = <T>(b: T[]) => (a: T[]) => T[];
const mergeLists: FlipMergeLists = flip(mergeWith(union)) as any;

const unionf = flip(union);
const mergef = flip(merge);

const updateStore = (mergeFunc): ReducerCreator => (modelName: string) => {
  const selector = selectModel(modelName);
  return (store, payload) => {
    const selected = selector(payload);

    const data = selected.entities;

    const changed = [];
    for (const key of selected.result)
      if (!equals(store.byId[key], data[key]))
        changed.push(key);

    return isEmpty(changed)
      ? store
      : evolve({
        ids: unionf(changed),
        byId: mergeFunc(pick(changed as any, data)),
      }, store);
  };
};

export const updateStoreMap: ReducerCreator = updateStore(mergef);

export const updateStoreList: ReducerCreator = updateStore(mergeLists);

export const modelDefaults = {
  ids: [],
  byId: {},
};
