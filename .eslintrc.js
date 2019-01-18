module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    globals: {
        "postM": true,
        "require": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        /* "indent": [
            "error",
            "tab"
        ], */
        /* "linebreak-style": [
            "error",
            "windows"
        ], */
        quotes: ["error", "backtick", {
            "allowTemplateLiterals": true
        }],
        "semi": [
            "error",
            "always"
        ]
    }
};