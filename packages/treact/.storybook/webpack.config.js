const { resolve, join } = require('path')
const main = resolve(__dirname, '../')
const source = resolve(main, 'src')
const app = resolve(source, 'app')
const tsconfig = resolve(__dirname, 'tsconfig.json')

const webpack = require('webpack')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

// TODO: unify storybook config with main one
console.log(tsconfig)

console.log(source)

module.exports = {
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig,
      memoryLimit: 4096,
      // excludeWarnings: true,
      // silent: true,
    }),
    // new ForkTsCheckerNotifierWebpackPlugin({
    //   excludeWarnings: true,
    //   alwaysNotify: true,
    // }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [source, main, app, 'store', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // loader: 'react-hot-loader!ts'
        exclude: /node_modules/,
        use: [
          'babel-loader',
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
      },
    ],
  },
}
