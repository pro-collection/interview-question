**关键词**：缓存函数实现、memoize函数

用于创建一个带有缓存功能的函数。下面是一个简化版本的手写实现，展示了如何自己实现 `memoize` 函数：

```javascript
function memoize(func) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      return cache[key];
    }

    const result = func.apply(this, args);
    cache[key] = result;

    return result;
  };
}

// 示例用法
const expensiveFunction = memoize(function (n) {
  console.log('Computing...');
  return n * 2;
});

console.log(expensiveFunction(5)); // 第一次调用，输出：Computing... 10
console.log(expensiveFunction(5)); // 第二次调用，直接从缓存中获取结果，输出：10
console.log(expensiveFunction(10)); // 新的参数，再次计算并缓存结果，输出：Computing... 20
console.log(expensiveFunction(10)); // 再次调用，直接从缓存中获取结果，输出：20
```

上述代码中的 `memoize` 函数接受一个函数 `func` 作为参数，并返回一个新的函数。返回的函数具有缓存的能力，即根据参数的不同缓存计算结果。

在返回的函数内部，首先将传入的参数 `args` 转换成一个唯一的字符串 `key`，以便作为缓存对象 `cache` 然后检查 `cache` 对象中是否存在对应的缓存结果，如果存在直接返回缓存结果，否则执行原始函数 `func` 并将结果缓存起来。

通过这种方式，对于相同的参数，后续的调用将直接从缓存中获取结果，而不会再次执行函数。这样可以避免重复计算，提高函数的性能。

在示例中，我们创建了一个名为 `expensiveFunction` 的函数，并使用 `memoize` 进行包装。第一次调用时，函数会执行计算，并输出 `"Computing..."`，结果为 10。第二次调用时，函数直接从缓存中获取结果，无需再次计算。最后两次调用分别使用了不同的参数，会触发新的计算并缓存结果。

需要注意的是，这个手写的 `memoize` 函数是一个简化版本，仅适用于参数为基本类型的情况。对于参数为复杂类型（如对象、数组等）的情况，需要使用更复杂的缓存键值生成方法，以确保正确的缓存行为。此外，实际的 Lodash 库中的 `memoize` 函数还提供了其他选项和功能，例如自定义缓存键生成函数、缓存过期时间等。
