**关键词**：路由守卫

路由守卫是 Vue Router 提供的一种机制，用于在路由导航过程中对路由进行拦截和控制。通过使用路由守卫，我们可以在路由导航前、导航后、导航中断等不同的阶段执行相应的逻辑。

Vue Router 提供了三种类型的路由守卫：

1. 全局前置守卫（Global Before Guards）：在路由切换之前被调用，可以用于进行全局的权限校验或者路由跳转拦截等操作。

2. 路由独享守卫（Per-Route Guards）：在特定的路由配置中定义的守卫。这些守卫只会在当前路由匹配成功时被调用。

3. 组件内的守卫（In-Component Guards）：在组件实例内部定义的守卫。这些守卫可以在组件内部对路由的变化进行相应的处理。

* 全局前置守卫

```js
router.beforeEach((to, from, next) => {
    // to: 即将进入的目标
    // from:当前导航正要离开的路由
    return false // 返回false用于取消导航
    return {name: 'Login'} // 返回到对应name的页面
    next({name: 'Login'}) // 进入到对应的页面
    next() // 放行
})
```

* 全局解析守卫:类似beforeEach

```js
router.beforeResolve(to => {
    if(to.meta.canCopy) {
        return false // 也可取消导航
    }
})
```

* 全局后置钩子

```js
router.afterEach((to, from) => {
    logInfo(to.fullPath)
})
```

* 导航错误钩子，导航发生错误调用

```js
router.onError(error => {
    logError(error)
})
```

* 路由独享守卫,beforeEnter可以传入单个函数，也可传入多个函数。

```js
function dealParams(to) {
    // ...
}
function dealPermission(to) {
    // ...
}

const routes = [
    {
        path: '/home',
        component: Home,
        beforeEnter: (to, from) => {
            return false // 取消导航
        },
        // beforeEnter: [dealParams, dealPermission]
    }
]
```

组件内的守卫

```js
const Home = {
    template: `...`,
    beforeRouteEnter(to, from) {
        // 此时组件实例还未被创建，不能获取this
    },
    beforeRouteUpdate(to, from) {
        // 当前路由改变，但是组件被复用的时候调用，此时组件已挂载好
    },
    beforeRouteLeave(to, from) {
        // 导航离开渲染组件的对应路由时调用
    }
}
```
