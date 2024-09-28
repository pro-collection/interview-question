**关键词**：axios 拦截器

> 作者备注
>
> 拦截器是 axios 的最核心功能之一， 该问题只是考察 axios 的核心功能的基本使用

以下是使用 Axios 的拦截器来实现当状态码非 200 时统一拦截错误并提示 toast 的方法：

假设你使用了一个名为 `toast` 的函数来显示 toast 消息，这个函数可以根据你的实际使用的 UI 库进行调整。

```javascript
import axios from "axios";

// 创建 Axios 实例
const instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加请求头、加载动画等
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    if (error.response && error.response.status !== 200) {
      // 非 200 状态码时显示 toast
      toast("请求错误！");
    }
    return Promise.reject(error);
  }
);

export default instance;
```

在上述代码中，首先创建了一个 Axios 实例，然后分别添加了请求拦截器和响应拦截器。在响应拦截器中，当响应状态码不是 200 时，调用`toast`函数显示错误提示信息。

请注意，这里的`toast`函数只是一个示例，你需要根据实际使用的 UI 框架或库来实现具体的 toast 显示功能。
