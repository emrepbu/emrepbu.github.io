import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'astro/no-set-html-directive': 'off'
    }
  },
  prettier,
  {
    ignores: [
      'dist/**',
      '.output/**',
      'node_modules/**',
      '*.log',
      '.env*',
      '.cache/**',
      '.astro/**',
      '.DS_Store',
      'coverage/**'
    ]
  }
]
