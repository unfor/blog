* `Object.defineProperty`
    > 原生情况下挂载在 `Object` 上的属性是不可枚举的，但是直接在 `Object` 上挂载属性 `a` 之后是可枚举的，所以这里必须使用 `Object.defineProperty`，并设置 `enumerable: false` 以及 `writable: true`, `configurable: true`

* `undefined` 和 `null` 是相等的
```JavaScript
 console.log(undefined == null) // true
 console.log(undefined === null) //false
```

*  `hasOwnProperty`可以判断是否是自有属性
```JavaScript
var anotherObject = {
    a: 1
};

// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );
myObject.b = 2;

("a" in myObject); // true
("b" in myObject); // true

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
```

## 遍历对象属性
1. Object.getOwnPropertyNames:  
    Object.getOwnPropertyNames()方法返回一个由指定对象的所有*自身属性*的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组
    > *自身*  *可枚举+不可枚举*  *不包含Symbol*

2. Object.getOwnPropertySymbols:
    方法返回一个给定对象自身的所有 Symbol 属性的数组
    > *自身* *Symbol*

3. Reflect.ownKeys:
    返回一个由目标对象自身的属性键组成的数组 `Reflect.ownKeys = Object.getOwnPropertyNames + Object.getOwnPropertySymbols`
    > *自身* *Symbol与非Symbol*

4. for...in
    使用 `for..in` 循环仅仅会遍历出 *所有*  *可枚举* 的属性。并复制给新的目标对象（使用 `hasOwnProperty` 获取自有属性，即非原型链上的属性）。
    > *所有*  *可枚举*

5. Object.keys
    `Object.keys(..)` 返回一个数组，包含所有可枚举属性。只会查找对象直接包含的属性，不查找[[Prototype]]链（Cannot convert undefined or null to object）

## 深拷贝与浅拷贝的概念
深拷贝与浅拷贝的概念自然不需多说，从两个角度：
1. 从拷贝深度来说：浅拷贝仅仅拷贝一层，而深拷贝会递归每一层都拷贝一份
2. 从修改值产生的影响来说：深、浅拷贝对于基本类型值，都是直接拷贝一份新的；而对于引用类型（函数、对象、数组、Symbol），浅拷贝仅仅拷贝一份引用，所以修改新对象会对老对象产生影响，而深拷贝则会开辟一个新的空间
> 进而，深拷贝简单来讲，主要就是怎么去处理非基本类型的拷贝

## 补充概念
* 对象属性
    对象中的属性除了存在于自身，在查找的过程中还会遍历原型链进行查找。这也就造成了，在部分遍历中，会遍历到不属于对象自身的属性，会导致意外修改原型链中属性的问题；常见于`in`操作符。`hasOwnProperty`可以进一步判断，对象上是否存在此属性
    
* 可枚举属性

## 已有拷贝方案
### 浅拷贝
* `Object.assign`
    * 将所有*可枚举属性*的值从一个或多个源对象复制到目标对象，同时返回*目标对象*（会修改原对象)
    * `String`类型和`Symbol`类型的属性都会被拷贝，而且不会跳过那些值为`null`或`undefined`的源对象
    * 会触发`[[get]]`、`[[set]]`

* `spread`展开语法
    * 实际效果同`Object.assign`

* `Array.prototype.slice`
    * `slice` 方法返回一个新的数组对象

### 深拷贝
* `JSON.stringify`
    * 会返回一个新的对象
    * 存在的问题
        1. 会忽略 undefined
        2. 会忽略 symbol
        3. 不能序列化函数
        4. 不能解决循环引用的对象
        5. 不能正确处理new Date()
        6. 不能处理正则

* 自实现
    
## 思考补充
1. 如果可以正确拷贝函数的话，拷贝过程中是否会存在`this`丢失的问题

2. 会不会意外的拷贝到非存在于对象自身的属性，原型链的概念
> 可以通过 `for...in` + `hasOwnProperty` 的方式去限制对于非自身属性的操作

3. 对于`null`和`undefined`又是怎么处理的
> 直接return对应的值