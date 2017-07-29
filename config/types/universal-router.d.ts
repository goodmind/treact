declare module 'universal-router' {
  export default class Router {
    constructor(routes: Route, options?: Partial<Options>);
    constructor(routes: Route[], options?: Partial<Options>);
    resolve<T>(location: Location): Promise<T>;
  }

  export interface Params {}

  export interface ActionResult {}

  interface NextFunction {
    (resume?: boolean, parent?: Route): Promise<ActionResult>
  }

  export interface Context {
    router: Router;
    route: Route;
    next: NextFunction;
    url: string;
    baseUrl: string;
    path: string;
    params: Params;
  }

  export type Location = { path: string } & Partial<Context>;

  export interface Route {
    path: string;
    name?: string;
    parent?: any;
    children?: Route[];
    action?: (context: Context, params: Params) => Promise<ActionResult>;
  }

  export interface Options {
    context: Partial<Context>;
    baseUrl: string;
    resolveRoute(context: Context, params: Params): Promise<any>;
  }
}
