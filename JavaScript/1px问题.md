# 为什么会存在1px问题？怎么解决？

## 前言
在面试中我们常会被问到怎么解决1px问题，要知道解决方案，我们首先要知道这个问题的来源。在这篇文章里，我会尽可能通俗的阐述这个问题出现的源头，一起去思考这个问题的解决方案。

## 设备尺寸、像素、分辨率
- 设备尺寸: 设备尺寸指的是设备对角线的长度，单位是英寸。
- 像素: 是组成图片的色彩和亮度的最小图像单元，是显示屏的画面上能表现出来的最小单位。
- 分辨率: 屏幕分辨率是指纵横向上的像素点数，单位是px。

两个大小尺寸相同的屏幕而言：当屏幕分辨率低时（例如 640 x 480），在屏幕上显示的像素少，单个像素尺寸比较大。屏幕分辨率高时（例如 1600 x 1200），在屏幕上显示的像素多，单个像素尺寸比较小。

分辨率越高，展现的色彩越细腻，这就是为什么我们追求高分辨率的设备。

## 逻辑像素
那么问题出现了：现在各尺寸、分辨率的设备层出不穷，固定尺寸参数的图片，如果设备的分辨率翻了一倍，那么我们的图片在设备上就缩小了一倍。（1CSS像素在屏幕上表现为1设备物理像素，分辨率翻倍，设备的长和宽方向上的像素数量翻了一倍）

对于前端开发人员，我们如何解决这个问题呢？难道要针对各式各样的机型都设计一份设计稿吗？针对这个问题，乔布斯提出了逻辑像素的概念，可以很好的解决这个问题。

> 逻辑像素

乔布斯在iPhone4的发布会上首次提出了Retina Display(视网膜屏幕)的概念，在iPhone4使用的视网膜屏幕中，把2x2个像素当1个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。

从此以后ios高分辨率的设备，多了一个逻辑像素。这些设备逻辑像素的差别虽然不会跨度很大，但是仍然有点差别，于是便诞生了移动端页面需要适配这个问题。

值得一提的是，在PC端，1CSS像素仍表现为1物理像素，但是在移动端设备上（包括安卓手机），此后就出现了逻辑像素的概念，1CSS像素在物理上具体的像素值由设备不同的逻辑像素决定。（有点绕）

举个例子: iPhone6的物理像素是750*1334，逻辑像素是375*667, 设备像素比是2，这意味着我们把2*2的物理像素当成1*1的像素来使用。当我们设置某元素的宽度为10px时，我们实际上是在设置逻辑像素

## 设备像素比dpr

设备像素比（device pixel ratio），即设备逻辑像素与物理像素的比值。

常见的有2dpr、3dpr。

## 1px问题
如果我们要画一条物理像素为1px的边框，我们可以先通过媒体查询来查询本设备的dpr那么在像素比为2dpr的设备上，我们在css中要设置border:0.5px solid red,这很容易理解，因为css中我们写的是逻辑像素。

如果我们这样实现，在不同浏览器中，实际上展现效果大不相同。

> chrome：把小于0.5px的当成0，大于等于0.5px的当作1px
firefox：会把大于等于0.55px的当作1px
safiri:把大于等于0.75px的当作1px

进一步在手机上观察iOS的Chrome会画出0.5px的边，而安卓(5.0)原生浏览器是不行的。所以直接设置0.5px不同浏览器的差异比较大。

我们可以采用伪元素+transform的方式解决该问题

```CSS
.scale-1px{
  position: relative;
  border:none;
}
.scale-1px:after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #000;
  width: 100%;
  height: 1px;
  /*核心是利用transform缩放边框*/
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
```

也可以结合JS代码来判断是否设备像素比是不是2dpr
```JavaScript
if(window.devicePixelRatio && devicePixelRatio >= 2){
  document.querySelector('ul').className = 'scale-1px';
}
```

三倍屏的解决方案类似。核心原理都是通过伪元素添加1px的边框，并通过transform的方式缩放边框

## 总结
没有提出逻辑像素的概念之前，1px的CSS像素就体现为1物理像素，在该概念出现之后，在移动端设备上，1px的CSS像素体现的物理像素就由逻辑像素比决定。

因此又引申出了1px问题，因为通常我们在设计1px的边框时，我们是想要1px的物理像素。如果我们仅仅根据设备像素比来计算出需要书写的CSS像素时，又会因为不同浏览器的策略而出现许多兼容性问题，针对此问题，我们可以通过``伪元素+transform``的手段来解决。