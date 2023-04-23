**依赖**

- react-router-dom v6
- react v18

### 实现

监听的核心原理基于useEffect，和useLocation，通过useEffect监听当前location的变化，这样就实现的最基本的监听结构：

```jsx
const location = useLocation();
useEffect(() => {
  //记录路径
}, [location]);
```

然后，我们可以在useEffect中记录和更新from、to的值，可以根据自己的需要选择from、to的数据类型，这里我使用了React-router提供的Location类型。

更新逻辑为：将to的值赋给from，然后将新的location赋值给to

```typescript jsx
import { Location, useLocation } from "react-router-dom";

type LocationTrans = {
  from: Location;
  to: Location;
};

const location = useLocation();
const locationState = useRef<LocationTrans>({
  from: null,
  to: null,
});

useEffect(() => {
  locationState.current.from = locationState.current.to;
  locationState.current.to = location;
}, [location]);
```

最后，利用React的Context进行封装，将其封装成一个组件和一个hook，使用者可以通过这个组件来进行监听，通过hook快速访问数据。我将这些代码放在了同一个.tsx文件中，保证了逻辑的高内聚。

```typescript jsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { Location, useLocation } from "react-router-dom";


type LocationTrans = {
  from: Location;
  to: Location;
};

export const LocationContext =
  createContext<React.MutableRefObject<LocationTrans>>(null);

export function WithLocationListener(props: { children: React.ReactNode }) {
  const location = useLocation();

  const locationState = useRef<LocationTrans>({
    from: null,
    to: null,
  });

  useEffect(() => {
    locationState.current.from = locationState.current.to;
    locationState.current.to = location;
  }, [location]);

  return (
    <LocationContext.Provider value={locationState}>
      {props.children}
    </LocationContext.Provider>
  );
}

export function useLocationConsumer(): LocationTrans {
  const ref = useContext(LocationContext);
  return ref.current;
}
```

### 使用

这个组件只能在RouterProvider的子组件中使用，因为useLocation只能在这个范围内使用。

```typescript jsx
//import ....

function Layout() {
  return (
    <WithLocationListener>
      {/* ..... */}
    </WithLocationListener>
  );
}
```

在需要用到路由信息的页面：

```typescript jsx
const { from, to } = useLocationConsumer();
```

### 参考文档
- https://juejin.cn/post/7195910055497580600
