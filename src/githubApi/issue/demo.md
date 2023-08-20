
代码如下，请问执行结果是多少？
```ts
let obj = {
  name: "yanle",
  age: 20,
  getName: () => {
    const _getName = () => {
      console.log("this.getName", this.name);
    };
    _getName();
  },
  getAge: function() {
    const _getAge = () => {
      console.log("this.getAge", this.age);
    };
    _getAge();
  },
  extend: {
    name: "le",
    age: 20,
    getName: function() {
      console.log("name: ", this.name);
    },
    getAge: () => {
      console.log("age: ", this.age);
    },
  },
};

obj.getName();
obj.getAge();

obj.extend.getName();
obj.extend.getAge();

obj.extend.getName.bind(obj)();
obj.extend.getAge.bind(obj)();
```

**执行结果**
```shell
this.getName undefined
this.getAge 20
name:  le
age:  undefined
name:  yanle
age:  undefined
```

解释如下：

`obj.getName()`：在箭头函数getName中，this指向的是全局对象（在浏览器中是window对象，Node.js 中是Global对象）。因此this.getName输出undefined。
`obj.getAge()`：在普通函数getAge中，this指向的是obj对象。因此this.getAge输出20。
`obj.extend.getName()`：在普通函数getName中，this指向的是obj.extend对象。因此this.name输出le。
`obj.extend.getAge()`：在箭头函数getAge中，this指向的是全局对象（在浏览器中是window对象，Node.js 中是Global对象）。因此this.age输出undefined。
`obj.extend.getName.bind(obj)()`：通过bind方法将getName函数绑定到obj对象上，并立即调用绑定后的函数。在绑定后调用时，this指向的是obj对象。因此this.name输出yanle。
`obj.extend.getAge.bind(obj)()`：在箭头函数 getAge 中，this 是在函数定义时绑定的，而不是在函数调用时绑定的。在这种情况下，箭头函数的 this 指向的是外层作用域的 this，即全局对象（在浏览器中是 window 对象，Node.js 中是 Global 对象）。因此，在 obj.extend.getAge.bind(obj)() 中，this.age 输出的是全局对象的 age，而全局对象中并没有定义 age 属性，所以结果是 undefined。
