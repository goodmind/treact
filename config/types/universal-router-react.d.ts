import { ComponentType } from 'react'

declare module 'universal-router' {
  export interface ActionResult {
    type: ComponentType<any>
  }

  export interface Route {
    guard?: boolean;
  }
}
