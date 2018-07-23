const { resolve } = require('path')

const main = resolve(__dirname, '../treact')
const source = resolve(main, 'src')
const app = resolve(source, 'app')
const tsconfig = resolve(__dirname, 'tsconfig.json')

const webpack = require('webpack')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// speed up hot start
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// TODO: unify storybook config with treact's one

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: app,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: app,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]',
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]',
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]',
      },
      {
        test: /\.svg(\?.*)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [source, main, app, 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig,
      memoryLimit: 4096,
      // excludeWarnings: true,
      silent: true,
    }),
    new HardSourceWebpackPlugin(),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
  },
}
