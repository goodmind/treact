import { configure } from '@storybook/react'

// const req = require.context('../', true, /.stories.tsx$/)
// console.log(req.keys())
function loadStories() {
  const test = require('../.storybook/index.stories.tsx')
  const test2 = require('../src/index2.stories.tsx')
  console.log(test)
  console.log(test2)
  // req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
