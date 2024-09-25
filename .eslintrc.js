module.exports =
  // REF: https://github.com/vasilestefirta/react-native-eslint-prettier-example

  {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
    plugins: ['react', 'react-native'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'react/function-component-definition': 'off',
      'no-param-reassign': 'off',
      'react/prop-types': 'off',
      'global-require': 'off',
      'react/jsx-props-no-spreading': 'off',
      'arrow-body-style': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-unstable-nested-components': 'off',
      'import/no-cycle': 'off',
      'no-underscore-dangle': 'off',

      // allow .js files to contain JSX code
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

      // prevent eslint to complain about the "styles" variable being used before it was defined
      'no-use-before-define': ['error', { variables: false }],

      // enforce a maximum of two styles for inline styles
      'react-native/no-inline-styles': 'error', // Add this line

      // enforce a maximum file length of 500 lines
      'max-lines': ['error', { max: 500 }],

      'import/no-extraneous-dependencies': 'off',
    },
  };
