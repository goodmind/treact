// Type definitions for universal-router
// Project: https://github.com/kriasoft/universal-router
// Definitions by: goodmind <https://github.com/goodmind>
// Definitions: https://github.com/goodmind/treact

import { ComponentType } from 'react'

declare module 'universal-router' {
  export interface ActionResult {
    type: ComponentType<any>
  }

  export interface Route {
    guard?: boolean;
  }
}
