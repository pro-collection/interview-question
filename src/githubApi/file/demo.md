**关键词**：axios 配置

在 Axios 中，可以通过以下几种方法设置全局通用配置：

**一、使用`axios.defaults`**

1. 直接设置属性：

   - 可以直接在`axios.defaults`上设置各种配置属性，如`baseURL`、`timeout`、`headers`等。这些设置将应用于所有后续的 Axios 请求。

   ```javascript
   axios.defaults.baseURL = "https://api.example.com";
   axios.defaults.timeout = 5000;
   axios.defaults.headers.common["Authorization"] = "Bearer your_token";
   ```

2. 设置`transformRequest`和`transformResponse`：

   - 可以设置全局的请求和响应数据转换函数。这些函数将在每个请求和响应上被调用，允许对数据进行预处理和后处理。

   ```javascript
   axios.defaults.transformRequest = [
     function (data, headers) {
       // 对请求数据进行转换
       return data;
     },
   ];

   axios.defaults.transformResponse = [
     function (data) {
       // 对响应数据进行转换
       return data;
     },
   ];
   ```

**二、创建自定义 Axios 实例并设置配置**

1. 创建实例并设置配置：

   - 可以创建一个自定义的 Axios 实例，并在创建时设置特定的配置。这个实例可以有自己独立的配置，与默认的 Axios 实例分开。

   ```javascript
   const customAxios = axios.create({
     baseURL: "https://custom-api.example.com",
     timeout: 10000,
     headers: {
       "Custom-Header": "custom-value",
     },
   });
   ```

2. 使用自定义实例：
   - 可以在应用中的任何地方使用这个自定义实例来发送请求，它将使用设置的全局配置。
   ```javascript
   customAxios
     .get("/data")
     .then((response) => {
       console.log(response.data);
     })
     .catch((error) => {
       console.error(error);
     });
   ```

**三、使用插件或中间件（如果适用）**

1. 寻找合适的插件：

   - 有些第三方插件可以帮助你设置 Axios 的全局配置。例如，`axios-interceptors`插件可以方便地设置请求和响应拦截器，从而实现全局的配置和处理逻辑。

   ```javascript
   import axios from "axios";
   import axiosInterceptors from "axios-interceptors";

   const axiosInstance = axiosInterceptors(axios);

   axiosInstance.useInterceptors({
     request: (config) => {
       // 在请求发送前进行一些处理
       config.headers["Custom-Header"] = "custom-value";
       return config;
     },
     response: (response) => {
       // 在响应返回后进行一些处理
       return response;
     },
   });
   ```

2. 自定义中间件：

   - 根据你的应用需求，你也可以创建自己的中间件来设置全局配置。中间件可以在请求发送前或响应返回后进行特定的处理。

   ```javascript
   axios.interceptors.request.use(
     (config) => {
       // 全局请求处理逻辑
       return config;
     },
     (error) => {
       return Promise.reject(error);
     }
   );

   axios.interceptors.response.use(
     (response) => {
       // 全局响应处理逻辑
       return response;
     },
     (error) => {
       return Promise.reject(error);
     }
   );
   ```

通过这些方法，你可以灵活地设置 Axios 的全局通用配置，以满足不同的应用需求。同时，要注意合理管理全局配置，避免出现冲突或不可预期的行为。
