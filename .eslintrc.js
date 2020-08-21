module.exports = {
  root: true,
  plugins: [
    "hackmud2",
    "@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:hackmud2/recommended"
  ],
  // add your custom rules here
  rules: {
    'hackmud2/no-closure-siblings': 'off', // Only off for @autocomplete tags to work
    semi: 'off',
    curly: 'off',
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