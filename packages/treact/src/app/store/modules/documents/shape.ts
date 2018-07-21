import { createStore } from 'effector'

import { modelDefaults } from 'helpers/reselector'
import { Slice, StoredPayload } from 'helpers/reselector.h'

export type StoreDocuments = StoredPayload<Slice['documents']>

export const documents = createStore<StoreDocuments>(modelDefaults)
