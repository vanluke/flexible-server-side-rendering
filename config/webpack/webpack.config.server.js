import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import loaders from './loaders';

const paths = require('./paths');

export default {
  name: 'server',
  entry: [paths.serverEntry],
  mode: 'development',
  output: {
    path: paths.dist,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: [paths.node_modules],
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ],
  },
  target: 'node',
  module: {
    rules: [...loaders],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: [
    nodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
};
