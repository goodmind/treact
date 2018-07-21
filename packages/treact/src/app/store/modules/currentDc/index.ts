import { createReducer } from 'redux-act'
import { AUTH } from 'store/actions'

const currentDc = createReducer<number | null>({}, null)
  .on(AUTH.SIGN_IN.DONE, (_, { dcID }) => dcID)
  .on(AUTH.LOG_OUT.DONE,  () => null)

export default currentDc
