## 微任务/宏任务
* Event Queue
> 每次通过AJAX或者setTimeout添加一个异步回调时，回调函数一般会加入到Event queue中

诸如 `setTimeout`、`AJAX`等

* Job Queue
> 这是预留给promise且优先级较高的通道，代表着”稍后执行这段代码，但是在next event loop tick之前执行“。它属于ES规范

诸如 `promise`

* Next Tick
> 表示调用栈 call stack 在下一 tick 将要执行的任务。它由一个 Event queue 中的回调，全部的 job queue，部分或者全部 render queue 组成

* Event Loop
> 它会“监视”（轮询）call stack 是否为空，call stack 为空时将会由 Event Loop 推送 next tick 中的任务到 call stack 中

> 性能瓶颈： 如果调用栈 call stack 运行一个很耗时的脚本，比如解析一个图片，call stack 就会像北京上下班高峰期的环路入口一样，被这个复杂任务堵塞。主线程其他任务都要排队，进而阻塞 UI 响应。这时候用户点击、输入、页面动画等都没有了响应

> 两种方案突破上文的瓶颈：
* 将耗时高、成本高、易阻塞的长任务切片，分成子任务，并异步执行
 这样一来，这些子任务会在不同的 call stack tick 周期执行，进而主线程就可以在子任务间隙当中执行 UI 更新操作。设想常见的一个场景：如果我们需要渲染一个由十万条数据组成的列表，那么相比一次性渲染全部数据，我们可以将数据分段，使用 setTimeout API 去分步处理，构建渲染列表的工作就被分成了不同的子任务在浏览器中执行。在这些子任务间隙，浏览器得以处理 UI 更新。

* 使用HTML5 Web Worker
 Web worker 允许我们将 JavaScript 脚本在不同的浏览器线程中执行。因此，一些耗时的计算过程我们都可以放在 Web worker 开启的线程当中处理

## Session、Cookie、Token、JWT、SessionStorage、LocalStorage
### Cookie 和 Session
HTTP 协议是一种*无状态协议*，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

#### Session是什么
客户端请求服务端，服务端会为这次请求开辟一块内存空间，这个对象便是 Session 对象，存储结构为 ConcurrentHashMap。Session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。

#### Session 的缺点
Session 机制有个缺点，比如 A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。

#### Cookie是什么
HTTP 协议中的 Cookie 包括 Web Cookie 和浏览器 Cookie，它是服务器发送到 Web 浏览器的一小块数据。服务器发送到浏览器的 Cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。通常，它用于判断两个请求是否来自于同一个浏览器，例如用户保持登录状态。

HTTP Cookie 机制是 HTTP 协议无状态的一种补充和改良

Cookie 主要用于下面三个目的

* 会话管理

> 登陆、购物车、游戏得分或者服务器应该记住的其他内容

* 个性化

> 用户偏好、主题或者其他设置

* 追踪

> 记录和分析用户行为
Cookie 曾经用于一般的客户端存储。虽然这是合法的，因为它们是在客户端上存储数据的唯一方法，但如今建议使用现代存储 API。Cookie 随每个请求一起发送，因此它们可能会降低性能（尤其是对于移动数据连接而言）。

#### 会话 Cookies
会话 Cookie 有个特征，客户端关闭时 Cookie 会删除，因为它没有指定Expires或 Max-Age 指令。
但是，Web 浏览器可能会使用会话还原，这会使大多数会话 Cookie 保持永久状态，就像从未关闭过浏览器一样。

#### 永久性 Cookies
永久性 Cookie 不会在客户端关闭时过期，而是在特定日期（Expires）或特定时间长度（Max-Age）外过期。例如
```JavaScript 
    Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; 
```
#### Cookie的`Secure`和`HttpOnly`标记
安全的 Cookie 需要经过 HTTPS 协议通过加密的方式发送到服务器。即使是安全的，也不应该将敏感信息存储在cookie 中，因为它们本质上是不安全的，并且此标志不能提供真正的保护。
* HttpOnly 的作用

    * 会话 Cookie 中缺少 HttpOnly 属性会导致攻击者可以通过程序(JS脚本、Applet等)获取到用户的 Cookie  信息，造成用户 Cookie 信息泄露，增加攻击者的跨站脚本攻击威胁。
    * HttpOnly 是微软对 Cookie 做的扩展，该值指定 Cookie 是否可通过客户端脚本访问。
    * 如果在 Cookie 中没有设置 HttpOnly 属性为 true，可能导致 Cookie 被窃取。窃取的 Cookie 可以包含标识站点用户的敏感信息，如 ASP.NET 会话 ID 或 Forms 身份验证票证，攻击者可以重播窃取的 Cookie，以便伪装成用户或获取敏感信息，进行跨站脚本攻击等。

#### Cookie 的作用域
`Domain` 和 `Path` 标识定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。
Domain 标识指定了哪些主机可以接受 Cookie。如果不指定，默认为当前主机(不包含子域名）。如果指定了Domain，则一般包含子域名。
例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如developer.mozilla.org）。
例如，设置 Path=/docs，则以下地址都会匹配：
* /docs
* /docs/Web/
* /docs/Web/HTTP

### JWT
Json Web Token 的简称就是 JWT，通常可以称为 Json 令牌。它是RFC 7519 中定义的用于安全的将信息作为 Json 对象进行传输的一种形式。JWT 中存储的信息是经过数字签名的，因此可以被信任和理解。可以使用 HMAC 算法或使用 RSA/ECDSA 的公用/专用密钥对 JWT 进行签名。

#### JWT 的格式
JWT 主要由三部分组成，每个部分用 . 进行分割，各个部分分别是
> Header
> Payload
> Signature

#### JWT 和 Session Cookies 的不同
JWT 和 Session Cookies 都提供安全的用户身份验证，但是它们有以下几点不同
* 密码签名
> JWT 具有加密签名，而 Session Cookies 则没有。
* JSON 是无状态的
> JWT 是无状态的，因为声明被存储在客户端，而不是服务端内存中。
> 身份验证可以在本地进行，而不是在请求必须通过服务器数据库或类似位置中进行。 这意味着可以对用户进行多次身份验证，而无需与站点或应用程序的数据库进行通信，也无需在此过程中消耗大量资源。
* 可扩展性
> Session Cookies 是存储在服务器内存中，这就意味着如果网站或者应用很大的情况下会耗费大量的资源。由于 JWT 是无状态的，在许多情况下，它们可以节省服务器资源。因此 JWT 要比 Session Cookies 具有更强的可扩展性。
* JWT 支持跨域认证
> Session Cookies 只能用在单个节点的域或者它的子域中有效。如果它们尝试通过第三个节点访问，就会被禁止。如果你希望自己的网站和其他站点建立安全连接时，这是一个问题。
> 使用 JWT 可以解决这个问题，使用 JWT 能够通过多个节点进行用户认证，也就是我们常说的跨域认证。

### LocalStorage 和 SessionStorage 【5M】
* LocalStorage
    1. 始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；     【有效期】
    2. 同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效。     【作用域】

* SessionStorage
    1. 浏览器存储的一种形式。
    2. 仅在当前浏览器窗口关闭前有效，不可能持久保持。   【有效期】
    3. 在相同浏览器里，如果是在当前页面里面跳转进入一个新的页面，可以共享；而如果是直接打开一个新的页面，不能共享。      【作用域】

## 你有几种获取URL参数的方法？
1. 通过正则表达式匹配
```JavaScript
 let url = "https://www.baidu.com?name=zhousi&sex=male&age=23";

 function queryURLParams(url){
    let pattern = /(\w+)=(\w+)/ig;
    let params = {};
    url.replace(pattern, ($, $1, $2)=>{
        params[$1] = $2;
    });
    return params;
 }

 console.log(queryURLParams(url));
```
2. 利用a标签内置的方法
3. 利用split方法分割
4. 使用URLSearchParams方法

## 解释一下JS中的原型和原型链
1. `prototype`
* 每个函数都有`prototype`属性，被称作原型。
* `prototype`原型指向一个对象，故也称作原型对象。

2. `prototype`和`__ptoto__`
`prototype`的维度是函数，而`__proto__`的维度是对象。`__proto__`是每个对象都有的属性，我们通常把它称为"隐式原型"，把`prototype`称为"显式原型"。

3. 原型链
通过`__proto__`向上查找属性的链路，就叫做原型链

## 防抖和截流
### 防抖debounce
在事件触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
### 截流throttle
规定在一个事件单位内，只能触发一次函数，如果这个单位事件内触发多次函数，只有第一次生效

## JavaScript文档碎片的理解
### 什么是文档碎片
```JavaScript
document.createDocumentFragement();
```
### 文档碎片有什么用
将需要添加的大量元素，先添加到文档碎片当中，再讲文档碎片添加到需要插入的位置，大大减少dom操作，提高性能

## JavaScript创建对象的几种方式？
### 对象字面量法
```JavaScript
var person = {};
person.name = '张三'
console.log(person)
```
### `Object`构造函数
```JavaScript
var person = new Object();
person.name = '李四'
console.log(person)
```
### 工厂模式创建对象
```JavaScript
function createPerson(name){
    var o = new Object();
    o.name = name;
    return o;
}
var person = createPerson('张飒')
console.log(person)
```
> 缺点：无法判断返回的对象是什么类型
### 使用构造函数创建对象
```JavaScript
function Person(name){
    this.name = name;
}
var person1 = new Person('z');
var person2 = new Person('y);
```
### 原型创建对象
```JavaScript
function Person(){}
Person.prototype.name = 'a'
var person = new Person()
console.log(person.name)
```
### 组合使用构造函数和原型模式
```JavaScript
function Person(name){
    this.name = name
}
Person.prototype = {
    consctructor: Person,
    sayName: function(){
        console.log(this.name)
    }
}
var person = new Person('x');
```

## new
### 手写一个new函数
```JavaScript
function myNew(constructor){

    // 从constructor.prototype创建新对象
    let newObj = Object.create(constructor.prototype);

     // 获取传入的参数
    let args = Array.from(arguments).slice(1);

     // 执行constructor函数，获取结果，并将属性添加到新对象newObj上
    let result = constructor.apply(newObj, args); // 将this指向newObj

    // 判断result类型，如果是object或者function类型，则直接返回结果
    let originType = Object.prototype.toString.call(result); // 获取内部属性值
    let isObject = originType === '[object Object]';
    let isFunction = originType === '[object Function]';
    if (isObject || isFunction) {
      return result;
    } else {
      // 返回新对象
      return newObj;
    }
}
```
### new操作做了什么
* 创建一个空的简单`JavaScript`对象（即{}）；
* 为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象 ；
* 将步骤1新创建的对象作为`this`的上下文 ；
* 如果该函数没有返回对象，则返回`this`

## JavaScript异步遍历的方法
1. forEach
`forEach` 循环根本没有处理异步操作，它根本不支持异步写法。`forEach` 的原理很简单，它就是简单的执行了一下我们传入的回调函数，并不会去处理异步情况。
除了`forEach`外，类似于 `map` 等直接传入回调函数的循环方式都无法处理异步。

2. for...of
```JavaScript
for (const item of asyncArray) {
  const res = await item;
  console.info("执行的函数是：",res);
}
```
3. for...await...of
```JavaScript
for await (const item of asyncArray) {
  console.info("执行的函数是：",item);
}
```
4. Promise.all
```JavaScript
console.info(await Promise.all(asyncArray))
```

## childNodes 和 children 有什么区别？
* childNodes属于`NodeList`集合，它会返回所有的子节点，包括文本、标签、注释等等。
* children数据`HTMLCollection`集合，它会返回所有HTML元素节点。
* childNodes包含children。

## 递归实现深拷贝
```JavaScript
function deepClone(obj, hashMap = new WeakMap()) {
  // 如果传入的类型不对，则不做处理
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  // 查缓存字典中是否已有需要克隆的对象，有的话直接返回同一个对象（同一个引用，不用递归无限创建进而导致栈溢出了）
  if (hashMap.has(obj)) {
    return hashMap.get(obj);
  }
  let newObj = {}; // 新对象
  const dataKeys = Object.keys(obj); // 获取原对象所有键值
  dataKeys.forEach((value) => {
    const currentValue = obj[value];
    // 基础类型直接赋值
    if (typeof currentValue !== "object" || currentValue === null) {
      newObj[value] = currentValue;
    } else if (Array.isArray(currentValue)) {
      // 实现数组的深拷贝
      newObj[value] = [...currentValue];
    } else if (currentValue instanceof Set) {
      // 实现set数据的深拷贝
      newObj[value] = new Set([...currentValue]);
    } else if (currentValue instanceof Map) {
      // 实现map数据的深拷贝
      newObj[value] = new Map([...currentValue]);
    } else if (currentValue instanceof Date) {
      // 日期类型深拷贝
      newObj[value] = new Date(currentValue.valueOf())
    } else {
      hashMap.set(obj, newObj); // 哈希表缓存新值
      // 普通对象则递归赋值
      newObj[value] = deepClone(currentValue,hashMap);
    }

  });
  return newObj;
}
```

## 2.点击事件执行过程
>用户点击按钮或者点击其它元素时，触发点击事件，这个过程并不是立即执行的，它是需要走一遍既定的流程的。
* 一个点击事件被触发，主要会走以下流程：

    * 用户点击某个按钮，即触发点击事件。
    * 浏览器从顶层 document 元素发出一个事件流。
    * 事件流顺着 DOM 逐层向下查找触发事件的目标元素，这就是常说的事件捕获。
    * 如果在查找过程中遇到了相同的事件，比如其它元素也绑定点击事件，那么默认不执行，继续往下找。
    * 查找到目标元素后，就会执行目标元素所绑定的事件函数，这也就是常说的事件目标阶段 。
    * 到这儿整个点击事件还没有完，浏览器会逆向执行该操作，也就是我们所说的事件冒泡。
    * 事件冒泡阶段，默认会触发相同的事件，也就是我们刚刚在事件捕获阶段，遇到相同的事件未执行，因为默认在这个冒泡阶段执行。

>上面的流程大致就是一个点击事件的执行过程，这中过程也被称作 DOM 的事件模型。其实总结下来主要就三步：事件捕获阶段->事件目标阶段->事件冒泡阶段。


# ES6
## 解构
### 数组解构赋值
```JavaScript
let arr = ['this is a string', 2, 3];

let [a, b, c] = arr;
```
> 本质上，这种写法属于`模式匹配`，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
* `不完全解构`：即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
```JavaScript
let [a, [b, c], d] = [1, [2, 3], 4];
```
* `默认值解构`：允许指定默认值
```JavaScript
let [foo = true] = [];

let [x, y = 'b'] = ['a'];
// ES6内部使用严格相等运算法(===)，判断一个位置是否有值，当且仅当一个数组成员严格等于undefined时，默认值才会生效
let [x, y = 'b'] = ['a', undefined]; // y = 'b';
let [x, y = 'b'] = ['a', null]; //y = null;
```
* 应用：变量互换
```JavaScript
var x = 1, y = 2;
var [x, y] = [y, x];
```

### 对象解构赋值
```JavaScript
let obj = {
    name: 'chris',
    sex: 'male',
    age: 26,
    son: {
      sonname: '大熊',
      sonsex: 'male',
      sonage: 1
    }
  }

const {name, sex, age, son} = obj
```
> 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

* `非同名属性赋值`
```JavaScript
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```
> 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者

* `不好的实践`
```JavaScript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```
> 虽然这段代码，行得通，依赖于数组也是特殊对象，其key及为自己的index下标。但此写法可读性、可理解性都很差

### 字符串的解构赋值
> 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象

* 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
```JavaScript
let {length : len} = 'hello';
len // 5
```

### 数值和布尔值的结构赋值
* 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```JavaScript
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

> 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于`undefined`和`null`无法转为对象，所以对它们进行解构赋值，都会报错。
```JavaScript
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 函数参数的解构赋值
> 解构是ES6提供的语法糖，其实内在是针对`可迭代对象`的`Iterator`接口，通过遍历器按顺序获取对应的值进行赋值
* 函数的参数也可以使用解构赋值。
```JavaScript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```
> 上面代码中，函数`add`的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。

* 下面是另一个例子。
```JavaScript
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
* 函数参数的解构也可以使用默认值。
```JavaScript
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```
注意，下面的写法会得到不一样的结果。
```JavaScript
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```
上面代码是为函数`move`的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
`undefined`就会触发函数参数的默认值。
```JavaScript
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### for循环解构
```JavaScript
var arr = [[11, 12], [21, 22], [31, 32]];
for (let [a, b] of arr) {
    console.log(a);
    console.log(b);
}
//11
//12
//21
//22
//31
//32
```

## 扩展运算符
> 扩展运算符(spread运算符)用三个点号(...)表示，功能是把数组或类数组对象展开成一系列用逗号隔开的值
```JavaScript
let foo = function(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

let arr = [1, 2, 3];

//传统写法
foo(arr[0], arr[1], arr[2]);

//使用扩展运算符
foo(...arr);
//1
//2
//3
```
* 特殊应用场景：

  * 数组深拷贝-数组中的元素为基本类型，若为object，依然会拷贝引用地址
```JavaScript
var arr = [1, 2, 3];
var arr2 = arr;
var arr3 = [...arr];
console.log(arr===arr2); //true, 说明arr和arr2指向同一个数组的引用地址
console.log(arr===arr3); //false, 说明arr3和arr指向不同数组引用，在堆内存中为arr3另外分配了内存空间
```

  * 把一个数组插入另一个数组字面量
```JavaScript
var arr4 = [...arr, 4, 5, 6];
console.log(arr4);//[1, 2, 3, 4, 5, 6]
```

  * 字符串转数组
```JavaScript
var str = 'love';
var arr5 = [...str];
console.log(arr5);//[ 'l', 'o', 'v', 'e' ]
```

  * 函数调用
```JavaScript
  function push(array, ...items) {
    array.push(...items)
  }

  function add(x, y) {
    return x + y
  }

  const numbers = [4, 38]
  add(...numbers) // 42
```

  * 替代数组的 apply 方法
> 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
```JavaScript
// ES5 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6 的写法
function f(x, y, z) {
// ...
}
var args = [0, 1, 2];
f(...args);
```

  * 另一个例子是通过`push`函数，将一个数组添加到另一个数组的尾部。
```JavaScript
// ES5 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2)
```

## rest运算符
rest运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组。
```JavaScript
//主要用于不定参数，所以ES6开始可以不再使用arguments对象
var bar = function(...args) {
    for (let el of args) {
        console.log(el);
    }
}

bar(1, 2, 3, 4);
//1
//2
//3
//4

bar = function(a, ...args) {
    console.log(a);
    console.log(args);
}

bar(1, 2, 3, 4);
//1
//[ 2, 3, 4 ]
```
rest运算符配合解构使用：
```JavaScript
// 数组
const [a, ...rest] = [1, 2, 3, 4];
console.log(a);//1
console.log(rest);//[2, 3, 4]

// 对象配合
const {age, ...rest} = {name: 'qxj', age: 24, hobby: 'write code'};
console.log(age);					//24
console.log(rest);					//{ name: 'qxj', hobby: 'write code' }

* rest运算符和spread运算符的区别：
  spread运算符：放在赋值一方，即放在实参或者等号右边
  rest运算符：放在被赋值一方，即放在形参或者等号左边

