import { createStore } from 'effector'

import { StoreList } from 'helpers/state'
import { MtpDialog } from 'store/mtproto'

import { modelDefaults } from 'helpers/reselector'

export type StoreDialogs = StoreList<MtpDialog>
export const dialogs = createStore<StoreDialogs>(modelDefaults)

