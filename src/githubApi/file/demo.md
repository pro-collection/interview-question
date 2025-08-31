**关键词**：崩溃提示

在 React 应用中设置全局崩溃提示页面，核心是通过 **错误边界边界（Error Boundary）** 来捕获子组件树中的 JavaScript 错误，并显示备用 UI。以下是具体实现方案：

### 实现说明

1. **错误边界组件（ErrorBoundary）**

   - 这是一个 React 类组件，利用 React 的错误捕获生命周期 `getDerivedStateFromError` 和 `componentDidCatch` 捕获子组件错误
   - `getDerivedStateFromError`：用于更新状态，触发错误 UI 渲染
   - `componentDidCatch`：用于记录错误信息（可上报到服务端）
   - 提供重试和返回首页功能，提升用户体验

```jsx
import React from "react";
import { Button } from "your-ui-library"; // 可替换为你的 UI 库或自定义按钮

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // 捕获子组件树中的错误
  static getDerivedStateFromError(error) {
    // 更新 state，下一次渲染将显示错误 UI
    return { hasError: true };
  }

  // 记录错误信息（可用于上报）
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // 可选：将错误信息上报到服务端
    console.error("全局错误捕获:", error, errorInfo);
    // 实际项目中可以调用接口上报：
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   body: JSON.stringify({ error: error.message, stack: errorInfo.componentStack })
    // });
  }

  // 重置错误状态（重新加载应用）
  resetErrorHandler = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // 可选：如果需要完全重置应用状态，可以刷新页面
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // 错误发生时显示的崩溃页面
      return (
        <div className="global-error-container">
          <div className="error-content">
            <h2>😱 应用发生错误</h2>
            <p>很抱歉，页面出现了意外错误，请尝试刷新或联系管理员。</p>

            {/* 可选：显示错误详情（生产环境可隐藏） */}
            {process.env.NODE_ENV === "development" && (
              <details style={{ whiteSpace: "pre-wrap" }}>
                <summary>错误详情</summary>
                {this.state.error?.message}
                <br />
                {this.state.errorInfo?.componentStack}
              </details>
            )}

            <div className="error-actions">
              <Button onClick={this.resetErrorHandler} variant="primary">
                重试
              </Button>
              <Button onClick={() => (window.location.href = "/")} variant="secondary" style={{ marginLeft: "10px" }}>
                返回首页
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // 如果没有错误，渲染子组件
    return this.props.children;
  }
}

export default ErrorBoundary;
```

2. **全局应用**

   - 在应用入口（App.jsx）用 ErrorBoundary 包裹整个应用，确保所有子组件的错误都能被捕获
   - 错误边界会自动捕获其内部所有组件（包括嵌套组件）的渲染错误、生命周期错误等

```jsx
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Router from "./Router"; // 你的路由组件
import GlobalStyle from "./GlobalStyle"; // 全局样式

function App() {
  return (
    // 用错误边界包裹整个应用
    <ErrorBoundary>
      <GlobalStyle />
      <Router />
    </ErrorBoundary>
  );
}

export default App;
```

### 注意事项

- 错误边界**不能捕获以下错误**：

  - 事件处理函数中的错误（需手动 try/catch）
  - 异步代码中的错误（如 setTimeout、Promise）
  - 错误边界自身的错误
  - 服务端渲染的错误

- 对于异步错误（如 API 请求失败），需要额外在代码中处理（如 try/catch 或状态管理）

- 可以根据需要扩展错误边界，例如：
  - 增加错误分类显示不同提示
  - 实现自动重试逻辑
  - 集成错误监控工具（如 Sentry）

通过这种方式，你的 React 应用就能拥有一个全局的崩溃处理机制，在发生错误时给用户友好的提示，而不是白屏或控制台报错。
