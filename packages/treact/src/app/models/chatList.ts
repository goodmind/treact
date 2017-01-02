export interface IChatList {
  loading: boolean;
  dialogs: any[];
  chats: any[];
  users: any[];
  messages: any[];
  error: any;
}
export type IChatListActions =
  'chatList/FETCH_CHAT_LIST'
    | 'chatList/FETCH_CHAT_LIST_SUCCESS'
    | 'chatList/FETCH_CHAT_LIST_FAILURE';
export interface IChatListAction {
  type: IChatListActions;
  payload: any;
}
