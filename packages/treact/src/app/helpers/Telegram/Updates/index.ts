import { invoke, client, MTProto, isReady } from '..';

function manageUpdatesListener(func, callback) {
  const emitter = this.getParser();
  console.log('managing updates...');
  emitter[func]('Telegram.type.UpdatesTooLong', callback);
  emitter[func]('Telegram.type.UpdateShortMessage', callback);
  emitter[func]('Telegram.type.UpdateShortChatMessage', callback);
  emitter[func]('Telegram.type.UpdateShort', callback);
  emitter[func]('Telegram.type.UpdatesCombined', callback);
  emitter[func]('Telegram.type.Updates', callback);
}

const registerOnUpdates = (callback) => {
  console.log('register updates');
  manageUpdatesListener.call(client.channel, 'on', callback);
};
const stopHttpPollLoop = () => null;
const httpPoll = (maxWait = 3000, waitAfter = 0, maxDelay = 0) => {
  const onCallback = (resolve, reject) => (ex, result) => {
    if (ex) {
      reject(ex);
    } else {
      resolve(result);
    }
  };

  return isReady()
    .then(() => new Promise((resolve, reject) => {
      MTProto.service.http_wait({
        props: {
          max_delay: maxDelay,
          wait_after: waitAfter,
          max_wait: maxWait,
        },
        channel: client.channel,
        callback: onCallback(resolve, reject),
      });
    }));
};

// const UPDATE_INTERVAL = 1000;
let instance;

class Updates {
  private pts;
  private date;
  private qts;
  private unreadCount;

  private setState(state) {
    this.pts = state.pts;
    this.date = state.date;
    this.qts = state.qts;
    this.unreadCount = state.unread_count;
    console.log('set state', state.toPrintable());
  }

  public start(onUpdate) {
    console.log('start updates');
    return invoke('account.updateStatus', { offline: false })
      .then(() => {
        registerOnUpdates(onUpdate);
        return invoke('updates.getState');
      })
      .then(state => {
        this.setState(state);
        return httpPoll();
      });
  }

  public stop() {
    console.log('stop updates');
    stopHttpPollLoop();
    return invoke('account.updateStatus', { offline: true });
  }

  public static getInstance() {
    instance = instance || new Updates();
    return instance;
  }
}

export { Updates }
