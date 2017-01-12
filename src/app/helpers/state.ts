import { TById } from 'redux/mtproto';
import { pipe as P, map, contains, append, path, fromPairs, dissoc, unless, reduce } from 'ramda';

export const whenNot = (pred, change) =>
  (state, data) =>
    unless(
      pred(data),
      change(data),
    )(state);

export interface IStoreList<T> {
  ids: number[];
  byId: TById<T>;
}

export const isEmptyList = <T>(storeField: IStoreList<T>) => storeField.ids.length === 0;

export const getReduce = (getter, reducer) => (state, payload) =>
  P(getter, reduce(reducer, state))(payload);

export const getListOf = (field: string) => path([field, 'list']);

export const appendNew = whenNot(contains, append);

export const changePayload = (func, reducer) =>
  (state, payload) => reducer(state, func(payload));

const idPair = e => [ e.id, dissoc('id', e) ];

export const listToIdMap = P(map(idPair), fromPairs);
