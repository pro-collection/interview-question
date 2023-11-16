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
