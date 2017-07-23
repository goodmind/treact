declare module 'universal-router' {
  class Router {
    constructor(routes: Router.Route, options?: Partial<Router.Options>);
    constructor(routes: Router.Route[], options?: Partial<Router.Options>);
    resolve<T>(location: Router.Location): Promise<T>;
  }

  namespace Router {
    export interface Params {}

    export interface ActionResult {}

    interface NextFunction {
      (resume?: boolean, parent?: Route): Promise<ActionResult>
    }

    export interface Context {
      router: Router;
      route: any;
      next: NextFunction;
      url: string;
      baseUrl: string;
      path: string;
      params: Params;
    }

    export type Location = { path: string } & Partial<Context>;

    export interface Route {
      path: string;
      guard?: boolean;
      name?: string;
      parent?: any;
      children?: Route[];
      action?: <T>(context: Context, params: Params) => Promise<T>;
    }

    export interface Options {
      context: Partial<Context>;
      baseUrl: string;
      resolveRoute(context: Context, params: Params): any;
    }
  }

  export = Router;
}
