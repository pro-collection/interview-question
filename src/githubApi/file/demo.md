**关键词**：scheduler 调度机制原理

细节过于复杂， 可以参考一下文档：

- https://juejin.cn/post/7331135154209308687

后续是题库作者对上述文档的一些重点信息总结：

1. scheduler 概念
2. 时间片与优先级 概念
3. 优先级切分
4. 任务队列
5. scheduleCallback
6. requestHostCallback
7. MessageChannel
8. performWorkUntilDeadline
   - 任务的中断和恢复
   - 判断任务的完成状态
   - 取消任务
