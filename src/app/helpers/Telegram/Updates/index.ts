import { invoke } from '..';
import { HttpLoopEmitter } from './HttpLoopEmitter';

// const UPDATE_INTERVAL = 1000;
let instance;

interface IState {
  pts: number;
  date: number;
  qts: number;
  unread_count: number;
  seq: number;
  toPrintable: Function;
}

class Updates {
  public pts: number;
  public date: number;
  public qts: number;
  public unreadCount: number;
  public seq: number;

  public emitter = new HttpLoopEmitter();

  private setState(state: Partial<IState>) {
    if (!state) {
      return;
    }

    this.pts = state.pts || this.pts;
    this.date = state.date || this.date;
    this.qts = state.qts || this.qts;
    this.unreadCount = state.unread_count || this.unreadCount;
    this.seq = state.seq || this.seq;

    console.log('set state', state.toPrintable ? state.toPrintable() : state);
  }

  public onUpdate = (onUpdate) => (update) => {
    const processOpts = {
      date: update.date,
      seq: update.seq,
      seqStart: update.seq_start,
    };

    switch (update.getTypeName()) {
      case 'Telegram.type.UpdatesTooLong':
      case 'mtproto.type.New_session_created':
        this.getDifference();
        break;

      case 'Telegram.type.UpdateShort':
        console.log(processOpts);
        break;

      case 'Telegram.type.UpdateShortMessage':
      case 'Telegram.type.UpdateShortChatMessage':
        console.log(processOpts);
        break;

      case 'Telegram.type.UpdatesCombined':
      case 'Telegram.type.Updates':
        console.log(update.users.list, update.chats.list, update.updates.list, processOpts);
        break;

      default:
        onUpdate(update);
        break;
    }
  }

  public start(onUpdate) {
    console.log('start updates');

    return new Promise((resolve, reject) => {
      invoke<any>('account.updateStatus', { offline: false }).then(() => {
        this.emitter.registerOnUpdates(this.onUpdate(onUpdate));

        invoke<any>('updates.getState').then(state => {
          this.setState(state);

          this.emitter.on('error', err => {
            console.error('http poll error', err, err.stack);
          });
          this.emitter.httpPoll();

          setTimeout(resolve, 100);
        });
      })
      .catch(reject);
    });
  }

  public stopEmitter() {
    this.emitter.unregisterOnUpdates(this.onUpdate);
  }

  public stop() {
    if (this.emitter.started) {
      console.log('stop updates');
      this.emitter.stopHttpPollLoop();
      return invoke<any>('account.updateStatus', { offline: true });
    }
  }

  public getDifference() {
    invoke<any>('updates.getDifference', { pts: this.pts, date: this.date, qts: -1 }).then(result => {
        console.log('getDifference', result.getTypeName && result.getTypeName(), result);

        if (typeof result !== 'boolean') {
          if (result.getTypeName() === 'Telegram.type.updates.DifferenceEmpty') {
              console.debug('apply empty diff', result);
              this.setState({date: result.date, seq: result.seq});
              return false;
          }

          const nextState = result.intermediate_state || result.state;
          console.debug('apply next state', nextState);
          this.setState(nextState);

          if (result.getTypeName() === 'Telegram.type.updates.DifferenceSlice') {
              this.getDifference();
          }
        }
    }).catch(err => {
        console.error('getDifference error: ', this, err);
    });
  }

  public static getInstance() {
    console.log('getInstance', instance);
    instance = instance || new Updates();
    return instance;
  }
}

export { Updates }
