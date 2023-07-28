**关键词**：循环链表

要判断一个单向链表是否成循环链表，可以使用快慢指针的方法。

快慢指针是两个指针，一个指针每次移动两个节点，另一个指针每次移动一个节点。如果链表中存在循环，那么快指针最终会追上慢指针，两个指针会相遇。

具体的判断过程如下：
1. 初始化快指针和慢指针，都指向链表的头节点。
2. 进入一个循环，每次迭代中，慢指针移动一个节点，快指针移动两个节点。
3. 检查快指针和慢指针是否相遇，如果相遇，则链表是循环链表；如果快指针为null或者快指针的下一个节点为null，则链表不是循环链表。

下面是一个示例的实现代码（假设链表的节点定义为Node类，其中包含一个next指针指向下一个节点）：

使用JavaScript实现的代码：

```javascript
function isCyclicLinkedList(head) {
  if (!head) {
    return false;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}
```

这段代码与之前给出的Python代码实现相同，使用快慢指针的方法判断单向链表是否成循环链表。只需遍历链表一次，时间复杂度为O(n)，其中n是链表的节点数。
