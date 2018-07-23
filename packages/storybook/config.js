import { configure } from '@storybook/react'

function importAll(r) {
  r.keys().forEach(r)
}

function loadStories() {
  importAll(require.context('app', true, /\.stories\.tsx$/))
}

configure(loadStories, module)
