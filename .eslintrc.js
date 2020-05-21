module.exports = {
    extends: [
        'airbnb-base',
        'plugin:jest/recommended',
    ],
    plugins: ['import', 'jest'],
    env: {
        node: true,
        'jest/globals': true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
        },
    },
    rules: {
        // eslints
        'arrow-parens': [ 'error', 'always' ],
        'semi': [ 'error', 'always' ],
        'quotes': [ 'error', 'single' ],
        'max-len':  ['error', {"code": 120, "tabWidth": 2, "ignoreUrls": true,  "ignoreStrings": true, "ignoreTrailingComments": true}],
        'no-unused-vars': ["error", { "argsIgnorePattern": "Sequelize" }],
        'comma-dangle': [ 'error', 'only-multiline' ],
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'never' ],
        'object-curly-newline': ["error", { "multiline": true,  }],
        'function-paren-newline': ["error", 'consistent'],
        'computed-property-spacing': [ 'error', 'never' ],
        
        // Temporary or Todo
        'arrow-body-style': ["off"],
        'implicit-arrow-linebreak': ["off"],
        'import/extensions': ['off'],
        'guard-for-in': ['off'],
        'no-restricted-syntax': ['off'],
        'radix': ['off'],
        'semi-style':['off'],
        'import/no-mutable-exports': ['off'],
        'no-restricted-globals': ['off'],
        'no-use-before-define': ['off'],
        'prefer-destructuring': ['off'],
        'array-callback-return': ['off'],
        'func-names': ['off'],
        'eqeqeq': ['off'],
        'new-cap': ['off'],
        'default-case': ['off'],
        'no-underscore-dangle': [ 'off' ],
        'global-require' : ['off'],
        'no-shadow': [ 'off' ],
        'no-param-reassign': ['off'],
        'consistent-return': ['off'],
        'camelcase': ["off"], 
     
        // custom lints
        'import/no-dynamic-require': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved ': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      },
};
