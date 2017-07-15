// TODO: find typescript typings
declare module 'redux-connect' {
  import * as React from 'react';
  import * as Redux from 'redux';

  type ComponentClass<P> = React.ComponentClass<P>;
  type StatelessComponent<P> = React.StatelessComponent<P>;
  type ReactNode = React.ReactNode;
  type Store<S> = Redux.Store<S>;
  type Dispatch<S> = Redux.Dispatch<S>;
  type ActionCreator<A> = Redux.ActionCreator<A>;

  interface ComponentDecorator<TOriginalProps, TOwnProps> {
      (component: ComponentClass<TOriginalProps> | StatelessComponent<TOriginalProps>): ComponentClass<TOwnProps>;
  }

  export const ReduxAsyncConnect: any;
  export function asyncConnect<TStateProps, TDispatchProps, TOwnProps>(
    asyncItems: AsyncItem[],
    mapStateToProps?: FuncOrSelf<MapStateToProps<TStateProps, TOwnProps>>,
    mapDispatchToProps?: FuncOrSelf<MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | MapDispatchToPropsObject>,
    mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps>,
    options?: Options
  ): ComponentDecorator<TStateProps & TDispatchProps, TOwnProps>;

  type FuncOrSelf<T> = T | (() => T);

  type AsyncItem = {
    key?: string,
    // TODO: why TS doesn't checks function params with generics
    // (well, better to remove redux-connect)
    promise(option: AsyncOptions<object>): any
  }

  export type AsyncOptions<T> = {
    store: { dispatch: Dispatch<T>, getState(): T },
    params: any,
    helpers: any
  }

  interface MapStateToProps<TStateProps, TOwnProps> {
    (state: any, ownProps?: TOwnProps): TStateProps;
  }

  interface MapDispatchToPropsFunction<TDispatchProps, TOwnProps> {
    (dispatch: Dispatch<any>, ownProps?: TOwnProps): TDispatchProps;
  }

  interface MapDispatchToPropsObject {
    [name: string]: ActionCreator<any>;
  }

  interface MergeProps<TStateProps, TDispatchProps, TOwnProps> {
    (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps): TStateProps & TDispatchProps;
  }

  interface Options {
    /**
     * If true, implements shouldComponentUpdate and shallowly compares the result of mergeProps,
     * preventing unnecessary updates, assuming that the component is a “pure” component
     * and does not rely on any input or state other than its props and the selected Redux store’s state.
     * Defaults to true.
     * @default true
     */
    pure?: boolean;
    /**
    * If true, stores a ref to the wrapped component instance and makes it available via
    * getWrappedInstance() method. Defaults to false.
    */
    withRef?: boolean;
  }
}
