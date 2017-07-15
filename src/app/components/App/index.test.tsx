import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { App } from './';

it('App renders correctly', () => {
  const tree = renderer.create(
    <App>Hello, world!</App>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

