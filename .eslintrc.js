module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "root": true,
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "indent": ["error", 2]
    }
};