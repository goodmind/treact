import { ComponentClass } from 'react'

declare module 'universal-router' {
  export interface ActionResult {
    render<T>(): Promise<ComponentClass<T>>;
  }
}