import getPlugins from './plugins';
import loaders from './loaders';

const paths = require('./paths');

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PROD = ENV === 'production';

const plugins = getPlugins(PROD);

const entry = {
  polyfill: ['babel-polyfill'],
  vendor: [
    'react-hot-loader/patch',
    'react',
    'react-dom',
    'styled-components',
  ],
  main: DEV
    ? [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?name=client',
        paths.entryCss,
        paths.resetCss,
        paths.entry,
      ]
    : [paths.entryCss, paths.resetCss, paths.entry],
};

export default {
  name: 'client',
  target: 'web',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    minimize: PROD,
    runtimeChunk: true,
    splitChunks: { chunks: 'all' },
  },
  entry,
  devtool: 'inline-source-map',
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: 'static/[name].js',
    sourceMapFilename: 'static/[name].js.map',
    chunkFilename: 'static/[id].chunk.js',
  },
  module: {
    rules: loaders,
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
      '.css',
      '.scss',
    ],
  },

  plugins: [...plugins],
};
