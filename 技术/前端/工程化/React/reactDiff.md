## Diff算法
> 计算一棵树形结构转换成另一棵树形结构的最少操作
## 普通的Diff算法
> 使用递归比较的方式计算，时间复杂度O(n^3)

## React的Diff算法
> 优化至O(n)

* `tree diff`
    1. 仅仅在*同一层*进行对比，前后节点不相同，则直接将节点及其子节点全部丢弃。
    2. 对于不同层级，仅有创建和删除操作。

* `component diff`
    1. 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
    2. 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
    3. 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。

* `element diff`
    > 当节点处于同一层级时，React diff 提供了三种节点操作，分别为：`INSERT_MARKUP（插入）`、`MOVE_EXISTING（移动）`和 `REMOVE_NODE（删除）`。
    1. *INSERT_MARKUP*，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
    2. *MOVE_EXISTING*，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
    3. *REMOVE_NODE*，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

    > 允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，

## 总结
* React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
* React 通过分层求异的策略，对 tree diff 进行算法优化；
* React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
* React 通过设置唯一 key的策略，对 element diff 进行算法优化；
* 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
* 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。


【参考：】
[https://segmentfault.com/a/1190000004003055]