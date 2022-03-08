module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    globals: {
        "postM": true,
        "require": true,
        "exports": true,
        "_": true,
        "__dirname": true
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
        quotes: ["error", "double", {
            "allowTemplateLiterals": true
        }],
        "semi": [
            "error",
            "always"
        ]
    }
};