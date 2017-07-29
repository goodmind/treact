import { ComponentClass } from 'react'

declare module 'universal-router' {
  export interface ActionResult extends ComponentClass {
  }

  export interface Route {
    guard?: boolean;
  }
}
