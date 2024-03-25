module.exports = {
    env: {
       browser: true,
       es2021: true,
    },
    extends: [
       'eslint:recommended',
       'plugin:react-hooks/recommended',
       'plugin:@typescript-eslint/recommended',
       'plugin:react/recommended',
       "plugin:cypress/recommended"
    ],
    overrides: [
       {
          env: {
             node: true,
          },
          files: ['.eslintrc.{js,cjs}'],
          parserOptions: {
             sourceType: 'script',
          },
       },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'cypress'],
    rules: {
       indent: ['error', 3, { SwitchCase: 1 }],
       quotes: ['error', 'single'],
       semi: ['error', 'always'],
       'react/prop-types': 'off',
    },
 };
 