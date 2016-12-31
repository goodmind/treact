export interface IAuth {
  authenticated: boolean;
  loading: boolean;
  phoneNumber: string;
  phoneCodeHash: string;
  phoneCode: string;
  passwordSalt: string;
  error: any;
}
export type IAuthActions =
  'auth/SET_AUTH_KEY'
    | 'auth/SEND_CODE'
    | 'auth/SEND_CODE_SUCCESS'
    | 'auth/SEND_CODE_FAILURE'
    | 'auth/SIGN_IN'
    | 'auth/SIGN_IN_SUCCESS'
    | 'auth/SIGN_IN_FAILURE'
    | 'auth/GET_PASSWORD'
    | 'auth/GET_PASSWORD_SUCCESS'
    | 'auth/GET_PASSWORD_FAILURE';
export interface IAuthAction {
  type: IAuthActions;
  payload: Partial<IAuth> & {key: any, serverSalt: any};
}
