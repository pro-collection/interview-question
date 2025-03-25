**关键词**：前端单测模拟请求

在前端单元测试里，模拟请求是很重要的操作，它能让你在不依赖真实后端服务的情况下对前端代码进行测试。以下以 React 项目为例，结合不同的测试框架和模拟工具，为你介绍模拟请求的方法。

### 使用 Jest 和 axios-mock-adapter 模拟 axios 请求

`axios` 是常用的 HTTP 请求库，`axios-mock-adapter` 能方便地模拟 `axios` 请求。

#### 安装依赖

```bash
npm install --save-dev axios-mock-adapter
```

#### 示例代码

假设你有一个使用 `axios` 发送请求的组件：

```jsx
// UserList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.example.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

对应的单元测试代码如下：

```javascript
// UserList.test.js
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UserList from "./UserList";

describe("UserList", () => {
  let mock;

  beforeEach(() => {
    // 创建 axios 模拟适配器
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // 重置模拟适配器
    mock.restore();
  });

  test("should render user list after successful fetch", async () => {
    const mockUsers = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    // 模拟 GET 请求
    mock.onGet("https://api.example.com/users").reply(200, mockUsers);

    const { getByText } = render(<UserList />);

    // 等待请求完成
    await waitFor(() => {
      expect(getByText("User 1")).toBeInTheDocument();
      expect(getByText("User 2")).toBeInTheDocument();
    });
  });
});
```

在这个示例中，`axios-mock-adapter` 被用于模拟 `axios` 的 `GET` 请求。`beforeEach` 函数在每个测试用例执行前创建模拟适配器，`afterEach` 函数在测试用例执行后重置适配器。`mock.onGet` 方法用于指定要模拟的请求 URL，并返回模拟的响应数据。

### 使用 Jest 内置的 `jest.fn()` 模拟请求函数

如果你没有使用 `axios` 这类请求库，而是自定义了请求函数，可使用 Jest 的 `jest.fn()` 来模拟。

#### 示例代码

```javascript
// api.js
export const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  return response.json();
};
```

```javascript
// api.test.js
import { fetchData } from "./api";

jest.mock("./api", () => ({
  fetchData: jest.fn(),
}));

describe("fetchData", () => {
  test("should return mock data", async () => {
    const mockData = { message: "Mock data" };
    fetchData.mockResolvedValue(mockData);

    const result = await fetchData();
    expect(result).toEqual(mockData);
  });
});
```

这里使用 `jest.mock` 来模拟 `fetchData` 函数，`mockResolvedValue` 方法用于指定模拟函数的返回值。

通过上述方法，你可以在前端单元测试中有效地模拟请求，从而更全面地对前端代码进行测试。
