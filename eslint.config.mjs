import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import cypress from 'eslint-plugin-cypress';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    'build',
    'cypress',
    'nginx',
    'public',
    'node_modules',
    'dist',
  ]),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'prettier',
      'plugin:cypress/recommended'
    ),
    plugins: {
      react,
      cypress,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        ...cypress.environments.globals.globals,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'linebreak-style': 'warn',
      'no-unused-vars': 'warn',
      quotes: 'off',
    },
  },
]);
