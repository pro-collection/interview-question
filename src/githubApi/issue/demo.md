React Router是React官方提供的用于构建单页应用的路由库，主要包括以下几个主要包和API：

主要包：
1. react-router-dom：用于Web应用的路由库。
2. react-router-native：用于原生应用（如React Native）的路由库。
3. react-router-config：用于配置静态路由的工具包。

主要API：
1. BrowserRouter：一个使用HTML5 history API实现的路由器组件，用于在Web应用中处理路由。
2. HashRouter：一个使用URL hash值实现的路由器组件，用于在不支持HTML5 history API的Web应用中处理路由。
3. Route：定义了路由匹配规则及对应的组件，可以在路由器中使用。
4. Switch：用于渲染与当前URL匹配的第一个Route或Redirect，只能包含Route或Redirect组件。
5. Link：用于创建导航链接，点击后会更新URL，触发路由的切换。
6. NavLink：与Link类似，但在匹配当前URL时会添加指定的样式。

其他常用API：
1. Redirect：用于重定向到指定的路由。
2. withRouter：高阶组件，用于将路由器的相关信息（如history、location）传递给被包裹的组件。
3. useHistory：自定义hook，用于在函数式组件中获取history对象。
4. useLocation：自定义hook，用于在函数式组件中获取location对象。
5. useParams：自定义hook，用于在函数式组件中获取路由参数。
6. useRouteMatch：自定义hook，用于在函数式组件中获取与当前URL匹配的路由信息。

以上是React Router的主要包和API。根据具体的需求，你可以使用这些API来构建和处理路由相关的逻辑。
