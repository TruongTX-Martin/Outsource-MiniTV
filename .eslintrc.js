module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
