Promise信任问题

1.调用过早：

> ​	对一个Promise调用then(..)的时候，即使这个Promise已经决议，提供给then(..)的回调也总会被异步调用

2.调用过晚：

> ​	Promise创建对象调用resolve(..)或reject(..)时，这个Promise的then(..)注册的观察回调就会被自动调度。可以确信，这些被调度的回调在下一个异步事件点上一定会被触发

3.回调未调用：

> ​	function timeoutPromise(delay){
>
> ​		return new Promise( function(resolve, reject){
>
> ​				setTimeout( function(){
>
> ​					reject( "Timeout" );
>
> ​				}, delay);
>
> ​		} );
>
> ​	}
>
> ​	Promise.race([
>
> ​		foo(),
>
> ​		timeoutPromise( 3000 )
>
> ​	]).then(
>
> ​		function(){
>
> ​			//foo(...)及时完成
>
> ​		},
>
> ​		function(err){
>
> ​			//或者foo()被拒绝，或者未能按时完成
>
> ​		}
>
> ​	)

4.调用次数过少或过多

> ​	由于Promise只能被决议一次，所以任何通过then(..)注册的（每个）回调就只会被调用一次

5.未能传递参数/环境值

> ​	Promise至多只能有一个决议值（完成或拒绝）。如果你没有用任何值显式决议，那么这个值就是undefined

6.吞掉错误或异常

> 如果拒绝一个Promise并给出一个理由（也就是一个出错消息），这个值就会被传给拒绝回调

7.是可信任的Promise嘛

