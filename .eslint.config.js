import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import * as tsResolver from "eslint-import-resolver-typescript";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.next/**",
      "**/out/**",
      "**/public/**",
      "**/generated/**",
      "**/*.min.js",
      "**/*.min.css",
      "*/vite.config.ts", // ← исправлено
      "*/tsconfig*.json", // ← исправлено
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: [
            "./backend/tsconfig.json", // ← исправлено
            "./webapp/tsconfig.json", // ← исправлено
          ],
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        },
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },

  // Переопределения для бэкенда
  {
    files: ["backend/**/*.ts"], // ← исправлено
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Переопределения для фронтенда
  {
    files: ["webapp/**/*.{ts,tsx}"], // ← исправлено
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // Переопределения для тестов
  {
    files: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
];
