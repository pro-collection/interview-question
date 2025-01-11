**关键词**：node stream

### 一、stream 的概念与应用场景

1. **概念引入与文件读取对比**：文章以一个简单的 HTTP 服务读取文件并返回响应的示例引入。起初，使用`fs.readFileSync`读取小文件并返回响应，这种方式在文件较小时可行。但当文件增大到几百 M 时，全部读取完再返回会导致长时间等待，此时便引出了 stream 的概念。通过`fs.createReadStream`创建文件读取流，并使用`pipe`方法将其连接到响应流，实现了流式返回，解决了大文件读取的效率问题。
2. **HTTP 传输中的流**：在 HTTP 传输大文件时，有两种常见的确定文件下载结束的方式。一种是在`header`里带上`Content-Length`，浏览器下载到指定长度即结束；另一种是设置`transfer-encoding:chunked`，服务器以不固定长度分块返回内容，当返回一个空块时代表传输结束。这种分块传输的方式，使得服务器可以在不知道文件总长度的情况下，持续向客户端发送数据，提高了传输的灵活性和效率。
3. **Shell 命令与 Node 脚本中的流**：在 Shell 命令中，`ls | grep pack`展示了`ls`命令的输出流作为`grep`命令的输入流的应用。同时，Node 脚本也能接收 Shell 命令的输出流作为输入，如`ls | grep pack | node src/read.mjs`，其中`process.stdin`作为输入流，通过监听`readable`事件并使用`read`方法读取数据，体现了流在不同命令和程序间的传递和交互。

### 二、四种底层 stream 类型

1. **Readable（可读流）**
   - **实现方式与示例**：可读流需要实现`_read`方法，通过`push`方法返回具体的数据，当`push(null)`时，表示流结束。文章给出了多种创建可读流的方式，包括直接创建实例、通过继承`Readable`类创建，以及结合生成器创建。例如，通过直接创建实例的方式如下：

```javascript
import { Readable } from "node:stream";
const readableStream = new Readable();
readableStream._read = function () {
  this.push("阿门阿前一棵葡萄树，");
  this.push("阿东阿东绿的刚发芽，");
  this.push("阿东背着那重重的的壳呀，");
  this.push("一步一步地往上爬。");
  this.push(null);
};
readableStream.on("data", (data) => {
  console.log(data.toString());
});
readableStream.on("end", () => {
  console.log("done");
});
```

    - **与其他API的关联**：文件读取流`fs.createReadStream`是基于`Readable`封装的，`http`服务的`request`对象也是`Readable`的实例。这意味着在处理HTTP请求时，可以像操作普通可读流一样读取请求数据。

2. **Writable（可写流）**
   - **实现方式与特点**：可写流要实现`_write`方法，用于接收写入的内容。其特点是可以通过控制`next`方法的调用时机，来控制消费数据的频率。例如，以下代码实现了一个简单的可写流，每 1 秒处理一次写入的数据：

```javascript
import { Writable } from "node:stream";
class WritableDong extends Writable {
  constructor(iterator) {
    super();
    this.iterator = iterator;
  }
  _write(data, enc, next) {
    console.log(data.toString());
    setTimeout(() => {
      next();
    }, 1000);
  }
}
function createWriteStream() {
  return new WritableDong();
}
const writeStream = createWriteStream();
writeStream.on("finish", () => console.log("done"));
writeStream.write("阿门阿前一棵葡萄树，");
writeStream.write("阿东阿东绿的刚发芽，");
writeStream.write("阿东背着那重重的的壳呀，");
writeStream.write("一步一步地往上爬。");
writeStream.end();
```

    - **与其他API的关联**：`fs.createWriteStream`是`Writable`的常见封装应用，`http`服务的`response`对象也是`Writable`实例，这使得在处理HTTP响应时，可以方便地向客户端写入数据。

3. **Duplex（双工流）**
   - **实现方式与功能**：双工流需要同时实现`_read`和`_write`方法，具备可读可写的功能。文章通过一个示例展示了双工流的实现：

```javascript
import { Duplex } from "node:stream";
class DuplexStream extends Duplex {
  _read() {
    this.push("阿门阿前一棵葡萄树，");
    this.push("阿东阿东绿的刚发芽，");
    this.push("阿东背着那重重的的壳呀，");
    this.push("一步一步地往上爬。");
    this.push(null);
  }
  _write(data, enc, next) {
    console.log(data.toString());
    setTimeout(() => {
      next();
    }, 1000);
  }
}
const duplexStream = new DuplexStream();
duplexStream.on("data", (data) => {
  console.log(data.toString());
});
duplexStream.on("end", (data) => {
  console.log("read done");
});
duplexStream.write("阿门阿前一棵葡萄树，");
duplexStream.write("阿东阿东绿的刚发芽，");
duplexStream.write("阿东背着那重重的的壳呀，");
duplexStream.write("一步一步地往上爬。");
duplexStream.end();
duplexStream.on("finish", (data) => {
  console.log("write done");
});
```

    - **实际应用**：TCP协议中的`socket`是`Duplex`的典型实现，通过`net`模块创建的TCP服务端和客户端，可以实现双向通信，其中`write`方法用于发送数据，`data`和`end`事件用于接收和处理数据。

4. **Transform（转换流）**
   - **实现方式与功能**：转换流继承自`Duplex`，需要实现`_transform`方法，对写入的内容进行转换后提供给消费者读取。例如，以下代码实现了一个将输入内容反转的转换流：

```javascript
import { Transform } from "node:stream";
class ReverseStream extends Transform {
  _transform(buf, enc, next) {
    const res = buf.toString().split("").reverse().join("");
    this.push(res);
    next();
  }
}
var transformStream = new ReverseStream();
transformStream.on("data", (data) => console.log(data.toString()));
transformStream.on("end", (data) => console.log("read done"));
transformStream.write("阿门阿前一棵葡萄树");
transformStream.write("阿东阿东绿的刚发芽");
transformStream.write("阿东背着那重重的的壳呀");
transformStream.write("一步一步地往上爬");
transformStream.end();
transformStream.on("finish", (data) => console.log("write done"));
```

    - **实际应用**：`zlib`模块中的`createGzip`是转换流的重要应用，可用于文件的压缩。通过`source.pipe(gzip).pipe(destination)`，可以将文件读取流经过`gzip`转换流后，传输到文件写入流，实现文件的压缩功能，也可以使用`pipeline` API简化操作。

### 三、总结

Stream 是 Node.js 中非常重要且常用的 API，在文件读写、网络通信等场景中发挥着关键作用。文章详细介绍了四种底层 stream 类型：`Readable`通过实现`_read`方法和`push`操作提供数据；`Writable`通过实现`_write`方法和`next`操作消费数据；`Duplex`同时具备可读可写功能；`Transform`在`Duplex`基础上对写入内容进行转换。在面试中，不仅要了解这四种类型的定义和实现方式，还需能够举例说明常见 API 所属的 stream 类型，如`fs.createReadStream`是`Readable`的实现，`fs.createWriteStream`是`Writable`的实现等。掌握 stream 的知识，对于理解和开发高效的 Node.js 应用程序至关重要。

### 参考文档

https://juejin.cn/post/7449185434615365682
