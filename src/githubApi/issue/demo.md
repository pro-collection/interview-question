### 使用`forwordRef`

将`input`单独封装成一个组件`TextInput`。

```jsx
const TextInput =  React.forwardRef((props,ref) => {
  return <input ref={ref}></input>
})

```

用`TextInputWithFocusButton`调用它

```jsx
function TextInputWithFocusButton() {
  // 关键代码
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      // 关键代码
      <TextInput ref={inputEl}></TextInput>
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

```

### useImperativeHandle

有时候，我们可能**不想将整个子组件暴露给父组件**，而只是暴露出父组件需要的值或者方法，这样可以让代码更加明确。而`useImperativeHandle` Api就是帮助我们做这件事的。

```jsx
const TextInput =  forwardRef((props,ref) => {
  const inputRef = useRef();
  // 关键代码
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />
})


function TextInputWithFocusButton() {
  // 关键代码
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      // 关键代码
      <TextInput ref={inputEl}></TextInput>
      <button onClick={onButtonClick}>
          Focus the input
      </button>
    </>
  );
}


```

也可以使用`current.focus()`来做`input`聚焦。

> 这里要注意的是，子组件`TextInput`中的`useRef`对象，只是用来获取`input`元素的，大家不要和父组件的`useRef`混淆了。
