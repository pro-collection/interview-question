在 react 中：一个`DOM`节点在某一时刻最多会有4个节点和他相关。

一个DOM节点在某一时刻最多会有4个节点和他相关。

1. `JSX对象`。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

2. `workInProgress Fiber`。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。

3. `current Fiber`。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。

4. `DOM节点本身`。

**Diff算法的本质是对比1和2，生成3。**

### 概览

#### Diff的瓶颈以及React如何应对

由于Diff操作本身也会带来性能损耗， 即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。

如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围

为了降低算法复杂度，**React的diff会预设三个限制**：

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

3. 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

#### Diff是如何实现的

我们从Diff的入口函数reconcileChildFibers出发，该函数会根据newChild（即JSX对象）类型调用不同的处理函数。

从同级的节点数量将Diff分为两类：

1. 当newChild类型为object、number、string，代表同级只有一个节点

2. 当newChild类型为Array，同级有多个节点

### 单节点 diff

路程图：                    
![image](https://user-images.githubusercontent.com/22188674/235393691-d5355bfb-da2a-4ffd-9961-04a3927ebd11.png)

React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。

### 多节点 diff

主要分为以下几种情况

- 节点更新
  - 节点属性变化
  - 节点类型更新
- 节点新增或减少
- 节点位置变化

#### diff 思路

React 团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新。

本质上是进行了两轮遍历：
- 第一轮遍历：处理更新的节点。
- 第二轮遍历：处理剩下的不属于更新的节点。

**为何不用双向指针的方式**？

虽然本次更新的JSX对象 newChildren为数组形式，但是和newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历。

即 newChildren[0]与fiber比较，newChildren[1]与fiber.sibling比较。

所以无法使用双指针优化。


#### 第一次遍历

第一轮遍历步骤如下：

1. `let i = 0`，遍历`newChildren`，将`newChildren[i]`与`oldFiber`比较，判断DOM节点是否可复用。

2. 如果可复用，`i++`，继续比较`newChildren[i]`与`oldFiber.sibling`，可以复用则继续遍历。

3. 如果不可复用，分两种情况：

- key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

- key相同type不同导致不可复用，会将`oldFiber`标记为`DELETION`，并继续遍历

4. 如果`newChildren`遍历完（即`i === newChildren.length - 1`）或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历，第一轮遍历结束。

源码如下： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L818


#### 第二轮遍历


**`newChildren`与`oldFiber`同时遍历完**

那就是最理想的情况：只需在第一轮遍历进行组件更新 

> 源码如下： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L825

**`newChildren`没遍历完，`oldFiber`遍历完**

已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`为生成的`workInProgress fiber`依次标记`Placement`。

> 源码如下： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L869

**`newChildren`遍历完，`oldFiber`没遍历完**

意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的`oldFiber`，依次标记`Deletion`。

> https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L863

**`newChildren`与`oldFiber`都没遍历完**

这意味着有节点在这次更新中改变了位置。

这是Diff算法最精髓也是最难懂的部分。我们接下来会重点讲解。

> 源码： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L893


#### 处理移动的节点

由于有节点改变了位置，所以不能再用位置索引i对比前后的节点，那么如何才能将同一个节点在两次更新中对应上呢？

我们需要使用key。

为了快速的找到key对应的`oldFiber`，我们将所有还未处理的`oldFiber`存入以key为key，`oldFiber`为`value`的`Map`中。

`const existingChildren = mapRemainingChildren(returnFiber, oldFiber);`           

> 源码： https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L890

接下来遍历剩余的`newChildren`，通过`newChildren[i].key`就能在`existingChildren`中找到`key`相同的`oldFiber`。

#### 标记节点是否移动

既然我们的目标是寻找移动的节点，那么我们需要明确：节点是否移动是以什么为参照物？

我们的参照物是：最后一个可复用的节点在`oldFiber`中的位置索引（用变量`lastPlacedIndex`表示）。

由于本次更新中节点是按`newChildren`的顺序排列。在遍历`newChildren`过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在`lastPlacedIndex`对应的可复用的节点在本次更新中位置的后面。

那么我们只需要比较遍历到的可复用节点在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量`oldIndex`表示遍历到的可复用节点在`oldFiber`中的位置索引。如果`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为0，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`。


### 参考文档

- https://react.iamkasong.com/diff/prepare.html


