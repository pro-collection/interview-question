除了上述方法外，还可以使用 `useRef` 钩子来监听鼠标点击事件。具体实现可以在下拉组件的根元素上使用 `ref` 属性来获取 DOM 元素的引用，然后在组件挂载时使用 `addEventListener` 方法绑定 `mousedown` 事件，最后在事件处理函数中判断鼠标点击的位置是否在下拉组件内，如果不在，则关闭下拉组件。

示例代码如下：

```jsx
import { useRef, useState, useEffect } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
}
```

这种方法可以在组件内部处理点击事件，不需要将事件处理函数传递给父组件。但是相对而言代码会比较繁琐，需要手动处理事件绑定和解绑。
