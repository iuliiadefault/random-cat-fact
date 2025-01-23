module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'jest', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': ['error', { semi: true }],
    curly: [2, 'all'],
    quotes: ['error', 'single'],
    'react/display-name': ['off'],
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'no-console': ['error', { allow: ['warn'] }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn'],
    'jsx-a11y/no-autofocus': 0,
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^\\u0000'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^(@|app|components)(/.*|$)'],
              ['^(@|hooks|scripts)(/.*|$)'],
              ['^(@|constants|styles)(/.*|$)'],
            ],
          },
        ],
      },
    },
  ],
};
