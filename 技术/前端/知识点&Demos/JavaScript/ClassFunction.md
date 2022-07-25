```javascript
function Foo(){};

var foo = new Foo();

Object.getPrototypeOf(foo) == Foo.prototype //true
```

在上述操作中，并没有复制任何的属性，而是仅仅将两个对象的prototype关联到了一起

> 继承意味着复制操作，JavaScript（默认）并不会复制对象属性。相反，JavaScript会在两个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数

```javascript
function Foo(){};

Foo.prototype.constructor == Foo;	//true
var foo = new Foo();
foo.constructor == Foo; //true
```

constructor属性列举的是对象关联的函数，或者说是创建这个对象的函数

var A = Object.create(B)	=>   这种情况之下，A是由B创建，那么A.prototype.constructor = B;

对象B实际上并不是被差异构造出来的，我们只是定义了B的一些指定特性，其他没有定义的东西都变成了“洞”。而这些洞（或者说缺少定义的空白处）最终会被委托行为“填满”。

（使用类时）你最直观的想法可能是使用Bar instanceof Foo（因为很容易把“实例”理解成“继承”），但是在JavaScript中这是行不通的，你必须使用Bar.prototype instanceof Foo。

## 在JS中New操作符具体干了什么？
1，创建一个空对象  var obj = new Object();
2，让空对象的原型属性指向原型链，设置原型链 obj._proto_=Func.prototype;
3，让构造函数的this指向obj，并执行函数体 var result=Func.call(obj);
4，判断返回类型，如果是值就返回这个obj，如果是引用类型，返回这个引用对象。

```JavaScript
function New () {  
    var obj = new Object();  
    obj._proto_ = Object.prototype;  
    Object.call(obj);  
    return typeof result === 'object'? result : obj;
}
```