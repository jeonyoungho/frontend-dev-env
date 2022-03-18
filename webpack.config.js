const path = require('path');

module.exports = { // es6의 모듈 시스템은 아니고 node 의 모듈 시스템이다.(CommonJS)
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'), // output 디렉토리는 절대 경로명을 입력해준다. node 의 path 모듈을 가져와서 활용해준다.
        filename: '[name].js' // 번들링된 파일명, entry 에서 설정한 key 값으로 치환된다., entry 가 여러 개일 수도 있기에 output 도 여러 개가 일 수 있다. 따라서 이렇게 key 값으로 동적으로 파일명을 만들어줄 수 있다.
    },
    module: {
        rules: [
            {
                test: /\.js$/, // loader 가 처리해야될 파일들의 패턴 (정규표현식)
                use: [
                    path.resolve('./my-webpack-loader.js')
                ]
            }
        ]
    }
}
