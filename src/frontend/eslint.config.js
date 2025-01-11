import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist", ".eslintrc.cjs", "**/*.generated.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-refresh": reactRefresh,
    },
    rules: {
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
