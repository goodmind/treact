import * as React from 'react';
import * as s from './style.css';

const ChatListSearch = () => (
  <div className={s.chatlistsearch}>
    <input type="text" className={s.search} placeholder="Search" />
    <div className={s.searchButton} />
  </div>
);

export { ChatListSearch };
