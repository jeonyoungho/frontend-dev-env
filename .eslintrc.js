module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        'eslint-config-prettier' // eslint:reccomended 설정에 있는 규칙들 중에 prettier와 겹치는게 있으면 다 꺼버리는 설정
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins: [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error"
    }
};
