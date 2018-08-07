import * as React from 'react'

import { storiesOf, StoryDecorator } from '@storybook/react'
import {
  withKnobs,
  text,
  number,
  boolean,
  object,
} from '@storybook/addon-knobs/react'

import { UserSelectedTheme } from 'themes/UserSelectedTheme'

import * as actions from 'store/actions'
import { MtpMessage } from 'store/mtproto'

console.log(actions)

import { enhanced as ChatFooter } from 'containers/ChatFooter'
import { shortPreview } from 'containers/ChatListItem'

import { App } from 'components/App'
import { AutoSizeTextarea } from 'components/AutoSizeTextarea'
import { ChatListSearch } from 'components/ChatListSearch'
import { ChatListItem } from 'components/ChatListItem'
import { PeerPhotoEmpty, PeerPhoto } from 'components/PeerPhoto'
import { ChatList } from 'components/ChatList'

const ThemeDecorator: StoryDecorator = storyFn => (
  <UserSelectedTheme theme={{ meta: {}, pairs: [] }}>
    {storyFn()}
  </UserSelectedTheme>
)

storiesOf('Components/components', module)
  .addDecorator(withKnobs)
  .addDecorator(ThemeDecorator)
  .add('App', () => <App />)
  .add('AutoSizeTextarea', () => <AutoSizeTextarea />)

storiesOf('Components/Chat', module)
  .addDecorator(withKnobs)
  .addDecorator(ThemeDecorator)
  .add('ChatList', () => {
    return (
      <ChatList
        loading={boolean('loading', false)}
        hasMore={boolean('hasMore', true)}
        loadMore={() => console.log('load more')}
      >
        body
      </ChatList>
    )
  })
  .add('ChatFooter', () => (
    <ChatFooter
      selected={0}
      sendMessage={(id, text) => {
        console.log(id, text)
        return () =>
          new Promise(resolve => {
            console.log(id, text)
            resolve()
          })
      }}
    />
  ))
  .add('ChatListSearch', () => <ChatListSearch />)
  .add('ChatListItem', () => {
    const message = {
      from_id: 1,
      media: {},
      date: Date.now(),
      message: 'message',
      to_id: {
        user_id: 0,
      },
    } as MtpMessage

    return (
      <ChatListItem
        id={number('id', 123)}
        name={text('name', 'name')}
        isYou={boolean('isYou', true)}
        click={() => console.log('chat list item')}
        selected={boolean('selected', false)}
        previewName={text('previewName', 'preview name')}
        unreadCount={number('unreadCount', 10)}
        message={message}
        shortPreview={shortPreview(message)}
      />
    )
  })

storiesOf('Components/Photo', module)
  .addDecorator(ThemeDecorator)
  .add('PeerPhotoEmpty', () => <PeerPhotoEmpty />)
  .add('PeerPhoto', () => <PeerPhoto id={'default'} />)
