### Html5和CSS3

##### 常见的水平垂直居中实现方案

* 最简单的方案当然是flex布局

```css
.father {
    display: flex;
    justify-content: center;
    align-items: center;
}
.son {
   ...
}
```

* 绝对定位配合margin:auto,的实现方案

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

* 绝对定位配合transform实现

```css
.father {
    position: relative;
}
.son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

##### BFC问题

BFC：块格式上下文，是一块独立的渲染区域，内部元素不会影响外部的元素。

##### flex:1; 是哪些属性的缩写，对应的属性代表什么含义

flex: 1;在浏览器中查看分别是flex-grow（设置了对应元素的增长系数）、flex-shrink(指定了对应元素的收缩规则，只有在所有元素的默认宽度之和大于容器宽度时才会触发)、flex-basis（指定了对应元素在主轴上的大小）

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb600d1132e24be88d77b200ae7ab28e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

##### 隐藏元素的属性有哪些

* display: none;
* visibility: hidden;
* opacity: 0;

### Js相关

##### Js的基础类型，typeof和instanceof的区别

基础类型有：boolean、string、number、bigint、undefined、symbol、null。

typeof能识别所有的值类型，识别函数，能区分是否是引用类型。

```js
const a = "str";
console.log("typeof a :>> ", typeof a); // typeof a :>>  string

const b = 999;
console.log("typeof b :>> ", typeof b); // typeof b :>>  number

const c = BigInt(9007199254740991);
console.log("typeof c :>> ", typeof c); // typeof c :>>  bigint

const d = false;
console.log("typeof d :>> ", typeof d); // typeof d :>>  boolean

const e = undefined;
console.log("typeof e :>> ", typeof e); // typeof e :>>  undefined

const f = Symbol("f");
console.log("typeof f :>> ", typeof f); // typeof f :>>  symbol

const g = null;
console.log("typeof g :>> ", typeof g); // typeof g :>>  object

const h = () => {};
console.log("typeof h :>> ", typeof h); // typeof h :>>  function

const i = [];
console.log("typeof i :>> ", typeof i); // typeof i :>>  object
```

instanceof用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

##### 数组的forEach和map方法有哪些区别？常用哪些方法去对数组进行增、删、改

* forEach是对数组的每一个元素执行一次给定的函数。
* map是创建一个新数组,该新数组由原数组的每个元素都调用一次提供的函数返回的值。
* pop():删除数组后面的最后一个元素,返回值为被删除的那个元素。
* push():将一个元素或多个元素添加到数组末尾，并返回新的长度。
* shift():删除数组中的第一个元素，并返回被删除元素的值。
* unshift():将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度**。
* splice():通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。
* reverse(): 反转数组。

```js
const arr = [1, 2, 3, 4, 5, 6];

arr.forEach(x => {
  x = x + 1;
  console.log("x :>> ", x);
});
// x :>>  2
// x :>>  3
// x :>>  4
// x :>>  5
// x :>>  6
// x :>>  7

console.log("arr :>> ", arr); // arr :>>  [ 1, 2, 3, 4, 5, 6 ]

const mapArr = arr.map(x => {
  x = x * 2;
  return x;
});
console.log("mapArr :>> ", mapArr); // mapArr :>>  [ 2, 4, 6, 8, 10, 12 ]
console.log("arr :>> ", arr); // arr :>>  [ 1, 2, 3, 4, 5, 6 ]

const popArr = arr.pop();
console.log("popArr :>> ", popArr); // popArr :>>  6
console.log("arr :>> ", arr); // arr :>>  [ 1, 2, 3, 4, 5 ]

const pushArr = arr.push("a");
console.log("pushArr :>> ", pushArr); // pushArr :>>  6
console.log("arr :>> ", arr); // arr :>>  [ 1, 2, 3, 4, 5, 'a' ]

const shiftArr = arr.shift();
console.log("shiftArr :>> ", shiftArr); // shiftArr :>>  1
console.log("arr :>> ", arr); // arr :>>  [ 2, 3, 4, 5, 'a' ]

const unshiftArr = arr.unshift("b", "c");
console.log("unshiftArr :>> ", unshiftArr); // unshiftArr :>>  7
console.log("arr :>> ", arr); // arr :>>  ['b', 'c', 2,3,4,5,'a']

const spliceArr = arr.splice(2, 4, "d", "e");
console.log("spliceArr :>> ", spliceArr); // spliceArr :>>  [ 2, 3, 4, 5 ]
console.log("arr :>> ", arr); // arr :>>  [ 'b', 'c', 'd', 'e', 'a' ]

const reverseArr = arr.reverse();
console.log("reverseArr :>> ", reverseArr); // reverseArr :>>  [ 'a', 'e', 'd', 'c', 'b' ]
console.log("arr :>> ", arr); // arr :>>  [ 'a', 'e', 'd', 'c', 'b' ]
console.log("reverseArr === arr :>> ", reverseArr === arr); // reverseArr === arr :>>  true
```

##### 闭包和作用域

闭包是作用域应用的特殊场景。 js中常见的作用域包括全局作用域、函数作用域、块级作用域。要知道**js中自由变量的查找是在函数定义的地方，向上级作用域查找，不是在执行的地方**。 常见的闭包使用有两种场景：一种是函数作为参数被传递；一种是函数作为返回值被返回。

```js
// 函数作为返回值
function create() {
  let a = 100;
  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn(); // 100

// 函数作为参数被传递
function print(fb) {
  const b = 200;
  fb();
}
const b = 100;
function fb() {
  console.log(b);
}
print(fb); // 100

```

##### 实现一个类似关键字new功能的函数

在js中new关键字主要做了：首先创建一个空对象，这个对象会作为执行new构造函数之后返回的对象实例，将创建的空对象原型（`__proto__`）指向构造函数的prototype属性，同时将这个空对象赋值给构造函数内部的this，并执行构造函数逻辑，根据构造函数的执行逻辑，返回初始创建的对象或构造函数的显式返回值。

```js
function newFn(...args) {
  const constructor = args.shift();
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
}

function Person(name) {
  this.name = name;
}

const p = newFn(Person, "Jerome");

console.log("p.name :>> ", p.name); // p.name :>>  Jerome

```

##### 如何实现继承（原型和原型链）

使用class语法，用extends进行继承,或直接改变对象的\_\_proto\_\_指向。

```js
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  showBrand() {
    console.log("the brand of car :>> ", this.brand);
  }
}

class ElectricCar extends Car {
  constructor(brand, duration) {
    super(brand);
    this.duration = duration;
  }
  showDuration() {
    console.log(`duration of this ${this.brand} ElectricCar :>> `, this.duration);
  }
}

ElectricCar.prototype.showOriginator = function (originator) {
  console.log(`originator of this ElectricCar :>> `, originator);
};

const tesla = new ElectricCar("tesla", "600km");
tesla.showBrand(); // the brand of car :>>  tesla
tesla.showDuration(); // duration of this tesla ElectricCar :>>  600km
console.log("tesla instanceof Car :>> ", tesla instanceof Car); // tesla instanceof Car :>>  true
console.log("tesla instanceof ElectricCar :>> ", tesla instanceof ElectricCar); // tesla instanceof ElectricCar :>>  true
console.log("tesla.__proto__ :>> ", tesla.__proto__); // tesla.__proto__ :>>  Car {}
console.log("ElectricCar.prototype === tesla.__proto__  :>> ", ElectricCar.prototype === tesla.__proto__); // ElectricCar.prototype === tesla.__proto__  :>>  true
tesla.showOriginator("Mask"); // originator of this  ElectricCar :>>  Mask

const bydCar = {
  brand: "比亚迪",
  duration: "666km",
};
bydCar.__proto__ = ElectricCar.prototype;

bydCar.showBrand(); //the brand of car :>>  比亚迪
bydCar.showDuration(); // duration of this 比亚迪 ElectricCar :>>  666km

```

##### 箭头函数和普通函数有什么区别

箭头函数不会创建自身的this，只会从上一级继承this，箭头函数的this在定义的时候就已经确认了，之后不会改变。同时箭头函数无法作为构造函数使用，没有自身的prototype，也没有arguments。

```js
this.id = "global";

console.log("this.id :>> ", this.id); // this.id :>>  global

function normalFun() {
  return this.id;
}

const arrowFun = () => {
  return this.id;
};

const newNormal = new normalFun();
console.log("newNormal :>> ", newNormal); // newNormal :>>  normalFun {}
try {
  const newArrow = new arrowFun();
} catch (error) {
  console.log("error :>> ", error); // error :>>  TypeError: arrowFun is not a constructor
}

console.log("normalFun :>> ", normalFun()); // normalFun :>>  undefined
console.log("arrowFun() :>> ", arrowFun()); // arrowFun() :>>  global

const obj = {
  id: "obj",
  normalFun,
  arrowFun,
};

const normalFunBindObj = normalFun.bind(obj);
const arrowFunBindObj = arrowFun.bind(obj);
console.log("normalFun.call(obj) :>> ", normalFun.call(obj)); // normalFun.call(obj) :>>  obj
console.log("normalFunBindObj() :>> ", normalFunBindObj()); // normalFunBindObj() :>>  obj
console.log("arrowFun.call(obj) :>> :>> ", arrowFun.call(obj)); // arrowFun.call(obj) :>> :>>  global
console.log("arrowFunBindObj() :>> ", arrowFunBindObj()); // arrowFunBindObj() :>>  global
console.log("obj.normalFun() :>> ", obj.normalFun()); // obj.normalFun() :>>  obj
console.log("obj.arrowFun() :>> ", obj.arrowFun()); // obj.arrowFun() :>>  global
```

##### 迭代器(iterator)接口和生成器(generator)函数的关系

任意一个对象实现了遵守迭代器协议的\[Symbol.iterator\]方法，那么该对象就可以调用\[Symbol.iterator\]返回一个遍历器对象。生成器函数就是遍历器生成函数，故可以把generator赋值给对象的\[Symbol.iterator\]属性，从而使该对象具有迭代器接口。

```js
class ClassRoom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }

  entry(student) {
    this.students.push(student);
  }

  *[Symbol.iterator]() {
    yield* this.students;
  }

  // [Symbol.iterator]() {
  //   let index = 0;
  //   return {
  //     next: () => {
  //       if (index < this.students.length) {
  //         return { done: false, value: this.students[index++] };
  //       } else {
  //         return { done: true, value: undefined };
  //       }
  //     },
  //     return: () => {
  //       console.log("iterator has early termination");
  //       return { done: true, value: undefined };
  //     },
  //   };
  // }
}

const classOne = new ClassRoom("7-101", "teach-one-room", ["rose", "jack", "lily", "james"]);

for (const stu of classOne) {
  console.log("stu :>> ", stu);
  // stu :>>  rose
  // stu :>>  jack
  // stu :>>  lily
  // stu :>>  james
  // if (stu === "lily") return;
}
```

##### 浏览器的事件循环机制

首先要知道一件事，JavaScript是单线程的（指的是js引擎在执行代码的时候只有一个主线程，每次只能干一件事），同时还是非阻塞运行的（执行异步任务的时候，会先挂起相应任务，待异步返回结果再执行回调），这就要知道其事件的循环机制才能正确理解js代码的执行顺序。

在js代码执行时，会将对象存在堆（heap）中，在栈（stack）中存放一些基础类型变量和对象的指针。在执行方法时，会根据当前方法的执行上下文，来进行一个执行。对于普通函数就是正常的入栈出栈即可，涉及到异步任务的时候，js执行会将对应的任务放到事件队列中（微任务队列、宏任务队列）。

* 常见微任务：queueMicrotask、Promise、MutationObserve等。
* 常见宏任务：ajax、setTimeout、setInterval、script（js整体代码）、IO操作、UI交互、postMessage等。

故事件循环可以理解为是一个桥梁，连接着应用程序的js和系统调用之间的通道。其过程为：

1. 执行一个宏任务（一般为一段script），若没有可选的宏任务，就直接处理微任务。
2. 执行中遇到微任务，就将其添加到微任务的任务队列中。
3. 执行中遇到宏任务，就将其提交到宏任务队列中。
4. 执行完当前执行的宏任务后，去查询当前有无需要执行的微任务，有就执行
5. 检查渲染，若需要渲染，浏览器执行渲染任务
6. 渲染完毕后，Js线程会去执行下一个宏任务。。。（如此循环）

```js
console.log("script start");

const promiseA = new Promise((resolve, reject) => {
  console.log("init promiseA");
  resolve("promiseA");
});

const promiseB = new Promise((resolve, reject) => {
  console.log("init promiseB");
  resolve("promiseB");
});

setTimeout(() => {
  console.log("setTimeout run");
  promiseB.then(res => {
    console.log("promiseB res :>> ", res);
  });
  console.log("setTimeout end");
}, 500);

promiseA.then(res => {
  console.log("promiseA res :>> ", res);
});

queueMicrotask(() => {
  console.log("queue Microtask run");
});

console.log("script end");

// script start
// init promiseA
// init promiseB
// script end
// promiseA res :>>  promiseA
// queue Microtask run
// setTimeout run
// setTimeout end
// promiseB res :>>  promiseB

```

### TypeScript

##### type和interface的区别

interface可以重复声明，type不行，继承方式不一样，type使用交叉类型方式，interface使用extends实现。在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。建议使用interface来描述对象对外暴露的借口，使用type将一组类型重命名（或对类型进行复杂编程）。

```ts
interface iMan {
  name: string;
  age: number;
}
// 接口可以进行声明合并
interface iMan {
  hobby: string;
}

type tMan = {
  name: string;
  age: number;
};
// type不能重复定义
// type tMan = {}

// 继承方式不同,接口继承使用extends
interface iManPlus extends iMan {
  height: string;
}
// type继承使用&，又称交叉类型
type tManPlus = { height: string } & tMan;

const aMan: iManPlus = {
  name: "aa",
  age: 15,
  height: "175cm",
  hobby: "eat",
};

const bMan: tManPlus = {
  name: "bb",
  age: 15,
  height: "150cm",
};
```

##### any、unkonwn、never

any和unkonwn在TS类型中属于最顶层的Top Type，即所有的类型都是它俩的子类型。而never则相反，它作为Bottom Type是所有类型的子类型。

##### 常见的工具类型

* Partial：满足部分属性(一个都没满足也可)即可
* Required：所有属性都需要
* Readonly: 包装后的所有属性只读 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dea2d0e6d6254dbe8da2c4f9dc8850a5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
* Pick: 选取部分属性
* Omit: 去除部分属性 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/237464ba46bc4fa29e335e1dde6ff70b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
* Extract: 交集
* Exclude: 差集 ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d5dd3396ab04fd8995305cbbc6a8ea2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 关于Vue

##### 虚拟DOM

采用虚拟DOM的更新技术在性能这块，理论上是不可能比原生Js操作DOM高的。不过在大部分情况下，开发者很难写出绝对优化的命令式代码。所以虚拟DOM就是用来解决这一问题，让开发者系的代码在性能上得到保障，甚至无限接近命令式代码的性能。 通常情况下，纯Js层面的操作远比DOM操作快。虚拟DOM就是用Js来模拟出DOM结构，通过diff算法来计算出最小的变更，通过对应的渲染器，来渲染到页面上。

同时虚拟DOM也为跨平台开发提供了极大的便利，开发者写的同一套代码（有些需要针对不同平台做区分），通过不同的渲染规则，就可以生成不同平台的代码。

在vue中会通过**渲染器**来将虚拟DOM转换为对应平台的真实DOM。如renderer(vnode， container)，该方法会根据vnode描述的信息（如tag、props、children）来创建DOM元素，根据规则为对应的元素添加属性和事件，处理vnode下的children。

##### vue3的变化（改进）

***响应式方面***

vue3的响应式是基于Proxy来实现的，利用代理来拦截对象的基本操作，配合Refelect.\*方法来完成响应式的操作。

***书写方面***

提供了setup的方式，配合组合式API，可以建立组合逻辑、创建响应式数据、创建通用函数、注册生命周期钩子等。

***diff算法方面：***

* 在vue2中使用的是双端diff算法：是一种同时比较新旧两组节点的两个端点的算法（比头、比尾、头尾比、尾头比）。一般情况下，先找出变更后的头部，再对剩下的进行双端diff。
* 在vue3中使用的是快速diff算法：它借鉴了文本diff算法的预处理思路，先处理新旧两组节点中相同的前置节点和后置节点。当前置节点和后置节点全部处理完毕后，如果无法通过简单的挂载新节点或者卸载已经不存在的节点来更新，则需要根据节点间的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。

***编译上的优化***

* vue3新增了PatchFlags来标记节点类型（动态节点收集与补丁标志），会在一个Block维度下的vnode下收集到对应的dynamicChildren（动态节点），在执行更新时，忽略vnode的children，去直接找到动态节点数组进行更新，这是一种高效率的靶向更新。
* vue3提供了静态提升方式来优化重复渲染静态节点的问题，结合静态提升，还对静态节点进行预字符串化，减少了虚拟节点的性能开销，降低了内存占用。
* vue3会将内联事件进行缓存，每次渲染函数重新执行时会优先取缓存里的事件

##### 关于vue3双向绑定的实现

vue3实现双向绑定的核心是Proxy（代理的使用），它会对需要响应式处理的对象进行一层代理，对象的所有操作（get、set等）都会被Prxoy代理到。在vue中，所有响应式对象相关的副作用函数会使用weakMap来存储。当执行对应的操作时，会去执行操作中所收集到的副作用函数。

```js
// WeakMap常用于存储只有当key所引用的对象存在时（没有被回收）才有价值的消息，十分贴合双向绑定场景
const bucket = new WeakMap(); // 存储副作用函数

let activeEffect; // 用一个全局变量处理被注册的函数

const tempObj = {}; // 临时对象，用于操作

const data = { text: "hello world" }; // 响应数据源

// 用于清除依赖
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 处理依赖函数
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };
  effectFn.deps = [];
  effectFn();
}

// 在get时拦截函数调用track函数追踪变化
function track(target, key) {
  if (!activeEffect) return; //
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect);

  activeEffect.deps.push(deps);
}

// 在set拦截函数内调用trigger来触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  const effectsToRun = new Set(effects);
  effectsToRun.forEach(effectFn => effectFn());
  // effects && effects.forEach(fn => fn());
}

const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    if (!activeEffect) return; //
    console.log("get -> key", key);
    track(target, key);
    return target[key];
  },

  // 拦截设置操作
  set(target, key, newValue) {
    console.log("set -> key: newValue", key, newValue);
    target[key] = newValue;
    trigger(target, key);
  },
});

effect(() => {
  tempObj.text = obj.text;
  console.log("tempObj.text :>> ", tempObj.text);
});

setTimeout(() => {
  obj.text = "hi vue3";
}, 1000);

```

##### vue3中的ref、toRef、toRefs

* ref:接收一个内部值，生成对应的响应式数据，该内部值挂载在ref对象的value属性上；该对象可以用于模版和reactive。使用ref是为了解决值类型在setup、computed、合成函数等情况下的响应式丢失问题。
* toRef:为响应式对象（reactive）的一个属性创建对应的ref，且该方式创建的ref与源属性保持同步。
* toRefs：将响应式对象转换成普通对象，对象的每个属性都是对应的ref，两者间保持同步。使用toRefs进行对象解构。

```js
function ref(val) {
    const wrapper = {value: val}
    Object.defineProperty(wrapper, '__v_isRef', {value: true})
    return reactive(wrapper)
}

function toRef(obj, key) {
    const wrapper = {
        get value() {
            return obj[key]
        },
        set value(val) {
            obj[key] = val
        }
    }
    Object.defineProperty(wrapper, '__v_isRef', {value: true})
    return wrapper
}

function toRefs(obj) {
    const ret = {}
    for (const key in obj) {
        ret[key] = toRef(obj, key)
    }
    
    return ret
}

// 自动脱ref
function proxyRefs(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            const value = Reflect.get(target, key, receiver)
            return value.__v_isRef ? value.value : value
        },
        set(target, key, newValue, receiver) {
            const value = target[key]
            if(value.__v_isRef) {
                value.value = newValue
                return true
            }
            return Reflect.set(target, key, newValue, receiver)
        }
    })
}
```

##### computed和watch的区别

使用场景：computed适用于一个数据受多个数据影响使用；watch适合一个数据影响多个数据使用。

区别：computed属性默认会走**缓存**，只有依赖数据发生变化，才会重新计算，不支持异步，有异步导致数据发生变化时，无法做出相应改变；watch不依赖缓存，一旦数据发生变化就直接触发响应操作，支持异步。

##### vue-router的路由守卫

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

##### composition Api 对比 option Api的优势

* 更好的代码组织
* 更好的逻辑复用
* 更好的类型推导

### 浏览器相关

##### 跨域问题

由于浏览器同源策略（浏览器安全功能，它会阻止一个域与另一个域的内容进行交互，能有效防止XSS、CSRF攻击）的限制，非同源的请求会被限制。

解决跨域问题的方法：

* 配置nginx反向代理
* 使用jsonp方式（script方式）
* 使用图片
* 设置CORS（跨域资源共享）
* 利用iframe实现
* WebSocket

##### 浏览器的存储有哪些及它们间的区别

* cookie
* session storage
* local storage
* indexedDB: 用于客户端存储大量的结构化数据（文件/二进制大型对象（blobs））。该API使用索引实现对数据的高性能搜索。
* cache storage: 用于对Cache对象的存储。

##### 说说浏览器渲染页面的过程

首先输入一个网址，浏览器会向服务器发起DNS请求，得到对应的IP地址（会被缓存一段时间，后续访问就不用再去向服务器查询）。之后会进行TCP三次握手与服务器建立连接，连接建立后，浏览器会代表用户发送一个初始的GET请求，通常是请求一个HTML文件。服务器收到对应请求后 ，会根据相关的响应头和HTML内容进行回复。

一旦浏览器拿到了数据，就会开始解析信息，这个过程中，浏览器会根据HTML文件去构建DOM树，当遇到一些阻塞资源时（如同步加载的script标签）会去加载阻塞资源而停止当前DOM树构建（所以能够异步的或延迟加载的就尽量异步或延迟，同时页面的脚本还是越少越好）。在构建DOM树时，浏览器的主线程被占据着，不过浏览器的预加载扫描器会去请求高优先级的资源（如css、js、字体），预加载扫描器很好的优化了阻塞问题。接下来浏览器会处理CSS生成CSSDOM树，将CSS规则转换为可以理解和使用的样式映射，这个过程非常快（通常小于一次DNS查询所需时间）。有了DOM树和CSSDOM树，浏览器会将其组合生成一个Render树，计算样式或渲染树会从DOM的根节点开始构建，遍历每一个可见节点（将相关样式匹配到每一个可见节点，并根据CSS级联去的每个节点的计算样式）。接下来开始布局，该过程（依旧是从根节点开始）会确定所有节点的宽高和位置，最后通过渲染器将其在页面上绘制。绘制完成了，并不代表交互也都生效了，因为主线程可能还无法抽出时间去处理滚动、触摸等交互，要等到js加载完成，同时主线程空闲了整个页面才是正常可用的状态。

![screenshot_02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f6d560b9d954daa9e2be1ca8bfb1db9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 工具链相关题目

##### 对webpack的理解

webpack是一个前端打包器，帮助开发者将js模块（各种类型的模块化规范）打包成一个或多个js脚本。webpack的工作过程可以分为依赖解析过程和代码打包过程，首先执行对应的build命令，webpack首先分析入口文件，会递归解析AST获取对应依赖，得到一个依赖图。然后为每一个模块添加包裹函数（webpack的模块化），从入口文件为起点，递归执行模块，进行拼接IIFE（立即调用函数表达式：保证了模块变量不会影响全局作用域），产出对应的bundle。

##### webpack中plugin和loader分别做什么？它们之间的执行顺序？

* loader：用于将不同类型的文件转换成webpack可以识别的文件（webpack只认识js和json）。
* plugin：存在于webpack整个生命周期中，是一种基于事件机制工作的模式，可以在webpck打包过程对某些节点做某些定制化处理。同时plugin可以对loader解析过程中做一些处理，协同处理文件。
* 执行顺序：两者不存在明显的先后顺序，不过webpack在初始化处理时，会优先识别到plugin中的内容。

##### webpack常见的优化方案

* 基于esm的tree shaking
* 对balel设置缓存，缩小babel-loader的处理范围,及精准指定要处理的目录。
* 压缩资源（mini-css-extract-plugin，compression-webpack-plugin）
* 配置资源的按需引入（第三方组件库）
* 配置splitChunks来进行按需加载（根据）
* 设置CDN优化

```js
rules: [
    {
        test: /\.m?js$/,
        exclude: /node_modules/
        include: path.resolve(__dirname, 'src'）,
        use: {
            loader: 'babel-loader?cacheDirectory'
        }
    }，
    
]
```

##### 关于babel的理解

babel是一个工具链，主要用于将ES2015+代码转换为当前和旧浏览器或环境中向后兼容的Js版本。这句话比较官方，其实babel就是一个语法转换工具链，它会将我们书写的代码（vue或react）通过相关的解析（对应的Preset），主要是词法解析和语法解析，通过babel-parser转换成对应的AST树，再对得到的抽象语法树根据相关的规则配置，转换成最终需要的目标平台识别的AST树，再得到目标代码。

在日程的Webpack使用主要有三个插件：babel-loader、babel-core、babel-preset-env。 babel本质上会运行babel-loader一个函数，在运行时会匹配到对应的文件，根据babel.config.js（.balelrc）的配置（这里会配置相关的babel-preset-env,它会告诉babel用什么规则去进行代码转换）去将代码进行一个解析和转换（转换依靠的是babel-core），最终得到目标平台的代码。

##### vite和webpak的区别

vite在开环境时基于ESBuild打包，相比webpack的编译方式，大大提高了项目的启动和热更新速度。

### 关于React

##### 说说看类组件的生命周期，函数组件使用哪些hook来代替的哪些生命周期

* 类组件生命周期

1. 初始化阶段，类组件会执行constructor（其只会在初始化阶段执行一次，使用super(props)确保props传递成功，同时做一些初始化操作，如声明state，绑定this等）。接下来，如果存在getDerivedStateFromProps就执行getDerivedStateFromProps（该函数传入两个参数（nextProps，prevState），其作用是：代替componentWillMount和componentWillReceiveProps;在组件初始化或更新时，将props映射到state；其返回值会与state合并，可作为shouldComponentUpdate的第二个参数newState，用于判断是否需要渲染），不存在的话componentWillMount（由于存在隐匿风险已经废弃，不建议使用）将会被执行，到此mountClassComponent函数咨询完成，之后会执行render（创建React.element元素的过程）渲染函数，形成children，接下来React会调用reconcileChildren方法深度调和children。react调和完所有的fiber节点，就会进入到commit阶段，然后会执行componentDidMount（其执行时机和componentDidUpdate一样，只是一个是初始化阶段，一个是更新阶段，此时DOM已经挂载，可以进行DOM操作，同时可以向服务端请求数据，渲染视图）。

```js
constructor ->
getDerivedStateFromProps -> 
componentWillMount -> 
render -> 
componentDidMount
```

2. 更新阶段，类组件会判断是否存在getDerivedStateFromProps，不存在会执行componentWillReceiveProps，存在就执行getDerivedStateFromProps（返回的值用于合成新的state）。之后执行shouldComponentUpdate（用于性能优化），传入新的props、state、context，根据其返回值来决定是否执行render函数。接下来执行componentWillUpdate，到这里updateClassInstance方法执行完毕。接下来进入render函数，得到最新的React Element元素，然后继续调和子节点。 之后进入commit阶段，会执行getSnapshotBeforeUpdate（会返回一个DOM修改前的快照，作为传递给compontDidUpdate的第三个参数，该参数不限于DOM的信息，可以时DOM计算出的产物），然后会执行compontDidUpdate（此时dom已经修改完成，可以进行dom操作；不能再这个函数里执行setState操作，否则会导致无限循环）。这就是一个完整的更新。

```js
componentWillReciveProps(props改变)/getDrivedStateFromProp ->
shouldComponentUpdate ->
componentWillUpdate ->
render ->
getSnapshotBeforeUpdate ->
componentDidUpdate
```

3. 销毁阶段，类组件会先执行componentWillUnmount（清除一些定时器、事件监听器）

* 函数组件的生命周期替代方案

useEffect:其第一个参数cb，返回的destory作为下一次cb执行之前调用，用于清楚上一次cb产生的副作用；第二个参数是依赖项，为一个数组，依赖改变，执行上一次cb返回的destory，和执行新的effect的cb。 useEffect的执行，React采用的异步调用的逻辑，对于每一个effect的cb，React会将其放入到事件队列中，等主线程完成，DOM更新，js执行完毕，视图绘制完成，才执行，故，effect的回调不会阻塞浏览器的视图绘制。

```js
useEffect(() => {
    return destory
}, dep)
```

useLayoutEffect：不同于useEffect的是，其采用了同步执行，它是在DOM更新前，浏览器绘制之前执行，适合在这个时候修改DOM，这样浏览器只会绘制一次。如果将修改DOM操作放在useEffect中，会导致浏览器的重绘和回流。故useLayoutEffect的cb会阻塞浏览器绘制。

```js
useLayoutEffect(() => {
    // deal Dom
}, dep)
```

##### 对于Fiber架构理解

Fiber出现在React16版本，在15及以前的版本，React更新DOM都是使用递归的方式进行遍历，每次更新都会从应用根部递归执行，且一旦开始，无法中断，这样层级越来越深，结构复杂度高的项目就会出现明显的卡顿。fiber架构出现就是为了解决这个问题，fiber是在React中最小粒度的执行单元，可以将fiber理解为是React的虚拟DOM。在React中，更新fiber的过程叫做调和，每一个fiber都可以作为一个执行单元进行处理，同时每个fiber都有一个优先级lane（16版本是expirationTime）来判断是否还有空间或时间来执行更新，如果没有时间更新，就会把主动权交给浏览器去做一些渲染（如动画、重排、重绘等），用户就不会感觉到卡顿。然后，当浏览器空闲了（requestIdleCallback），就通过scheduler（调度器）将执行恢复到执行单元上，这样本质上是中断了渲染，不过题改了用户的体验。React实现的fiber模式是一个具有链表和指针的异步模型。

fiber作为react创建的element和真实DOM之间的桥梁，每一次更新的触发会在React element发起，经过fiber的调和，然后更新到真实DOM上。fiber上标识了各种不同类型的element，同时记录了对应和当前fiber有关的其他fiber信息（return指向父级、child指向子级、sibling指向兄弟）。

在React应用中，应用首次构建时，会创建一个fiberRoot作为整个React应用的根基。然后当ReactDOM.render渲染出来时，会创建一个rootFiber对象（一个Ract应用可以用多个rootFiber，但只能有一个fiberRoot），当一次挂载完成时，fiberRoot的current属性会指向对应rootFiber。挂载完成后，会进入正式渲染阶段，在这个阶段必须知道一个workInProgerss树（它是正在内存在构建的Fiber树，在一次更新中，所有的更新都发生在workInProgeress树上，更新完成后，将变成current树用于渲染视图）,当前的current树（rootFiber）的alternate会作为workInProgerss，同时会用alternate将workInProgress与current树进行关联（该关联只有在初始化第一次创建alternate时进行）。

```js
currentFiber.alternate = workInProgressFiber
workInProgressFiber.alternate = currentFiber
```

关联之后，会在心间的alternate上，完成整个fiber树的遍历。最后workInProgerss会作为最新的渲染树，来称为fiberRoot指向的current Fiber树。

之后更新的时候依旧会重新创建一颗workInProgerss树，复用current上面的alternate，由于初始化的rootfiber有alternate，对于剩余的字节点，React都会创建一份，进行相同的关联。待渲染完毕之后，workInProgerss树再次变成current树。

### 项目相关题

##### 关于模块化

首先模块化的目的是将程序划分为一个个小的结构。在这些结构中编写自己的逻辑代码，有自己的作用域，不会影响到其他的结构。同时这些结构可以将自己希望暴露的函数、变量、对象等导出给其他结构使用，也可通过某种方式，将另外结构中的函数、变量、对象等导入使用。

##### 微前端

随着项目的开发，会出现一个前端项目模块巨多的情况，不利于开发和维护。微前端就能帮助我们解决这个问题，帮我们实现了前端复杂项目的解耦，同时能做到跨团队和跨部门协同开发。 对于微前端，它与技术栈无关（主框架不限制介入应用的技术栈，微应用具有完全的自主权），各个微应用间仓库独立，每个微应用之间状态隔离，运行时状态不共享。 常见的微前端实现方案：

* 基于iframe的完全隔离，iframe是浏览器自带的功能，使用简单，隔离完美，不过它无法保持路由状态，页面一刷新状态就丢失，同时iframe中的状态无法突破对应的应用，同时整个应用是全量加载，速度慢。
* 基于single-spa路由劫持的方案。qiankun就是基于这种方案实现的，通过对single-spa做一层封装，根据执行环境的修改，来解析微应用的资源，实现了JS沙箱、样式隔离等特性。
* 借鉴WebComponent思想的micro-app，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类Web Component组件。

##### 前端低代码的认识

低代码平台一般提供一个可视化的编辑页面，供知晓低代码开发规则的人员进行编程，是一种声明式编程。 常见的低代码工作流程如图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/744b30e248dd4ad98b12ce130f29ff8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

低代码的好处：

* 门槛低，所见即所得，上手容易
* 基于现成组件库开发，开发速度快

低代码的缺点：

* 灵活性差，只适合某些特定领域
* 调试困难，对使用者来说是个黑盒
* 对运行环境有一定要求，兼容性不好，低代码开发的兼容性完全取决于低代码平台的支持

##### 前端权限设计思路

项目中，尤其是管理后台必不可少的一个环节就是权限设计。通常一个系统下的不同用户会对应不同的角色，不同角色会对应不同的组织。在进入到管理里后台的时候会去请求对应的权限接口，这个接口里有和后台约定好的权限标识内容，如果权限管理不是很复杂，可以将当前用户的所有权限标识一次性返回，前端进行一个持久化存储，之后根据规则处理即可。如果是个极为复杂的权限管理，甚至存在不同操作导致同一用户对应后续流程权限变化的情况，这里就建议用户首次登录管理后台时，获取的是最高一层权限，即可以看到的页面权限，之后在用户每次做了不同操作，切换页面的时候，根据约定好的规则，在页面路由切换的时候去请求下一个页面对应的权限（可以精确到每个交互动作），这样能更加精确的管理权限。

##### taro是如何将react代码转换成对应的小程序代码或其他平台代码

平时使用React JSX进行开发时，要知道React将其核心功能分成了三部分：React Core（负责处理核心API、与终端平台和渲染解耦，提供了createElement、createClass、Component、Children等方法）、React Renderer（渲染器，定义了React Tree如何构建以接轨不同平台，有React-dom、React-Natvie等）、React Reconciler（调和器，负责diff算法，接驳patch行为。为渲染器提供基础计算能力，主要有16版本之前的Stack Reconciler和16及其之后的Fiber Reconciler）。React团队将Reconciler作为一个单独的包发布，任何平台的渲染器函数只要在HostConfig（宿主配置）内置基本方法，就可以构造自己的渲染逻辑。有了react-reconciler的支持。Taro团队就是提供了taro-react（实现了HostConfig）包来连接react-reconciler和taro-runtime。开发者写的React代码，Taro通过CLI将代码进行webpack打包，taro实现了一套完整的DOM和BOM API在各个平台的适配，打包完之后，就可以将程序渲染到对应的平台上。 核心就在于对输入的源代码的语法分析，语法树构建，随后对语法树进行转换操作再解析生成目标代码的过程。

##### token可以放在cookie里吗？

当被问这个问题的时候，第一时间要想到安全问题。通常回答不可以，因为存在CSRF（跨站请求伪造）风险，攻击者可以冒用Cookie中的信息来发送恶意请求。解决CSRF问题，可以设置同源检测（Origin和Referer认证），也可以设置Samesite为Strict。最好嘛，就是不把token放在cookie里咯。

##### 前端埋点的实现，说说看思路

对于埋点方案：一般分为手动埋点（侵入性强，和业务强关联，用于需要精确搜集并分析数据，不过该方式耗时耗力，且容易出现误差，后续要调整，成本较高）、可视化埋点（提供一个可视化的埋点控制台，只能在可视化平台已支持的页面进行埋点）、无埋点（就是全埋点，监控页面发生的一切行为，优点是前端只需要处理一次埋点脚本，不过数据量过大会产生大量的脏数据，需要后端进行数据清洗）。

埋点通常传采用img方式来上传，首先所有浏览器都支持Image对象，并且记录的过程很少出错，同时不存在跨域问题，请求Image也不会阻塞页面的渲染。建议使用1\*1像素的GIF，其体积小。

现在的浏览器如果支持Navigator.sendBeacon(url, data)方法，优先使用该方法来实现，它的主要作用就是用于统计数据发送到web服务器。当然如果不支持的话就继续使用图片的方式来上传数据。

##### 说说封装组件的思路

要考虑组件的灵活性、易用性、复用性。 常见的封装思路是，对于视图层面，如相似度高的视图，进行一个封装，提供部分参数方便使用者修改。对于业务复用度较高的，提取出业务组件。

### 性能优化题

##### 什么情况下会重绘和回流，常见的改善方案

浏览器请求到对应页面资源的时候，会将HTML解析成DOM，把CSS解析成CSSDOM，然后将DOM和CSSDOM合并就产生了Render Tree。在有了渲染树之后，浏览器会根据流式布局模型来计算它们在页面上的大小和位置，最后将节点绘制在页面上。

那么当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变，浏览器就会重新渲染页面，这个就是浏览器的回流。常见的回流操作有：页面的首次渲染、浏览器窗口尺寸改变、部分元素尺寸或位置变化、添加或删除可见的DOM、激活伪类、查询某些属性或调用方法（各种宽高的获取，滚动方法的执行等）。

当页面中的元素样式的改变不影响它在文档流的位置时（如color、background-color等），浏览器对应元素的样式，这个就是重绘。

可见：**回流必将导致重绘，重绘不一定会引起回流。回流比重绘的代价更高**。

常见改善方案：

* 在进行频繁操作的时候，使用防抖和节流来控制调用频率。
* 避免频繁操作DOM，可以利用DocumentFragment，来进行对应的DOM操作，将最后的结果添加到文档中。
* 灵活使用display: none属性，操作结束后将其显示出来，因为display的属性为none的元素上进行的DOM操作不会引发回流和重绘。
* 获取各种会引起重绘/回流的属性，尽量将其缓存起来，不要频繁的去获取。
* 对复杂动画采用绝对定位，使其脱离文档流，否则它会频繁的引起父元素及其后续元素的回流。

##### 一次请求大量数据怎么优化，数据多导致渲染慢怎么优化

个人觉得这就是个伪命题，首先后端就不该一次把大量数据返回前端，但是会这么问，那么我们作为面试的就老老实实回答呗。

首先大量数据的接收，那么肯定是用异步的方式进行接收，对数据进行一个分片处理，可以拆分成一个个的小单元数据，通过自定义的属性进行关联。这样数据分片完成。接下来渲染的话，由于是大量数据，如果是长列表的话，这里就可以使用虚拟列表（当前页面需要渲染的数据拿到进行渲染，然后对前面一段范围及后面一段范围，监听对应的滚动数据来切换需要渲染的数据，这样始终要渲染的就是三部分）。当然还有别的渲染情况，比如echarts图标大量点位数据优化等。

### 手写题

##### 模拟链表结构

主要思路就是要时刻清楚对应Node的next和prev的指向，并利用while循环去做对应的增删改查操作。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b913e7e8e375443ab82950ccb1bb83d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```js
class Node {
  constructor(data) {
    this.data = data; // 节点数据
    this.next = null; // 指向下一个节点
    this.prev = null; // 指向前一个节点
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 链表头
    this.tail = null; // 链表尾
  }

  // 在链表尾部添加新节点
  add(item) {
    let node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
  }

  // 链表指定位置添加新节点
  addAt(index, item) {
    let current = this.head;
    let counter = 1;
    let node = new Node(item);

    if (index === 0) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      while (current) {
        current = current.next;
        if (counter === index) {
          node.prev = current.prev;
          current.prev.next = node;
          node.next = current;
          current.prev = node;
        }
        counter++;
      }
    }
  }

  remove(item) {
    let current = this.head;
    while (current) {
      if (current.data === item) {
        if (current == this.head && current == this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current == this.head) {
          this.head = this.head.next;
          this.head.prev = null;
        } else if (current == this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      current = current.next;
    }
  }

  removeAt(index) {
    let current = this.head;
    let counter = 1;

    if (index === 0) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      while (current) {
        current = current.next;
        if (current == this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else if (counter === index) {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          break;
        }
        counter++;
      }
    }
  }

  reverse() {
    let current = this.head;
    let prev = null;
    while (current) {
      let next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }

    this.tail = this.head;
    this.head = prev;
  }

  swap(index1, index2) {
    if (index1 > index2) {
      return this.swap(index2, index1);
    }

    let current = this.head;
    let counter = 0;
    let firstNode;

    while (current !== null) {
      if (counter === index1) {
        firstNode = current;
      } else if (counter === index2) {
        let temp = current.data;
        current.data = firstNode.data;
        firstNode.data = temp;
      }

      current = current.next;
      counter++;
    }
    return true;
  }

  traverse(fn) {
    let current = this.head;
    while (current !== null) {
      fn(current);
      current = current.next;
    }
    return true;
  }

  find(item) {
    let current = this.head;
    let counter = 0;
    while (current) {
      if (current.data == item) {
        return counter;
      }
      current = current.next;
      counter++;
    }
    return false;
  }

  isEmpty() {
    return this.length() < 1;
  }

  length() {
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      counter++;
      current = current.next;
    }
    return counter;
  }
}
```

##### 手写一个深拷贝

```ts
// 手写一个深拷贝

function deepClone<T extends Array<T> | any>(obj: T): T {
  if (typeof obj !== "object" || obj === null) return obj;

  const result: T = obj instanceof Array ? ([] as T) : ({} as T);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}

const obj = {
  a: 1,
  b: {
    bb: "hh",
  },
  c() {
    console.log("cc");
  },
};

const cloneObj = deepClone(obj);
obj.a = 999;
console.log("cloneObj :>> ", cloneObj);
console.log("obj :>> ", obj);
// cloneObj :>>  { a: 1, b: { bb: 'hh' }, c: [Function: c] }
// obj :>>  { a: 999, b: { bb: 'hh' }, c: [Function: c] }

const arr: Array<number | string> = [1, 2, 3, "6"];
const copyArr = deepClone(arr);
arr[3] = 4;
console.log("arr | copyArr :>> ", arr, copyArr); // arr | copyArr :>>  [ 1, 2, 3, 4 ] [ 1, 2, 3, '6' ]

```

##### 手写Promise

```js
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

// help fun
function execFunctionWithCatchError(execFun, value, resolve, reject) {
  try {
    const result = execFun(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING; // 记录promise状态
    this.value = undefined; // resolve返回值
    this.reason = undefined; // reject返回值
    this.onFulfilledFns = []; // 存放成功回调
    this.onRejectedFns = []; // 存放失败回调

    const resolve = value => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach(fn => {
            fn(this.value);
          });
        });
      }
    };
    const reject = reason => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach(fn => {
            fn(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      onFulfilled ||
      (value => {
        return value;
      });

    onRejected =
      onRejected ||
      (err => {
        throw err;
      });

    return new MyPromise((resolve, reject) => {
      // 1、 when operate then, status have confirmed
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      if (this.status === PROMISE_STATUS_PENDING) {
        // this.onFulfilledFns.push(onFulfilled);
        if (onFulfilled) {
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
          });
        }

        // this.onRejectedFns.push(onRejected);
        if (onRejected) {
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
          });
        }
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach(promise => {
        promise.then(
          res => {
            values.push(res);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          err => {
            reject(err);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise(resolve => {
      const results = [];
      promises.forEach(promise => {
        promise.then(
          res => {
            results.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (results.length === promises.length) {
              resolve(results);
            }
          },
          err => {
            results.push({ status: PROMISE_STATUS_REJECTED, value: err });
            if (results.length === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const reasons = [];
      promises.forEach(promise => {
        promise.then(
          res => {
            resolve(res);
          },
          err => {
            reasons.push(err);
            if (reasons.length === promise.length) {
              // reject(new AggreagateError(reasons));
              reject(reasons);
            }
          }
        );
      });
    });
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log("--- 1 ---");
    resolve(111);
  });
}).then(res => {
  console.log("p1 res :>> ", res);
});

const p2 = new MyPromise((resolve, reject) => {
  console.log("--- 2 ---");
  resolve(222);
});

const p3 = new MyPromise((resolve, reject) => {
  console.log("--- 3 ---");
  resolve(333);
});

const p4 = new MyPromise((resolve, reject) => {
  console.log("--- 4 ---");
  reject(444);
});

MyPromise.all([p2, p3]).then(res => {
  console.log("p2&p3 res :>> ", res);
});

MyPromise.all([p2, p4])
  .then(res => {
    console.log("p2&p4 res :>> ", res);
  })
  .catch(err => {
    console.log("err :>> ", err);
  });

// --- 2 ---
// --- 3 ---
// --- 4 ---
// p2&p3 res :>>  [ 222, 333 ]
// err :>>  444
// --- 1 ---
// p1 res :>>  111
```

##### 手写防抖和节流函数

```ts
function debounce(fn: Function, delay: number) {
  let timer: any = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}


function throttle(fn: Function, delay: number) {
  let timer: any = null;

  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

```

##### 手写快速排序

```ts
function quickSort(arr: number[], startIndex = 0): number[] {
  if (arr.length <= 1) return arr;
  const right: number[] = [],
    left: number[] = [],
    startNum = arr.splice(startIndex, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < startNum) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), startNum, ...quickSort(right)];
}
```

##### 输入为两个一维数组，将这两个数组合并，去重，不要求排序，返回一维数组

```ts
function dealArr(arr1: any[], arr2: any[]): any[] {
  return Array.from(new Set([...arr1.flat(), ...arr2.flat()]));
}

const arr1 = ["a", 1, 2, 3, ["b", "c", 5, 6]];
const arr2 = [1, 2, 4, "d", ["e", "f", "5", 6, 7]];

console.log("dealArr(arr1, arr2 ); :>> ", dealArr(arr1, arr2)); // dealArr(arr1, arr2 ); :>>  [ 'a', 1, 2, 3,'b', 'c', 5,6, 4, 'd', 'e', 'f','5', 7]
```

##### 编写函数convert(money) ，传入金额，将金额转换为千分位表示法。ex:-87654.3 => -87,654.3

思路：判断是否是负数，判断是否有小数点，将整数部分进行处理。

```ts
function convert(money: number): string {
  let result: string[] = []; // 用于存放整数部分
  let negativeFlag: string = ""; // 是否要负号
  let tail: string = ""; // 用于存放小数点后面部分
  let arr: string[] = [...String(money)];

  // 判断是否是负数
  if (arr[0] === "-") {
    negativeFlag = "-";
    arr.shift();
  }

  // 判断是否存在小数点
  const dotIndex: number = arr.indexOf(".");
  if (dotIndex !== -1) {
    tail = arr.splice(dotIndex, arr.length - dotIndex).join("");
  }

  // 处理整数部分加上千分位
  const reverseArray: string[] = arr.reverse();
  for (let i = 0; i < reverseArray.length; i++) {
    if ((i + 1) % 3 === 0 && i + 1 < reverseArray.length) {
      result[i] = "," + reverseArray[i];
    } else {
      result[i] = reverseArray[i];
    }
  }
  return negativeFlag + result.reverse().join("") + tail;
}
```

### 总结

一个渣渣前端在面试过程中遇到的题目😝。
