import { AUTH } from 'actions'
import { createReducer } from 'redux-act'
import { MtpUser } from 'redux/mtproto'

export const currentUserReducer = createReducer<MtpUser | null>({
  [AUTH.SIGN_IN.DONE]: (_, { user }) => user,
  [AUTH.LOG_OUT.DONE]: () => null,
}, null)
