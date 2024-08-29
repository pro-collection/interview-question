**关键词**：react 渲染性能调优

帮助开发者排查是哪个属性改变导致了组件的 rerender。

直接接受 ahooks 里面的一个方法： [useWhyDidYouUpdate](https://ahooks.js.org/zh-CN/hooks/use-why-did-you-update)

源码实现：

```tsx
import { useEffect, useRef } from "react";

export type IProps = Record<string, any>;

export default function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}
```
