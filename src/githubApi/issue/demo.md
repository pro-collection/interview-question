在React中，我们经常在子组件中调用父组件的方法，一般用props回调即可。但是有时候也需要在父组件中调用子组件的方法，通过这种方法实现高内聚。有多种方法，请按需服用。

### 类组件中

#### React.createRef()

* 优点：通俗易懂，用ref指向。

* 缺点：使用了HOC的子组件不可用，无法指向真是子组件

  比如一些常用的写法，mobx的@observer包裹的子组件就不适用此方法。

```scala
import React, { Component } from 'react';

class Sub extends Component {
  callback() {
    console.log('执行回调');
  }
  render() {
    return <div>子组件</div>;
  }
}

class Super extends Component {
  constructor(props) {
    super(props);
    this.sub = React.createRef();
  }
  handleOnClick() {
    this.sub.callback();
  }
  render() {
    return (
      <div>
        <Sub ref={this.sub}></Sub>
      </div>
    );
  }
}


```

#### ref的函数式声明

* 优点：ref写法简洁
* 缺点：使用了HOC的子组件不可用，无法指向真是子组件（同上）

使用方法和上述的一样，就是定义ref的方式不同。

```csharp
...

<Sub ref={ref => this.sub = ref}></Sub>

...


```

#### 使用props自定义onRef属性

* 优点：假如子组件是嵌套了HOC，也可以指向真实子组件。
* 缺点：需要自定义props属性

```typescript
import React, { Component } from 'react';
import { observer } from 'mobx-react'

@observer
class Sub extends Component {
	componentDidMount(){
    // 将子组件指向父组件的变量
		this.props.onRef && this.props.onRef(this);
	}
	callback(){
		console.log("执行我")
	}
	render(){
		return (<div>子组件</div>);
	}
}

class Super extends Component {
	handleOnClick(){
       // 可以调用子组件方法
		this.Sub.callback();
	}
	render(){
		return (
          <div>
			<div onClick={this.handleOnClick}>click</div>
			<Sub onRef={ node => this.Sub = node }></Sub>
	   	  </div>)
	}
}


```

### 函数组件、Hook组件

#### useImperativeHandle

* 优点： 1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件
* 缺点： 1、需要自定义props属性 2、需要自定义暴露的方法

```javascript
import React, { useImperativeHandle } from 'react';
import { observer } from 'mobx-react'


const Parent = () => {
  let ChildRef = React.createRef();

  function handleOnClick() {
    ChildRef.current.func();
  }

  return (
    <div>
      <button onClick={handleOnClick}>click</button>
      <Child onRef={ChildRef} />
    </div>
  );
};

const Child = observer(props => {
  //用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    // 需要将暴露的接口返回出去
    return {
      func: func,
    };
  });
  function func() {
    console.log('执行我');
  }
  return <div>子组件</div>;
});

export default Parent;

```

#### forwardRef

使用forwardRef抛出子组件的ref

这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。

```javascript
import React, { useRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react'

const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} type="text" />
});

const Sub = observer(FancyInput)

const App = props => {
  const fancyInputRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button
        onClick={() => fancyInputRef.current.focus()}
      >父组件调用子组件的 focus</button>
    </div>
  )
}

export default App;


```

### 总结

父组件调子组件函数有两种情况

* 子组件无HOC嵌套：推荐使用ref直接调用
* 有HOC嵌套：推荐使用自定义props的方式
