主要生命周期分为两个版本，

分别是： `v16.0前` 和 `v16.4`

### v16.0 前

![1](https://foruda.gitee.com/images/1682257247128664078/b5848c64_7819612.png)

总共分为**四大阶段**：

1. {初始化| Intialization}
2. {挂载| Mounting}
3. {更新| Update}
4. {卸载| Unmounting}


#### Intialization(初始化）

在初始化阶段,会用到 `constructor()` 这个构造函数，如：

```javascript
constructor(props) {
  super(props);
}

```

* `super`的作用
    * 用来调用*基类*的构造方法( `constructor()` ),
    * 也**将父组件的`props`注入给子组件，供子组件读取**
* 初始化操作，定义`this.state`的初始内容
* **只会执行一次**

---

#### Mounting(挂载）（3个）

1. `componentWillMount`：**在组件挂载到`DOM`前调用**

    * 这里面的调用的`this.setState`不会引起组件的重新渲染，也可以把写在这边的内容提到`constructor()`，所以在项目中很少。
    * **只会调用一次**
2. `render`: 渲染
    * 只要`props`和`state`发生改变（无论值是否有变化,两者的重传递和重赋值，都可以引起组件重新`render`），`都会重新渲染render`。
    * `return`：**是必须的，是一个React元素**，不负责组件实际渲染工作，由`React`自身根据此元素去渲染出`DOM`。
    * `render` 是**纯函数**，不能执行`this.setState`。
3. `componentDidMount`：**组件挂载到`DOM`后调用**

    * **调用一次**

---

#### Update(更新)（5个）

1. `componentWillReceiveProps(nextProps)`:调用于`props`引起的组件更新过程中

    * `nextProps`：父组件传给当前组件新的`props`
    * 可以用`nextProps`和`this.props`来查明重传`props`是否发生改变（原因：不能保证父组件重传的`props`有变化）
    * 只要`props`发生变化就会，引起调用

2. `shouldComponentUpdate(nextProps, nextState)`：用于性能优化

    * `nextProps`：当前组件的`this.props`
    * `nextState`：当前组件的`this.state`
    * 通过比较`nextProps`和`nextState`,来判断当前组件是否有必要继续执行更新过程。
    * 返回`false`：表示停止更新，用于减少组件的不必要渲染，优化性能
    * 返回`true`：继续执行更新
    * 像`componentWillReceiveProps（）`中执行了`this.setState`，更新了`state`，但**在`render`前**(如`shouldComponentUpdate`，`componentWillUpdate`)，`this.state`依然指向更新前的state，不然`nextState`及当前组件的`this.state`的对比就一直是`true`了

3. `componentWillUpdate(nextProps, nextState)`：组件更新前调用

    * 在`render`方法前执行
    * 由于组件更新就会调用，所以一般很少使用

4. `render`：重新渲染

5. `componentDidUpdate(prevProps, prevState)`：组件更新后被调用

    * `prevProps`：组件更新前的`props`
    * `prevState`：组件更新前的`state`
    * 可以操作组件更新的DOM

---

#### Unmounting(卸载)（1个）

`componentWillUnmount`：组件被卸载前调用

可以在这里执行一些**清理工作**，比如清除组件中使用的*定时器*，清除`componentDidMount`中*手动创建的DOM元素*等，以避免引起内存泄漏

---


### React v16.4

![2](https://foruda.gitee.com/images/1682257393147988566/aa702114_7819612.png)

与 `v16.0`的生命周期相比

* 新增了 -- （两个`getXX`）
    1. `getDerivedStateFromProps`
    2. `getSnapshotBeforeUpdate`
* 取消了 -- (三个`componmentWillXX`)
    1. `componentWillMount`、
    2. `componentWillReceiveProps`、
    3. `componentWillUpdate`


#### getDerivedStateFromProps

`getDerivedStateFromProps(prevProps, prevState)`：组件创建和更新时调用的方法

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

> 在`React v16.3`中，在创建和更新时，只能是由父组件引发才会调用这个函数，在`React v16.4`改为无论是`Mounting`还是`Updating`，全部都会调用。

是一个静态函数，也就是这个函数不能通过`this`访问到`class`的属性。

> 如果`props`传入的内容不需要影响到你的`state`，那么就需要返回一个`null`，这个**返回值是必须的**，所以尽量将其写到函数的末尾。

在组件创建时和更新时的render方法之前调用，它应该

* 返回一个对象来更新状态
* 或者返回`null`来不更新任何内容

#### getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate(prevProps,prevState)`:`Updating`时的函数，在render之后调用

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

可以读取，但无法使用DOM的时候，在组件可以在可能更改之前从`DOM`捕获一些信息（例如滚动位置）

> **返回的任何值都将作为参数传递给`componentDidUpdate（)`**

---


### Note

在`17.0`的版本，官方彻底废除

* `componentWillMount`、
* `componentWillReceiveProps`、
* `componentWillUpdate`
