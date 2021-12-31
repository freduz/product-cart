module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  rules: {
    'eslint-disable-next-line': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'no-multi-assign': 'off',
  },
};
