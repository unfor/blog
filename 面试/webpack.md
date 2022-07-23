##
## 插件解读
### Webpack SplitChunksPlugin
#### chunks
* 来源：
    * Webpack中的`entry`，每一个`entry`配置后会生成一个`chunk`
    * 动态`Import`一个模块默认也会生成独立的`chunk`
> 而这引入一个问题，如果项目中仅有一个入口，同时项目的大部分模块构建都在少部分的chunks里面，则无法减小chunk的体积 ->> 于是，有了`SplitChunksPlugin`
> 因为`SplitChunksPlugin`目前是内置在 Webpack 构建流程中的插件，只要我们不设置
`optimization.splitChunks` 为 `false`，那么 Webpack 在生产模式构建的时候（设置 `mode` 选项为 `production`）就有<b>默认的策略</b>帮我们做 `split chunks` 的工作

* 默认策略：(主要是通过`cacheGroups`配置完成的(优先级最高))
    * 从 chunks 类型来看，默认情况下只有按需引入的即值为 async 的模块才会被 split chunks 优化；
    * chunks 分割的最小体积 minSize 为 20000字节；
    * 最大的异步请求数 maxAsyncRequests 和最大的初始化加载 chunks 数量 maxInitialRequests 都为 30，注意这个配置，这里 Webpack 是按 HTTP2 的协议场景去设置这个默认值的，如果你的项目还在用 HTTP1.0 需要注意下；
    * cacheGroups 有两个默认的配置项，默认情况下，所有从 node_modules 引用的模块会优先打包成一个 chunk；如果是非 node_modules 模块，则至少要被其它模块引用两次才会分割为一个 chunk

* 默认策略代码:
```TypeScript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,//最大异步请求数
      maxInitialRequests: 30, //最大初始化加载chunks数量
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2, //最小分割引用次数，当模块被至少2个模块引用时，会被打包成chunk
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

---
###
#### scope hoisting
> 原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突对比
通过scope hoisting可以减少函数声明代码和内存开销

#### 动态import
> 需要安装babel插件 `@babel/plugin-syntax-dynamic-import`
TODO: 1.是否有更快捷的方式开启动态import功能？ 2.在umi项目中，又是如何开启动态import的？ 3.引用了这个插件以后，import可以写在函数体中？

#### SSR

### 优化打包速度
#### webpack内置的stats
```bash
    "build:stats": "webpack --config webpack.prod.js --json > stats.json"
```

#### loader plugin速度分析
`speed-measure-webpack-plugin`

#### bundle分析
`webpack-bundle-analyzer`

#### 多进程打包
`thread-loader`  `HappyPack`

#### 并行压缩

#### dll
> 将基础库提前打包，加快build速度

#### 缓存
> 目的：提升二次构建速度
`babel-loader` `hard-source-webpack-plugin`或者`cache-loader`

#### 缩小构建目标

#### 图片压缩
`image-webkacp`

#### PurityCSS
