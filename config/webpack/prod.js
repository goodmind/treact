const { resolve, join } = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

const source = resolve(process.cwd(), 'src');
const build = resolve(process.cwd(), 'build');

const BabiliPlugin = require('babili-webpack-plugin');

const reactDll = require(join(build, 'React.json'));
const vendorDll = require(join(build, 'Vendor.json'));

const config = {
  bail: true,
  cache: false,
  entry: [
    'babel-polyfill',
    './client.tsx',
    './vendor/main.ts'
  ],

  plugins: [
    new ManifestPlugin({
      fileName: './manifest.json'
    }),
    new webpack.DllReferencePlugin({
      context: source,
      manifest: reactDll
    }),
    new webpack.DllReferencePlugin({
      context: source,
      manifest: vendorDll
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('production'),
        DC_SERVER: JSON.stringify(process.env.DC_SERVER),
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new BabiliPlugin({}, {
      comments: false
    })
  ]
};

module.exports = config;
