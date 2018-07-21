//@flow

import {
  combine,
  createEvent,
  createStore,
  Domain,
  Event,
  Store as EffectorStore,
} from 'effector'
import { Middleware, Store } from 'redux'

export function fromReduxStore<T>(reduxStore: Store<T>): EffectorStore<T> {
  const mirrorDefaultState = Object.assign({}, reduxStore.getState())
  const mirrorStore = createStore(mirrorDefaultState)
  reduxStore.subscribe(() => {
    //@ts-ignore
    mirrorStore.setState(Object.assign({}, reduxStore.getState()))
  })

  return mirrorStore
}

const events = new Map()

export function asEvent<T>(action: { type: string, payload: T }): Event<T> {
  if (events.has(action.type)) {
    return events.get(action.type)
  }
  const event: Event<T> = createEvent(action.type)
  events.set(action.type, event)
  return event
}

export function asAction<T>(event: Event<T>, payload: T): { type: string, payload: T } {
  return {
    type: event.getType(),
    payload,
  }
}

export function effectorMiddleware(): Middleware {
  // tslint:disable-next-line no-any
  return store => next => (action: any) => {
    const isAction = (v: {
      type?: string
      payload?: mixed,
    }): v is { type: string; payload: mixed } =>
      typeof v === 'object' &&
      v !== null &&
      typeof v.type === 'string' &&
      v.hasOwnProperty('payload')

    if (isAction(action)) {
      const newEvent = asEvent(action)
      newEvent(action.payload)
      console.log('dispatching', { newEvent })
    }

    const result = next(action)
    return result
  }
}

export function combineStores<A, B, R>(
  reduxStore: Store<A>,
  effectorStore: EffectorStore<B>,
  fn: (a: A, b: B) => R,
): EffectorStore<R> {
  const mirrorStore = combine(fromReduxStore(reduxStore), effectorStore, fn)

  mirrorStore.dispatch = reduxStore.dispatch

  return mirrorStore
}

export function connectDomain<A>(domain: Domain, reduxStore: Store<A>) {
  console.warn('connect domain')

  domain.onCreateDomain(domain => {
    console.warn('domain created', domain)
  })

  domain.onCreateEvent(event => {
    console.warn('event created', event)
    event.watch(payload => {
      reduxStore.dispatch(asAction(event, payload))
    })
  })
}
