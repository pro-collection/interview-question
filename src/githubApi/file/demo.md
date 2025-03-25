**关键词**：前端单测模拟 react 状态

下面分别介绍如何对 Redux 和 Recoil 这两种常见的 React 状态库进行单元测试。

### 测试 Redux

Redux 是一个可预测的状态容器，主要由 actions、reducers 和 store 构成。单元测试时可分别对这些部分进行测试。

#### 1. 测试 Actions

Actions 是用于描述状态变化的普通 JavaScript 对象。可以测试 action 创建函数是否返回正确的 action 对象。

```javascript
// actions.js
export const increment = () => ({
  type: "INCREMENT",
});

// actions.test.js
import { increment } from "./actions";

describe("increment action", () => {
  test("should return an action with type INCREMENT", () => {
    const action = increment();
    expect(action.type).toBe("INCREMENT");
  });
});
```

#### 2. 测试 Reducers

Reducers 是纯函数，接收当前状态和 action，返回新的状态。可以测试 reducer 在不同 action 下是否返回正确的状态。

```javascript
// reducer.js
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

export default counterReducer;

// reducer.test.js
import counterReducer from "./reducer";

describe("counterReducer", () => {
  test("should handle INCREMENT action", () => {
    const initialState = { count: 0 };
    const action = { type: "INCREMENT" };
    const newState = counterReducer(initialState, action);
    expect(newState.count).toBe(1);
  });

  test("should return the same state for unknown action", () => {
    const initialState = { count: 0 };
    const action = { type: "UNKNOWN_ACTION" };
    const newState = counterReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
```

#### 3. 测试 Connected Components

如果组件通过 `connect` 函数连接到 Redux store，可以使用 `enzyme` 或 `@testing-library/react` 来测试组件是否正确接收和使用 store 中的状态和 actions。

```jsx
// CounterComponent.jsx
import React from "react";
import { connect } from "react-redux";
import { increment } from "./actions";

const CounterComponent = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
);

const mapStateToProps = (state) => ({
  count: state.count,
});

const mapDispatchToProps = {
  increment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);

// CounterComponent.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CounterComponent from "./CounterComponent";

const mockStore = configureStore([]);

describe("CounterComponent", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ count: 0 });
  });

  test("should display the count from the store", () => {
    render(
      <Provider store={store}>
        <CounterComponent />
      </Provider>
    );
    const countElement = screen.getByText("Count: 0");
    expect(countElement).toBeInTheDocument();
  });

  test("should dispatch increment action on button click", () => {
    render(
      <Provider store={store}>
        <CounterComponent />
      </Provider>
    );
    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "INCREMENT" }]);
  });
});
```

### 测试 Recoil

Recoil 是一个用于管理 React 应用状态的库，主要包含 atoms（原子状态）和 selectors（派生状态）。

#### 1. 测试 Atoms

Atoms 是 Recoil 中的基本状态单元。可以测试 atoms 的初始值是否正确。

```javascript
// atoms.js
import { atom } from "recoil";

export const counterState = atom({
  key: "counterState",
  default: 0,
});

// atoms.test.js
import { counterState } from "./atoms";
import { useRecoilValue } from "recoil";
import { renderHook } from "@testing-library/react-hooks";

describe("counterState", () => {
  test("should have an initial value of 0", () => {
    const { result } = renderHook(() => useRecoilValue(counterState));
    expect(result.current).toBe(0);
  });
});
```

#### 2. 测试 Selectors

Selectors 是基于 atoms 或其他 selectors 派生出来的状态。可以测试 selectors 是否正确计算派生状态。

```javascript
// selectors.js
import { atom, selector } from "recoil";

export const counterState = atom({
  key: "counterState",
  default: 0,
});

export const doubleCounterSelector = selector({
  key: "doubleCounterSelector",
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});

// selectors.test.js
import { counterState, doubleCounterSelector } from "./selectors";
import { useRecoilValue, set } from "recoil";
import { renderHook } from "@testing-library/react-hooks";

describe("doubleCounterSelector", () => {
  test("should return double the counter value", () => {
    const { result } = renderHook(() => useRecoilValue(doubleCounterSelector));
    expect(result.current).toBe(0);

    const { set } = renderHook(() => ({
      set: (value) => useSetRecoilState(counterState)(value),
    })).result.current;

    set(5);
    const { result: newResult } = renderHook(() => useRecoilValue(doubleCounterSelector));
    expect(newResult.current).toBe(10);
  });
});
```

#### 3. 测试 Recoil 组件

可以测试使用 Recoil 状态的组件是否正确更新和渲染。

```jsx
// CounterComponent.jsx
import React from "react";
import { useRecoilState } from "recoil";
import { counterState } from "./atoms";

const CounterComponent = () => {
  const [count, setCount] = useRecoilState(counterState);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default CounterComponent;

// CounterComponent.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CounterComponent from "./CounterComponent";

describe("CounterComponent", () => {
  test("should display the count and increment on button click", () => {
    render(
      <RecoilRoot>
        <CounterComponent />
      </RecoilRoot>
    );
    const countElement = screen.getByText("Count: 0");
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);

    const newCountElement = screen.getByText("Count: 1");
    expect(newCountElement).toBeInTheDocument();
  });
});
```

通过以上方法，可以对 Redux 和 Recoil 状态库进行有效的单元测试，确保状态管理逻辑的正确性。
