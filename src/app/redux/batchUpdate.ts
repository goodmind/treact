import { CACHE } from 'actions';
import { Middleware } from 'redux';

const { DONE } = CACHE;
const doneType = DONE.toString();

// TODO: remove any
// tslint:disable-next-line
export const batchUpdate: Middleware = ({ dispatch }) => (next) => {
  let pool: number[] = [];

  const flush = () => {
    if (pool.length === 0) return;
    const action = { type: doneType, payload: [...pool] };
    pool = [];
    return dispatch(action);
  };

  setInterval(flush, 300);

  return (action: any) => {
    if (action.type === doneType && typeof action.payload === 'number') {
      pool.push(action.payload);
      return;
    }

    return next(action);
  };
};
