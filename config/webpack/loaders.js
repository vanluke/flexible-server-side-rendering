const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const paths = require('./paths');

export const fonts = {
  test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: 'static/fonts/[name].[hash:8].[ext]',
    },
  },
};

export const images = {
  test: /\.(jpe?g|png|gif)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        hash: 'sha512',
        digest: 'hex',
        name: 'static/images/[hash].[ext]',
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        gifsicle: {
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 4,
        },
        pngquant: {
          quality: '75-90',
          speed: 3,
        },
      },
    },
  ],
};

export const js = {
  test: /\.js$/,
  use: [
    'babel-loader',
    {
      loader: 'babel-loader',
    },
  ],
  exclude: [/node_modules/],
};

export const video = {
  test: /\.(mov|mp4|webm|ogv)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  ],
};
const sourcemap = {
  test: /\.(js|jsx|mjs)$/,
  loader: 'source-map-loader',
  enforce: 'pre',
  exclude: /node_modules/,
};

export const sass = {
  test: /\.(scss|css)$/,
  use: [
    ExtractCssChunks.loader,
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
};

export const styles = {
  test: /\.(css|scss)/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-hot-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
        sourceMap: true,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    'sass-loader',
  ],
};

export const pug = {
  test: /\.pug$/,
  use: 'pug-loader',
};

export const typescript = {
  test: /\.(ts|tsx)$/,
  loader: 'ts-loader',
  exclude: [/node_modules/, paths.config],
};

export default [sourcemap, js, typescript, styles, video, images, fonts];
