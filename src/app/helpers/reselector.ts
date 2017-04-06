import { isEmpty, equals, evolve, merge, pick,
  mergeWith, union, flip, pipe, sort, subtract } from 'ramda';
const { pluck } = require('ramda');

import { StoredPayload, SelectedPayload, IPayload } from './reselector.h';

const selectModel = pluck;

type FlipMergeLists = <T>(b: T[]) => (a: T[]) => T[];
const mergeLists: FlipMergeLists = flip(mergeWith(union));

const unionf = flip(union);
const mergef = flip(merge);

const updateStore =
  // tslint:disable-next-line
  (_mergeFunc: any) =>
      <P1, K1 extends keyof P1>(modelName: K1) => {
        type T1 = IPayload<P1>;
        type S1 = StoredPayload<P1[K1]>;
        type Selector = (p: T1) => SelectedPayload<P1[K1]>;
        type MergeFunc = (a: T1['entities'][K1]) => (a: S1['byId']) => S1['byId'];

        const selector: Selector = selectModel(modelName);
        const mergeFunc: MergeFunc = _mergeFunc;
        return (store: S1, payload: T1): S1 => {
          const selected = selector(payload);
          const data = selected.entities;
          const changed = []
          for (const key of selected.result) {
            if (!equals(store.byId[key], data[key])) {
              changed.push(key);
            }
          }

          return isEmpty(changed)
            ? store
            : evolve({
              ids: unionf(changed),
              byId: mergeFunc(pick(changed, data)),
            }, store);
        };
      };

export const updateStoreMap = updateStore(mergef);
export const updateStoreList = updateStore(mergeLists);
export const updateStoreListSorted = updateStore(
  flip(mergeWith(pipe<{}, {}, {}>(
    union,
    sort(subtract)))));

export const modelDefaults = {
  ids: [],
  byId: {},
};
