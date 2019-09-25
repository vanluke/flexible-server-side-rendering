const path = require('path');

const getAppFiles = file => path.resolve(__dirname, '../..', file);

module.exports = {
  template: getAppFiles('public/index.html'),
  dist: getAppFiles('dist'),
  node_modules: path.resolve(__dirname, '../..', 'node_modules'),
  config: getAppFiles('config'),
  entry: getAppFiles('src/client/render.tsx'),
  serverEntry: getAppFiles('src/server/index.ts'),
  srcServer: getAppFiles('src/server'),
  src: getAppFiles('src/client'),
  root: getAppFiles('src'),
  templates: getAppFiles('src/templates/*.pug'),
  favicon: getAppFiles('config/assets/icons8-house-stark-50.png'),
  entryCss: getAppFiles('src/client/fonts.css'),
  resetCss: getAppFiles('src/client/reset.css'),
  eslint: getAppFiles('.eslintrc.js'),
};
