const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

// const injectIndex = new HtmlWebpackPlugin({
//   title: 'react authentication',
//   filename: 'index.html',
//   inject: 'body',
// })

module.exports = {
  entry: path.resolve(__dirname, 'client'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ],
        },
      }
    ],
  },
  // plugins: [
  //   injectIndex,
  // ],
}