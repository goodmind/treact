const { resolve, join } = require('path')
const webpack = require('webpack')
const source = resolve(process.cwd(), 'src')
const build = resolve(process.cwd(), 'build')

const BabiliPlugin = require("babili-webpack-plugin")

const plugins = [
  new webpack.DllPlugin({
    name: '[name]',
    path: join(build, '[name].json')
  })
]

if (process.env.NODE_ENV === 'production')
  plugins.push(new BabiliPlugin({
    comments: false
  }))

const config = {
  context: source,
  entry: {
    React: [
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'react-redux',
      'react-helmet',
      'redux',
      'redux-act',
      'redux-connect',
      'redux-persist',
      'redux-thunk',
      'recompose',
      'reselect',
      'reselect-map'
    ],
    Vendor: [
      'ramda',
      'jsbn',
      'history',
      'classnames',
      // 'telegram-mtproto',
      'knack'
    ]
  },

  output: {
    path: build,
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins
}

module.exports = config
