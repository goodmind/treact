export type IActiveChat = number;
export interface IActiveChatAction {
  type: 'activeChat/SET_ACTIVE_CHAT';
  payload: IActiveChat;
}
