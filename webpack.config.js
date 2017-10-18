const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './app/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react', 'stage-0']}}
    ]
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  }

};
