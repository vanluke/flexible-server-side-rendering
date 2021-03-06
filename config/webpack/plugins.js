const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const precss = require('precss');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

export default function(isProduction) {
  const plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname,
        postcss: [precss, autoprefixer],
      },
    }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
    }),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.node_modules),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
    }),
    new ExtractCssChunks(),
    new ManifestPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.templates,
        to: 'templates/[name].[ext]',
        toType: 'template',
      },
    ]),
  ];
  if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return plugins;
}
