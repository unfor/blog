Transition：

​	构造方法中：

1. 从services.$q中获取defer()的返回值
2. 从defer的返回值中获取promise
3. 依照this对象构建一个HookBuilder对象
4. 检查这个transition对象是否是当前激活或运行的
5. 获取传入的router、targetState
6. 将this和options封装进options私有对象中
7. 获取一个id
   1. TransitionService中记录了当前transition的数量，并以此count的数值作为id
8. 调用PathUtils.buildToPath获取fromPath至targetState的path
   1. 调用buildPath(targetState)的方法获取一个toPath【这个toPath应该是一个数组】
      1. 首先取出targetState中的params
      2. 遍历targetState.$state().path对象，每一个都先构建一个PathNode而后调用applyRawParams(toParams)方法
         1. paramSchema对象调用reduce方法依次调用applyPairs(memo, pDef)并获取一个paramValues的对象
            1. applyPairs方法会将pDef中的key value元组对象封装成key value键值对并放入memo对象中memo[key] = value
9. 根据fromPath、toPath以及options中的reloadState调用PathUtils.treeChanges（这个里面做了什么？有点没看懂）
   1. 获取from
   2. 获取retained对象，从0至当前不用变化的
   3. 获取exiting对象，从当前至末尾
10. 调用createTransitionHookRegFns方法
11. 调用buildHooksForPhase方法
12. 调用transitionHook的invokeHooks方法
13. 利用router对象调用applyViewConfigs

并在Transition对象的原型上定义了类似生命周期方法以供调用