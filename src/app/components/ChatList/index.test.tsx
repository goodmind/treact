import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ChatList } from './';

it('ChatList renders correctly', () => {
  const noop = () => false;
  const tree = renderer.create(
    <ChatList
      loading={false}
      hasMore={false}
      loadMore={noop}>
      Hello, world!
    </ChatList>,
  ).toJSON();
  const tree2 = renderer.create(
    <ChatList
      loading={true}
      hasMore={false}
      loadMore={noop}>
      Hello, world!
    </ChatList>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
  expect(tree2).toMatchSnapshot();
});
