# Babel
## Babel 是什么？
### Babel 是一个 JavaScript 编译器
Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性 （通过引入第三方 polyfill 模块，例如 core-js）
* 源码转换（codemods）

### 可调试
由于 Babel 支持 Source map，因此你可以轻松调试编译后的代码。

## 使用指南
#### 核心库
Babel 的核心功能包含在 **@babel/core** 模块中

#### CLI 命令行工具
**@babel/cli** 是一个能够从终端（命令行）使用的工具

#### 插件和预设（preset）
代码转换功能以插件的形式出现，插件是小型的 JavaScript 程序，用于指导 Babel 如何对代码进行转换；**@babel/preset-env**，如果不进行任何配置，上述 preset 所包含的插件将支持所有最新的 JavaScript （ES2015、ES2016 等）特性。



## Babel编译过程
> parse（把源码转成AST抽象语法树） -> transform（遍历AST，调用各种transform插件对AST进行增删改）-> generate（把转换后的AST打印成目标代码，并生成sourcemap）

### AST
#### 常见的AST
* Litral ->> 字面量
* Identifier ->> 标识符，变量名、属性名、参数等各种声明和引用的名字，都是identifier
* Statement ->> 语句，是可以独立执行的单位
* Declaration ->> 声明语句，在作用域内声明一个变量、函数、class、import、export等
* Expression ->> 表达式，执行完以后有返回值
* Program & Directive ->> program是代表整个程序的节点，他有body属性代表程序体，存放statement数组，就是具体执行的语句的集合。还有directives属性，存放Directive节点，比如‘use strict’这种指令会使用Directive节点标识
* File & Comment ->> babel的AST最外层节点是File，他有program、comments、tokens等属性，分别存放Program程序体、注释、token等，是最外层节点
> 注释分为块注释和行内注释，对应CommentBlock和CommentLine节点

#### AST可视化查看工具
链接[www.astexplorer.net]

#### AST的公共属性
* type：AST的节点类型
* start、end、loc：
* leadingComments、innserComments、trailingComments
* extra