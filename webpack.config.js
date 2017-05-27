"use strict";
var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/lib/index.ts",
  output: {
    filename: "index.js",
    path: __dirname + "/public/"
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.html$/, loader: "html-loader?minimize=false" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
};