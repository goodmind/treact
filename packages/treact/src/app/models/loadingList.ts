export type ILoadingList = boolean;
export interface ILoadingListAction {
  type: 'loadingList/UPDATE_LOADING_LIST';
  payload: ILoadingList;
}
