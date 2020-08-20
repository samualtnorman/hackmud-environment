module.exports = {
  root: true,
  plugins: [
    "hackmud2",
  ],
  extends: "plugin:hackmud2/recommended",
  // add your custom rules here
  rules: {
    semi: [
      'warn',
      'always',
    ],
    curly: 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'keyword-spacing': [
      'warn',
      {
        before: true,
        after: true,
      },
    ],
    'no-console': 'off',
  },
};