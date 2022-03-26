const path = require("path");
// const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require("webpack");
// const childProcess = require('child_process');
const banner = require("./banner.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require('connect-api-mocker');

module.exports = {
  // es6의 모듈 시스템은 아니고 node 의 모듈 시스템이다.(CommonJS)
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.resolve("./dist"), // output 디렉토리는 절대 경로명을 입력해준다. node 의 path 모듈을 가져와서 활용해준다.
    filename: "[name].js" // 번들링된 파일명, entry 에서 설정한 key 값으로 치환된다., entry 가 여러 개일 수도 있기에 output 도 여러 개가 일 수 있다. 따라서 이렇게 key 값으로 동적으로 파일명을 만들어줄 수 있다.
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    before: app => {
      app.use(apiMocker('/api', 'mocks/api'));
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/, // loader 가 처리해야될 파일들의 패턴 (정규표현식)
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader", //javascript 로 변환된 스타일 코드를 html 에 인라인 형태로 추출하여 넣기위한 로더
          "css-loader", // loader는 배열의 뒤에서부터 앞으로 실행된다.(css-loader -> style-loader)
          // "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader", // fallback 기본값이 file-loader이기 때문에 20kb 이상은 file-loader 가 처리한다.
        options: {
          // publicPath: './dist/', // 파일 로더가 처리하는 파일을 모듈로 사용했을때 경로 앞에 추가되는 문자열이다, 파일을 호출하는 측에선 dist 를 붙이고 파일을 호출할 것이다.
          name: "[name].[ext]?[hash]", // 파일 로더가 output에 복사할때 사용하는 파일 이름, [원본 파일명].[확장자]?해쉬값
          limit: 20000 // 20kb 미만의 파일은 url-loader 로 해서 base64로 변환한다.(파일을 javascript 문자열로 변환) 만약 2kb 이상일 경우 file-loader가 실행하도록 한다.
        }
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // new MyWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              // collapseWhitespace: true, // 빈칸 제거
              // removeComments: true, // 주석 제거
            }
          : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })] // javascript 에서 css 파일을 뽑아내는 과정이기에 굳이 개발환경에서는 필요없다(Javascript 파일 하나로 빌드하는 것이 더 빠르다)
      : [])
  ]
};
