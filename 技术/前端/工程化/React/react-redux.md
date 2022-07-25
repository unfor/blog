## Redux三个API
* getState
* dispatch
* subscribe

## Redux三大原则：
* 单一数据源
* state是只读的
* 使用纯函数来修改

## react-redux
> react-redux提供Provider和connect两个API，Provider将store放进this.context里，省去了import这一步，connect将getState、dispatch合并进了this.props，并自动订阅更新：
* Provider: 使用React Contex 将store放入 this.context中
* connect: 使用装饰器模式实现，所谓装饰器模式，简单地说就是对类的一个包装，动态地拓展类的功能。connect以及React中的高阶组件（HoC）都是这一模式的实现。


