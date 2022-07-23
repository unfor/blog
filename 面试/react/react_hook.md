# React Hook背景

# Hooks概览
## 1.`useRef` & `useImperativeHandle`
* `useRef`:
### 说明：
> `useRef` 返回一个可变的ref对象，其`.current`属性被初始化为传入的参数（`initialValue`）
> 返回的 `ref` 对象在组件的整个生命周期内保持不变。

* `useImperativeHandle`:
### 说明：
> 需要和`forwardRef`搭配使用
> 子组件利用`useImperativeHandle`可以让父组件输出任意数据
> 便于控制对外暴露的接口限制


