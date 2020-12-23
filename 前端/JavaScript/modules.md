1.code 01

```js
//main.js
var {Person} = require ('./person.js');
let p = new Person('张三', 20);
document.write(p.say());	//ok

//person.js
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    say(){
        return `I am ${this.name}`;
    }
}

class Women{
    say(){
        return `I am a women`;
    }
}

module.exports = {
    Person,
    Women
};
```

这种情况下webpack会将main的require编译为：

![image-20200810112149213](C:\Users\leeon\Documents\image-20200810112149213.png)

2.code02

```js
var {Person, Women} = require('./person');

export {
	Person,
    Women
}
```

这种情况下webpack会将Person的导出编译为：

![image-20200810203453038](C:\Users\leeon\Documents\image-20200810203453038.png)

导入会被编译输出为：

![image-20200810203739653](C:\Users\leeon\Documents\image-20200810203739653.png)

总结1：可以看到require的导入方式会将导出的内容先全部加载进文件内，再引用

3.code03

```js
export default {
    Person,
    Women
} 

import A from './person';
```

4.code04

```js
module.exports = {
    Person,
    Women
} 

import A from './person';
```

以上两个导入都会被编译为：

![image-20200810204543293](C:\Users\leeon\Documents\image-20200810204543293.png)

import可以在导入的时候修改别名

**ES6模块/CommonJS模块比较**

1、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用

- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 Modules 的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

2、CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
- 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。