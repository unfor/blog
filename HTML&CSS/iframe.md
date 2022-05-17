# iframe基础知识
## iframe的优缺点
- 优点
1. iframe能够原封不动的把嵌入的网页展现出来;
2. 如果有多个网页引用iframe，那么只需要修改iframe的内容，就可以实现调用每一个页面的更改，方便快捷;
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe嵌套，可以增加代码的可重用;

- 缺点
1. iframe会*堵塞主页面的Onload事件*;
2. iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
3. 代码复杂,无法被一些搜索引擎索引到（有些搜索引擎对框架结构的页面不能正确处理，会影响到搜索结果的排列名次）;
4. 多框架的页面会增加服务器的http请求，影响页面的并行加载,增加服务器负载;

## iframe交互
### 同域名下iframe父子页面通信
1. 父页面调用子页面方法
```JavaScript
//html
<iframe id="zi" name="zi" src="zi.html" frameborder="0"></iframe>
// js
// 获取子页面方法
document.getElementById('zi').contentWindow.ziFn();
// 父页面方法
function fuFn() {
  console.log("我是父页面方法");
}
```
2. 子页面调用父页面方法
```JavaScript
// js
function ziFn() {
  console.log('我是子页面方法');
}
function func() {
// 通过parent对象获取，window 可以省略
  parent.window.fuFn();
}
```
---
### 跨域下iframe父子页面通信(``postMessage``)
1. 子向父传值
- 子iframe代码
```JavaScript
window.parent.postMessage('msg','*');
```

- 父iframe代码
```JavaScript
window.addEventListener('message',function(event){
  if(event.data=='msg'){
    console.log(event);
  }
})
```

2. 父向子传值
- 子iframe代码
```JavaScript
window.addEventListener('message', function() {
  if(event.data=='msg'){
   console.log(event);
  }
});
```

- 父iframe代码
```JavaScript
fuFrame.contentWindow.postMessage('msg','*');
```

### 注意事项：
1. 父窗口给子窗口发信息，需要用iframe的contentWindow属性作为调用主体;
2. 子窗口给父窗口发的信息需要使用window.parent，多层iframe使用window.frameElement,获取顶层窗口可以用window.top;
3. 要确保在iframe加载完成，如iframe还未加载完成就开始调用里面的方法或变量，会报错。可以用onload事件或者用document.readyState=="complete"来判断是否加载完成;

# iframe安全问题
## iframe注入
> iframe 注入是一个非常常见的跨站脚本攻击（XSS）

## 跨框架脚本攻击
> 跨框架脚本攻击（XFS）结合 iframe 和 JavaScript 恶意脚本，用于窃取用户的资料

通过在 Web 服务器配置中设置 Content-Security-Policy: frame-ancestors 和 X-Frame-Options 能防止此攻击

## 点击劫持
> 攻击者通常会通过 iframe 在网站上覆盖一个不可见的 HTML 元素来执行点击劫持

- 有两种主要策略可以保护自己免受点击劫持：
1. 客户端中最流行的方法是 Frame Busting，但这并不是最好的解决方法，因为 iframe 只是被忽略了而已。
2. 服务端中的最好办法是使用 X-Frame-Options。安全专家强烈地建议从服务端解决点击劫持的问题。

## iframe 网络钓鱼
> 攻击者经常滥用这个功能来将 iframe 用于网络钓鱼攻击

在预设情况下，iframe 中的内容能重定向顶级窗口。因此，攻击者可能会利用跨站脚本（XSS）漏洞来将网络钓鱼的代码当作 iframe 植入到 Web 应用程序中，引导用户进入钓鱼网站。
> iframe 网络钓鱼攻击者不能伪造网址栏，但他们能触发重定向，操纵用户之后所接收的内容

这个问题可以通过替换 sandbox 中的 ``allow-top-navigation``[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-allow] 属性值来避免

# 需求
## 在线伴学
sdk中需要嵌入云学堂的教材单页面