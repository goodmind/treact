import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { RichText } from './';

it('RichText renders correctly without data', () => {
  const tree = renderer.create(
    <RichText
      id={1}
      entities={[]}
      text="" />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('RichText renders correctly with data', () => {
  const msg = {
    entities: [
      {
        offset: 14,
        length: 6,
        _: 'messageEntityCode',
      },
      {
        length: 5,
        offset: 25,
        _: 'messageEntityCode',
      },
      {
        length: 11,
        offset: 48,
        _: 'messageEntityUrl',
      },
      {
        length: 6,
        offset: 60,
        _: 'messageEntityUrl',
      },
    ],
    message: 'abc123 abc123 abc123 **___*_*`_** 😃😂😏😁🅱❤👅 youtube.com goo.gl must show',
  };

  const tree = renderer.create(
    <RichText
      id={2}
      entities={msg.entities}
      text={msg.message} />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
