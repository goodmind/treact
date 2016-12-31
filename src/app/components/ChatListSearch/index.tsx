import * as React from 'react';

class ChatListSearch extends React.Component<any, any> {
  public render() {
    const s = require('./style.css');
    return (
      <div className={s.chatlistsearch}>
        <input type="text" className={s.search} placeholder="Search" />
        <div className={s.searchButton} />
      </div>
    );
  }
}

export { ChatListSearch }
