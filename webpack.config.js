const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'routed-client'),
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
  plugins: [
  ],
}