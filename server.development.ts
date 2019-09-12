import * as webpack from 'webpack';
import * as express from 'express';

const HMR = (app: express.Application) => {
  const devWebpackConfig = require('./config/webpack.config.development');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(devWebpackConfig);
  const clientConfig = devWebpackConfig.find(
    (config: webpack.Configuration) => config.name === 'client'
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      reload: true,
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      noInfo: true,
      hot: true,
      publicPath: clientConfig.output.publicPath,
    })
  );

  return app;
};

export default HMR;
