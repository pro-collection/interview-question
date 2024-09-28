**关键词**：axios 拦截器

> 作者备注
>
> 这个问题稍微有点儿偏冷门， 需要阅读过 axios 官网才能正确作答， 考察的是同学自驱型学习能力

在 Axios 中，可以使用以下方法注销拦截器：

**一、为拦截器分配一个引用**

1. 创建拦截器时保存引用：

   - 当创建一个 Axios 请求或响应拦截器时，可以将其分配给一个变量，以便后续可以引用并注销它。

   ```javascript
   const requestInterceptor = axios.interceptors.request.use((config) => {
     // 请求拦截器逻辑
     return config;
   });

   const responseInterceptor = axios.interceptors.response.use((response) => {
     // 响应拦截器逻辑
     return response;
   });
   ```

**二、使用`Eject`方法注销拦截器**

1. 注销单个拦截器：

   - 使用拦截器的引用和`axios.interceptors.request.eject()`或`axios.interceptors.response.eject()`方法来注销特定的拦截器。

   ```javascript
   axios.interceptors.request.eject(requestInterceptor);
   axios.interceptors.response.eject(responseInterceptor);
   ```

2. 注销所有拦截器：
   - 如果需要注销所有的请求或响应拦截器，可以使用`axios.interceptors.request.clear()`或`axios.interceptors.response.clear()`方法。
   ```javascript
   axios.interceptors.request.clear();
   axios.interceptors.response.clear();
   ```

以下是一个完整的示例：

```javascript
import axios from "axios";

const requestInterceptor = axios.interceptors.request.use((config) => {
  // 请求拦截器逻辑
  return config;
});

const responseInterceptor = axios.interceptors.response.use((response) => {
  // 响应拦截器逻辑
  return response;
});

// 注销特定拦截器
axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

// 或者注销所有拦截器
// axios.interceptors.request.clear();
// axios.interceptors.response.clear();
```

通过这些方法，可以在需要的时候注销特定的拦截器或所有拦截器，以灵活地管理 Axios 的拦截器。
