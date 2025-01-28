module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ["dist", ".eslintrc.*"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/typescript",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "simple-import-sort",
    "prettier",
    "jsx-a11y",
    "eslint-plugin-import",
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "sort-imports": "off",
    "import/order": "off",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [["^\\u0000"], ["^react$"], ["^[^.]"], ["^../|^~/|^./"]],
      },
    ],

    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": "allow-with-description" },
    ],

    "@typescript-eslint/no-unused-vars": "off",

    "no-restricted-syntax": [
      "warn",
      {
        selector: "TSEnumDeclaration",
        message: "Prefer union type",
      },
    ],

    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-call": "off",
  },
};
