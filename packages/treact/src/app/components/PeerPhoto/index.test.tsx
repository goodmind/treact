jest.mock('helpers/FileManager/picStore');

import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { PeerPhoto, PeerPhotoEmpty } from './';

it('PeerPhoto renders correctly', () => {
  const tree = renderer.create(
    <PeerPhoto id={1} className="" />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('PeerPhotoEmpty renders correctly', () => {
  const tree = renderer.create(
    <PeerPhotoEmpty className="" />,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

