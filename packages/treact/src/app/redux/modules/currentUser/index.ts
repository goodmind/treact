import { ICurrentUser, ICurrentUserAction } from 'models/currentUser';

export const SET_CURRENT_USER = 'currentUser/SET_CURRENT_USER';

const initialState: ICurrentUser = null;

export function currentUserReducer(state = initialState, action: ICurrentUserAction) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}

export function setCurrentUser(user: ICurrentUser) {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
}
