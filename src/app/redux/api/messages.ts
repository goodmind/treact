import { invoke } from 'helpers/Telegram';
import { getInputPeerById } from 'helpers/Telegram/Peers';

import { IDispatch } from 'redux/IStore';

export function sendText(id: number, text: string) {
  return async (dispatch: IDispatch) => {
    const inputPeer = dispatch(getInputPeerById(id));
    const randomId = Math.floor(Math.random() * 0xFFFFFFFF);

    try {
      const result = await invoke<any>('messages.sendMessage', {
        peer: inputPeer,
        message: text,
        random_id: randomId,
      });
      console.debug(result._typeName, result);
    } catch (e) {
      console.error(e);
    }
  }
}
