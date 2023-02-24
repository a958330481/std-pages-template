# std-pages-template  

基于webpack5+antd+mobx+react+ts+git-flow 的多页面脚手架

## 目录结构

```Text
├── build                   // webpack配置
│   ├── webpack.base.js     // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
|   └── index.html          // 入口html页面
├── src                     // src开发目录
│   ├── assets              // 静态资源
│   ├── components          // 公共组件
│   ├── pages               // 具体业务页面
│   ├── services            // axios服务等相关
|   |   ├── apis            // 业务接口
|   |   ├── interfaces      // 业务接口返回数据结构定义
|   |   ├── request.ts      // axios封装
│   ├── stores              // 全局公共 mobx store
│   ├── utils               // 工具库/通用函数
│   └── index.tsx           // 项目入口文件
├── .babelrc                // babel配置
├── .editorconfig           // 项目格式配置
├── .eslintrc.js            // ESLint配置
├── .commitlintrc.js        // commitlint配置
├── .gitignore              // git 忽略配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明
```

## 启动开发环境

```shell
yarn start
```

## 项目打包

```shell
yarn build
```

## 项目发布

- 先本地执行`yarn release`,升级`版本号`和`CHANGELOG.md`并提交

- 然后在发布平台发布
