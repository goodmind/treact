/*
import { client } from '..';
import { mtproto } from 'telegram-mtproto';
import { EventEmitter } from 'events';

function manageUpdatesListener(func, callback) {
  const emitter = this.getParser();
  console.log('managing updates...');
  emitter[func]('mtproto.type.New_session_created', callback);
  emitter[func]('Telegram.type.UpdatesTooLong', callback);
  emitter[func]('Telegram.type.UpdateShortMessage', callback);
  emitter[func]('Telegram.type.UpdateShortChatMessage', callback);
  emitter[func]('Telegram.type.UpdateShort', callback);
  emitter[func]('Telegram.type.UpdatesCombined', callback);
  emitter[func]('Telegram.type.Updates', callback);
}

class HttpLoopEmitter extends EventEmitter {
  private httpPollLoop = false;
  public started = false;

  public registerOnUpdates(callback) {
    console.log('register updates');
    this.started = true;
    manageUpdatesListener.call(client.channel, 'on', callback);
  }

  public unregisterOnUpdates(callback) {
    this.started = false;
    manageUpdatesListener.call(client.channel, 'removeListener', callback);
  }

  public startHttpPollLoop(callback, maxWait, waitAfter, maxDelay) {
    this.httpPollLoop = true;
    this.httpPoll(callback, maxWait, waitAfter, maxDelay);
  }

  public stopHttpPollLoop() {
    this.httpPollLoop = false;
  }

  public httpPoll(callback?, maxWait = 3000, waitAfter = 0, maxDelay = 0) {
    if (callback) {
      this.once('httpPoll', callback);
    }

    mtproto.service.http_wait({
        props: {
          max_delay: maxDelay,
          wait_after: waitAfter,
          max_wait: maxWait,
        },
        channel: client.channel,
        callback: (ex, result) => {
          if (ex) {
            this.emit('error', ex);
          } else {
            this.emit('httpPoll', result);
            if (this.httpPollLoop) {
              this.httpPoll(callback, maxWait, waitAfter, maxDelay);
            }
          }
        },
    });
  }
}

export { HttpLoopEmitter }
*/
