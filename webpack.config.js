const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PROD = ENV === 'production';

if (DEV) {
  module.exports = require('./config/webpack.config.development');
} else {
  module.exports = require('./config/webpack.config.production');
}
