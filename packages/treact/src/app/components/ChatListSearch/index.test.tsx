import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ChatListSearch } from './'

it('ChatListSearch renders correctly', () => {
  const tree = renderer.create(
    <ChatListSearch />,
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
