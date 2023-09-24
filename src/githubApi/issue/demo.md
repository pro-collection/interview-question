**关键词**：日期format函数、日期format实现

**问题**
```ts
// js 实现日期的  format 函数
//
// YYYY 对应年
// MM 对应月
// DD 对应日
//
// HH 对应 24 小时制度
// hh 对应 12 小时制度
// mm 对应分钟
// ss 对应秒

const date = new Date();
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出结果为当前日期和时间的格式化字符串
```


**解答**
以下是使用JavaScript实现日期格式化的`format`函数：

```javascript
Date.prototype.format = function (format) {
  const date = this;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  format = format.replace('YYYY', year);
  format = format.replace('MM', month.toString().padStart(2, '0'));
  format = format.replace('DD', day.toString().padStart(2, '0'));
  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('hh', (hours % 12).toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));
  format = format.replace('ss', seconds.toString().padStart(2, '0'));

  return format;
};

// 示例用法
const date = new Date();
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 输出结果为当前日期和时间的格式化字符串
```

上述代码中，我们通过在`Date`对象的原型上定义`format`函数，使得所有的`Date`对象都可以调用`format`函数进行日期格式化。在函数内部，我们使用`getFullYear`、`getMonth`、`getDate`等方法获取日期的年、月、日、时、分、秒的值，并将其替换到传入的`format`字符串中对应的占位符。最后返回格式化后的字符串。
