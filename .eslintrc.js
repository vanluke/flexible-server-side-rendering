module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/destructuring-assignment': 0,
    'prefer-destructuring': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  globals: {
    environment: true,
  },
};
