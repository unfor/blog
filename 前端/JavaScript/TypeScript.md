TypeScript

1.数据类型;

boolean

number

string

array:	定义数组：

​	1.let list : number[] = [1,2,3]

​	2.let list: Array<number> = [1,2,3]

undefined

null

2.变量声明：

推荐使用let和const声明变量

类型断言：

​	1.使用<>  let stringLength:number = (<string>oneString).length

​	2.使用as	let stringLength:number = (stringLength as string).length

3.泛型：

```typescript
function hello<T>(arg: T): T{

​	return arg;

}
```

4.枚举：

```typescript
//数字枚举
enum OrderStatus{
	start = 1,
	unpaid,	//后面的值会与start同类型且依次递增
	shipping
}

//字符串枚举 手动指定每一个值
```

5.symbol

6.iterator和generator



三、接口和类

1.接口

interface

1.1定义

​	1.可选属性 (？表示可选属性)

​		

```typescript
interface SquareConfig{
	color?: string;
	width?: number;
}
```

​	2.只读属性（readonly）

```typescript
interface Point{
	readonly x: number;
	readonly y: number;
}
```





3.1.2 函数类型

1.接口也可以描述函数类型

> ```typescript
> 	interface SearchFunc {
>         (source: string, subString: string): boolean; //(入参: 入参类型,[...]): 返回值类型
>     }
>     
>     let mySearch: SearchFunc;
> 	mySearch = function(source: string, subString: string){
>         let result = source.search(substring);
>         return result > -1;
>     }
> ```
>
> 

3.1.3 可索引类型

> ```typescript
> interface StringArray {
>     [index: number]: string;
> }
> let myArray: StringArray;
> myArray = ['Bob', 'Fred'];
> let myStr: string = myArray[0];
> ```

3.1.4 继承接口

​	接口可被继承，多继承

3.2 类

3.2.4 存取器

> ​	对于存取器需要注意以下几点：
>
> ​	·需要将编译器设置为输出ECMAScript 5或更高，不支持降级到ECMAScript 3。
>
> ​	·只带有get不带有set的存取器自动被推断为readonly。这在从代码生成.d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许改变它的值。

3.2.5 只读属性

> 可以使用readonly关键字将属性设置为只读的，只读属性必须在声明时或构造函数里进行初始化

3.2.6 类函数和静态属性

> 我们也可以创建类的静态成员，这些属性存在于类本身上面，而不是在类的实例上