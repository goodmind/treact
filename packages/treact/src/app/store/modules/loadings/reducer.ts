import { F, T } from 'ramda'
import { chats } from 'store/events'
import { chatList } from './shape'

const { getDialogs } = chats

chatList
  .on(getDialogs, T)
  .on(getDialogs.done, F)
