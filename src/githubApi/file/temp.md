**1. axios全局设置网络超时**

`axios.defaults.timeout = 10 * 1000; // 10s`

**2. 单独对某个请求设置网络超时**

`axios.post(url, params, {timeout: 1000}) .then(res => { console.log(res); }) .catch(err=> { console.log(err); }) })`

**3.webpack的dev的proxyTable的超时时间设置**

```csharp
dev: {     
    // Paths
    assetsSubDirectory: 'static', // 静态资源文件夹
    assetsPublicPath: '/', // 发布路径
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {
      '/api': {
        timeout: 30000, // 请求超时时间
        target: 'http://127.0.0.1:3006', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 重写接口
        }
      },
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 4200, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  }
```

**4.axios请求超时自动重新请求**

有时候因项目需求，要在接口请求超时或者获取数据失败时，重新请求1次，或者更多次。具体的配置步骤和方法如下：

因为是要在请求超时或者获取数据失败时，进行重新请求设置，那么我们肯定是要在请求返回拦截器里面设置

```javascript
import axios from "axios";

const Axios = axios.create({ 
  // 下面两个属性，用来设置，请求失败或者超时，自动重新请求的次数和间隙时间
  retry: 2, // 请求次数
  retryInterval: 1000 // 求期间隙
  ......
});
//请求前拦截
Axios.interceptors.request.use(config => {
  	return config
  },
  function(error) {
  	return Promise.reject(error)
  }
);
//请求后返回数据拦截
Axios.interceptors.response.use(res => {
     return res
  },
  function axiosRetryInterceptor(res) {
      var config = res.config;
      //如果配置不存在或重试属性未设置，抛出promise错误
      if (!config || !config.retry) return Promise.reject(res);
      //设置一个变量记录重新请求的次数
      config.retryCount = config.retryCount || 0;
      // 检查重新请求的次数是否超过我们设定的请求次数
      if (config.retryCount >= config.retry) {
          return Promise.reject(res);
      }
      //重新请求的次数自增
      config.retryCount += 1;
      // 创建新的Promise来处理重新请求的间隙
      var back = new Promise(function(resolve) {
          console.log("接口"+config.url+"请求超时，重新请求")
          setTimeout(function() {
              resolve();
          }, config.retryInterval|| 1);
      });
      //返回axios的实体，重试请求
      return back.then(function() {
          return Axios(config);
      });
  }
);
export default Axios
```
