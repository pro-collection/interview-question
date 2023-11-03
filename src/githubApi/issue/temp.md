## JS数组42个方法汇总

<!-- toc -->

+ [改变数组本身 （9个）](#%E6%94%B9%E5%8F%98%E6%95%B0%E7%BB%84%E6%9C%AC%E8%BA%AB-9%E4%B8%AA)
    + [pop和push尾部删除添加](#pop%E5%92%8Cpush%E5%B0%BE%E9%83%A8%E5%88%A0%E9%99%A4%E6%B7%BB%E5%8A%A0)
    + [unshift和shift头部删除添加](#unshift%E5%92%8Cshift%E5%A4%B4%E9%83%A8%E5%88%A0%E9%99%A4%E6%B7%BB%E5%8A%A0)
    + [sort 排序](#sort-%E6%8E%92%E5%BA%8F)
    + [reverse 反转](#reverse-%E5%8F%8D%E8%BD%AC)
    + [splice 截取新增数据](#splice-%E6%88%AA%E5%8F%96%E6%96%B0%E5%A2%9E%E6%95%B0%E6%8D%AE)
    + [copyWithin 将数组得一部分赋值到另一个位置](#copywithin-%E5%B0%86%E6%95%B0%E7%BB%84%E5%BE%97%E4%B8%80%E9%83%A8%E5%88%86%E8%B5%8B%E5%80%BC%E5%88%B0%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%BD%8D%E7%BD%AE)
    + [fill 填充](#fill-%E5%A1%AB%E5%85%85)
  
+ [不改变原数组 （11个）](#%E4%B8%8D%E6%94%B9%E5%8F%98%E5%8E%9F%E6%95%B0%E7%BB%84-11%E4%B8%AA)
    + [filter 数据过滤](#filter-%E6%95%B0%E6%8D%AE%E8%BF%87%E6%BB%A4)
    + [map](#map)
    + [reduce 数据累加](#reduce-%E6%95%B0%E6%8D%AE%E7%B4%AF%E5%8A%A0)
    + [reduceRight 从右开始 数据累加](#reduceright-%E4%BB%8E%E5%8F%B3%E5%BC%80%E5%A7%8B-%E6%95%B0%E6%8D%AE%E7%B4%AF%E5%8A%A0)
    + [slice 数组截取](#slice-%E6%95%B0%E7%BB%84%E6%88%AA%E5%8F%96)
    + [concat 数组合并](#concat-%E6%95%B0%E7%BB%84%E5%90%88%E5%B9%B6)
    + [flatMap 扁平化map](#flatmap-%E6%89%81%E5%B9%B3%E5%8C%96map)
    + [with 修改指定索引值得复制方法](#with-%E4%BF%AE%E6%94%B9%E6%8C%87%E5%AE%9A%E7%B4%A2%E5%BC%95%E5%80%BC%E5%BE%97%E5%A4%8D%E5%88%B6%E6%96%B9%E6%B3%95)
    + [toReversed 反转数组的复制版](#toreversed-%E5%8F%8D%E8%BD%AC%E6%95%B0%E7%BB%84%E7%9A%84%E5%A4%8D%E5%88%B6%E7%89%88)
    + [toSorted 排序的复制版](#tosorted-%E6%8E%92%E5%BA%8F%E7%9A%84%E5%A4%8D%E5%88%B6%E7%89%88)
    + [toSpliced 截取新增数组的复制版](#tospliced-%E6%88%AA%E5%8F%96%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E7%9A%84%E5%A4%8D%E5%88%B6%E7%89%88)
  
+ [其他 功能性方法(22个)](#%E5%85%B6%E4%BB%96-%E5%8A%9F%E8%83%BD%E6%80%A7%E6%96%B9%E6%B3%9522%E4%B8%AA)
    + [forEach 数组遍历](#foreach-%E6%95%B0%E7%BB%84%E9%81%8D%E5%8E%86)
    + [Array.from() 转换成数组](#arrayfrom-%E8%BD%AC%E6%8D%A2%E6%88%90%E6%95%B0%E7%BB%84)
    + [Array.fromAsync Array.from异步版本](#arrayfromasync-arrayfrom%E5%BC%82%E6%AD%A5%E7%89%88%E6%9C%AC)
    + [Array.isArray 判断是不是数组](#arrayisarray-%E5%88%A4%E6%96%AD%E6%98%AF%E4%B8%8D%E6%98%AF%E6%95%B0%E7%BB%84)
    + [includes 判断某个值数组中是否存在](#includes-%E5%88%A4%E6%96%AD%E6%9F%90%E4%B8%AA%E5%80%BC%E6%95%B0%E7%BB%84%E4%B8%AD%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8)
    + [indexOf 判断数组中是否存在某个值，并返回索引](#indexof-%E5%88%A4%E6%96%AD%E6%95%B0%E7%BB%84%E4%B8%AD%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E6%9F%90%E4%B8%AA%E5%80%BC%E5%B9%B6%E8%BF%94%E5%9B%9E%E7%B4%A2%E5%BC%95)
    + [lastIndexOf 判断数组中是否存在某个值，并返回最后的索引](#lastindexof-%E5%88%A4%E6%96%AD%E6%95%B0%E7%BB%84%E4%B8%AD%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E6%9F%90%E4%B8%AA%E5%80%BC%E5%B9%B6%E8%BF%94%E5%9B%9E%E6%9C%80%E5%90%8E%E7%9A%84%E7%B4%A2%E5%BC%95)
    + [find 查找符合条件的元素](#find-%E6%9F%A5%E6%89%BE%E7%AC%A6%E5%90%88%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%85%83%E7%B4%A0)
    + [findIndex 查找符合条件的元素，返回索引版](#findindex-%E6%9F%A5%E6%89%BE%E7%AC%A6%E5%90%88%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%85%83%E7%B4%A0%E8%BF%94%E5%9B%9E%E7%B4%A2%E5%BC%95%E7%89%88)
    + [findLast 从右向左查找符合条件的元素](#findlast-%E4%BB%8E%E5%8F%B3%E5%90%91%E5%B7%A6%E6%9F%A5%E6%89%BE%E7%AC%A6%E5%90%88%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%85%83%E7%B4%A0)
    + [findLastIndex 从右向左查找符合条件的元素,返回索引版](#findlastindex-%E4%BB%8E%E5%8F%B3%E5%90%91%E5%B7%A6%E6%9F%A5%E6%89%BE%E7%AC%A6%E5%90%88%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%85%83%E7%B4%A0%E8%BF%94%E5%9B%9E%E7%B4%A2%E5%BC%95%E7%89%88)
    + [at 返回索引位置的值](#at-%E8%BF%94%E5%9B%9E%E7%B4%A2%E5%BC%95%E4%BD%8D%E7%BD%AE%E7%9A%84%E5%80%BC)
    + [Array.of 创建可变的数组](#arrayof-%E5%88%9B%E5%BB%BA%E5%8F%AF%E5%8F%98%E7%9A%84%E6%95%B0%E7%BB%84)
    + [flat 扁平化数组](#flat-%E6%89%81%E5%B9%B3%E5%8C%96%E6%95%B0%E7%BB%84)
    + [every 所有元素是否通过测试](#every-%E6%89%80%E6%9C%89%E5%85%83%E7%B4%A0%E6%98%AF%E5%90%A6%E9%80%9A%E8%BF%87%E6%B5%8B%E8%AF%95)
    + [some 数组中至少有一个元素通过测试](#some-%E6%95%B0%E7%BB%84%E4%B8%AD%E8%87%B3%E5%B0%91%E6%9C%89%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E9%80%9A%E8%BF%87%E6%B5%8B%E8%AF%95)
    + [join 选定格式转换成字符串](#join-%E9%80%89%E5%AE%9A%E6%A0%BC%E5%BC%8F%E8%BD%AC%E6%8D%A2%E6%88%90%E5%AD%97%E7%AC%A6%E4%B8%B2)
    + [toString 转换成字符串](#tostring-%E8%BD%AC%E6%8D%A2%E6%88%90%E5%AD%97%E7%AC%A6%E4%B8%B2)
    + [toLocaleString](#tolocalestring)
    + [entries 返回数组迭代器的对象，包含键和值](#entries-%E8%BF%94%E5%9B%9E%E6%95%B0%E7%BB%84%E8%BF%AD%E4%BB%A3%E5%99%A8%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%8C%85%E5%90%AB%E9%94%AE%E5%92%8C%E5%80%BC)
    + [keys 返回数组迭代对象，键](#keys-%E8%BF%94%E5%9B%9E%E6%95%B0%E7%BB%84%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1%E9%94%AE)
    + [values 返回数组迭代对象，值](#values-%E8%BF%94%E5%9B%9E%E6%95%B0%E7%BB%84%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1%E5%80%BC)

<!-- tocstop -->

### 改变数组本身 （9个）

### pop和push尾部删除添加

这两个方法用于数组结尾的删除和添加

```js
const arr = [ 1, 2, 3, 4, 5 ]
//添加到数组的尾端
arr.push(6) //[1,2,3,4,5,6]
//再次调用pop方法就删除了最后一位
arr.pop()//[1,2,3,4,5]
```

### unshift和shift头部删除添加

用于在数组的首位进行删除和添加

```js
const arr = [ 1, 2, 3, 4, 5 ]
//添加到数组的前端
arr.unshift(6) //[6,1,2,3,4,5]
//再次调用shift方法就删除了第一位
arr.shift()//[1,2,3,4,5]
```

### sort 排序

进行对数组就地排序，不会复制或返回一个新数组，接收可选参数，一个回调函数，有a,b两个参数，当返回a<b时返回-1从小到大排序，当返回a>b时返回1从大到小排序，a==b时返回0，保持原来的排序（默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。）

```js
const arr = ["March", "Jan", "Feb", "Dec", 6, 2, "A", "a"];
arr.sort(function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});
console.log(arr);//['A','Dec', 'Feb','Jan','March',2, 6,'a']
```

### reverse 反转

对数组进行就地反转，顺序颠倒

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
arr.reverse();
console.log(arr);//[ 'a', 'A', 2, 6, 'Jan', 'March' ]
```

### splice 截取新增数据

可以选择删除数组中的某一个值，也可以在数组中的某个位置添加一些数据，接收可选参数，**三个或以上的参数，第一个为截取的索引位置，number类型，第二个截取的个数，number类型，第三个或更多实在截取位置添加的参数**，可以是任何类型

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//在索引为2的位置截取一个，并在索引2的位置后添加8
arr.splice(2, 1, 8);
console.log(arr);//[ 'March', 'Jan', 8, 2, 'A', 'a' ]
//截取位数不够，就将有的全部且去掉
arr.splice(2, 6);
console.log(arr);//[ 'March', 'Jan' ]
```

### copyWithin 将数组得一部分赋值到另一个位置

`copyWithin`是一种移动[数组](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array")数据的高性能方法，`copyWithin()` 方法是[通用的](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%23%25E9%2580%259A%25E7%2594%25A8%25E6%2595%25B0%25E7%25BB%2584%25E6%2596%25B9%25E6%25B3%2595 "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E9%80%9A%E7%94%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95")。它只期望 `this` 值具有 `length` 属性和整数键属性。虽然字符串也是类似数组的，但这种方法不适用于它们，因为字符串是不可变的。  
`copyWithin`不会改变数组的长度，只会修改内容，它接收三个参数，第一个为复制到的目标位置（索引值），第二个是复制的起始位置（可选），如果为负数，则相当于从后往前数，第三个为结束位置，不包含此索引的位置（可选），起始位置不可小于结束位置，否者方法无效。**返回一个浅拷贝的新数组,并且改变原数组**。

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
//从索引为三个位置开始复制，到索引为5的位置，但不包含5，从索引为1的位置粘贴并覆盖
const newArr = arr1.copyWithin(1, 3, 5);
console.log(arr1,newArr);//[ 'March', 2, 'A', 2, 'A', 'a' ] [ 'March', 2, 'A', 2, 'A', 'a' ]

//为负数时从后往前数-2从A的位置到-1不包括-1的位置，也就是将A赋值并覆盖到了索引为0的位置
const newArr = arr1.copyWithin(0, -2, -1);
console.log(newArr);//[ 'A', 'Jan', 6, 2, 'A', 'a' ]

//这种结束索引位置在开始索引位置之前的都不生效
const newArr = arr1.copyWithin(0, -2, 2);
const newArr = arr1.copyWithin(0, -2, -4);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

```

### fill 填充

对数组内容进行覆盖填充，有三个参数，第一个为填充的值，第二个为起始位置（可选），第三个为结束位置，不包含此索引位置（可选）。与`copyWithin`比较类似，只不过一个是移动数组内的元素，一个填充数组的内的元素，不会改变数组的长度。**返回一个浅拷贝的新数组,并且改变原数组**

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
//将666填充到1-4不包括4索引的位置
const newArr = arr1.fill(666, 1, 4);
console.log(newArr);//[ 'March', 666, 666, 666, 'A', 'a' ]
```

### 不改变原数组 （11个）

### filter 数据过滤

需要一定条件返回对应的数据，接收一个回调函数，有回调函数有三个参数，**第一个是当前遍历的元素，第二个为当前索引，第三个是数组本身**，需要一个返回值，filter方法会根据符合这个返回值条件的数据返回一个新数组

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//这里是一个简单的例子，返回类型为string的元素
const newArr = arr.filter((item, index) => typeof item === "string");
console.log(newArr);//[ 'March', 'Jan', 'A', 'a' ]
```

### map

map方法只是单纯的返回一个新数组，可以是处理后的，也可以是原数组，接收一个回调函数，回调函数有三个参数**第一个是当前遍历的元素，第二个为当前索引，第三个是数组本身**，需要一个返回值，从map内部处理过后，回调函数的返回值返回一个新数组

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回一个number的数组，不是number类型的就返回它们的字段长度
const newArr = arr.map((item, index) => (typeof item === "number" ? item : item.length);
console.log(newArr);//[ 5, 3, 6, 2, 1, 1 ]
```

### reduce 数据累加

`reduce`是一个功能非常强大的方法，但平常很少使用，因为他的功能他的方法都可以实现，它也能实现其他的一些方法，有时候合理的使用`reduce`会大大减少代码量。接收两个参数，**第一个为回调函数**，回调函数有四个参数，第一个参数为上一次回调函数`return`的结果，首次默认为第二个参数值，如果没有第二个参数值，则默认当前数组下标为0的参数，第二个参数为当前元素，第三个为当前索引值，第四个为数组本身，`reduce`的**第二个参数指定一个默认值，可选**

```js
//使用reduce实现filter方法
const arr = ["March", "Jan", 6, 2, "A", "a"];
//定义第二个参数的默认值为一个数组
const newArr = arr.reduce((acc, cur, index) => {
  typeof cur === "string" && acc.push(cur);
  return acc;
}, []);
console.log(newArr);//[ 'March', 'Jan', 'A', 'a' ]
//使用reduce实现数字的求和
//第二个参数默认定义0 number类型
const newArr = arr.reduce((acc, cur, index) => {
  typeof cur === "number" && (acc += cur);
  return acc;
}, 0);
console.log(newArr);//8
```

### reduceRight 从右开始 数据累加

这个是`reduce`的右边开始一种写法，运算时会从右向左执行，参数与使用方法和`reduce`一致。适用于当你想对一个数组进行反转加过滤等操作的时候，这个方法就完全突出了他的便携

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.reduceRight((acc, cur, index) => {
  typeof cur === "string" && acc.push(cur);
  return acc;
}, []);
//这里打印之后可以看出，毕竟过滤了非字符串的参数，还将数组反转了
console.log(newArr);//[ 'a', 'A', 'Jan', 'March' ]
```

### slice 数组截取

可以对一个数组进行浅拷贝，接收两个参数，第一个为截取的初始位置，第二个为终止位置（不包括此索引值），如果只填一个参数则从当前索引值截取到最

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.slice(0, 3);
console.log(newArr);//[ 'March', 'Jan', 6 ]

const newArr = arr.slice(3);
console.log(newArr);//[ 2, 'A', 'a' ]

```

### concat 数组合并

需要两个或以上的数组合并的时候就可以使用`cancat`快速合并，当然在ES6之后大多都使用扩展运算符进行数组合并了，此方法接收一个或以上得任意类型参数

```js
const arr1 = ["March", "Jan"];
const arr2 = [6, 2, "A", "a"];
const arr3 = {
  name: "Tom",
  age: 18,
  sex: "男",
};
//如果参数是数组则会合并
const newArr = arr1.concat(arr2);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]
//一个以上的参数 如果是值类型 则会直接添加到数组得最后面
const newArr = arr1.concat(arr2,'Tom');
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a','Tom' ]
//一个以上的参数，为一个对象类型,会直接添加到对象中
const newArr = arr1.concat(arr2,arr3);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a', { name: 'Tom', age: 18, sex: '男' } ]
```

### flatMap 扁平化map

flatMap与map相似，都是接收一个回调函数，进行处理后返回一个数组，但有一处差别就是flatMap可以对数组进行一层扁平化（仅数组）

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.flatMap((item, index) => {
  return [item, index];
});
//可以看出本应该是双层数组的，却被扁平化了
console.log(newArr);//['March', 0,'Jan', 1,6,2,2,3,'A',4,'a', 5]

const newArr = arr1.flatMap((item, index) => {
  return [[item, index]];
});
//仅只能扁平化一层
console.log(newArr);//[[ 'March', 0 ],[ 'Jan', 1 ], [ 6, 2 ], [ 2, 3 ],[ 'A', 4 ],[ 'a', 5 ]]
```

### with 修改指定索引值得复制方法

**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

我们都知道，我们再修改数组中得某一个值得时候可以使用`arr[index]=xxx` 来进行修改，但是这样是改变了原数组,当我们既想使用索引值来改变某一个值，还不想改变原数组得时候就可以使用`with`方法，它接收两个参数，第一个为索引值，第二个是要修改成为数据

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.with(3, "Tom");

console.log(newArr);//[ 'March', 'Jan', 6, 'Tom', 'A', 'a' ]
```

### toReversed 反转数组的复制版

**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`reverse`可以反转数组，但是会改变原数组，如果不想让原数组改变的并反转数组的话就可以使用它的复制版本`toReveresed`

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toReversed();

console.log(newArr);//[ 'a', 'A', 2, 6, 'Jan', 'March' ]
```

### toSorted 排序的复制版

**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`sort`可以反转数组，但是会改变原数组，一样的可以使用`toSorted`，不会改变原数组，会返回一个排好序的数组，接受的参数和`sort`一致，参考`sort`

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toSorted();
console.log(newArr);//[ 2, 6, 'A', 'Jan', 'March', 'a' ]
```

### toSpliced 截取新增数组的复制版

**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`splice`可以对数组进行截取和指定位置新增数据，但是会改变原数组，可以使用`toSpliced`，不会改变原数组，会返回一个新的数组，接受的参数使用方法和`splice`一致，参考`splice`

```js
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toSpliced(0, 1, 4);
console.log(newArr);//[ 4, 'Jan', 6, 2, 'A', 'a' ]
```

### 其他 功能性方法(22个)

### forEach 数组遍历

这个方法应该都非常熟悉了，为什么把他分为其他里面呢，因为他的作用只是遍历，其他什么作用都没有，接收一个回调函数，又三个参数，第一个当前元素，第二个为索引值，第三个为数组本身因为都比较熟悉了，就随便写个例子

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//使用这中方法改变数组本身
arr.forEach((item, index) => {
  arr[arr.length - index - 1] = item;
});
//返回这种数据应为数组本身在遍历的时候被改变了
console.log(arr);//[ 'March', 'Jan', 6, 6, 'Jan', 'March' ]
```

### Array.from() 转换成数组

此方法可以将一些可迭代的以及为数组的数据转换成真正的数组，并返回一个那个新数组，比如字符串，dom伪数组等，接收两个参数，第一个为要转化的参数，第二个是一个回调函数（可选），回调函数有两个参数当前遍历的对象和索引

```js
const newArr = Array.from("March");
console.log( newArr);//[ 'M', 'a', 'r', 'c', 'h' ]

(function () {
//arguments为一个伪数组，转化成真正的数组,并经过第二个回调函数进行处理返回
  const arr = Array.from(arguments, (item, index) => item + index);
  console.log(arr,Array.isArray(arr));//[ 1, 4, 6, 8 ] true
})(1, 3, 4, 5);
```

### Array.fromAsync Array.from异步版本

`Array.fromAsync()` 迭代异步可迭代对象的方式与 [`for await...of`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor-await...of "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of") 很相似。`Array.fromAsync()` 在行为上与 [`Array.from()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2Ffrom "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from") 几乎等价

* `Array.fromAsync()` 可以处理异步可迭代对象。
* `Array.fromAsync()` 返回一个会兑现为数组实例的 [`Promise`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise")。
* 如果使用非异步可迭代对象调用 `Array.fromAsync()`，则要添加到数组中的每个元素（无论是否为 Promise）都会先[等待其兑现](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fawait "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await")。
* 如果提供了 `mapFn`，则其输入和输出会在内部等待兑现。

`Array.fromAsync()` 和 [`Promise.all()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise%2Fall "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all") 都可以将一个 promise 可迭代对象转换为一个数组的 promise。然而，它们有两个关键区别：

* `Array.fromAsync()` 会依次等待对象中产生的每个值兑现。`Promise.all()` 会并行等待所有值兑现。
* `Array.fromAsync()` 惰性迭代可迭代对象，并且不会获取下一个值，直到当前值被兑现。`Promise.all()` 预先获取所有值并等待它们全部兑现。

```js
//我也没用过，凑合看吧  手动滑稽(≧∇≦)ﾉ
const asyncIterable = (async function* () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10 * i));
    yield i;
  }
})();

Array.fromAsync(asyncIterable).then((array) => console.log(array));
// [0, 1, 2, 3, 4]
```

### Array.isArray 判断是不是数组

在类型判断的时候，我们通常使用`typeof` ，但是使用`typeof`的时候数组判断出来的就是`Object`类型，可以说数组是特殊的对象，使用`typeof`判断不出数组，就可以使用`Array.isArray`方法

```js
(function () {
//在这可以看出arguments并不是一个数组
  console.log(Array.isArray(arguments));//false
})(1, 3, 4, 5);

const arr = ["March", "Jan", 6, 2, "A", "a"];
//看的出是可以识别出来的 但typeof却识别不出来
console.log(typeof arr, Array.isArray(arr));//object true
```

### includes 判断某个值数组中是否存在

在数组中查抄某一个值，返回一个布尔值，有两个参数，第一个你要查找的值，第二个从哪个索引位置开始找

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.includes(6);
console.log(newArr);//true

//也可以利用这一特性简化判断条件
let name='a'
//name是一个变量，可能有很多种可能，判断条件中就会非常冗余
if ( name === 'a' || name === 'A' || name === 6...) {
  //...
}
//可以改成这种，看着也非常明了简便
if (['a',"A",6,...].includes(name)) {
  //...
}

```

### indexOf 判断数组中是否存在某个值，并返回索引

写法和includes类似，有两个参数第一个是要找的值，第二个为开始索引，indexOf会在查找到第一个符合条件的参数跳出循环并返回索引，没找到则返回-1

```js
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.indexOf(6);
//返回索引值
console.log(newArr);//2

//查找6，从索引为3的位置开始找
const newArr = arr.indexOf(6，3);
console.log(newArr);//5
```

### lastIndexOf 判断数组中是否存在某个值，并返回最后的索引

与indexOf一致，只不过是返回最后的索引位置，也可以理解为他是从数组的右边开始往左找元素，并返回第一个找到的元素的索引，没找到则返回-1

```js
//所有的结果恰恰与indexOf反过来了
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.lastIndexOf(6);
//返回索引值
console.log(newArr);//5

//查找6，从索引为3的位置开始找
const newArr = arr.lastIndexOf(6，3);
console.log(newArr);//2
```

### find 查找符合条件的元素

`find`查找符合条件的的一个元素并返回那个元素本身,没有则返回`undefined`，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```js
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.find((item, index) => {
  return item.length > index;
});
//只会返回符合条件的第一个值
console.log(newArr);//March

//也可以用在数组对象上
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const newArr = arr.find((item, index) => {
  return item.id > index;
});
//返回对象元素本身
console.log(newArr);//{ id: 1 }
```

### findIndex 查找符合条件的元素，返回索引版

与`find`使用方法一致，`findIndex`查找符合条件的的一个元素并返回那个元素的索引值,没有则返回-1，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```js
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findIndex((item, index) => {
  return item.length > index;
});
//只会返回符合条件的第一个索引
console.log(newArr);//0

//也可以用在数组对象上
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const newArr = arr.findIndex((item, index) => {
  return item.id > index;
});
//返回对象元素所在位置的索引
console.log(newArr);//0
```

### findLast 从右向左查找符合条件的元素

**此方法兼容性不好，暂时不推荐使用，node版本需要18.0.0以上** 与`find`使用方法一致，`findLast`从右向左查找符合条件的的一个元素，并返回那个元素,没有则返回`undefined`，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```js
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findLast((item, index) => {
  return item.length > index;
});
//返回Jan，从右向左第一个符合条件的就是Jan，索引值是不变的，例如arr数组，遍历的时候索引值是6、5、4、3、2、1、0
console.log(newArr);//Jan

//也可以用在数组对象上
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const newArr = arr.findLast((item, index) => {
  return item.id > index;
});
//返回第一个符合条件的对象元素本身
console.log(newArr);//{ id: 5 }
```

### findLastIndex 从右向左查找符合条件的元素,返回索引版

**此方法兼容性不好，暂时不推荐使用，node版本需要18.0.0以上** 与`findLast`使用方法一致，`findLastIndex`从右向左查找符合条件的的一个元素，并返回那个元素的索引值,没有则返回-1，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```js
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findLastIndex((item, index) => {
  return item.length > index;
});
//从右向左查找，返回符合条件的第一个索引
console.log(newArr);//1

//也可以用在数组对象上
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const newArr = arr.findLastIndex((item, index) => {
  return item.id > index;
});
//从右向左查找，返回对象元素所在位置的索引
console.log(newArr);//4
```

### at 返回索引位置的值

**此方法兼容性一般，暂时不推荐使用，node版本需要16.6.0以上** at接收一个number的参数，可以为负数，正数时获取到索引为的值，当参数为负数时，从右向左查找对应的值

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//正数与直接索引取值无异
const newArr = arr.at(2);
console.log(newArr);//6
//从右向左找 可以简化代码量，有些情况下效果很明显
const newArr = arr.at(-2);
//等价于  const newArr = arr.at(arr.length - 2);
console.log(newArr);//A
```

### Array.of 创建可变的数组

使用静态方法创建一个可变的数组，可以接收任意类型，任意个数的参数

```js
const newArr = Array.of("March", "Jan", 6, 2, "A", "a");
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

//使用of创建数组和直接使用Array实例创建数组有所不同
const newArr = Array.of(6);
const arr = Array(6);
//传入6 of则创建一个只包含6得数组，Array传入6则创建有六个空位置得数组
console.log(newArr, arr);[ 6 ] [ <6 empty items> ]

```

### flat 扁平化数组

通常在扁平化数组的时候都要使用递归函数，flat方法避免了页面中写递归函数造成大量的代码冗余，flat本身也是使用递归方法来达到数组扁平化的，接收一个number类型的参数，参数是几就可以扁平几层，在不确定有几维数组的情况下，参数为Infinity（无限大），可以扁平任意层次的数组

```js
const arr = [[[[["March"]]]], [[["Jan"]]], [[6]], [[2]], "A", ["a"]];
//扁平参数对等的层数
const newArr = arr.flat(2);
console.log(newArr);//[ [ [ 'March' ] ], [ 'Jan' ], 6, 2, 'A', 'a' ]
//使用Infinity关键字 可以扁平化任意层数数组
const newArr = arr.flat(Infinity);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

```

### every 所有元素是否通过测试

`every`用于所有元素是否都能通过测试，返回一个布尔值，只有当所有元素都通过了测试，才会返回`true`，接收一个回调函数，回调函数有三个形参，第一个为当前元素，第二个为当前索引，第三个为数组本身，**另外，当数组为空的时候使用every，条件不论是怎么样的，都会返回true（这种情况属于[无条件正确](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FVacuous_truth "https://en.wikipedia.org/wiki/Vacuous_truth")，因为[空集](https://link.juejin.cn?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2F%25E7%25A9%25BA%25E9%259B%2586 "https://zh.wikipedia.org/wiki/%E7%A9%BA%E9%9B%86")的所有元素都符合给定的条件。）**

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.every((item) => typeof item === "string");
//并不是所有的元素都符合条件 所以返回false
console.log(newArr);//false
//只要是数组是空数组，后面的条件不管跟什么返回的永远为true
console.log([].every((item) => item > 10));//true
```

### some 数组中至少有一个元素通过测试

some用于数组中参数其中一个或多个通过了测试，返回一个布尔值，如果有一个或以上通过测试就返回true，一个都没通过返回false，接收一个回调函数，有三个形参，第一个为当前元素，第二个为当前索引，第三个为数组本身，**另外，当数组为空时使用some，不论判断条件如何，都会返回false，并且他不会改变数组**

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.some((item) => typeof item === "string");
//其中一个或以上的元素符合条件就返回true
console.log(newArr);//true
//只要是数组是空数组，后面的条件不管跟什么返回的永远为false
console.log([].some((item) => item==undefined));//false
```

### join 选定格式转换成字符串

join用于将数组转换成字符串的方法，接收一个参数（**可以为任意类型，但引用类型则会默认转换成\[object Object\]等**），为数组元素转换成字符串的间隔符，不传参数默认以 ‘，’号隔开

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.join();
console.log(newArr);//March,Jan,6,2,A,a
//可以是number类型
const newArr = arr.join(3);
console.log(newArr);//March3Jan36323A3a
//也可以是引用类型，但会自动转换
const newArr = arr.join({ id: 1 });
console.log(newArr);//March[object Object]Jan[object Object]6[object Object]2[object Object]A[object Object]a
```

### toString 转换成字符串

`toString`是几乎所有数据类型都有的一个方法，就是单纯的转换成字符串，数组中转换成字符串默认以‘，’号隔开，**有一个小技巧，如果多维数组的类型都是值类型的，可以使用toString进行扁平化**

```js
//简单的数组转字符串
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.toString();
console.log(newArr);//March,Jan,6,2,A,a

//不论是几维数组，在toString的时候都会转化成字符串，在使用字符串方法转成数据就可以了
//弊端是因为转的时候是toString转换成了字符串，任意值类型到最后都是字符串形式，undefined和null则会转换成空字符串
const arr = [[["March"]], [[[["Jan"]]]], [[[6]]], [[2]], [[["A"]]], [[["a"]]]];
const newArr = arr.toString().split(",");
console.log(newArr);//[ 'March', 'Jan', '6', '2', 'A', 'a' ]
```

### toLocaleString

此方法用于格式转换，最后返回字符串代表数组中所有的元素，接收两个参数第一个带有 BCP 47 语言标签的字符串，或者此类字符串的数组。对于 `locales` 参数的一般形式和说明，可以参见 [`Intl` 主页面的参数说明](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FIntl%23locales_%25E5%258F%2582%25E6%2595%25B0 "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_%E5%8F%82%E6%95%B0")。第二个，一个具有配置属性的对象。对于数字，请参见 [`Number.prototype.toLocaleString()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FNumber%2FtoLocaleString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString")；对于日期，请参见 [`Date.prototype.toLocaleString()`](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FDate%2FtoLocaleString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString")。

此方法的使用方法记得东西比较多，详细使用方法可以点击上面的链接查看

```js
const arr = ["￥7", 500, 8123, 12];
const newArr = arr.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
console.log(newArr);//￥7,￥500,￥8,123,￥12
//如果不传参数，则效果于toString一样
const newArr = arr.toLocaleString();
console.log(newArr);//￥7,500,8,123,12
```

### entries 返回数组迭代器的对象，包含键和值

返回一个数组迭代器对象，[数组迭代器](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray%2F%40%40iterator "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator")（ array\[[Symbol.iterator](https://link.juejin.cn?target=)\]）,如果不太清楚的可以看一下Symbol篇章，或者点击数组迭代器查看

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回迭代器对象，有一个next方法，使用next方法会返回一个对象，里面value值就是我们想要的值
const newArr = arr.entries();
//查看的时候需要使用next，value为我们想要的值，done是否结束
console.log(newArr.next());//{ value: [ 0, 'March' ], done: false }
console.log(newArr.next());//{ value: [ 1, 'Jan' ], done: false }
console.log(newArr.next());//{ value: [ 2, 6 ], done: false }
console.log(newArr.next());//{ value: [ 3, 2 ], done: false }
console.log(newArr.next());//{ value: [ 4, 'A' ], done: false }
console.log(newArr.next());//{ value: [ 5, 'a' ], done: false }
//已经没有值了，并且done变成了true
console.log(newArr.next());//{ value: undefined, done: true }

//entries返回一个迭代器对象，所以可以被for...of..遍历
 for (const iterator of newArr) {
  console.log(iterator);
 }
 //[ 0, 'March' ]
//[ 1, 'Jan' ]
//[ 2, 6 ]
//[ 3, 2 ]
//[ 4, 'A' ]
//[ 5, 'a' ]
```

### keys 返回数组迭代对象，键

返回一个只包含键的迭代对象，使用方法与entries一致

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回只包含键的可迭代对象，数组中的键也就是索引
const newArr = arr.keys();
//使用for...of..遍历打印
for (const iterator of newArr) {
  console.log(iterator);
}
//0
//1
//2
//3
//4
//5
```

### values 返回数组迭代对象，值

返回一个只包含值得可迭代对象，使用方法与entries一致

```js
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回只包含键的可迭代对象，数组中的键也就是索引
const newArr = arr.values();
//使用for...of..遍历打印
for (const iterator of newArr) {
  console.log(iterator);
}
//March
//Jan
//6
//2
//A
//a
```

### 结尾

截止到ES2023得42种数组方法就这些，看是否有哪些方法从来就没有使用过吧，有很多方法也许我们平常根本用不到，但也可以相对得了解以下，还有几种最近新出的方法兼容性没那么好，在实际得开发环境中还是需要谨慎使用，如果有写的不对得地方欢迎纠正！

### 参考文章

- https://juejin.cn/post/7283377140199915583
