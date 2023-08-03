module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'import/no-cycle': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-constructor-return': 'off',
    'quote-props': 'off',
    'no-param-reassign': 'off',
    'nonblock-statement-body-position': 'off',
    'prefer-arrow-callback': 'off',
    'no-lonely-if': 'off',
    'no-loop-func': 'off',
    'prefer-destructuring': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/multi-word-component-names': 'off',
    'max-len': ['error', {
      code: 2000,
    }],
  },
};
