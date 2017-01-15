import { pipe as P, toPairs, fromPairs, head, equals, is,
  reject, either, map, T, identity, cond, complement, both,
  ifElse, any, flip } from 'ramda';

const isType = type => ([_, obj]) => is(type)(obj);

const isObject = isType(Object);
const isArray = isType(Array);
const isFunc = isType(Function);

const objectProcess = (...morphs) => P<any, any>(
  toPairs,
  ...morphs,
  fromPairs,
);

const notTypename = complement(equals('_typeName'));

const isDash = P(head, equals('_'));

const dashFilter = both(isDash, notTypename);

const dashNamed = ([name]) => dashFilter(name);

const objFilter = reject(either(
  dashNamed,
  isFunc,
));

const flipIs = flip(is);

const checkTypes = types => ([_, obj]) => any(flipIs(obj), types);

const isBypassType = checkTypes([
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
]);

const treeProcess = (...morphs) => {
  const reRun = ([name, obj]) => [name, treeProcess(...morphs)(obj)];
  const reRunMap = ([name, obj]) => [ name, map( treeProcess(...morphs), obj ) ];
  const treeWalk = map(cond([
    [isArray, reRunMap],
    [isBypassType, identity],
    [isObject, reRun],
    [T, identity],
  ]));

  const objectTransform = objectProcess(...morphs, treeWalk);
  const listTransform = map(objectProcess(...morphs, treeWalk));
  return ifElse(is(Array), listTransform, objectTransform);
};

export const rejectDashAndFuncs = treeProcess(objFilter);
