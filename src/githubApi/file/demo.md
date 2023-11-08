**关键词**：迭代器 Iterator

### 1、Iterator 的概念

JavaScript 原有的表示 “ 集合 ” 的数据结构，主要是数组（ Array ）和对象（ Object ）， ES6 又添加了 Map 和 Set 。
这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是 Map ， Map 的成员是对象。
这样就需要一种统一的接口机制，来处理所有不同的数据结构。                                         
遍历器（ Iterator ）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。           
Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环， Iterator 接口主要供for...of消费。

Iterator 的遍历过程是这样的。
- （ 1 ）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
- （ 2 ）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
- （ 3 ）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
- （ 4 ）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。
具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。


### 2、数据结构的默认 Iterator 接口

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。           
在 ES6 中，有三类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、 Set 和 Map 结构。

实例：
```javascript
    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();
    iter.next() // { value: 'a', done: false }
    iter.next() // { value: 'b', done: false }
    iter.next() // { value: 'c', done: false }
    iter.next() // { value: undefined, done: true }
```

上面提到，原生就部署 Iterator 接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。


### 3、调用 Iterator 接口的场合
有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

#### 3.1、解构赋值
对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。          
实例1：
```javascript
    let set = new Set().add('a').add('b').add('c');
    let [x,y] = set;
    // x='a'; y='b'
    let [first, ...rest] = set;
    // first='a'; rest=['b','c'];
```

#### 3.2、扩展运算符
扩展运算符（ ... ）也会调用默认的 iterator 接口。            
实例2：
```javascript
    //  例一
    var str = 'hello';
    [...str] // ['h','e','l','l','o']
    //  例二
    let arr = ['b', 'c'];
    ['a', ...arr, 'd']
    // ['a', 'b', 'c', 'd']
```

#### 3.3、yield*
yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。         
实例3：
```javascript
    let generator = function* () {
        yield 1;
        yield* [2,3,4];
        yield 5;
    };
    var iterator = generator();
    iterator.next() // { value: 1, done: false }
    iterator.next() // { value: 2, done: false }
    iterator.next() // { value: 3, done: false }
    iterator.next() // { value: 4, done: false }
    iterator.next() // { value: 5, done: false }
    iterator.next() // { value: undefined, done: true }
```

#### 3.4、其他场合
由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet() （比如new Map([['a',1],['b',2]])）
- Promise.all()
- Promise.race()


### 4、Iterator 接口与 Generator 函数
Symbol.iterator方法的最简单实现，还是使用下一章要介绍的 Generator 函数。           
实例：
```javascript
    var myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    [...myIterable] // [1, 2, 3]
    
    //  或者采用下面的简洁写法
    let obj = {
        * [Symbol.iterator]() {
            yield 'hello';
            yield 'world';
        }
    };
    for (let x of obj) {
        console.log(x);
    }
    // hello
    // world
```
