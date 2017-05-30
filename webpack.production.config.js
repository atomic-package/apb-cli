"use strict";
var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: __dirname + "/packages/index.ts",
  output: {
    filename: "packages/dist/index.js",
    path: __dirname + "/"
  },
  target: "node",
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ],
  node:{
    fs: 'empty'
  }
};
