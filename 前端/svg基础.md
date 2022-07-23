## **1.svg基础**

### 1.svg的命名空间

### 2.svg中的标签    text、circle、rect、line、polyLine、polyGen

### 3.单独使用svg标签画图

### 4.在HTML中通过js创建svg元素(document.createElementNS)

```javascript
document.onload = (function (){
            var div1 = document.querySelector("#div1");
            var svgT= document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgT.setAttribute("width", "100%");
            svgT.setAttribute("height", "400");
            svgT.setAttribute("fill", 'red');
            div1.appendChild(svgT);
            var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle1.setAttribute("id", "circle1");
            circle1.setAttribute("cx", "500");
            circle1.setAttribute("cy", "200");
            circle1.setAttribute("r", "50");
            circle1.setAttribute("fill", "transparent");
            circle1.setAttribute("stroke-width", "5");
            circle1.setAttribute("stroke", "red");
            svgT.appendChild(circle1);
            var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text1.setAttribute("id", "text1");
            text1.innerHTML = "科鲁兹";
            text1.setAttribute("x", '480');
            text1.setAttribute("y", '204');
            text1.setAttribute("fill", 'black');
            text1.setAttribute("anchor", 'middle');
            // text1.setAttribute("transform", "translate(-26,0)")
            svgT.appendChild(text1);
            var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line1.setAttribute("id", "line1");
            line1.setAttribute("x1", '500');
            line1.setAttribute("y1", '80');
            line1.setAttribute("x2", '500');
            line1.setAttribute("y2", '150');
            line1.setAttribute("stroke", 'black');
            line1.setAttribute("stroke-width", '2');
            svgT.appendChild(line1);
            var smCircle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            smCircle1.setAttribute("id", "smCircle1");
            smCircle1.setAttribute("cx", "500");
            smCircle1.setAttribute("cy", "40");
            smCircle1.setAttribute("r", "40");
            smCircle1.setAttribute("fill", "white");
            smCircle1.setAttribute("stroke-width", "5");
            smCircle1.setAttribute("stroke", "blue");
            svgT.appendChild(smCircle1);
            var smCircle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            smCircle2.setAttribute("id", "smCircle2");
            smCircle2.setAttribute("cx", "720");
            smCircle2.setAttribute("cy", "200");
            smCircle2.setAttribute("r", "40");
            smCircle2.setAttribute("fill", "white");
            smCircle2.setAttribute("stroke-width", "5");
            smCircle2.setAttribute("stroke", "blue");
            svgT.appendChild(smCircle2);
            var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("id", 'line2');
            line2.setAttribute("x1", '550');
            line2.setAttribute("y1", '200');
            line2.setAttribute("x2", '680');
            line2.setAttribute("y2", '200');
            line2.setAttribute("stroke", 'black');
            line2.setAttribute("stroke-width", '2');
            svgT.appendChild(line2);

            smCircle1.onmouseenter = function (){
                smCircle1.setAttribute("r", 50)    
            }
            smCircle1.onmouseleave = function (){
                smCircle1.setAttribute("r", 40)   
            }
            smCircle2.onmouseenter = function (){
                smCircle2.setAttribute("r", 50)   
            }
            smCircle2.onmouseleave = function (){
                smCircle2.setAttribute("r", 40)   
            }
    })();
```

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

