import * as React from 'react'

import { storiesOf } from '@storybook/react'
import * as actions from 'store/actions'

console.log(actions)

import { App } from 'components/App'

storiesOf('Components', module).add('App', () => <App />)
