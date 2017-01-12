import { pipe as P, toPairs, fromPairs, head, equals, is,
  reject, either, map, T, identity, cond, complement, both } from 'ramda';

const isType = type => ([_, obj]) => is(type)(obj);

const isObject = isType(Object);
const isArray = isType(Array);
const isFunc = isType(Function);

const objectProcess = (...morphs) => P(
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

const treeProcess = (...morphs) => {
  const reRun = ([name, obj]) => [name, treeProcess(...morphs)(obj)];
  const reRunMap = ([name, obj]) => [ name, map( treeProcess(...morphs), obj ) ];
  const treeWalk = map(cond([
    [isArray, reRunMap],
    [isObject, reRun],
    [T, identity],
  ]));
  return objectProcess(...morphs, treeWalk);
};

export const rejectDashAndFuncs = treeProcess(objFilter);
