# **1.由useEffect的依赖引发的问题**

```javascript
function ErrorDemo() {
  const [count, setCount] = useState(0);
  const dom = useRef(null);
  //正确解法三
  const countRef = useRef(count);
    useEffect(() => {
        dom.current.addEventListener('click', () => {
            console.log(countRef.current);
            setCount(prevCount => {
                const newCount = ++prevCount;
                countRef.current = newCount;
                return newCount;
            });
        });
    }, []);
    useEffect(() => {
		//错误解法
        dom.current.addEventListener('click', 
			() => setCount(prevCount => ++prevCount));
		//正确解法四
        dom.current.addEventListener('click', () => {
            console.log(count);
            setCount(prevCount => ++prevCount);
        });
    }, []);
	//正确解法五
    useEffect(() => {
        const $dom = dom.current;
        const event = () => {
            console.log(count);
            setCount(prev => ++prev);
        };
        $dom.addEventListener('click', event);
        return () => $dom.removeEventListener('click', event);
    }, [count](写[]也是正确的));


//正确的方式一
  useEffect(() => {
    dom.current.addEventListener('click', () => setCount(count + 1));
  });
//正确的方式二
  return <div ref={dom}>{count}
		<p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
	</div>;
}

```

在上面这段代码中，第一种方式产生的count最大只能为1，而第二种第三种都可以获取正确的count值并进行更新。

![](https://tcs.teambition.net/storage/111r0ed1e91c9224273cf01dc2878d267257?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXIwZWQxZTkxYzkyMjQyNzNjZjAxZGMyODc4ZDI2NzI1NyJ9.4I7C_rYTCOE39JdjmLOpsoojeCSSPVPiIdZyrnktfb8&download=image.png "")

这段话主要阐明以下几点：

1.useEffect函数接收一个函数

2.react会在DOM更新之后去调用这个传入的函数

![](https://tcs.teambition.net/storage/111r1b37bc6d027d66f6b874912a62d6aa15?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXIxYjM3YmM2ZDAyN2Q2NmY2Yjg3NDkxMmE2MmQ2YWExNSJ9.oKWlh_C1RfceqBiPcCFSU9U4qV95pgR_GXx4yr3FZKg&download=image.png "")

我们可以在 effect 中获取到最新的 `count` 值，因为他在函数的作用域内。当 React 渲染组件时，会保存已使用的 effect，并在更新完 DOM 后执行它。这个过程在每次渲染时都会发生，包括首次渲染。每次我们重新渲染，都会生成*新的 effect*，替换掉之前的。

![](https://tcs.teambition.net/storage/111r028046ab1b6f8277b147b7337460b0f7?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXIwMjgwNDZhYjFiNmY4Mjc3YjE0N2I3MzM3NDYwYjBmNyJ9.rzZYi4vZFcxza8r4iREr2nRImTvP_uxsdFWfwsptClE&download=image.png "")

以上说明以下几点：

1.effect中返回一个函数，此函数会在组件卸载时被调用

如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React **跳过**对 effect 的调用，只要传递数组作为 `useEffect` 的第二个可选参数即可：

![](https://tcs.teambition.net/storage/111ra4c7f338b3f79f4ec268461ee4168d96?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJhNGM3ZjMzOGIzZjc5ZjRlYzI2ODQ2MWVlNDE2OGQ5NiJ9.Xm1wlSQTL17dj9zwHEvoscDDc6M1Utq7A8prOcWZAL8&download=image.png "")

上图说明了以下几点：

1.当传递的第二个参数不变时，将跳过useEffect的执行，此时effect中的所有props、state都是旧的值。

2.useEffect必会在组件挂载和卸载时执行

3.浏览器会确保渲染任务即render彻底结束时才会调用useEffect

也就是说，错误的做法中的count每次都是初始值0（闭包），由于传入了空数组，所有effect得不到更新。

对于解法四：

![](https://tcs.teambition.net/storage/111r53f391b00551c2b897656bd5164613df?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI1M2YzOTFiMDA1NTFjMmI4OTc2NTZiZDUxNjQ2MTNkZiJ9.2pnc2lg48JWEADXleJ6IkyPVnkVplU1iYjJ_rjcnh0M&download=image.png "")

就我个人感觉，解法四和解法五中并没有触及到问题的根本，只是找了个方法绕开

**intotal:**

**1.useEffect接收一个函数，且useEffect固定会在组件每一次render时延迟调用（在浏览器渲染完成之后），且会使用最新的effect；**

**2.effect中返回的函数会在组件卸载时调用；**

**3.传入第二个参数，当第二个参数更新时，才会调用useEffect（当然，使用的props、state值会是最新的），否则使用的永远是初始值。**

# 2.useCallback和useMemo到底怎么用

![](https://tcs.teambition.net/storage/111r55ac0fb7e9e64f1406eb92dd9d6f86d1?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI1NWFjMGZiN2U5ZTY0ZjE0MDZlYjkyZGQ5ZDZmODZkMSJ9.NU73pNazfSCxCHVQAPnGjGRoNxl-gtHMw58bAOqdJHg&download=image.png "")

```javascript
//防抖函数，给定的ms时间范围内仅允许一次点击
function debounce(fn, ms){
    if(timeout) return;
    let timeout = setTimeout(()=>{
        fn();
        clearTimeout(timeout);
    }, ms);
}
//一不小心写错了防抖函数
function debounce(fn, gapTime = 1500) {
    let _lastTime = null;
    return function () {
        let _nowTime = + new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments);
            _lastTime = _nowTime;
        }
    }
}

function BadDemo() {
    const [count, setCount] = useState(0);
    const handleClick = debounce(() => {
        setCount(c => ++c);
    }, 2000);
    return <div onClick={handleClick}>{count}</div>;
}
```

我们希望每2秒只能触发一次 count + 1 ，这个组件在理想逻辑下是OK的。但现实是骨感的，我们的页面组件非常多，这个 BadDemo 可能由于父级什么操作就重新render了。现在假使我们页面每500毫秒会重新render一次，那么就是这样：

```javascript
function BadDemo() {
  const [count, setCount] = useState(1);
  const [, setRerender] = useState(false);
  const handleClick = debounce(() => {
    setCount(c => ++c);
  }, 2000);
  useEffect(() => {
    // 每500ms，组件重新render
    window.setInterval(() => {
      setRerender(r => !r);
    }, 500);
  }, []);
  return <div onClick={handleClick}>{count}</div>;
}
```

**结果=>只要被点击一次，就会开始疯狂计数，因为每次handleClick都会是一个新的handleClick**

进而考虑使用useCallback缓存handleClick方法：

```javascript
const handleClick = useCallback(debounce(() => {
  setCount(c => ++c);
}, 2000), []);
```

看似解决了问题，如果结合第一个问题中的描述，setCount函数中有了依赖count，那么会是什么结果，**结果是=>会像useEffect中的那样，count只会更新到1，原因自然也是闭包导致.**

![](https://tcs.teambition.net/storage/111reebf175e0dd239be00e1e0185b721cef?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJlZWJmMTc1ZTBkZDIzOWJlMDBlMWUwMTg1YjcyMWNlZiJ9.ThkqmW3yD8ufQht6fbsx3LYEb5ftAROm2ZyjsViX48E&download=image.png "")

正确的姿势应该是使用 `useMemo` :

```javascript
const handleClick = useMemo(
  () => debounce(() => {
    setCount(count + 1);
  }, 1000),
  [count]
);
```

这样保证每当 `count` 发生变化时，会返回一个新的加了防抖功能的新函数。

![](https://tcs.teambition.net/storage/111r6e002e53620b4026019fe4418305d912?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXI2ZTAwMmU1MzYyMGI0MDI2MDE5ZmU0NDE4MzA1ZDkxMiJ9.73wGZI3A-GK93WjZefxPM_zB5WckLUe4XXDm7FCE3x4&download=image.png "")

喵喵喵？这么草率？仔细对比不难发现，如果仅仅将此处的useMemo换成useCallback，也能得到正确的结果，我也就呵呵了，原文链接

[写React Hooks前必读 - 掘金](https://juejin.im/post/5e6ccbf86fb9a07cb52bddf1#heading-5)

蚂蚁金服？？？excuse Me？？？

所以最终影响结果的并不是上面所论述的，而是闭包和更新问题，如果没有刷新，那么依赖项就会使用原先的旧值，但如果更新了，就会使用新值，函数式更新另算。那么下面开始探究useCallback和useMemo的真正用法及区别

wait！！！

![](https://tcs.teambition.net/storage/111raf22639b25f1cde012ec17cebaa09a8b?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXJhZjIyNjM5YjI1ZjFjZGUwMTJlYzE3Y2ViYWEwOWE4YiJ9.zNsOjhjqX795n8nf0ysfOc5ayjFd1V5s7iQq39w5zTM&download=image.png "")

![](https://tcs.teambition.net/storage/111r33c59f68d1bd3fd25725708076f51fe4?Signature=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBcHBJRCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9hcHBJZCI6IjU5Mzc3MGZmODM5NjMyMDAyZTAzNThmMSIsIl9vcmdhbml6YXRpb25JZCI6IiIsImV4cCI6MTYwOTMzOTg5NSwiaWF0IjoxNjA4NzM1MDk1LCJyZXNvdXJjZSI6Ii9zdG9yYWdlLzExMXIzM2M1OWY2OGQxYmQzZmQyNTcyNTcwODA3NmY1MWZlNCJ9.056W0n3lfZ3O-reDWHaUH9t-svFf6NVN_HpTZcqG9Nc&download=image.png "")

**也就是说，useCallback会直接将fn缓存进来，而useMemo则缓存的是这个fn的返回值，useMemo可以用来缓存动态计算后得到的值，可以将通过大量计算得到的值并且又会变化的值使用useMemo包裹起来，而会变化的函数使用useCallback包裹起来，tip：对于通过大量计算并不会改变的值可以使用ref存储。**

哈哈哈哈哈，之前写的代码，使用useMemo的方式怎么也无法生效，**原因是fn和()=>fn以及fn=>{fn}的区别！！！**

```javascript
()=>fn 
()=>{return fn}
```

至此可以说明，这两个函数至少在这个例子上没有任何区别。

有区别的例子居然被我在CSDN上找到了，哈哈哈哈

[useMemo与useCallback使用指南_JavaScript_大灰狼的小绵羊哥哥的博客-CSDN博客](https://blog.csdn.net/sinat_17775997/article/details/94453167)

