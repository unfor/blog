## webpack

官网对`webpack`的定义是`MODULE BUNDLER`(模块打包器)，他的目的就是把有依赖关系的各种文件打包成一系列的静态资源。 请看下图



![](https://user-gold-cdn.xitu.io/2018/7/9/1647c798aea929c0?w=1920&h=960&f=png&s=298516 "")



`Webpack`的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：`main.js`），`Webpack`将从这个文件开始找到你的项目的所有依赖文件，使用`loaders`处理它们，最后打包为一个（或多个）浏览器可识别的`JavaScript`文件。

### webpack核心概念

1. 入口(entry):

`webpack`将创建所有应用程序的依赖关系图表(`dependency graph`)。entry配置项告诉Webpack应用的根模块或起始点在哪里， 入口起点告诉 `webpack` 从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将应用程序的入口起点认为是根上下文或 `app` 第一个启动文件。它的值可以是字符串、数组或对象.

```text
//webpack.config.js
const config = {
 entry: {
   app: './src/app.js',
   vendors: './src/vendors.js'
 }
};

```

2. 出口(output)

将所有的资源(`assets`)合并在一起后，我们还需要告诉 `webpack` 在哪里打包我们的应用程序。`output` 选项控制 `webpack` 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置。

```text
output: {
    path: helpers.root('dist/nonghe'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].bundle.js',
    chunkFilename: 'js/[name].[chunkhash].bundle.js'
 }

```

3. 加载器(loader)

> 

对比 Node.js 模块，webpack 模块能够以各种方式表达它们的依赖关系:

- ES2015 import 语句

- CommonJS require() 语句

- AMD define 和 require 语句

- css/sass/less 文件中的 @import 语句。

- 样式(`url(...`))或 HTML 文件(`<img src=...>`)中的图片链接

`webpack compiler`在碰到上面那些语句的时候, 通过与其相对应的`loader`将这些文件进行转换，而转换后的文件会被添加到依赖图表中。

```text
module: {
        loaders: [{
            test: /\.scss$/,
            loaders: 'style!css!sass'
        }, {
            test: /\.(png|jpg|svg)$/,
            loader: 'url?limit=20480' //20k
        }]
    }}

```

4. 插件(plugin)

`plugin` 插件，用于扩展`webpack`的功能，在`webpack`构建生命周期的节点上加入扩展`hook`为`webpack`加入功能。`Loaders`和`Plugins`常常被弄混，但是他们其实是完全不同的东西，可以这么来说，`loaders`是在打包构建过程中用来处理源文件的（js，ts, Scss，Less..），一次处理一个，通常作用于包生成之前或生成的过程中。

插件并不直接操作单个文件，它直接对整个构建过程其作用。

几款常用的插件

- **HtmlWebpackPlugin** : 这个插件的作用是依据一个简单的`html`模板，生成一个自动引用打包后的JS文件的新`index.html`。

- **Hot Module Replacement**: 它允许你在修改组件代码后，自动刷新实时预览修改后的效果。

- **CommonsChunkPlugin**: 对于有多个入口文件的, 可以抽取公共的模块,最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。

- **DefinePlugin**: 允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。

- **ExtractTextWebpackPlugin**: 它会将打包在`js`代码中的样式文件抽离出来, 放到一个单独的 `css` 包文件 (styles.css)当中, 这样`js`代码就可以和`css`并行加载.

- **UglifyjsWebpackPlugin**: 这个插件使用 UglifyJS 去压缩你的JavaScript代码。

### webpack构建流程

从启动webpack构建到输出结果经历了一系列过程，它们是：

1. 解析`webpack`配置参数，合并从`shell`传入和`webpack.config.js`文件里配置的参数，生产最后的配置结果。

1. 注册所有配置的插件，让插件监听webpack构建生命周期的事件节点，以做出对应的反应。

1. 从配置的`entry`入口文件开始解析文件构建依赖图谱，找出每个文件所依赖的文件，递归下去。

1. 在解析文件递归的过程中根据文件类型和`loader`配置找出合适的`loader`用来对文件进行转换。

1. 递归完后得到每个文件的最终结果，根据`entry`配置生成代码块`chunk`。

1. 输出所有`chunk`到文件系统。

### 代码拆分(Code Splitting)

代码拆分是 `webpack` 中最引人注目的特性之一。你可以把代码分离到不同的 `bundle` 中，然后就可以去按需加载这些文件.

1. 分离资源，实现缓存资源

- 分离第三方库(vendor) `CommonsChunkPlugin`

- 分离 CSS

1. 传统的模块打包工具（`module bundlers`）最终将所有的模块编译生成一个庞大的`bundle.js`文件。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载

- 使用 `require.ensure()` 按需分离代码require.ensure(dependencies: String[], callback: function(require), chunkName: String)

### 模块热替换(Hot Module Replacement)

模块热替换功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面。这使得你可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块.

`webpack-dev-server` 支持热模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新。

webpack-dev-server 主要是启动了一个使用 express 的 Http服务器 。它的作用 主要是用来伺服资源文件 。此外这个 Http服务器 和 client 使用了 websocket 通讯协议，原始文件作出改动后， webpack-dev-server 会实时的编译，但是最后的编译的文件并没有输出到目标文件夹, 实时编译后的文件都保存到了内存当中。

```text
"server": "webpack-dev-server --inline --progress --hot",

```

webpack-dev-server 支持2种自动刷新的方式：

- Iframe mode

- Iframe mode 是在网页中嵌入了一个 iframe ，将我们自己的应用注入到这个 iframe 当中去，因此每次你修改的文件后，都是这个 iframe 进行了 reload 。

- inline mode

- 而 Inline-mode ，是 webpack-dev-server 会在你的 webpack.config.js 的入口配置文件中再添加一个入口,

```text
module.exports = {
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:8080/',
                './src/js/index.js'
            ]
        },
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }

```

这样就完成了将 `inlinedJS`打包进 `bundle.js` 里的功能，同时 `inlinedJS`里面也包含了 `socket.io` 的 `client` 代码，可以和 `webpack-dev-server` 进行 `websocket` 通讯。

其他配置选项

- --hot 开启 `Hot Module Replacement`功能

- --quiet 控制台中不输出打包的信息

- --compress 开启gzip压缩

- --progress 显示打包的进度

﻿