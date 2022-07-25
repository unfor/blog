***
***

### cross-env 作用：
它是运行跨平台设置和使用环境变量的脚本

> 当我们使用 NODE_ENV = production
来设置环境变量的时候，大多数windows命令会提示将会阻塞或者异常，或者，windows不支持NODE_ENV=development的这样的设置方式，会报错。因此cross-env 出现了。我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。也就是说 cross-env能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的。

### cross-env 安装：(仅开发使用 --save-dev)

```bash
npm 安装：
npm install cross-env --save-dev
yarn安装：
yarn add cross-env --dev
```
> NODE_ENV=development / production 则是在打包时配置环境变量，用来区分开发环境 / 正式环境

### 使用如下：
```bash
"scripts": {
  "dev": "NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
},
```

而上面的代码在window / mac 环境中并不兼容， windows不支持NODE_ENV=development的这样的设置方式，所以需要引入cross-env库实现兼容：
```bash
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "cross-env NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
}
```

而在代码中可以通过 ``process.env.NODE_ENV`` 来取这个变量