module.exports = {
  extends: [
    'standard',
    'plugin:import/errors',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  env: {
    es6: true,
    browser: true,
  },
  globals: {
    environment: true,
  },
  rules: {
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'node/no-missing-import': 'error',
  },
};
