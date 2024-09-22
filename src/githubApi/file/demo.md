**关键词**：vue i18n 插件实现

> 作者备注
>
> 这个是一个简单的官方案例， 如果阅读过官方文档， 就没有任何难点。 所以暂定为「中级」

实现下面的这样的一个插件 `<h1>{{ $translate('greetings.hello') }}</h1>`

以下是一个简单的 Vue 3 的国际化插件实现：

1. 创建一个名为`i18nPlugin.js`的文件：

```javascript
const i18nPlugin = {
  install(app, options) {
    const translations = options.translations;
    app.config.globalProperties.$translate = (key) => {
      const parts = key.split(".");
      let value = translations[parts[0]];
      for (let i = 1; i < parts.length && value; i++) {
        value = value[parts[i]];
      }
      return value || key;
    };
  },
};

export default i18nPlugin;
```

2. 在你的 Vue 3 项目中使用这个插件：

假设你有以下的语言翻译对象：

```javascript
// en.js
const enTranslations = {
  greetings: {
    hello: 'Hello!',
  },
};

export default enTranslations;

// zh.js
const zhTranslations = {
  greetings: {
    hello: '你好！',
  },
};

export default zhTranslations;
```

在项目的入口文件（通常是`main.js`或`main.ts`）中：

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import enTranslations from "./locales/en";
import i18nPlugin from "./i18nPlugin";

const app = createApp(App);

app.use(i18nPlugin, { translations: enTranslations });

app.mount("#app");
```

这样，在你的组件中就可以使用`{{ $translate('greetings.hello') }}`来获取翻译后的文本，并且可以通过修改传入插件的翻译对象来切换不同的语言。
