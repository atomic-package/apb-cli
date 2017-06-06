"use strict";
var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/packages/index.ts",
  output: {
    filename: "packages/dist/index.js",
    path: __dirname + "/public/"
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  node:{
    fs: 'empty'
  }
};