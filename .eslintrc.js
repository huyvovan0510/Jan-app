module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'warning',
        'react-native/no-inline-styles': 'off',
        'react/no-unstable-nested-components': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
