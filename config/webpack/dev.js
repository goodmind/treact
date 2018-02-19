const { resolve, join } = require('path');
const webpack = require('webpack');
const source = resolve(process.cwd(), 'src');
const build = resolve(process.cwd(), 'build');

const reactDll = require(join(build, 'React.json'));
const vendorDll = require(join(build, 'Vendor.json'));
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  devtool: 'source-map',
  cache: true,
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: build,
    publicPath: '/',
    port: 8889
  },
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8889',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client.tsx',
    './vendor/main.ts'
  ],

  plugins: [
    // new ManifestPlugin({
    //   fileName: '../manifest.json'
    // }),
    new webpack.DllReferencePlugin({
      context: source,
      manifest: reactDll
    }),
    new webpack.DllReferencePlugin({
      context: source,
      manifest: vendorDll
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        DC_SERVER: JSON.stringify(process.env.DC_SERVER),
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve(process.cwd(), 'tsconfig.json'),
      memoryLimit: 4096,
    }),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.bundle.js'
    // }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
    // new webpack.ProgressPlugin((percentage, msg) =>
    //   console.log((percentage * 100).toFixed(), msg))
    // new HtmlWebpackPlugin({
    //   template: resolve('./config/index.html'),
    //   inject: 'body',
    // }),
  ]
};

module.exports = config;
