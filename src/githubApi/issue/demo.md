vue3 的响应式库是独立出来的，它可以很方便的集成进 React， 作为 React 的状态管理库使用！

### 使用示范
定义 store
```typescript
// store.ts
import { reactive, computed, effect } from '@vue/reactivity';

export const state = reactive({
  count: 0,
});

const plusOne = computed(() => state.count + 1);

effect(() => {
  console.log('plusOne changed: ', plusOne);
});

const add = () => (state.count += 1);

export const mutations = {
  // mutation
  add,
};

export const store = {
  state,
  computed: {
    plusOne,
  },
};

export type Store = typeof store;
```

消费使用
```js
// Index.tsx
import { Provider, useStore } from 'rxv'
import { mutations, store, Store } from './store.ts'
function Count() {
  const countState = useStore((store: Store) => {
    const { state, computed } = store;
    const { count } = state;
    const { plusOne } = computed;

    return {
      count,
      plusOne,
    };
  });

  return (
    <Card hoverable style={{ marginBottom: 24 }}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="chunk">store中的count现在是 {countState.count}</div>
        <div className="chunk">computed值中的plusOne现在是 {countState.plusOne.value}</div>
         <Button onClick={mutations.add}>add</Button>
      </div>
    </Card>
  );
}

export default () => {
  return (
    <Provider value={store}>
       <Count />
    </Provider>
  );
};
```

可以看出，store的定义只用到了@vue/reactivity，而rxv只是在组件中做了一层桥接，连通了Vue3和React，正如它名字的含义：React x Vue。

### 如何实现
只要effect能接入到React系统中，那么其他的api都没什么问题，因为它们只是去收集effect的依赖，去通知effect触发更新。

effect接受的是一个函数，而且effect还支持通过传入schedule参数来自定义依赖更新的时候需要触发什么函数，

而rxv的核心api: useStore接受的也是一个函数selector，它会让用户自己选择在组件中需要访问的数据。

把selector包装在effect中执行，去收集依赖。

指定依赖发生更新时，需要调用的函数是当前正在使用useStore的这个组件的forceUpdate强制渲染函数。

简单的看一下核心实现

share.ts
```typescript
export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(s => s + 1, 0);
  return forceUpdate;
};

export const useEffection = (...effectArgs: Parameters<typeof effect>) => {
  // 用一个ref存储effection
  // effect函数只需要初始化执行一遍
  const effectionRef = useRef<ReactiveEffect>();
  if (!effectionRef.current) {
    effectionRef.current = effect(...effectArgs);
  }

  // 卸载组件后取消effect
  const stopEffect = () => {
    stop(effectionRef.current!);
  };
  useEffect(() => stopEffect, []);

  return effectionRef.current
};
```

核心逻辑在此
```typescript
import React, { useContext } from 'react';
import { useForceUpdate, useEffection } from './share';

type Selector<T, S> = (store: T) => S;

const StoreContext = React.createContext<any>(null);

const useStoreContext = () => {
  const contextValue = useContext(StoreContext);
  if (!contextValue) {
    throw new Error(
      'could not find store context value; please ensure the component is wrapped in a <Provider>',
    );
  }
  return contextValue;
};

/**
 * 在组件中读取全局状态
 * 需要通过传入的函数收集依赖
 */
export const useStore = <T, S>(selector: Selector<T, S>): S => {
  const forceUpdate = useForceUpdate();
  const store = useStoreContext();

  const effection = useEffection(() => selector(store), {
    scheduler: job => {
      if (job() === undefined) return;
      forceUpdate();
    },
    lazy: true,
  });

  const value = effection();
  return value;
};

export const Provider = StoreContext.Provider;
```

参考文档：
- https://github.com/sl1673495/react-composition-api
- https://juejin.cn/post/6844904054192078855
