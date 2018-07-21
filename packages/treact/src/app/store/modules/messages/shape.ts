import { createStore } from 'effector'

import { modelDefaults } from 'helpers/reselector'
import { Slice, StoredPayload } from 'helpers/reselector.h'

export type StoreMessages = StoredPayload<Slice['messages']>

export const messages = createStore<StoreMessages>(modelDefaults)
