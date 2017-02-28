import { TById } from 'redux/mtproto';
import { IReducer } from 'redux/IStore';
import { pipe as P, map, contains, append, props, pluck, dissoc, assoc,
  unless, reduce, prop, propEq, curry, identity, unnest } from 'ramda';

const convolveReducers = payload => (state, reducer) => reducer(state, payload);

export const reduceSequence = <S, P>(...reducers): IReducer<S, P> =>
  (state, payload) => reducers.reduce(convolveReducers(payload), state);

export const whenNot = (pred, change) =>
  (state, data) =>
    unless(
      pred(data),
      change(data),
    )(state);

export const whenNotC = curry( (pred, change, data, state) =>
  unless(
    pred(data),
    change(data),
  )(state) );

export interface IStoreList<T> {
  ids: number[];
  byId: TById<T>;
}

export const isEmptyList = <T>(storeField: IStoreList<T>) => storeField.ids.length === 0;

type IGetReduce = <S, PL, G>(getter: (pl: PL) => G, reducer: IReducer<S, G>) => IReducer<S, PL>;

export const getReduce: IGetReduce = (getter, reducer) => (state, payload) =>
  P(getter, reduce(reducer, state))(payload);

export const getListOf = <T>(...fields) => P<any, any, any, T[]>(props(fields), pluck('list'), unnest);

export const appendNew: <T>(state: T[], element: T) => T[] = (whenNot(contains, append) as any);

export const changePayload = (func, reducer) =>
  (state, payload) => reducer(state, func(payload));

const getId = prop('id');

const addNewId = changePayload(getId, appendNew);

export const newIdsFromList = listGetter => getReduce(listGetter, addNewId);

const idPair = (e): [number, any] => [ e.id, dissoc('id', e) ];

export const addChangedProp = <V>(state: TById<V>, [id, val]: IIdPair<V>): TById<V> =>
  unless<typeof state, typeof state>(
    propEq(id, val),
    assoc(id, val),
  )(state);

type IIdPair<Value> = [number, Value];

type IIdPairList<Value> = Array<IIdPair<Value>>;

type ITransformer = <F, G>(payload: G) => IIdPairList<F>;

export const changeReducer = <G>(transformer: ITransformer) =>
  <F, PL>(vectorGetter: (payload: PL) => G) =>
    getReduce<TById<F>, PL, IIdPairList<F>>(
      P<PL, G, IIdPairList<F>>(vectorGetter, transformer),
      addChangedProp);

type IState<Field> = TById<Field>|Field[];
type IMapped<Field> = Field | [number, Field];
interface IStoreModelUni<Model, Field, Payload> {
  get: (payload: Payload) => Model[];
  filter?: (model: Model[]) => Model[];
  edit: (model: Model) => IMapped<Field>;
  save: ((state: Field[], element: Field) => Field[])|(
  (state: TById<Field>, element: IIdPair<Field>) => TById<Field>);
}


type IReducerList<Field, Payload> = (state: Field[], payload: Payload) => Field[];
type IReducerMap<Field, Payload> = (state: TById<Field>, payload: Payload) => TById<Field>;
type IReducerUni<Field, Payload> = IReducerList<Field, Payload>|IReducerMap<Field, Payload>;

export const modelHandler = <Model, Field, Payload>
  ({ get, edit, save, filter = identity }: IStoreModelUni<Model, Field, Payload>): IReducerUni<Field, Payload> => {
    type ICurrent = IMapped<Field>;
    const convolve = reduce<ICurrent, IState<Field>, ICurrent[]>(save);
    const reducer = (state, payload) =>
      P(get, filter, map(edit), convolve(state))(payload);
    return reducer;
  };

// TODO: strict types
const adaptFieldVector = map<any, IIdPair<any>>(idPair);

export const fieldListToMap = changeReducer(adaptFieldVector);
