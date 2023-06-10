
module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      react: {
        version: "detect", // React version. "detect" automatically picks the version you have installed.
      },
    },
    plugins: ["react", "prettier", "import"],
    rules: {
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx"],
        },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          bracketSpacing: true,
          arrowParens: "always",
        },
      ],
      "no-console": "warn",
      quotes: ["error", "double"],
      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?s",
        },
      ],
      "import/order": ["warn", { "newlines-between": "always" }],
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            {
              char: "'",
              alternatives: ["&apos;"],
            },
          ],
        },
      ],
      "react/prop-types": "off",
      "no-multiple-empty-lines": 2,
    },
};
