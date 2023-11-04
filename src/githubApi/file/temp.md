## React 用有多少个 hooks

拉了下`React`最新代码，这一看不要紧，居然已经有22个`hook`了。

* `react`包导出了21个

* `react-dom`包导出了1个（`useFormStatus`）

### 时代的更迭

截止当前，`React`的发展主要经历了3个时期：

* `CSR`时期（客户端渲染时期）

* 并发时期

* `RSC`时期（服务端组件时期）

当前的22个`hook`也都是这3个时期的产物。

### `CSR`时期

与状态的流转相关的：

1. `useState`

2. `useReducer`

3. `useContext`

与处理副作用相关的：

4. `useEffect`

5. `useLayoutEffect`

与提高操作自由度相关的：

6. `useRef`

与性能优化相关的：

7. `useMemo`

8. `useCallback`

与调试相关：

9. `useDebugValue`

随着`React`持续迭代，又引入了几个`hook`，本质来说他们都是为了完善`CSR`的开发模式，对现有`hook`能力进行补充或约束：

10. `useImperativeHandle`（控制`useRef`防止其失控）

11. `useEffectEvent`（对`useEffect`能力的补充）

12. `useInsertionEffect`（对`useEffect`场景的补充）

13. `useMemoCache`（减少性能优化心智负担）

* 开发者需要考虑是否需要性能优化

* 开发者需要考虑何时使用`useMemo`、`useCallback`

为了解决这个问题，在2021年的`React Conf`，黄玄带来了**能够通过编译器生成等效于useMemo、useCallback代码**的方案 —— `React Forget`。

`useMemoCache`就是`React`内部为`React Forget`提供缓存支持的`hook`。

**所以这个`hook`是给编译器用的，而不是我们普通开发者。**

### 并发时期

随着并发特性落地，首先推出的是2个并发相关`hook`：

14. `useTransition`

15. `useDeferredValue`

这2个`hook`的本质都是降低更新的优先级，**更新**意味着**视图渲染**，所以当更新拥有不同优先级后，这意味着**视图渲染**拥有不同优先级。

这就是并发更新的理论基础。

但是，并发更新的出现，打破了`React`沿袭多年的**一次更新对应一次渲染**的模式。

为了让现有的库兼容并发模式，推出了如下`hook`：

16. `useMutableSource`

17. `useSyncExternalStore`

所以，上述2个`hook`主要是面向开源库作者。

### `RSC`时期

18. `useId`

19. `use`

20. `useCacheRefresh`（用于建立`<Suspense>`缓存）

21. `useOptimistic`

22. `useFormStatus`

最后这2个`hook`都是为了优化**表单提交**这一场景（也可以说是`RSC`与客户端的交互场景）。


### 参考文章

https://juejin.cn/post/7239910240358465596
