const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const generateCommitInfo = require('./utils/commitInfo');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'), // 入口
  output: {
    filename: 'static/js/[name].[contenthash].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: 'babel-loader',
      },
      {
        test: /.(css|less)$/, //匹配 css 文件
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(xlsx)$/, // 匹配.xlsx文件
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@config': path.resolve(__dirname, '../config'),
      '@kdl-gis': path.resolve(__dirname, '../src/components/kdl-gis'),
    },
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV), // 注入BASE_ENV（接口环境变量）
      'process.env.COMMIT_INFO': JSON.stringify(generateCommitInfo()), // 注入COMMIT_INFO
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true, // for history html5 api
  },
};
