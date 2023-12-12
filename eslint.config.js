import jsdoc from 'eslint-plugin-jsdoc';

export default [
    jsdoc.configs['flat/recommended'],
    {
        files: [ 'src/**/*.js', 'eslint.config.js' ],
        plugins: {
            jsdoc,
        },
        rules: {
            'array-bracket-spacing': [
                'error',
                'always',
            ],
            'camelcase': 'error',
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
