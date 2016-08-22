module.exports = {
    'plugins': ['promise'],
    'env': {
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module'
    },
    'rules': {
        'no-console': [
            'error', { allow: ['info', 'warn', 'error'] }
        ],
        'indent': [
            'error', 4, {'SwitchCase': 1}
        ],
        'linebreak-style': [
            'error', 'unix'
        ],
        'quotes': [
            'error', 'single'
        ],
        'semi': [
            'error', 'always'
        ],
        'promise/param-names': 2,
        'promise/always-return': 2,
        'promise/always-catch': 2
    },
    'globals': {
        'SM': false,
        'randomString': false,
        'authenticated': false,
        'window': false,
        'mongooseErrMessage': false
    }
}