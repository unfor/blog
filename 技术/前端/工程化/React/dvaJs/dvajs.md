# 介绍
> dva首先是一个基于redux和redux-sage的数据流方案，然后为了简化开发体验，dva还内置了react-router和fetch，所以也可以理解为一个轻量级的应用框架

## CSS Module
* 存在的目的：避免样式名的冲突，其原理是为每一个类名生成一个唯一的别名

* 如果你想要某个类名或者id不被处理，可以做如下处理
> `#root`我想要保持原样
```css
    :global(#root){
        height: 100%;
    }
``` 

