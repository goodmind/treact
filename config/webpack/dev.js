var path = require('path');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  debug: true,

  node: {
    fs: 'empty',
    net: 'empty'
  },

  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app', 'app/redux'],
    alias: {
      'browserify-zlib': 'browserify-zlib-next'
    }
  },

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/client.tsx',
      './src/vendor/main.ts'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-helmet',
      'redux',
      'ramda',
      'redux-connect',
      'redux-persist',
      'redux-thunk',
      'jsbn',
      '@goodmind/telegram-tl-node',
      '@goodmind/telegram-mt-node',
      'telegram-js'
    ]
  },

  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].js',
    pathinfo: true
  },

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'react-hot!ts'
      },
      {
        test: /\.jsx$/,
        loader: 'babel?presets[]=es2015'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve('./src/app'),
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve('./src/app'),
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url?limit=1000&name=images/[hash].[ext]'
      }
    ]
  },
  postcss: function () {
    return [
      stylelint({ files: '../../src/app/*.css' }),
      postcssNext(),
      postcssAssets({ relative: true })
    ];
  },

  tslint: {
    failOnHint: true
  },

  plugins: [
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        DC_SERVER: JSON.stringify(process.env.DC_SERVER),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('./config/index.html'),
      inject: 'body',
    }),
  ]
};

module.exports = config;
