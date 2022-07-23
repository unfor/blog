## React渲染原理到性能优化
### React渲染流程：
#### JSX ->>> Element
当render函数被调用时，会通过执行React.createElement表达式，返回一个element

> 首次渲染
#### Element ->>> 真实DOM
```JavaScript
    if( typeof element == Object ){
        if(原生DOM) ReactDOMComponent
        else if(自定义类) ReactCompositeComponentWrapper
    } else {
        if(string/number) ReactDOMTextComponent
        else if(null/false) ReactDOMEmptyComponent
    }
```

> 更新渲染
#### Element ->>> 真实DOM


### DIFF算法
1. React基于两个假设：
    * 对于两个相同组件产生类似的DOM结构，不同组件产生不同的DOM结构
    * 对于同一层次的一组子节点，他们可以通过唯一的id区分

2. 比较流程：
    * 节点类型不同：
        直接删去旧节点，新建一个新的节点
    * 节点类型相同：
        * DOM元素类型：
            对于属性，只改变需要改变的属性
        * 自定义组件类型：
            根据新节点的props去更新原来根节点的组件实例，触发一个更新的过程，对所有的child及诶单再进行diff的递归比较更新；有key的情况下对比key，按需更新，没有key的情况下，直接删除旧节点，插入新节点

3. 小优化：
    * 尽量保持DOM结构的稳定性
    * 给节点配置可靠的key

### React性能优化
1. 使用纯组件
2. 使用React.meme对组件进行缓存
3. 使用shouldComponentUpdate进行更新控制，减少不必要的更新
4. 路由懒加载
5. 使用React Fragments避免额外标记
6. 不使用内联函数定义，不在render中定义函数
7. 避免在willxxx系列的生命周期中进行异步请求，操作dom等
8. 如果是类组件，事件函数在constructor中bind改变this指向
9. 避免使用内联样式属性
10. 优化React中的条件渲染
11. 不要在render方法中导出数据
12. 列表渲染时使用key
13. 函数组件中使用useCallback和useMemo来进行组件优化
14. 类组件中使用immutable对象


## React18新特性
### 1.通过createRoot创建多个根节点，每个根节点都有单独的render

### 2.flushSync强制同步刷新

### 3.并发渲染
> 并发意味着任务可以重叠，在系统进入下一个状态之前，不必完全完成一个状态更新，并发允许我们在多个状态之间来回切换。但是，这并不意味着所有事情都是同时发生的。而是，现在可以暂停一项任务，看到其他更紧急的任务。然后，一旦完成了更紧急的任务，就可以跳回到不太紧急的任务，查看来自更紧急任务的更新信息。

* startTransition
```JavaScript
const [isPending, startTransition] = useTransition();
<Button className={isPending ? 'disabled' : 'active'} />
```
* useDeferredValue
> 新的useDeferredValue()API 允许我们选择 UI 的特定部分并有意推迟更新它们，这样它们就不会减慢页面的其他部分。这样做有两个好处：
>   1.控制渲染顺序
>   2.显示以前或旧值的能力，而不仅仅是加载动画或灰色框。
```JavaScript
const deferredValue = useDeferredValue(value, { timeoutMs: 4000 }); 

return (
  <div>
    <MyComponent value={deferredValue} />
  </div>
);
```

### 4.suspense
> Suspense通过允许我们为尚未准备好显示的 UI 元素指定后备元素。
```JavaScript
<Suspense fallback={<Loading/>}>
    <MyComponent myData={myData}/>
</Suspense>
```

### 5.React.StrictMode包裹下，dev环境，useEffect会执行两次

## 1.类组件和函数组件的区别
1.表面差异：
    * 函数组件内部没有this，类组件内部有this
    * 类组件需要继承Class，函数组件不需要继承Class
    * 类组件内部可以定义并维护state，函数组件为无状态组件（可以通过hooks实现）
    * 函数组件相较于类组件，更灵活，易于编写与逻辑拆分，更适合做UI组件
    * 函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。为了提高性能，尽量使用函数组件
2.

## 2.ref的实际使用场景

## 3.重绘与回流

## 4.React合成事件

## 5.React生命周期及每个生命周期适合做些什么事情
1.初始化渲染阶段：
    * componentWillMount：组件即将被装载、渲染到页面上
    * componentDidMount:组件真正在被装载之后
2.更新阶段
    * componentWillReceiveProps:组件将要接收到属性的时候调用
    * shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
    * componentWillUpdate:组件即将更新不能修改属性和状态
    * render:组件重新描绘
    * componentDidUpdate:组件已经更新
3.卸载阶段
    * componentWillUnmount:组件即将销毁


