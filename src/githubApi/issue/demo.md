### react 16.8 hooks

- useState
- useEffect
- useContext
- useReducer
- useMemo
- useCallback
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue


### React v18中的hooks
- useSyncExternalStore
- useTransition
- useDeferredValue
- useInsertionEffect
- useId


### 简单介绍一下 react 18 新增的 hooks

###3 useSyncExternalStore

`useSyncExternalStore`:是一个推荐用于**读取和订阅外部数据源**的 `hook`，其方式与选择性的 `hydration` 和时间切片等并发渲染功能兼容

```javascript
const state = useSyncExternalStore(
    subscribe,
    getSnapshot[, getServerSnapshot]
)

```

* `subscribe`: 订阅函数，用于注册一个回调函数，**当存储值发生更改时被调用**。此外， `useSyncExternalStore` 会通过带有记忆性的 `getSnapshot` 来判别数据是否发生变化，如果发生变化，那么会**强制更新数据**。
* `getSnapshot`: 返回当前存储值的函数。必须返回缓存的值。如果 `getSnapshot` 连续多次调用，则必须返回相同的确切值，除非中间有存储值更新。
* `getServerSnapshot`：返回服务端(hydration模式下)渲染期间使用的存储值的函数

---

#### useTransition

> `useTransition`：
>
> * 返回一个**状态值**表示过渡任务的等待状态，
> * 以及一个启动该过渡任务的函数。

**过渡任务** 在一些场景中，如：`输入框`、`tab切换`、`按钮`等，这些任务需要视图上立刻做出响应，这些任务可以称之为**立即更新的任务**

但有的时候，更新任务并不是那么紧急，或者来说要去请求数据等，导致新的状态不能立马更新，需要用一个`loading...`的等待状态，这类任务就是过度任务

```javascript
const [isPending, startTransition] = useTransition();

```

* `isPending`：**过渡状态的标志**，为`true`时是等待状态
* `startTransition`：可以**将里面的任务变成过渡任务**

---

#### useDeferredValue

> `useDeferredValue`：接受一个值，并返回该值的新副本，该副本将**推迟**到更紧急地更新之后。

如果当前渲染是一个紧急更新的结果，比如用户输入，`React` 将**返回之前的值**，然后**在紧急渲染完成后渲染新的值**。

也就是说`useDeferredValue`可以让状态滞后派生。

```javascript
const deferredValue = useDeferredValue(value);

```

* `value`：可变的值，如`useState`创建的值
* `deferredValue`: 延时状态

> **useTransition和useDeferredValue做个对比**
>
> * 相同点：`useDeferredValue` 和 `useTransition` 一样，都是**过渡更新任务**
> * 不同点：`useTransition` 给的是一个**状态**，而`useDeferredValue`给的是一个**值**

---

#### useInsertionEffect

`useInsertionEffect`：与 `useLayoutEffect` 一样，但它在所有 DOM 突变之前**同步触发**

在执行顺序上 `useInsertionEffect` > `useLayoutEffect` > `useEffect`

> `seInsertionEffect` 应仅限于 `css-in-js` 库作者使用。  
> 优先考虑使用 `useEffect` 或 `useLayoutEffect` 来替代。

---

#### useId

`useId` ： 是一个**用于生成横跨服务端和客户端的稳定的唯一 ID** 的同时避免`hydration`不匹配的 hook。

---


### 参考文档
- https://juejin.cn/post/7118937685653192735
