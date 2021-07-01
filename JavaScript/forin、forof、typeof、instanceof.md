1.for in和 for of的区别？

- for in遍历的是key，而for of遍历的是value
- 推荐使用for in遍历对象，而使用for of遍历数组
- for in和for of中都可以使用break语句
- for in会将原型中的属性也遍历出来，可以配合hasOwnProperty过滤出属于自己的属性

2.type of和instance of的区别？

- **instanceof** 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，如果改变原型链的话，结果可能会变化

- typeof操作符返回一个**字符串**,指示未经计算的操作数的类型。

- typeof会返回一个变量的基本类型,instanceof返回的是一个布尔值

- instanceof只能用来判断对象和函数，不能用来判断字符串和数字等，typeof不能用于判断是否为数组，因为都会返回object

  拓展：判断函数或数组可以还可以使用Object.prototype.toString.call();