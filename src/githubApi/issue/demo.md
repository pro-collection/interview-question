### 大文件分片上传

如果太大的文件，比如一个视频1g 2g那么大，直接采用上面的栗子中的方法上传可能会出链接现超时的情况，而且也会超过服务端允许上传文件的大小限制，所以解决这个问题我们可以将文件进行分片上传，每次只上传很小的一部分 比如2M。

`Blob` 它表示原始数据, 也就是二进制数据，同时提供了对数据截取的方法 `slice`,而 `File` 继承了 `Blob` 的功能，所以可以直接使用此方法对数据进行分段截图。

过程如下：

* 把大文件进行分段 比如2M，发送到服务器携带一个标志，暂时用当前的时间戳，用于标识一个完整的文件
* 服务端保存各段文件
* 浏览器端所有分片上传完成，发送给服务端一个合并文件的请求
* 服务端根据文件标识、类型、各分片顺序进行文件合并
* 删除分片文件

客户端 JS 代码实现如下

```js
function submitUpload() {
  var chunkSize = 2 * 1024 * 1024;//分片大小 2M
  var file = document.getElementById('f1').files[0];
  var chunks = [], //保存分片数据
    token = (+new Date()),//时间戳
    name = file.name, chunkCount = 0, sendChunkCount = 0;

  //拆分文件 像操作字符串一样
  if (file.size > chunkSize) {
    //拆分文件
    var start = 0, end = 0;
    while (true) {
      end += chunkSize;
      var blob = file.slice(start, end);
      start += chunkSize;

      //截取的数据为空 则结束
      if (!blob.size) {
        //拆分结束
        break;
      }

      chunks.push(blob);//保存分段数据
    }
  } else {
    chunks.push(file.slice(0));
  }

  chunkCount = chunks.length;//分片的个数

//没有做并发限制，较大文件导致并发过多，tcp 链接被占光 ，需要做下并发控制，比如只有4个在请求在发送

  for (var i = 0; i < chunkCount; i++) {
    var fd = new FormData();   //构造FormData对象
    fd.append('token', token);
    fd.append('f1', chunks[i]);
    fd.append('index', i);
    xhrSend(fd, function() {
      sendChunkCount += 1;
      if (sendChunkCount === chunkCount) {//上传完成，发送合并请求
        console.log('上传完成，发送合并请求');
        var formD = new FormData();
        formD.append('type', 'merge');
        formD.append('token', token);
        formD.append('chunkCount', chunkCount);
        formD.append('filename', name);
        xhrSend(formD);
      }
    });
  }
}

function xhrSend(fd, cb) {

  var xhr = new XMLHttpRequest();   //创建对象
  xhr.open('POST', 'http://localhost:8100/', true);
  xhr.onreadystatechange = function() {
    console.log('state change', xhr.readyState);
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      cb && cb();
    }
  }
  xhr.send(fd);//发送
}

//绑定提交事件
document.getElementById('btn-submit').addEventListener('click', submitUpload);
```

服务端 node 实现代码如下： 合并文件这里使用 stream pipe 实现，这样更节省内存，边读边写入，占用内存更小，效率更高，代码见fnMergeFile方法。

```js
//二次处理文件，修改名称
app.use((ctx) => {
  var body = ctx.request.body;
  var files = ctx.request.files ? ctx.request.files.f1 : [];//得到上传文件的数组
  var result = [];
  var fileToken = ctx.request.body.token;// 文件标识
  var fileIndex = ctx.request.body.index;//文件顺序

  if (files && !Array.isArray(files)) {//单文件上传容错
    files = [files];
  }

  files && files.forEach(item => {
    var path = item.path;
    var fname = item.name;//原文件名称
    var nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
    if (item.size > 0 && path) {
      //得到扩展名
      var extArr = fname.split('.');
      var ext = extArr[extArr.length - 1];
      //var nextPath = path + '.' + ext;
      //重命名文件
      fs.renameSync(path, nextPath);
      result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1));
    }
  });

  if (body.type === 'merge') {//合并分片文件
    var filename = body.filename,
      chunkCount = body.chunkCount,
      folder = path.resolve(__dirname, '../static/uploads') + '/';

    var writeStream = fs.createWriteStream(`${folder}${filename}`);

    var cindex = 0;

    //合并文件
    function fnMergeFile() {
      var fname = `${folder}${cindex}-${fileToken}`;
      var readStream = fs.createReadStream(fname);
      readStream.pipe(writeStream, { end: false });
      readStream.on("end", function() {
        fs.unlink(fname, function(err) {
          if (err) {
            throw err;
          }
        });
        if (cindex + 1 < chunkCount) {
          cindex += 1;
          fnMergeFile();
        }
      });
    }

    fnMergeFile();
    ctx.body = 'merge ok 200';
  }

});
```

### 大文件上传断点续传

在上面我们实现了文件分片上传和最终的合并，现在要做的就是如何检测这些分片，不再重新上传即可。 这里我们可以在本地进行保存已上传成功的分片，重新上传的时候使用`spark-md5`来生成文件 hash，区分此文件是否已上传。

- 为每个分段生成 hash 值，使用  `spark-md5`  库
- 将上传成功的分段信息保存到本地
- 重新上传时，进行和本地分段 hash 值的对比，如果相同的话则跳过，继续下一个分段的上传

**方案一**： 保存在本地 `indexDB/localStorage` 等地方， 推荐使用 `localForage` 这个库                               
`npm install localforage`

**客户端 JS 代码**：

```js
//获得本地缓存的数据
function getUploadedFromStorage() {
  return JSON.parse(localforage.getItem(saveChunkKey) || "{}");
}

//写入缓存
function setUploadedToStorage(index) {
  var obj = getUploadedFromStorage();
  obj[index] = true;
  localforage.setItem(saveChunkKey, JSON.stringify(obj));
}

//分段对比

var uploadedInfo = getUploadedFromStorage();//获得已上传的分段信息

for (var i = 0; i < chunkCount; i++) {
  console.log('index', i, uploadedInfo[i] ? '已上传过' : '未上传');

  if (uploadedInfo[i]) {//对比分段
    sendChunkCount = i + 1;//记录已上传的索引
    continue;//如果已上传则跳过
  }
  var fd = new FormData();   //构造FormData对象
  fd.append('token', token);
  fd.append('f1', chunks[i]);
  fd.append('index', i);

  (function(index) {
    xhrSend(fd, function() {
      sendChunkCount += 1;
      //将成功信息保存到本地
      setUploadedToStorage(index);
      if (sendChunkCount === chunkCount) {
        console.log('上传完成，发送合并请求');
        var formD = new FormData();
        formD.append('type', 'merge');
        formD.append('token', token);
        formD.append('chunkCount', chunkCount);
        formD.append('filename', name);
        xhrSend(formD);
      }
    });
  })(i);
}
```

**方案2**：服务端用于保存分片坐标信息， 返回给前端                        

需要服务端添加一个接口只是服务端需要增加一个接口。 基于上面一个栗子进行改进，服务端已保存了部分片段，客户端上传前需要从服务端获取已上传的分片信息（上面是保存在了本地浏览器），本地对比每个分片的 hash 值，跳过已上传的部分，只传未上传的分片。                       

方法1是从本地获取分片信息,这里只需要将此方法的能力改为从服务端获取分片信息就行了。                  



