## process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序
[前端碎碎念 之 nextTick, setTimeout 以及 setImmediate 三者的执行顺序](https://segmentfault.com/a/1190000008595101)

首先来看一个非常经典的例子：
```javascript
setImmediate(function(){
    console.log(1);                         // 7
},0);
setTimeout(function(){
    console.log(2);                         // 8
},0);
new Promise(function(resolve){
    console.log(3);                         // 1
    resolve();
    console.log(4);                         // 2
}).then(function(){
    console.log(5);                         // 6
});
console.log(6);                             // 3
process.nextTick(function(){
    console.log(7);                         // 5
});
console.log(8);                             // 4
//输出结果是3 4 6 8 7 5 2 1
```

macro-task(宏任务): script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.                                
micro-task(微任务): process.nextTick, Promise(原生)，Object.observe，MutationObserver

除了script整体代码，micro-task的任务优先级高于macro-task的任务优先级。其中，script(整体代码) ，可以理解为待执行的所有代码。

所以执行顺序如下：

第一步. script整体代码被执行，执行过程为
- 创建setImmediate macro-task
- 创建setTimeout macro-task
- 创建micro-task Promise.then 的回调，并执行script console.log(3); resolve(); console.log(4); 此时输出3和4，虽然resolve调用了，执行了但是整体代码还没执行完，无法进入Promise.then 流程。
- console.log(6)输出6
- process.nextTick 创建micro-task
- console.log(8) 输出8

第一个过程过后，已经输出了3 4 6 8

第二步. 由于其他micro-task 的 优先级高于macro-task。                      
此时micro-task 中有两个任务按照优先级 process.nextTick 高于 Promise。                    
所以先输出7，再输出5

第三步，micro-task 任务列表已经执行完毕，家下来执行macro-task. 由于setTimeout的优先级高于setIImmediate，所以先输出2，再输出1。

整个过程描述起来像是同步操作，实际上是基于Event Loop的事件循环。                           
关于micro-task和macro-task的执行顺序，可看下面这个例子(来自《深入浅出Node.js》)：
```javascript
//加入两个nextTick的回调函数
process.nextTick(function () {
    console.log('nextTick延迟执行1');
});
process.nextTick(function () { 
    console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()的回调函数
setImmediate(function () {
    console.log('setImmediate延迟执行1'); 
    // 进入下次循环 
    process.nextTick(function () {
        console.log('强势插入');
    });
});
setImmediate(function () {
    console.log('setImmediate延迟执行2'); 
});
console.log('正常执行');
```
书中给出的执行结果是：
```
正常执行
nextTick延迟执行1
nextTick延迟执行2
setImmediate延迟执行1
强势插入
setImmediate延迟执行2
```
朴老师写那本书的时候，node最新版本为0.10.13，而我的版本是6.x

老版本的Node会优先执行process.nextTick。
当process.nextTick队列执行完后再执行一个setImmediate任务。
然后再次回到新的事件循环。所以执行完第一个setImmediate后，队列里只剩下第一个setImmediate里的process.nextTick和第二个setImmediate。
所以process.nextTick会先执行。

而在新版的Node中，process.nextTick执行完后，会循环遍历setImmediate，将setImmediate都执行完毕后再跳出循环。
所以两个setImmediate执行完后队列里只剩下第一个setImmediate里的process.nextTick。最后输出"强势插入"。


**关于优先级的另一个比较清晰的版本：**                       
观察者优先级                  
在每次轮训检查中，各观察者的优先级分别是：                           
idle观察者 > I/O观察者 > check观察者。                            
idle观察者：process.nextTick                            
I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等                         
check观察者：setImmediate，setTimeout

**setImmediate 和 setTimeout 的优先级**                                  
看下面这个例子：
```javascript
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
}, 0);
console.log('3');
//输出结果是3 2 1
```

我们知道现在HTML5规定setTimeout的最小间隔时间是4ms，也就是说0实际上也会别默认设置为最小值4ms。我们把这个延迟加大                     
上面说到setTimeout 的优先级比 setImmediate的高，其实这种说法是有条件的。                            
再看下面这个例子，为setTimeout增加了一个延迟20ms的时间：
```javascript
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
}, 20);
console.log('3');
//输出结果是3 2 1
```

试试打印出这个程序的执行时间：
```javascript
var t1 = +new Date();
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
},20);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
3 
time: 23 
2 
1
```

程序执行用了23ms, 也就是说，在script(整体代码)执行完之前，setTimeout已经过时了，所以当进入macro-task的时候setTimeout依然优先于setImmediate执行。如果我们把这个值调大一点呢？
```javascript
var t1 = +new Date();
setImmediate(function () {
    console.log('1'); 
});
setTimeout(function () {
    console.log('2'); 
},30);

console.log('3');
var t2 = +new Date();
console.log('time: ' + (t2 - t1));
//输出
3 
time: 23 
1 
2
```
setImmediate早于setTimeout执行了，因为进入macro-task 循环的时候，setTimeout的定时器还没到。                         
以上实验是基于6.6.0版本Node.js测试，实际上在碰到类似这种问题的时候，最好的办法是参考标准，并查阅源码，不能死记概念和顺序，因为标准也是会变的。包括此文也是自学总结，经供参考。                           
