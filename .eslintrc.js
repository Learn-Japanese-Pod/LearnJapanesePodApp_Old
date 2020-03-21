module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    },
  },
  plugins: [
    "react-hooks"
  ],
  rules:  {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": "off",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5",
        "bracketSpacing": true,
        "jsxBracketSameLine": true
      }
    ],
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      }
    }
  ]
};
