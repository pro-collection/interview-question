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
