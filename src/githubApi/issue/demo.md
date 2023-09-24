以下是使用JavaScript实现计算两个日期之间的天数差的函数：

```javascript
function calculateDateDifference(date1, date2) {
  // 将日期字符串转换为 Date 对象
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // 计算两个日期的时间差（毫秒数）
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());

  // 将时间差转换为天数
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

// 示例用法
const date1 = '2022-01-01';
const date2 = '2022-01-10';

const difference = calculateDateDifference(date1, date2);
console.log(difference); // 输出结果为 9
```

上述函数首先将两个日期字符串转换为Date对象，然后计算两个日期对象之间的时间差（以毫秒表示），最后将时间差转换为天数。通过调用`calculateDateDifference`函数，可以获取两个日期之间的天数差。
