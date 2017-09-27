// Type definitions for universal-router 4.0.0
// Project: https://github.com/kriasoft/universal-router
// Definitions by: goodmind <https://github.com/goodmind>
// Definitions: https://github.com/goodmind/treact

declare module 'universal-router' {
  type Obj<T> = { [k: string]: T };
  type Bool = '0'|'1';
  type Not<T extends Bool> = { '1': '0'; '0': '1'; }[T];
  type And<
    A extends Bool,
    B extends Bool
  > = ({ 1: { 1: '1' } & Obj<'0'> } & Obj<Obj<'0'>>)[A][B];
  type Indeterminate<T extends string> = And<
    UnionHasKey<T, '0'>,
    UnionHasKey<T, '1'>
  >;
  type Determinate<T extends Bool> = Not<Indeterminate<T>>;
  type DefinitelyYes<T extends Bool> = And<T, Determinate<T>>;
  type UnionHasKey<Union extends string, K extends string> = ({[S in Union]: '1' } & Obj<'0'>)[K];
  type If<Cond extends '0'|'1', Then, Else> = { 1: Then, 0: Else }[Cond];
  type ObjectHasKey<
    O extends {},
    K extends string
  > = UnionHasKey<keyof O, K>;
  type Keyed<T> = {[K in keyof T]: K };
  type KeyedSafe<T> = Keyed<T> & Obj<never>;
  type UnionToObject<Keys extends string> = { [K in Keys]: K };
  type IntersectionUnions<Big extends string, Small extends string> = KeyedSafe<UnionToObject<Small>>[Big];
  type UnionContained<T extends string, U extends string> = DefinitelyYes<({ [P in U]: '1' } & Obj<'0'>)[T | U]>;
  type UnionEmpty<T extends string> =　And<UnionContained<T, 'foo'>, UnionContained<T, 'bar'>>;
  type UnionsOverlap<Big extends string, Small extends string> = Not<UnionEmpty<IntersectionUnions<Big, Small>>>;
  type ObjectHasKeySafe<O extends object, K extends string> = UnionsOverlap<keyof O, K>;
  type ObjectProp<O extends Obj<any>, K extends string, Default = never> = If<ObjectHasKeySafe<O, K>, O[K], Default>;

  export default class Router {
    constructor(routes: Route, options?: Partial<Options>);
    constructor(routes: Route[], options?: Partial<Options>);
    resolve<T>(location: Location): Promise<T>;
  }

  export interface Params {}

  export interface ActionResult {}

  type ActionResultType = ObjectProp<ActionResult, 'type', any>;
  type NextFunctionType = ObjectProp<NextFunction, 'type', any>;

  interface NextFunction {
    (resume?: boolean, parent?: Route): Promise<NextFunctionType>
  }

  export interface Context {
    router: Router;
    route: Route;
    next: NextFunction;
    pathname: string;
    baseUrl: string;
    path: string;
    params: Params;
  }

  export type Location = { pathname: string } & Partial<Context>;

  export interface Route {
    path: string;
    name?: string;
    parent?: any;
    children?: Route[];
    action?: (context: Context, params: Params) => Promise<ActionResultType>;
  }

  export interface Options {
    context: Partial<Context>;
    baseUrl: string;
    resolveRoute(context: Context, params: Params): Promise<any>;
  }
}

declare module 'universal-router/generateUrls' {
  import Router, { Params } from 'universal-router'

  type Options = {
    encode(s: string): string,
    stringifyQueryParams(params: Params): string
  }

  type URLGenerator = {
    (routeName: string, params: Params): string
  }

  function generateUrls(router: Router, options?: Partial<Options>): URLGenerator

  export default generateUrls
}
