export type IAuthKey = any;
export interface IAuthKeyAction {
  type: 'authKey/SET_AUTH_KEY';
  payload: IAuthKey;
}
