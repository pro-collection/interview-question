**关键词**：扁平结构转嵌套结构

**题目**

```
数据输入：
[
  { "name": "数据1", "parent": null, "id": 1 },
  { "name": "数据2", "id": 2, "parent": 1 },
  { "name": "数据3", "parent": 2, "id": 3 },
  { "name": "数据4", "parent": 3, "id": 4 },
  { "name": "数据5", "parent": 4, "id": 5 },
  { "name": "数据6", "parent": 2, "id": 6 }
]

数据输出：
[
  {
    "name": "数据1",
    "parent": null,
    "id": 1,
    "children": [
      {
        "name": "数据2",
        "id": 2,
        "parent": 1,
        "children": [
          {
            "name": "数据3",
            "parent": 2,
            "id": 3,
            "children": [
              {
                "name": "数据4",
                "parent": 3,
                "id": 4,
                "children": [
                  {
                    "name": "数据5",
                    "parent": 4,
                    "id": 5,
                    "children": []
                  }
                ]
              }
            ]
          },
          {
            "name": "数据6",
            "parent": 2,
            "id": 6,
            "children": []
          }
        ]
      }
    ]
  }
]
```

**解**

解法非常有意思， 自己好好体会

```js
function listToTree(list) {
  const map = {},
    roots = [];

  // 首先将每个节点按照 id 存入 map
  for (const item of list) {
    map[item.id] = { ...item, children: [] };
  }

  for (const item of list) {
    if (item.parent === null) {
      // 顶级节点
      roots.push(map[item.id]);
    } else if (map[item.parent]) {
      // 非顶级节点，找到父节点并添加到其 children 数组中
      map[item.parent].children.push(map[item.id]);
    }
  }

  return roots;
}

const tree = listToTree(list);
```
