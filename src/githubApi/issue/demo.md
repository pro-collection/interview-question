**关键词**：Object.create实现、Object.create手写

Object.create() 方法可以用于创建一个新对象，使其原型与指定的对象完全相同。可以通过以下方式手写实现 Object.create() 方法。

```javascript
function createObject(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// Example usage
const person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

const anotherPerson = createObject(person);
anotherPerson.firstName = 'Jane';
console.log(anotherPerson.fullName()); // Output: "Jane Doe"
```

该实现方式创建了一个名为 F 的空函数，将其原型设置为传入的 proto 对象，然后返回一个新创建的 F 函数对象。这个新对象的原型与传入的 proto 对象相同，从而实现了 Object.create() 的功能。
