export type IChatList = any[];
export interface IChatListAction {
  type: 'chatList/SET_CHAT_LIST';
  payload: IChatList;
}
