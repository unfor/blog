## 回流与重绘

## [flex布局最后一行左对齐](./flex%E5%B8%83%E5%B1%80%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8C%E5%B7%A6%E5%AF%B9%E9%BD%90.html)
```css
    .list>i{
        width: 66px;
    }
```

## BFC的原理及其应用
### 常见定位方案
* 普通流
> 元素按照其在HTML的先后位置由上而下布局
---
* 浮动布局
> 元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左或向右偏移
---
* 绝对定位
> 在绝对定位布局中，元素会脱离普通文档流

### BFC概念
BFC(block formating contexts)块级格式上下文。属于定位方案中的普通流。
具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素。

### 如何触发BFC
1. `body`根元素
2. 浮动元素: `float`除none以外的值
3. 绝对定位元素: `position`(absolute, fixed)
4. `display`为inline-block、table-cell、flex
5. `overflow`: 除了visible以外的值

### BFC的特性及应用
1. 同一个BFC下外边距会发生折叠
```html
<style>
        div{
            width: 100px;
            height: 100px;
            background-color: red;
            margin: 100px;
        }
</style>
<body>
    <div></div>
    <div></div>
</body>
```
解决方法：不放在同一个BFC内
```html
<style>
    div{
        overflow: hidden;
    }
    p{
        width: 100px;
        height: 100px;
        background-color: red;
        margin: 100px;
    }
</style>
<body>
    <div>
        <p></p>
    </div>
    <div>
        <p></p>
    </div>
</body>
```

2. BFC可以包含浮动的元素(清除浮动)
```html
<style>
    div{
        border: 1px solid red;
        overflow: hidden;
    }
    .float-div{
        width: 100px;
        height: 100px;
        background-color: red;
        float: left;
    }
</style>
<body>
    <div>
        <div class="float-div"></div>
    </div>
</body>
```

3. BFC可以阻止元素被浮动元素覆盖
```html
<div style="width: 100px; height: 100px; background-color: red; float: left;">左浮动</div>
<div style="width: 200px; height: 200px; background-color: #ccc;overflow: hidden;">
    就爱上了都哭了卡手机丢了静安寺来得及拉接收端阿拉基是打了卡时间的垃圾睡了多久拉屎绝对 路径sad
</div>
```

## CSS引入
### CSS引入方式
1. 内联
```css
<style></style>
```
2. 内嵌
```html
<div style="color: red"></div>
```
3. 外链
```html
<link href="./index.css" type="stylesheet" />
```
4. 导入
```css
@import(./index.css)
```

### 使用注意事项
1. 如果将`style`标签写在`body`后，会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后会<b>重新渲染</b>，甚至会出现FOUC现象（页面闪烁）；

## CSS选择器
### CSS选择器种类
1. id选择器
2. 标签选择器
3. 类选择器

4. 属性选择器
5. 伪类选择器
6. 伪元素选择器

7. 子选择器
8. 后代选择器

## CSS性能优化的方式有哪些？
1. 精简样式文件
2. 利用继承减少代码量
3. 内联首屏关键CSS
4. 异步加载CSS
    1. 使用JavaScript动态创建样式表link元素，并插入到DOM中 
    ```JavaScript
       const myCSS = document.createElement("link");
       myCSS.rel = "stylesheet";
       myCSS.href = "mystyles.css";

       document.head.insertBefore(myCSS, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
    ```

    2. 修改link标签（有兼容性问题）
    ```html
    <link rel="preload" href="mystyle.css" as="style" onload="this.rel='stylesheet'">
    ```
    或者
    ```html
    <link rel="alternate stylesheet" href="mystyle.css" onload="this.rel='stylesheet'">
    ```
5. 压缩文件
6. 正确的使用选择器
    * 不要嵌套过多复杂的选择器
    * 通配符选择器尽量少用
    * 不要为了速度而放弃可维护性和可读性
7. 慎用一些CSS属性
8. 不要使用`@import`
使用`@import`引入CSS会影响浏览器的并行下载
9. 减少页面重排、重绘

## CSS实现垂直水平居中的方式有哪些
### 水平居中
1. 行内元素水平居中
```css
{text-align: center}
```
2. 块级元素水平居中
    * 定宽的块级元素水平居中
    ```css
    {margin: 0 auto;}
    ```
    * 不定款的块级元素水平居中
    1. 
    ```css
    {display: table; margin: 0 auto;}
    ```
    2. 
    ```css
    {display: inline-block; text-align: center;}
    ```
3. 使用`flex`布局
4. `position` + 负`margin`
5. `position` + `margin:auto`
6. `position` + `transform`
### 垂直居中
1. 单行文本垂直居中
    1. `padding-top` = `padding-bottom`
    2. `line-height` = `height`
2. 多行文本垂直居中
    1. 设置父级元素`display: table`，子元素设置 `table-cell` 和`vertical-align: middle`
    
3. `flex`布局
4. 利用`position`和`top`和负`margin`
### 垂直水平居中
1. 使用`flex`布局
2. 利用`position`
```css
{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```
3. 使用`table-cell`实现
