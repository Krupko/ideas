import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/out/**',
      '**/public/**',
      '**/generated/**',
      '**/*.min.js',
      '**/*.min.css',
      '*/vite.config.ts',
      '*/tsconfig*.json',
    ],
  },

  // Базовая конфигурация
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_^',
          varsIgnorePattern: '^_!',
          caughtErrorsIgnorePattern: '^_?',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Переопределения для бэкенда
  {
    files: ['backend/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: join(__dirname, 'backend/tsconfig.json'),
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Переопределения для фронтенда (webapp)
  {
    files: ['webapp/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: join(__dirname, 'webapp/tsconfig.app.json'),
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // Запрещаем всё из backend, кроме файлов с именем input
              group: ['**/backend/**', '!**/backend/**/input'],
              message: 'Из backend разрешен импорт только файлов "input" или типов (import type).',
              // Разрешаем импорт типов (import type) из любого места backend
              allowTypeImports: true,
            },
          ],
        },
      ],
    },
  }, // Переопределения для тестов
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/__tests__/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: join(__dirname, 'tsconfig.json'),
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];
