import { configure } from '@storybook/react'

// const req = require.context('../', true, /.stories.tsx$/)
// console.log(req.keys())
function loadStories() {
  const test = require('./index.stories.tsx')
  const test2 = require('components/App/index.stories.tsx')
  console.log(test)
  console.log(test2)
  // req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
