import { CACHE } from 'actions';
import { Middleware } from 'redux';

const { DONE } = CACHE;
const doneType = DONE.toString();

export const batchUpdate: Middleware = ({ dispatch }) => (next) => {
  let pool: number[] = [];

  const flush = () => {
    if (pool.length === 0) return;
    const action = { type: doneType, payload: [...pool] };
    pool = [];
    return dispatch(action);
  };

  setInterval(flush, 300);

  // TODO: remove any
  // tslint:disable-next-line
  return (action: any) => {
    if (action.type === doneType && typeof action.payload === 'number') {
      pool.push(action.payload);
      return;
    }

    return next(action);
  };
};
