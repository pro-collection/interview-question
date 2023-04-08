### 首先问题说"for循环优于forEach"并不完全正确

循环次数不够多的时候， forEach 性能优于 for
```js
// 循环十万次
let arrs = new Array(100000);

console.time('for');
for (let i = 0; i < arrs.length; i++) {};
console.timeEnd('for'); // for: 2.36474609375 ms

console.time('forEach');
arrs.forEach((arr) => {});
console.timeEnd('forEach'); // forEach: 0.825927734375 ms
```

循环次数越大， for 的性能优势越明显
```js
// 循环 1 亿次
let arrs = new Array(100000000);

console.time('for');
for (let i = 0; i < arrs.length; i++) {};
console.timeEnd('for'); // for: 72.7099609375 ms

console.time('forEach');
arrs.forEach((arr) => {});
console.timeEnd('forEach'); // forEach: 923.77392578125 ms
```

### 先做一下对比

|对比类型|for|forEach|
|:---|:---|:---|
|遍历|for循环按顺序遍历|forEach 使用 iterator 迭代器遍历|
|数据结构|for循环是随机访问元素|forEach 是顺序链表访问元素|
|性能上|对于arraylist，是顺序表，使用for循环可以顺序访问，速度较快；使用foreach会比for循环稍慢一些|对于linkedlist，是单链表，使用for循环每次都要从第一个元素读取next域来读取，速度非常慢；使用foreach可以直接读取当前结点，数据较快|

### 结论
for 性能优于 forEach ， 主要原因如下：
1. foreach相对于for循环，代码减少了，但是foreach依赖IEnumerable。在运行的时候效率低于for循环。
2. for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。

### 参考文档
- https://zhuanlan.zhihu.com/p/461523927
- [javascript 中 for 的性能比 forEach 的性能要好，为何还要使用 forEach？ - 李十三的回答 - 知乎](https://www.zhihu.com/question/556786869/answer/2706658837)
- https://juejin.cn/post/6844904159938887687
  
  
