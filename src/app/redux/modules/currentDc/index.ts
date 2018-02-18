import { AUTH } from 'actions'
import { createReducer } from 'redux-act'

export const currentDcReducer = createReducer<number | null>({
  [AUTH.SIGN_IN.DONE]: (_, { dcID }) => dcID,
  [AUTH.LOG_OUT.DONE]: () => null,
}, null)
