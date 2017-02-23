'use strict';
const { resolve, join } = require('path')

const source = resolve(process.cwd(), 'src')
const app = resolve(source, 'app');
const build = resolve(process.cwd(), 'build')

const reactDll = require(join(build, 'React.json'))
const vendorDll = require(join(build, 'Vendor.json'))

const isProd = process.env.NODE_ENV === 'production'

const rules = [
  {
    test: /\.tsx?$/,
    enforce: "pre",
    loader: 'tslint-loader',
    options: {
      failOnHint: true
    }
  }, {
    enforce: 'pre',
    test: /\.js$/,
    loader: "source-map-loader"
  }, {
    enforce: 'pre',
    test: /\.tsx?$/,
    loader: "source-map-loader"
  }, {
    test: /\.tsx?$/,
    // loader: 'react-hot-loader!ts'
    exclude: /node_modules/,
    use: [
      'babel-loader',
      'ts-loader'
    ]
  }, {
    test: /\.css$/,
    include: app,
    use: [
      'style-loader',
      'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
      'postcss-loader'
    ]
  }, {
    test: /\.css$/,
    exclude: app,
    loaders: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file-loader?name=fonts/[hash].[ext]'
  }, {
    test: /\.(woff|woff2)(\?.*)?$/,
    loader: 'file-loader?name=fonts/[hash].[ext]'
  }, {
    test: /\.ttf(\?.*)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
  }, {
    test: /\.svg(\?.*)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
  }, {
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
  }
]

const unifiedConfig = {
  node: {
    fs: 'empty',
    net: 'empty'
  },
  context: source,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      source,
      'app',
      'redux',
      'node_modules',
    ]
  },

  output: {
    path: build,
    publicPath: '/',
    filename: 'bundle.js',
    pathinfo: true
  },

  module: {
    rules
  }
}

const getConfig = () => isProd
  ? require('./prod')
  : require('./dev')

module.exports = Object.assign(unifiedConfig, getConfig())