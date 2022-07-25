##
>   //1.写到某个函数的时候考虑一下这个函数别的地方会不会用到，是否要写成通用函数

>   //2.在写这个函数的时候梳理清楚入参会是什么，返回值会是什么

>   //3.定义变量常量名时要考虑是否能见名知意，尽量使用能一眼能看懂意思的命名

>   //4.每写一行代码的时候要问问自己为什么要写这行，这行代码要干什么，如果是条件判断要理清楚什么用例会通过这个判断，什么用例不能通过这个判断

>   //5.写完之后看看是否有没回收的变量，逻辑是否通，是否写了重复代码

>   //6.写完之后随手可以写个demo测试场景中的值以及边界值，边界值是否会让这个函数崩溃报错

>   //7.记住自己写的这个函数


## js取整与取小数:  骚操作 1.2 | 0 = 1   1.2 % 1 = 0.2

## reduce的使用
> reduce：arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
>
> ### 参数
>
> - `callback`
>
>   执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：
>
>   **`accumulator`**累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。
>
>   `currentValue`数组中正在处理的元素。
>
>   `index` 可选数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。
>
>   `array`可选调用`reduce()`的数组
>
> - `initialValue`可选
>
>   **作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。** 在没有初始值的空数组上调用 reduce 将报错。
>
> ### 返回值
>
> 函数累计处理的结果


## 3.性能优化

### 1.React篇

1.render里面尽量减少新建变量和bind函数，传递参数时尽量减少传递参数的数量。

2.定制shouldComponentUpdate函数

3.Immutable.js

> 通过Immutable创建的Immutable Data一旦被创建，就不能再更改。对Immutable对象进行修改、添加或删除操作，都会返回一个新的Immutable对象

4.多个react组件性能优化，key的优化

> 一个常见的错误就是，拿数组的的下标值去当做key，这个是很危险的，代码如下，我们一定要避免

这里有一篇文章写的非常详细

[浅谈React性能优化的方向 - 掘金](https://juejin.im/post/5d045350f265da1b695d5bf2)

![](https://tcs.teambition.net/storage/111r4ed58962abb97959d89f9b48c4723e8a?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTgyNywiaWF0IjoxNjA4NzM1MDI3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI0ZWQ1ODk2MmFiYjk3OTU5ZDg5ZjliNDhjNDcyM2U4YSJ9.hI1oMM5ZVWBKJfrgS60NHcRo3YWZidROkMaBAo9M6Yk&download=image.png "")

虚拟列表渲染

[Rendering large lists with react-window](https://addyosmani.com/blog/react-window/)

[bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized)

### 2.js篇

**1. 避免全局查找**

在一个函数中会用到全局对象存储为局部变量来减少全局查找，因为访问局部变量的速度要比访问全局变量的速度更快些。比如在找到DOM中所要的元素后，利用局部变量（最好是let）将其保存起来，避免频繁的去搜索遍历DOM树

**2. 定时器**

如果针对的是不断运行的代码，不应该使用setTimeout，而应该是用setInterval，因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器。在对于需要轮询的情况下，使用setInterval吧

**3. 字符串连接**

如果要连接多个字符串，应该少使用+=，如：

x+=a;x+=b;x+=c;应该写成 x+= a + b + c；而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来。

**5. 数字转换成字符串**

一般最好用"" + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：("" +) > String() > .toString() > new String()

**6. 各种类型转换**

![](https://tcs.teambition.net/storage/111ra63d2ed39eacc7f274886b763a656996?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTgyNywiaWF0IjoxNjA4NzM1MDI3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJhNjNkMmVkMzllYWNjN2YyNzQ4ODZiNzYzYTY1Njk5NiJ9.pZtaXesTwz5oNoFZrf9Kr22hqxQGFp27T2e7bJyGgLM&download=image.png "")

**7. 插入迭代器**

如var a=arr[i]; i++;前面两条语句可以写成var a=arr[i++]

**8. 使用DocumentFragment优化多次append**

一旦需要更新DOM,请考虑使用文档碎片来构建DOM结构，然后再将其添加到现存的文档中。

![](https://tcs.teambition.net/storage/111ra1a04c8db624bd2a7053cf52501ce8be?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTgyNywiaWF0IjoxNjA4NzM1MDI3LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJhMWEwNGM4ZGI2MjRiZDJhNzA1M2NmNTI1MDFjZThiZSJ9.lAoiPZAZsN1psoalD44cSAREYjoy2z7Wl2g5y1oGSQM&download=image.png "")

**9. 优化循环**

减值迭代

简化终止条件

简化循环体

使用后测试循环

在JavaScript中，我们可以使用for(;;),while(),for(in)三种循环，事实上，这三种循环中for(in)的效率极差，因为他需要查询散列键，只要可以，就应该尽量少用。for(;;)和while循环，while循环的效率要优于for(;;)，可能是因为for(;;)结构的问题，需要经常跳转回去。

![](https://user-gold-cdn.xitu.io/2019/2/21/1690e00b282fa5ed?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 "")

最常用的for循环和while循环都是前测试循环，而如do-while这种后测试循环，可以避免最初终止条件的计算，因此运行更快。

**10. 条件分支**

将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数，在同一条件子的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半，使用三目运算符替代条件分支。

**11. 避免与null进行比较**

由于JavaScript是弱类型的，所以它不会做任何的自动类型检查，所以如果看到与null进行比较的代码，尝试使用以下技术替换，如果值应为一个引用类型，使用instanceof操作符检查其构造函数，如果值应为一个基本类型，作用typeof检查其类型，如果是希望对象包含某个特定的方法名，则使用typeof操作符确保指定名字的方法存在于对象上。

**12. 避免string的隐式装箱**

对string的方法调用，比如'xxx'.length，浏览器会进行一个隐式的装箱操作，将字符串先转换成一个String对象。推荐对声明有可能使用String实例方法的字符串时，采用如下写法：

var myString = new String('Hello World');

## 2.React

### 1.减少不必要的渲染

这个问题一直都是前端需要重点考虑的问题（等后面有时间重点考虑一下）

![](https://tcs.teambition.net/storage/111r489d6e3c6be2eccd56fab3d92e4fef44?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg3NCwiaWF0IjoxNjA4NzM1MDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI0ODlkNmUzYzZiZTJlY2NkNTZmYWIzZDkyZTRmZWY0NCJ9.CBMOFLLLxe0RlNBr5_5FibjNVbTUrHLi4d94FVfBAqk&download=image.png "")

> 注意

> `React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 `React.PureComponent`，或者在深层数据结构发生变化时调用 `forceUpdate()` 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。此外，`React.PureComponent` 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。

### 2.forwardRef

```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

上面这段代码中，在FancyButton中可以通过ref.current获取到FancyButton的实例，但是如果有多个FancyButton呢？结果是ref中保存的永远是最后一个组件的实例。怎么解决呢？从两个角度来考虑这个问题：

1.使用key区分每个FancyButton的实例，结果不尽如人意；

2.函数组件的每一次调用所使用的都是独立的空间，好像有点东西！，试试：

```javascript
class App extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.buttons = [];
    for (let i = 0; i < 7; i++) {
      this.buttons.push(<FancyButton key={i} ref={this.myRef} />);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {this.buttons}
        </header>
      </div>
    );
  }
}

const FancyButton = React.forwardRef((props, ref) => {
    const myRef = useRef();
    myRef.current = ref.current;
    return <>
        <div ref={myRef} className="fancyButton" onClick={()=>{console.log("我被点击了"); myRef.current.innerHTML = myRef.current.innerHTML == "" ? "我被点击过了" : ""}}></div>
    </>
});
```

done！那么这两个例子是为了干嘛呢？-》》》答案不言而喻，在组件间传递ref可以通过forwardRef（因为源码中props会去除掉ref，不会传递出去，是否为了组件的封装独立性）

***tip: 函数组件上不能使用ref，因为函数组件没有实例***

### 3.关于构造函数

![](https://tcs.teambition.net/storage/111r837c4abfe97e6cd0c2d44cfa2b64ed03?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg3NCwiaWF0IjoxNjA4NzM1MDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI4MzdjNGFiZmU5N2U2Y2QwYzJkNDRjZmEyYjY0ZWQwMyJ9.bxvnYY6H01iKw1Rf4lbIjZrbqGT44QYwQiGy84wxEFE&download=image.png "")

![](https://tcs.teambition.net/storage/111rcc548ab32e7e92d47f3eaa3bb457bf82?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg3NCwiaWF0IjoxNjA4NzM1MDc0LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJjYzU0OGFiMzJlN2U5MmQ0N2YzZWFhM2JiNDU3YmY4MiJ9.v7RI-7Ihicd5yFVPkHaswYU3oVvEYHFUMqgW4Czrvhk&download=image.png "")

尽量保证构造函数的纯净，不要在里面做以上两个任务以外的事情，这样可以在变量未赋值，接口未被调用的情况下render里面减少报错的可能，也可以避免不必要的渲染。

### 4.componentDidmount

你可以在 `componentDidMount()` 里直接调用 `setState()`。__**它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前**__。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。

### 5.componentDidUpdate

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

当组件更新后，可以在此处对 DOM 进行操作。**如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求**。（例如，当 props 未发生变化时，则不会执行网络请求）。

### 6.defaultPropsdefaultProps

`defaultPropsdefaultProps` 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。好东西！

### 7.getDrivedStateFromProps

看下面这段代码

```javascript
class App extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.buttons = [];
    this.state = {
      name: "假的"
    };
  }
  componentDidMount() {
    for (let i = 0; i < 7; i++) {
      this.buttons.push(<FancyButton key={i} ref={this.myRef} />);
    }
  }

  click = () => {
    this.setState({
      name: "真的来了"
    })
  }

  render() {
    console.log(this.state.name);
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ "width": "100px", "height": "100px" }} onClick={() => this.click()}><Head name={this.state.name}></Head></div>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {this.buttons}
        </header>
      </div>
    );
  }
}

class Head extends React.Component {
  constructor(p) {
    super(p);
    console.log(p.name);
    this.state = {
      name: p.name
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { name } = nextProps;
  //   // type可能由props驱动，也可能由state驱动，这样判断会导致state驱动的type被回滚
  //   if (name !== prevState.name) {
  //     return {
  //       name,
  //     };
  //   }
  //   // 否则，对于state不进行任何操作
  //   return null;
  // }
  render() {
    return (
      <div className={"head"}>{this.state.name}</div>
    );
  }
}

```

当没有getDerivedStateFromProps方法时，Head组件不会更新。。。。

或者可以这么玩

```javascript
return (
      <div className={"head"}>{this.props.name}</div>
    );
```

这也就是所谓的不推荐将props直接赋值给state所产生的的问题。

最常见的误解就是 `getDerivedStateFromProps` 和 `componentWillReceiveProps` 只会在 props “改变”时才会调用。**实际上只要父级重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有“变化”。**

**任何数据，都要保证只有一个数据来源，而且避免直接复制它**。-----》哈哈哈哈哈 redux又来了

详细见连接

[你可能不需要使用派生 state – React Blog](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)



