import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import functional from 'eslint-plugin-functional';

export default [
    {
        files: [ 'src/**/*.js', 'src/**/*.ts', 'eslint.config.js' ],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { modules: true },
                ecmaVersion: 'latest',
                project: './tsconfig.json',
            },
        },
        plugins: {
            functional,
            '@typescript-eslint': ts,
        },
        rules: {
            ...ts.configs['eslint-recommended'].rules,
            ...ts.configs['recommended'].rules,
            ...functional.configs['recommended'].rules,
            ...functional.configs['external-typescript-recommended'].rules,
            '@typescript-eslint/return-await': 2,
            'functional/functional-parameters': [
                'error',
                { enforceParameterCount: false },
            ],
            'functional/immutable-data': [
                'error',
                { ignoreNonConstDeclarations: true },
            ],
            'array-bracket-spacing': [
                'error',
                'always',
                { arraysInArrays: false },
            ],
            'capitalized-comments': 'error',
            'comma-dangle': [
                'error',
                'always-multiline',
            ],
            'comma-spacing': [
                'error',
                { before: false, after: true },
            ],
            'curly': 'error',
            'eol-last': 'error',
            'indent': [
                'error',
                4,
            ],
            'jsdoc/require-param-description': 0,
            'jsdoc/require-returns-description': 0,
            'key-spacing': 'error',
            'keyword-spacing': 'error',
            'linebreak-style': [
                'error',
                'unix',
            ],
            'lines-between-class-members': [
                'error',
                'always',
                { exceptAfterSingleLine: true },
            ],
            'no-duplicate-imports': 'error',
            'no-trailing-spaces': 'error',
            'object-curly-spacing': [ 'error', 'always' ],
            'quotes': [
                'error',
                'single',
                { avoidEscape: true },
            ],
            'semi': [
                'error',
                'always',
            ],
            'space-before-blocks': 'error',
            'space-before-function-paren': [
                'error',
                'never',
            ],
        },
    },
];
