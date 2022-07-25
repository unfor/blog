# 详解 useCallback & useMemo

## useCallback

### useCallback 的作用

官方文档：

> Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed.

简单来说就是返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）。

### useCallback 的应用

在线代码： [Code Sandbox](https://codesandbox.io/s/usecallback1-yu1sp)

```javascript
import React, { useState, useCallback } from 'react';
import Button from './Button';

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const handleClickButton1 = () => {
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <div>
      <div>
        <Button onClickButton={handleClickButton1}>Button1</Button>
      </div>
      <div>
        <Button onClickButton={handleClickButton2}>Button2</Button>
      </div>
      <div>
        <Button
          onClickButton={() => {
            setCount3(count3 + 1);
          }}
        >
          Button3
        </Button>
      </div>
    </div>
  );
}
复制代码
// Button.jsx
import React from 'react';

const Button = ({ onClickButton, children }) => {
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
    </>
  );
};

export default React.memo(Button);

```

在案例中可以分别点击Demo中的几个按钮来查看效果：

- 点击 Button1 的时候只会更新 Button1 和 Button3 后面的内容;
- 点击 Button2 会将三个按钮后的内容都更新;
- 点击 Button3 的也是只更新 Button1 和 Button3 后面的内容。

上述效果仔细理一理就可以发现，只有经过 `useCallback` 优化后的 Button2 是点击自身时才会变更，其他的两个只要父组件更新后都会变更（这里Button1 和 Button3 其实是一样的，无非就是函数换了个地方写）。下面我们仔细看看具体的优化逻辑。

> 这里或许会注意到 **[`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo)** 这个方法，此方法内会对 props 做一个浅层比较，如果如果 props 没有发生改变，则不会重新渲染此组件。

```
const a = () => {};
const b = () => {};
a === b; // false

```

上述代码可以看到我们两个一样的函数却是不相等的（这是个废话，我相信能看到这的人都知道，所以不做解释了）。

```javascript
const [count1, setCount1] = useState(0);
// ...
const handleClickButton1 = () => {
  setCount1(count1 + 1);
};
// ...
return <Button onClickButton={handleClickButton1}>Button1</Button>

```

回头再看上面的 `Button` 组件都需要一个 onClickButton 的 props ，尽管组件内部有用 `React.memo` 来做优化，但是我们声明的 `handleClickButton1` 是直接定义了一个方法，这也就导致只要是父组件重新渲染（状态或者props更新）就会导致这里声明出一个新的方法，新的方法和旧的方法尽管长的一样，但是依旧是两个不同的对象，`React.memo` 对比后发现对象 props 改变，就重新渲染了。

```js
const handleClickButton2 = useCallback(() => {
  setCount2(count2 + 1);
}, [count2]);

```

上述代码我们的方法使用 useCallback 包装了一层，并且后面还传入了一个 `[count2]` 变量，这里 useCallback 就会根据 `count2` 是否发生变化，从而决定是否返回一个新的函数，函数**内部作用域**也随之更新。

由于我们的这个方法只依赖了 `count2` 这个变量，而且 `count2` **只在**点击 Button2 后才会更新 `handleClickButton2`，所以就导致了我们点击 Button1 不重新渲染 Button2 的内容。

### 注意点

```javascript
import React, { useState, useCallback } from 'react';
import Button from './Button';

export default function App() {
  const [count2, setCount2] = useState(0);

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, []);

  return (
    <Button 
      count={count2}
      onClickButton={handleClickButton2}
    >Button2</Button>
  );
}

```

我们调整了一下代码，将 useCallback 依赖的第二个参数变成了一个**空的数组**，这也就意味着这个方法没有依赖值，将不会被更新。且由于 JS 的静态作用域导致此函数内 `count2` 永远都 `0`。

可以点击多次 Button2 查看变化，会发现 Button2 后面的值只会改变一次。因为上述函数内的 `count2` 永远都是 `0`，就意味着每次都是 `0 + 1`，Button 所接受的 `count` props，也只会从 `0` 变成 `1`且一直都将是 `1`，而且 `handleClickButton2` 也因没有依赖项不会返回新的方法，就导致 Button 组件只会因 `count` 改变而更新一次。

## useMemo

### useMemo 的作用

官方文档：

> Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed.

简单来说就是传递一个创建函数和依赖项，创建函数会需要返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值。

### useMemo 的应用

useMemo 与 useCallback 很像，根据上述 useCallback 已经可以想到 useMemo 也能针对传入子组件的值进行缓存优化，当然这个值必须是一个对象，如果不是对象而是一些简单类型的如字符串等，那么没更改 **`React.memo`** 也能对比出来，下面就直接举个 🌰 对比一下。

```javascript
// ...
const [count, setCount] = useState(0);

const userInfo = {
  // ...
  age: count,
  name: 'Jace'
}

return <UserCard userInfo={userInfo}>

// ...
const [count, setCount] = useState(0);

const userInfo = useMemo(() => {
  return {
    // ...
    name: "Jace",
    age: count
  };
}, [count]);

return <UserCard userInfo={userInfo}>

```

很明显的上面的 userInfo 每次都将是一个新的对象，无论 `count` 发生改变没，都会导致 UserCard 重新渲染，而下面的则会在 `count` 改变后才会返回新的对象。

上述用法是有有关于父子组件传值带来的性能优化，实际上 useMemo 的作用不止于此，根据官方文档内介绍：

> This optimization helps to avoid expensive calculations on every render.

可以把一些昂贵的计算逻辑放到 useMemo 中，只有当依赖值发生改变的时候才去更新。

```javascript
const num = useMemo(() => {
  let num = 0;
  // 这里使用 count 针对 num 做一些很复杂的计算，当 count 没改变的时候，组件重新渲染就会直接返回之前缓存的值。
  return num;
}, [count]);

return <div>{num}</div>

```

也能在很多情况将两种情况结合起来用。

## Tips

评论中有为朋友提到是否要把所有的方法都用 useCallback 包一层呢，这个应该也是很多刚了解 useCallback 的朋友的一疑问。先说答案是：不要把所有的方法都包上 useCallback，下面仔细讲。

### useCallback

```javascript
// ...
const handleClickButton1 = () => {};
const handleClickButton2 = useCallback(() => {}, [count]);

return (
  <>
    <button onClick={handleClickButton1}>button1</button>
    <button onClick={handleClickButton2}>button2</button
  </>
)

```

上面这种写法在当前组件重新渲染时 `handleClickButton1` 函数会重新渲染，`handleClickButton2` useCallback 里面的函数也会重新渲染。反而加了 useCallback ，在执行的时候还多了 useCallback 中对 `count` 的一个比较逻辑。

**或许有人会问既然都加 useCallback 了怎么还会渲染呢？**

因为 useCallback 中的函数是在当前组件内定义的，组件重新渲染，它自然也会重新渲染，useCallback 的作用只是比较 inputs 发生改变去决定是否要返回新的函数。如果没变化，返回的就是之前缓存的函数，外面使用的还是之前的函数方便做一个优化。useCallback 是要配合子组件的 **`shouldComponentUpdate`** 或者 **`React.memo`** 一起来使用的，否则就是反向优化。

### useMemo

useMemo 跟 useCallback 略有差异，useMemo 我们想要的传入函数的返回值，而不是这个函数，这个返回值呢肯定是在函数执行后才得到的，useMemo 比较 inputs 如果发生改变，那这个函数将不会被执行，函数内所有的复杂计算逻辑也将不会被执行，直接返回之前的缓存值（这能省不少计算消耗）。所以他适用于在当前组件内使用。

当然如果只是进行一些简单的计算也没必要使用 useMemo，这里可以考虑一些计算的性能消耗和比较 inputs 的性能消耗来做一个权衡（如果真有逻辑跟这个比较逻辑差不多，也没必要使用 useMemo ，还能减少一点对键盘磨损 😅）。