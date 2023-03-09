## 先介绍几种基本的数字处理技巧
```javascript
//保留两位小数
//将1234567转换为1234567.00
function to2bits(flt) {
    if (parseFloat(flt) == flt) {
        return Math.round(flt * 100) / 100; // 到2位小数
    }
    else return 0;
}

//转换为千分位格式
//将1234567.00转换为1,234,567.00
function numToMoneyField(inputString) {
    regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    var ret = inputString.toString().replace(regExpInfo, "$1,");
    return ret;
}
```

## 实现数字千分法方法总结
```javascript
/**
 * 字符串拆分方法 - 效率极低
 * 存在问题： 没有办法解决小数点之后的位数问题
 * @param num
 * @returns {string}
 */
function fun1(num) {
    let result = [], counter = 0;
    num = (num || 0).toString().split('');          // 这个地方就直接格式化为一个字符串了
    for (let i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i !== 0) {         // 边界限定条件
            result.unshift(',')
        }
    }
    return result.join('');
}

/**
 * 字符串操作大法
 * @param num
 * @returns {string}
 */
function fun2(num) {
    let result = '', counter = 0;
    num = (num || 0).toString();
    for (let i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }
    return result;
}

/**
 * 循环匹配末尾的三个数字
 * 通过正则表达式循环匹配末尾的三个数字，每匹配一次，就把逗号和匹配到的内容插入到结果字符串的开头，然后把匹配目标（num）赋值为还没匹配的内容（RegExp.leftContext）。
 * 1.如果数字的位数是3的倍数时，最后一次匹配到的内容肯定是三个数字，但是最前面的三个数字前不需要加逗号；
 * 2.如果数字的位数不是3的倍数，那num变量最后肯定会剩下1到2个数字，循环过后，要把剩余的数字插入到结果字符串的开头。
 * 虽然方法三减少了循环次数（一次循环处理三个字符），但由于用到了正则表达式，一定程度上增加了消耗。
 * @param num
 * @returns {string}
 */
function fun3(num) {
    num = (num || 0).toString();
    let re = /\d{3}$/,
        result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        console.log(RegExp.lastMatch);
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/**
 * 方法三的字符串版
 * 没啥好说的额，就是避免写正则而已
 * @param num
 * @returns {string}
 */
function fun4(num) {
    num = (num || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if(num) {
        result = num + result;
    }
    return result;
}

/**
 * 分组合并法
 * @param num
 * @returns {string}
 */
function fun5(num) {
    num = (num || 0).toString();
    let  temp = num.length % 3;
    switch (temp) {
        case 1:
            num = '00' + num;
            break;
        case 2:
            num = '0' + num;
            break;
    }
    console.log(num.match(/\d{3}/g));
    return num.match(/\d{3}/g).join(',').replace(/^0+/, '');
}

/**
 * 正则大法
 * @returns {string}
 */
function fun6() {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
```
以上方法性能总结：                   
![01-30](https://user-images.githubusercontent.com/22188674/224083189-437e4726-1d79-4785-a255-4c47049d53c4.png)


## 原生api大法：
```js
Number.toLocaleString();
```
