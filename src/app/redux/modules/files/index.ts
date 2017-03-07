import { combineReducers } from 'redux';

import locations from './locations';
import status from './status';

const reducer = combineReducers({
  locations,
  status,
});

export { Store as StatusStore, Status as FileStatus } from './status';

export default reducer;
