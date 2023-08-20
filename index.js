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
