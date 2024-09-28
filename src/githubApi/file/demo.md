**关键词**：数组访问

在 JavaScript 中，从数组中获取第一个元素和获取最后一个元素（假设这里你说的第 10 万个元素相当于数组的最后一个元素）的时间差异通常非常小，几乎可以忽略不计。

数组在内存中通常是连续存储的，访问数组中的元素可以通过索引快速定位。无论是访问第一个元素还是最后一个元素，时间复杂度都是 O(1)，即可以在常数时间内完成。

然而，在实际情况中，可能会有一些微小的差异，这取决于以下因素：

1. 数组的存储方式和实现细节：不同的 JavaScript 引擎可能在内部实现上有一些差异，但这些差异通常非常小。
2. 计算机的内存和处理器性能：如果计算机的内存或处理器性能较低，可能会导致一些微小的延迟，但这种延迟不太可能在获取不同位置的元素之间有明显差异。

以下是一个简单的测试示例：

```javascript
const largeArray = Array.from({ length: 100000 }, (_, index) => index);

console.time("accessFirstElement");
const firstElement = largeArray[0];
console.timeEnd("accessFirstElement");

console.time("accessLastElement");
const lastElement = largeArray[99999];
console.timeEnd("accessLastElement");
```

在大多数情况下，你会发现这两个操作的时间非常接近，甚至可能在同一毫秒内完成。
