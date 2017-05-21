const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const copyViews = new CopyWebpackPlugin([
  { 
    from: path.resolve(__dirname, 'server', 'views'),
    to: path.resolve(__dirname, 'build', 'views'),
  },
])

const loaderPlugin = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
})

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
    keep_fnames: true,
  },
  compress: {
    screw_ie8: true,
  },
  comments: false,
})

const externals = fs
  .readdirSync('node_modules')
  .reduce(function(acc, mod) {
    if (mod === '.bin') {
      return acc
    }

    acc[mod] = 'commonjs ' + mod
    return acc
  }, {})

module.exports = [
  {
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
      loaderPlugin,
      uglifyPlugin,
    ],
  },
  {
    target: 'node',
    entry: path.resolve(__dirname, 'server', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js',
    },
    externals: externals,
    node: {
      console: false,
      global: false,
      process: false,
      __filename: false,
      __dirname: false,
      Buffer: false,
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
      copyViews,
      loaderPlugin,
      uglifyPlugin,
    ],
  },
]