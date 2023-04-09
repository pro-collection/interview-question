### 题目如下

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性
children 数组下，结构如下：

```js
// 原始 list 如下
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
const result = convert(list);

// 转换后的结果如下
let result = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }, {
            id: 16,
            name: '部门L',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  ···
]
;
```

### 解法

解法1：                                   
大型找爹现场                      
时间复杂度O(n^2)

```js
function convert(arr) {
  return arr.filter((child) => {
    child.children = arr.filter(item => item.parentId === child.id)
    return child.parentId === 0
  })
}

console.log(convert(list))
```

解法2：                        
先遍历出hash表O(n)                       
再遍历找爹O(n)                   
时间复杂度：O(2n)=O(n)                    
大型找爹现场，找到爹就把自己push到爹的房里，如果没有房间先造一个

```js
function convert(arr) {
  const res = []
  const map = arr.reduce((obj, item) => (obj[item.id] = item, obj), {})
  for (let item of arr) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (map.hasOwnProperty(item.parentId)) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}
```
