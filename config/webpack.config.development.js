require('@babel/register');
require('babel-polyfill');

const merge = require('webpack-merge');
const common = require('./webpack/webpack.config.client').default;
const server = require('./webpack/webpack.config.server').default;

module.exports = [
  merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
  }),
  merge(server, {
    mode: 'development',
    devtool: 'inline-source-map',
  }),
];
