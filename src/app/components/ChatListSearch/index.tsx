import styled from 'glamorous';
import * as React from 'react';

import * as pencil from './pencil.png';
import * as search from './search.png';

const SearchButton = styled.div({
  position: 'absolute',
  background: `url(${pencil}) no-repeat 9px 10px`,
  backgroundSize: '15px',
  cursor: 'pointer',
  height: '32px',
  right: '10px',
  width: '36px',
  ':active': {
    marginTop: '1px',
  },
});

const SearchInput = styled.input({
  background: `url(${search}) no-repeat 10px 7px`,
  backgroundColor: '#f2f2f2',
  backgroundSize: '15px',
  borderRadius: '3px',
  border: '2px solid #f2f2f2',
  color: '#000',
  flex: '1 100%',
  fontSize: '13px',
  height: '32px',
  outline: 'none',
  padding: '0 35px 0 35px',
  transition: 'all .15s linear',
  width: '100%',
  '::placeholder': {
    color: '#999',
  },
  '&:active, &:focus': {
    backgroundColor: '#fff',
    borderColor: '#54c3f3',
  },
});
SearchInput.defaultProps = {
  type: 'text',
  placeholder: 'Search',
};

const Panel = styled.div({
  position: 'relative',
  display: 'flex',
  padding: '11px',
});

const ChatListSearch = () => (
  <Panel>
    <SearchInput />
    <SearchButton />
  </Panel>
);

export { ChatListSearch };
