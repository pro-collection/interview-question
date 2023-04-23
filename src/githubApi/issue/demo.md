`Web Components` 是一套不同的技术，允许您创建可重用的定制元素并且在您的 web 应用中使用它们

### 三要素

1. `Custom elements`（自定义元素）： 一组 `JavaScript` API，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
   * 通过 `class A extends HTMLElement {}` 定义组件，
   * 通过 `window.customElements.define('a-b', A)` 挂载已定义组件。
2. `Shadow DOM`（影子 DOM ）：一组 `JavaScript` API，用于将封装的“影子” DOM 树附加到元素（**与主文档 DOM 分开呈现**）并控制其关联的功能。
   * 通过这种方式，您可以**保持元素的功能私有**，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
   * 使用 `const shadow = this.attachShadow({mode : 'open'})` 在 `WebComponents` 中开启。
3. `HTML templates`（HTML 模板）`slot` ：`template` 可以简化生成 `dom` 元素的操作，不再需要 `createElement` 每一个节点。

虽然 `WebComponents` 有三个要素，但却不是缺一不可的，`WebComponents`

> * 借助 `shadow dom` 来实现**样式隔离**，
> * 借助 `templates` 来**简化标签**的操作。



### 内部生命周期函数（4个）

1. `connectedCallback`: 当 `WebComponents`**第一次**被挂在到 `dom` 上是触发的钩子，并且只会触发一次。
   * 类似 `React` 中的 `useEffect(() => {}, [])`，`componentDidMount`。
2. `disconnectedCallback`: 当自定义元素与文档 `DOM`**断开连接**时被调用。
3. `adoptedCallback`: 当自定义元素被**移动**到新文档时被调用。
4. `attributeChangedCallback`: 当自定义元素的被监听属性变化时被调用。



### 组件通信

### 传入复杂数据类型

* 传入一个 `JSON` 字符串配饰`attribute`

   * `JSON.stringify`配置指定属性
   * 在组件`attributeChangedCallback`中判断对应属性，然后用`JSON.parse()`获取

* 配置DOM的`property`属性

   * `xx.dataSource = [{ name: 'xxx', age: 19 }]`
   * 但是，自定义组件中没有办法监听到这个属性的变化
   * 如果想实现，复杂的结构，不是通过配置，而是在定义组件时候，就确定

### 状态的双向绑定

```kotlin
<wl-input id="ipt"
          :value="data"
          @change="(e) => { data = e.detail }">
</wl-input>

// js
(function () {
  const template = document.createElement('template')
  template.innerHTML = `
  <style>
    .wl-input {

    }
  </style>
  <input type="text" id="wlInput">
  `
  class WlInput extends HTMLElement {
    constructor() {
      super()
      const shadow = this.attachShadow({
        mode: 'closed'
      })
      const content = template.content.cloneNode(true)
      this._input = content.querySelector('#wlInput')
      this._input.value = this.getAttribute('value')
      shadow.appendChild(content)
      this._input.addEventListener("input", ev => {
        const target = ev.target;
        const value = target.value;
        this.value = value;
        this.dispatchEvent(
            new CustomEvent("change", { detail: value })
            );
      });
    }
    get value() {
      return this.getAttribute("value");
    }
    set value(value) {
      this.setAttribute("value", value);
    }
  }
  window.customElements.define('wl-input', WlInput)
})()

```

监听了这个表单的 `input` 事件，并且在每次触发 `input` 事件的时候触发自定义的 `change` 事件，并且把输入的参数回传。



### 样式设置

### 直接给自定义标签添加样式

```html
<style>
    wl-input{
        display: block;
        margin: 20px;
        border: 1px solid red;
    }
</style>
<wl-input></wl-input>
<script src="./index.js"></script>

```

### 定义元素内部子元素设置样式

分为两种场景：

1. 在主 DOM 使用 JS
2. 在 Custom Elements 构造函数中使用 JS

#### 在主 DOM 使用 JS 给 Shadow DOM 增加 style 标签：

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});

            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }

    window.customElements.define("wl-input", WlInput);

    // 给 Shadow DOM 增加 style 标签
    let styleEle = document.createElement("style");
    styleEle.textContent = `
        .input-header{
            padding:10px;
            background-color: yellow;
            font-size: 16px;
            font-weight: bold;
        }
    `;
    document.querySelector("wl-input").shadowRoot.appendChild(styleEle);
</script>

```

#### 在 Custom Elements 构造函数中使用 JS 增加 style 标签：

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});
            let styleEle = document.createElement("style");
            styleEle.textContent = `
                .input-header{
                    padding:10px;
                    background-color: yellow;
                    font-size: 16px;
                    font-weight: bold;
                }
            `;
            this.shadow.appendChild(styleEle);


            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }
    window.customElements.define("wl-input", WlInput);
</script>

```

### 引入 CSS 文件

使用 JS 创建 link 标签，然后引入 CSS 文件给自定义元素内部的子元素设置样式

```html
<script>
    class WlInput extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow({mode: "open"});
            let linkEle = document.createElement("link");
            linkEle.rel = "stylesheet";
            linkEle.href = "./my_input.css";
            this.shadow.appendChild(linkEle);


            let headerEle = document.createElement("div");
            headerEle.className = "input-header";
            headerEle.innerText = "北宸南蓁";
            this.shadow.appendChild(headerEle);
        }
    }
    window.customElements.define("wl-input", WlInput);
</script>

```

样式文件

```css
.input-header{
    padding:10px;
    background-color: yellow;
    font-size: 16px;
    font-weight: bold;
}

```


