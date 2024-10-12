**关键词**：redux 插件

在 Redux 中，可以编写一个日志插件来记录状态的变更。以下是实现的步骤：

1. 创建日志插件函数：

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("prev state", store.getState());
  console.log("action", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};
```

这个函数接收一个 Redux store 对象，返回一个中间件函数。这个中间件函数接收下一个中间件的调用函数`next`和当前的动作`action`。

2. 将日志插件添加到 Redux store：

```javascript
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import loggerMiddleware from "./loggerMiddleware";

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
```

在创建 Redux store 的时候，使用`applyMiddleware`函数将日志插件中间件添加到 store 中。

这样，每当有动作被派发时，日志插件就会在控制台打印出当前的状态、动作和下一个状态，从而实现记录状态变更的目的。
