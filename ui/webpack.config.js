const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spring Boot with Webpack',
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  module:{
    rules:[
        {
          test:/\.(s*)css$/,
          use:['style-loader','css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
     ]
  }
};
