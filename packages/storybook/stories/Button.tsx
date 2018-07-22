import * as React from 'react'

import { storiesOf } from '@storybook/react'
import * as actions from 'store/actions'

console.log(actions)

storiesOf('Button 1', module).add('with 1', () => <div>test 1</div>)
