export interface ICurrentUser {

}
export interface ICurrentUserAction {
  type: 'currentUser/SET_CURRENT_USER';
  payload: ICurrentUser;
}
