let path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

let HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/app/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/app/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['babel-plugin-transform-object-rest-spread']
        }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  output: {
    filename: 'script.js',
    path: path.join(__dirname, '/build')
  },
  plugins: [HTMLWebpackPluginConfig],
  watch: true
}
