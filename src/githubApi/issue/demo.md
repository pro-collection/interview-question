**关键词**：for...in遍历、for...of遍历

普通对象因为没有迭代器，所以无法使用for...of遍历，一般使用for...in或者Object.keys()来遍历

但是如果我们手动给对象设置一个迭代器，对象也是可以使用for...of来遍历的;

```js
var obj = {
  a:1,
  b:2,
  c:3
}

obj.__proto__[Symbol.iterator] = function* objectIterator() {
  for (let key in this) {
    if (obj.hasOwnProperty(key)) {
      yield [key, this[key]]
    }
  }
}

for(let v of obj){
  console.log(v);
}
//['a',1]
//['b',2]
//['c',3]
```
