const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const env = process.env.NODE_ENV
const devServerPort = Number(process.env.SERVER_PORT) + 1

let devtool
let publicPath

if (env === 'production') {
  devtool = 'cheap-inline-source-map'
  publicPath = '/'
} else {
  devtool = 'eval'
  publicPath = `http://localhost:${devServerPort}/`
}

module.exports = {
  devtool,
  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../src/index')
  ],
  output: {
    path: path.join(__dirname, '../build'),
    publicPath,
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules')
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlPlugin({
      template: path.join(__dirname, '../src/index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      __SERVER_HOST__: JSON.stringify(process.env.SERVER_HOST),
      __SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    port: devServerPort,
    hot: true,
    inline: true,
    progress: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  }
}
