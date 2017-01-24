const { resolve, join } = require('path')
const webpack = require('webpack')
const source = resolve(process.cwd(), 'src')
const build = resolve(process.cwd(), 'build')

const reactDll = require(join(build, 'React.json'))
const vendorDll = require(join(build, 'Vendor.json'))

const config = {
  devtool: 'source-map',
  cache: true,
  devServer: {
    hot: true,
    contentBase: build,
    publicPath: '/',
    port: 8889
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8889',
    'webpack/hot/only-dev-server',
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
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.bundle.js'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
    // new HtmlWebpackPlugin({
    //   template: resolve('./config/index.html'),
    //   inject: 'body',
    // }),
  ]
}

module.exports = config
