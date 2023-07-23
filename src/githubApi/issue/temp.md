***本文正在参加[「金石计划」](https://juejin.cn/post/7207698564641996856/ "https://juejin.cn/post/7207698564641996856/")***

### 前言

写异步函数的时候，promise 和 async 两种方案都非常常见，甚至同一个项目里，不同的开发人员都使用不同的习惯, 不过关于两者的比较不是本文关注的重点，只总结为一句话：“async 是异步编程的终极解决方案”。

当使用 async 函数的时候，很多文章都说建议用 `try catch` 来捕获异常, 可是实际上我看了很多项目的代码，遵循的并不是严谨，很多都没有用，甚至 catch 函数都没写，这是为什么呢？

我们先看下使用 try catch 情况下的代码示例：

### 示例1 ：使用 try catch

```javascript
function getUserInfo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                reject('请求异常')
        }, 1000)
    })
}

async function logined () {
    try {
        let userInfo = await getUserInfo()
        // 执行中断
        let pageInfo = await getPageInfo(userInfo?.userId)
    } catch(e) {
        console.warn(e)
    }
}

logined()
```

执行后会在 catch 里捕获 `请求异常`，然后 getUserInfo 函数中断执行，这是符合逻辑的，对于有依赖关系的接口，中断执行可以避免程序崩溃，这里唯一的问题是 try catch 貌似占据了太多行数，如果每个接口都写的话看起来略显冗余。

### 示例2： 直接 catch

鉴于正常情况下，`await` 命令后面是一个 Promise 对象, 所以上面代码可以很自然的想到优化方案：

```javascript
function getUserInfo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                reject('请求异常')
        }, 1000)
    })
}

async function logined () {
    let userInfo = await getUserInfo().catch(e => console.warn(e))
    // 执行没有中断，userInfo 为 undefined
    if (!userInfo) return // 需要做非空校验
    let pageInfo = await getPageInfo(userInfo?.userId)
}

logined()
```

执行后 catch 可以正常捕获异常，但是程序没有中断，返回值 `userInfo` 为 `undefined`, 所以如果这样写的话，就需要对返回值进行非空校验, `if (!userInfo) return` 我觉得这样有点反逻辑，异常时就应该中断执行才对；

### 示例3：在 catch 里 reject

可以继续优化，在 catch 里面加一行 `return Promise.reject(e)`, 可以使 await 中断执行；

完整代码：

```javascript
function getUserInfo () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('请求异常')
        }, 1000)
    })
}

async function logined () {
    let userInfo = await getUserInfo().catch(e => {
        console.warn(e)
        return Promise.reject(e) // 会导致控制台出现 uncaught (in promise) 报错信息
    })
    // 执行中断
    let pageInfo = await getPageInfo(userInfo?.userId)
}

logined()
```

一般我们在项目里都是用 axios 或者 fetch 之类发送请求，会对其进行一个封装，也可以在里面进行 catch 操作，对错误信息先一步处理，至于是否需要 reject，就看你是否想要在 await 命令异常时候中断了；不使用 reject 则不会中断，但是需要每个接口拿到 response 后先 非空校验， 使用 reject 则会在异常处中断，并且会在控制台暴露 `uncaught (in promise)` 报错信息。

![截屏2023-03-22 16.55.14.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e79d351eef5c45c9984273dcc48c36a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 建议

不需要在 await 处异常时中断，可以这样写，需要做非空校验，控制台不会有报错信息

```javascript
let userInfo = await getUserInfo().catch(e => console.warn(e))
if (!userInfo) return
```

需要在 await 处异常时中断，并且在意控制台报错，可以这样写

```javascript
try {
    let userInfo = await getUserInfo()
    // 执行中断
    let pageInfo = await getPageInfo(userInfo?.userId)
} catch(e) {
    console.warn(e)
}

```

需要在 await 处异常时中断，但是不在意控制台报错，则可以这样写

```javascript

let userInfo = await getUserInfo().catch(e => {
    console.warn(e)
    return Promise.reject(e) // 会导致控制台出现 uncaught (in promise) 报错信息
})
// 执行中断
let pageInfo = await getPageInfo(userInfo?.userId)

```

### 总结

几种写法，初看可能觉得第三种 catch 这种写法是最好的，但是细想下，从用户体验上来看，我觉得 try catch 是最好的，逻辑直观、符合同步编程思维，控制台不会暴露 `uncaught (in promise)` 报错信息；

而链式调用的 catch (里面再 reject)，是传统 promise 的回调写法，既然已经用 async await 这种同步编程写法了，再用 catch 链式写法，感觉没必要。

---

文章更新平台：掘金首发[【Ethan\_Zhou】](https://juejin.cn/user/1151943916391965/posts "https://juejin.cn/user/1151943916391965/posts")，源码Github [第二大脑](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmingjiezhou%2Fnotes "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmingjiezhou%2Fnotes")，知乎[【Ethan Zhou】](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhihu.com%2Fpeople%2Fstone-56-94%2Fposts "https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhihu.com%2Fpeople%2Fstone-56-94%2Fposts")、公号【编码美学】酌情同步，若需转载，可加 v 1032151090 获取授权，也欢迎来交流。
