### 路由懒加载

两种方式可实现:

- 使用 React 中 Suspense,lazy
- 使用 react-loadable

#### React 中 Suspense,lazy

应用的组件需要使用 lazy 的方式引入， 且使用 Suspense 包裹异步加载的组件

```jsx
 import { Route, Switch } from 'react-router-dom';

const MainCom = lazy(() => import('../views/main/maincom'));

class RouterConfig extends React.Component {
  render() {
    return (
      <Suspense fallback={<div> 加载中 </div>}>
        <Switch>
          ...
          <Route exact path="/" component={MainCom} />
          ...
        </Switch>

      </Suspense>
    )
  }
}

export default RouterConfig;
```

#### react-loadable

```jsx
 import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const logincom = Loadable({
  loader: () => import('../views/login/login'),
  loading() {
    return <div>正在加载</div>
  },
})

class RouterConfig extends React.Component {
  render() {
    return (
      <Suspense fallback={<div> 加载中 </div>}>
        <Switch>
          ...
          <Route exact path="/" component={logincom} />
          ...
        </Switch>

      </Suspense>
    )
  }
}

export default RouterConfig;
```

### 受控性组件颗粒化 ，独立请求服务渲染单元

可控性组件颗粒化，独立请求服务渲染单元是笔者在实际工作总结出来的经验。目的就是避免因自身的渲染更新或是副作用带来的全局重新渲染。

大概思路是这样子的：
![1](https://foruda.gitee.com/images/1682260059688615416/19b33481_7819612.png)

拆分需要单独调用后端接口的细小组件，建立独立的数据请求和渲染，这种依赖数据更新 -> 视图渲染的组件，能从整个体系中抽离出来 ，好处我总结有以下几个方面。

1. 可以避免父组件的冗余渲染 ，react的数据驱动，依赖于 state 和 props 的改变，改变state 必然会对组件 render 函数调用，如果父组件中的子组件过于复杂，一个自组件的 state
   改变，就会牵一发动全身，必然影响性能，所以如果把很多依赖请求的组件抽离出来，可以直接减少渲染次数。

2. 可以优化组件自身性能，无论从class声明的有状态组件还是fun声明的无状态，都有一套自身优化机制，无论是用shouldupdate 还是用 hooks中 useMemo useCallback
   ，都可以根据自身情况，定制符合场景的渲条 件，使得依赖数据请求组件形成自己一个小的，适合自身的渲染环境。

3. 能够和redux ,以及redux衍生出来 redux-action , dva,更加契合的工作，用 connect
   包裹的组件，就能通过制定好的契约，根据所需求的数据更新，而更新自身，而把这种模式用在这种小的，需要数据驱动的组件上，就会起到物尽其用的效果。

### shouldComponentUpdate ,PureComponent 和 React.memo ,immetable.js/immer.js 助力性能调优

#### PureComponent 和 React.memo

React.PureComponent 通过props和state的浅对比来实现 shouldComponentUpate()。如果对象包含复杂的数据结构(比如对象和数组)
，他会浅比较，如果深层次的改变，是无法作出判断的，React.PureComponent 认为没有变化，而没有渲染试图。

react.memo 和 PureComponent 功能类似 ，react.memo 作为第一个高阶组件，第二个参数 可以对props 进行比较 ，和shouldComponentUpdate不同的, 当第二个参数返回 true
的时候，证明props没有改变，不渲染组件，反之渲染组件。

#### shouldComponentUpdate

使用 shouldComponentUpdate()  以让React知道当state或props的改变是否影响组件的重新render，默认返回ture，返回false时不会重新渲染更新，而且该方法并不会在初始化渲染或当使用
forceUpdate() 时被调用。

#### immetable.js/immer.js

immetable.js 是Facebook 开发的一个js库，可以提高对象的比较性能，像之前所说的pureComponent 只能对对象进行浅比较，,对于对象的数据类型,却束手无策,所以我们可以用 immetable.js 配合
shouldComponentUpdate 或者 react.memo来使用。immutable 中 我们用react-redux来简单举一个例子，如下所示 数据都已经被 immetable.js处理。

```jsx
import { is } from 'immutable'

const GoodItems = connect(state =>
    ({ GoodItems: filter(state.getIn(['Items', 'payload', 'list']), state.getIn(['customItems', 'payload', 'list'])) || Immutable.List(), })
  /* 此处省略很多代码～～～～～～ */
)(memo(({ Items, dispatch, setSeivceId }) => {
  /*  */
}, (pre, next) => is(pre.Items, next.Items)))

```

通过 is 方法来判断，前后Items(对象数据类型)是否发生变化。

**immer** 是 mobx 的作者写的一个 immutable 库，核心实现是利用 ES6 的 proxy，几乎以最小的成本实现了 js 的不可变数据结构，简单易用、体量小巧、设计巧妙，满足了我们对 JS 不可变数据结构的需求。

具体使用可见： https://juejin.cn/post/7157745748832944141

### hooks 组件中， 常使用 useMemo、useCallback、useRef 等方式方式重复申明

每次点击button的时候,都会执行Index函数。handerClick1 , handerClick2,handerClick3都会重新声明。这种函数的重复申明， 会使得子组件每次都是拿到的新的应用对象， 会导致 memo 直接失效。

```jsx
function Index() {
  const [number, setNumber] = useState(0)
  const [handerClick1, handerClick2, handerClick3] = useMemo(() => {
    const fn1 = () => {
      /* 一些操作 */
    }
    const fn2 = () => {
      /* 一些操作 */
    }
    const fn3 = () => {
      /* 一些操作 */
    }
    return [fn1, fn2, fn3]
  }, []) /* 只有当数据里面的依赖项，发生改变的时候，才会重新声明函数。 */
  return <div>
    <a onClick={handerClick1}>点我有惊喜1</a>
    <a onClick={handerClick2}>点我有惊喜2</a>
    <a onClick={handerClick3}>点我有惊喜3</a>
    <button onClick={() => setNumber(number + 1)}> 点击 {number} </button>
  </div>
}
```

推荐使用 ahooks - usePersistFn、useMemoizedFn 其实现也非常简单， 就是将函数的应用绑定在了 ref 上

```jsx
function usePersistFn(fn, deps) {
  const fnRef = useRef();

  useEffect(() => {
    fnRef.current = fn;
  }, [fn, ...deps]);

  return useCallback(() => {
    return fnRef.current();
  }, [fnRef]);
}
```

### 警惕 context 陷阱
使用Context可以避免的组件的层层props嵌套的问题。但是它使用consumer拿值时,会多一层组件。但得益于 useContext hook 我们可以不使用consumer组件。直接拿到值,直观。一般的使用场景,如那拿全局的class前缀，或者国际化，Ui主题颜色等。

**但是当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate、memo 等函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。**

使用 `createContext 和 useContext` 的时候， 尽量从顶层往下传递的数据是不可变的数据， 否则会引起整个链路层级的渲染。 

此处推荐 使用 `recoil`， 由 facebook 官方出品， 使用语法非常简单， 跟 context 很类似。

