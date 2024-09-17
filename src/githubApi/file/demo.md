**关键词**：组件定义 props

在 Vue 中，子组件可以通过 `props` 接收来自父组件的数据。`props` 是组件的可配置项之一，它允许外部环境传递数据给组件。有几种不同的方式来定义组件的 `props`，这些方式提供了不同级别的验证和默认值设置。以下是 Vue 中定义 `props` 的不同方式及其特点：

### 1. **数组形式**

直接使用字符串数组列出所有想要接受的 `props`。这种方式最简单，但不提供额外的验证。

```javascript
props: ["title", "likes", "isPublished", "commentIds", "author"];
```

### 2. **对象形式（具有类型检查）**

使用对象形式，你可以为每个 prop 指定类型，这提供了基本的类型检查。`type` 可以是下列原生构造函数之一：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`，或者这些构造函数组成的数组，表示多种可能的类型。

```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 仅在 Vue 3 中可用
}
```

### 3. **对象形式（具有类型检查和默认值）**

除了类型检查之外，还可以为每个 prop 指定默认值或验证函数。这种方式在需要确保组件的 prop 具有正确的类型或默认值时非常有用。

```javascript
props: {
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  comments: {
    type: Array,
    // 对于对象或数组类型的 prop，必须使用一个函数来返回默认值
    default: function () {
      return []
    }
  },
  author: {
    type: Object,
    default: function () {
      return { name: 'Anonymous' }
    }
  },
  callback: {
    type: Function,
    // 默认值为一个函数
    default: function () {
      return () => {}
    }
  }
}
```

### 4. **对象形式（具有验证函数）**

可以为 `props` 提供一个自定义验证函数。如果验证失败，则 Vue 会发出警告（仅在开发模式下）。这种方式适用于需要进行更复杂验证的场景。

```javascript
props: {
  age: {
    type: Number,
    validator: function (value) {
      // 这个值必须匹配下面的条件
      return value > 0 && value < 100;
    }
  }
}
```
