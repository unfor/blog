## 合成事件
React框架自身实现了一套事件处理机制，它的基本用法和DOM事件很相似。例如，给某个react元素绑定点击事件：

* 事件类型采用小驼峰命名法，因此是 onClick，而不是 onclick，其他事件类型相同。
* 直接将函数的声明当成事件句柄传递
我们将它的这套事件处理机制称之为SyntheticEvent，即合成事件

## SyntheticEvent支持的事件类型
Clipboard Events
Composition Events
Keyboard Events
Focus Events
Form Events
Mouse Events
Pointer Events
Selection Events
Touch Events
UI Events
Wheel Events
Media Events
Image Events
Animation Events
Transition Events
Other Events

## 事件流
> React中，默认的事件传播方式为冒泡：
如果说我们希望以捕获的方式来触发事件的话，可以使用onClickCapture来绑定事件，也就是在事件类型后面加一个后缀Capture

## 事件委托
> 在合成事件系统中，所有的事件都是绑定在document元素上，即，虽然我们在某个react元素上绑定了事件，但是，最后事件都委托给document统一触发。

## 在合成事件中只能阻止合成事件中的事件传播
> 使用e.stopPropagation()方法来阻止事件流的传播：

react 阻止的事件流，并没有阻止真正DOM元素的事件触发，真正的元素还是按照冒泡的方式，层层将事件交给上级元素进行处理，最后事件传播到``docuement``，触发合成事件，在合成事件中，child触发时，``e.stopPropagation()``被调用，合成事件中的事件被终止。因此，合成事件中的``stopPropagation``无法阻止事件在真正元素上的传递，它只阻止合成事件中的事件流。
但是在``document``触发时，通过调用``e.stopPropagation()``可以阻止合成事件被触发

## 事件对象
> 在SyntheticEvent中，我们依然可以获取到事件发生时的event对象;
合成事件中的event对象，并不是原生的event，只是说，我们可以通过它获取到原生event对象上的某些属性，而且，对于这个event对象，在整个合成事件中，只有一个，被全局共享，也就是说，*当这次事件调用完成之后，这个event对象会被清空，等待下一次的事件触发，因此，我们无法在异步的操作中获取到event*


## 混合使用
react鼓励我们使用合成事件，但是，在某些需求中，还是需要通过原生事件来进行处理，这时，就涉及到合成事件和原生事件的混合使用，例如以下示例：
```JavaScript
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {

  state = {
    isShow: "none"
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              isShow: "block"
            });
          }}
        >点击显示</button>
        <div style={{
          display: this.state.isShow,
          width: "100px",
          height: "100px",
          backgroundColor: "red"
        }}></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

在这个示例中，我们提供一个按钮和一个div元素，当用户点击按钮时，显示div，当点击页面其他区域时，则隐藏。以上代码已经实现点击按钮显示div的功能：

要实现 点击其他区域隐藏div元素 的功能，需要将事件绑定在document元素上，接下来，在compnentDidMount生命周期函数中，来绑定该事件：

```JavaScript
class App extends Component {

  state = {
    ...
  }

  componentDidMount() {
    document.addEventListener("click", e => {
        this.setState({
            isShow: "none"
        });
    })
  }

  render() {
    ...
  }
}
```

当点击按钮时，isShow: "block"，当点击其他区域时，isShow: "none"。这时我们发现，点击按钮时，div显示不出来了。

这个现象的原因是，实际上，在document元素身上，现在已经存在2个click事件，一个是合成事件绑定的click，另外一个是我们自己添加的监听器。当用户点击按钮时，synthetic中的click首先被触发，这时，isShow状态被设置成block，页面元素被显示出来，紧跟着，native中的click事件被触发，又把isShow的状态改为none，div元素又被隐藏了起来。
> *不是应该原生事件先触发吗???*
> 无论是否是对于同一元素监听的同种类型事件，原生事件总是比合成事件先触发。这是由于上面我们说到的合成事件最终都会绑定到documnet DOM上导致的，当合成事件监听到后，总是冒泡到document才会真正触发。 而documnet DOM上监听的原生事件则总是最后触发
>【冒泡阶段】 native events -> sythetic evnets(合成事件都会绑定到document dom上，故要晚于native events被触发) -> document events

处理方法:
```JavaScript
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {

  state = {
    isShow: "none"
  }

  button = React.createRef();

  componentDidMount() {
    document.addEventListener("click", e => {
      // 当 native 事件被触发时，我们判断一下当前目标元素是否为 button，
      // 如果不是点击的按钮，则就意味着将元素隐藏
      if (e.target !== this.button.current) {
        this.setState({
          isShow: "none"
        });
      }
    })
  }

  render() {
    return (
      <div>
        <button
          ref={this.button}
          onClick={() => {
            this.setState({
              isShow: "block"
            });
          }}
        >点击显示</button>
        <div style={{
          display: this.state.isShow,
          width: "100px",
          height: "100px",
          backgroundColor: "red"
        }}></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

【参考：】
[https://segmentfault.com/a/1190000017855734/]