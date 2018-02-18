import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { ChatFooter } from './'

it('Message renders correctly', () => {
  const noop = () => null
  const tree = renderer.create(
    <ChatFooter value="Hello, world!" change={noop} submit={noop} />,
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

