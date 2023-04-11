# 写在前面

今年国庆假期终于可以憋在家里了不用出门了，不用出去看后脑了，真的是一种享受。这么好的光阴怎么浪费，睡觉、吃饭、打豆豆这怎么可能（耍多了也烦），完全不符合我们程序员的作风，赶紧起来把文章写完。

这篇文章比较基础，在国庆期间的业余时间写的，这几天又完善了下，力求把更多的前端所涉及到的关于文件上传的各种场景和应用都涵盖了,若有疏漏和问题还请留言斧正和补充。

# 自测读不读

以下是本文所涉及到的知识点，break or continue ?

* 文件上传原理
* 最原始的文件上传
* 使用 koa2 作为服务端写一个文件上传接口
* 单文件上传和上传进度
* 多文件上传和上传进度
* 拖拽上传
* 剪贴板上传
* 大文件上传之分片上传
* 大文件上传之断点续传
* node 端文件上传

# 原理概述

原理很简单，就是根据 http 协议的规范和定义，完成请求消息体的封装和消息体的解析，然后将二进制内容保存到文件。

我们都知道如果要上传一个文件，需要把 form 标签的`enctype`设置为`multipart/form-data`,同时`method`必须为`post`方法。

那么`multipart/form-data`表示什么呢？

> multipart互联网上的混合资源，就是资源由多种元素组成，form-data表示可以使用HTML Forms 和 POST 方法上传文件，具体的定义可以参考RFC 7578。

`multipart/form-data` 结构

看下 http 请求的消息体

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3d4c4d605f53~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

* 请求头：

`Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryDCntfiXcSkPhS4PN` 表示本次请求要上传文件，其中boundary表示分隔符，如果要上传多个表单项，就要使用boundary分割，每个表单项由———XXX开始，以———XXX结尾。

* 消息体- Form Data 部分

每一个表单项又由`Content-Type`和`Content-Disposition`组成。

`Content-Disposition: form-data` 为固定值，表示一个表单元素，`name` 表示表单元素的 名称，回车换行后面就是`name`的值，如果是上传文件就是文件的二进制内容。

`Content-Type`：表示当前的内容的 MIME 类型，是图片还是文本还是二进制数据。

**解析**

客户端发送请求到服务器后，服务器会收到请求的消息体，然后对消息体进行解析，解析出哪是普通表单哪些是附件。

可能大家马上能想到通过正则或者字符串处理分割出内容，不过这样是行不通的，二进制`buffer`转化为`string`,对字符串进行截取后，其索引和字符串是不一致的，所以结果就不会正确，除非上传的就是字符串。

不过一般情况下不需要自行解析，目前已经有很成熟的三方库可以使用。

至于如何解析，这个也会占用很大篇幅，后面的文章在详细说。

# 最原始的文件上传

**使用 form 表单上传文件**

在 `ie`时代，如果实现一个无刷新的文件上传那可是费老劲了，大部分都是用 iframe 来实现局部刷新或者使用 flash 插件来搞定，在那个时代 ie 就是最好用的浏览器（别无选择）。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3b9b353b4bc7~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

这种方式上传文件，不需要 js ，而且没有兼容问题，所有浏览器都支持，就是体验很差，导致页面刷新，页面其他数据丢失。

`HTML`

```xml
 <form method="post" action="http://localhost:8100" enctype="multipart/form-data">

        选择文件:
            <input type="file" name="f1"/> input 必须设置 name 属性，否则数据无法发送<br/>
<br/>
            标题：<input type="text" name="title"/><br/><br/><br/>

        <button type="submit" id="btn-0">上 传</button>

</form>


```

# 文件上传接口

服务端文件的保存基于现有的库`koa-body`结合 `koa2`实现服务端文件的保存和数据的返回。

在项目开发中，文件上传本身和业务无关，代码基本上都可通用。

在这里我们使用`koa-body`库来实现解析和文件的保存。

`koa-body` 会自动保存文件到系统临时目录下，也可以指定保存的文件路径。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/7/16da5a50d29b54b3~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

然后在后续中间件内得到已保存的文件的信息，再做二次处理。

* `ctx.request.files.f1` 得到文件信息，`f1`为`input file` 标签的 `name`
* 获得文件的扩展名，重命名文件

`NODE`

```ini
/**
 * 服务入口
 */
var http = require('http');
var koaStatic = require('koa-static');
var path = require('path');
var koaBody = require('koa-body');//文件保存库
var fs = require('fs');
var Koa = require('koa2');

var app = new Koa();
var port = process.env.PORT || '8100';

var uploadHost= `http://localhost:${port}/uploads/`;

app.use(koaBody({
    formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下  os
        uploadDir: path.resolve(__dirname, '../static/uploads')
    },
    multipart: true // 开启文件上传，默认是关闭
}));

//开启静态文件访问
app.use(koaStatic(
    path.resolve(__dirname, '../static')
));

//文件二次处理，修改名称
app.use((ctx) => {
    var file = ctx.request.files.f1;//得道文件对象
    var path = file.path;
    var fname = file.name;//原文件名称
    var nextPath = path+fname;
    if(file.size>0 && path){
        //得到扩展名
        var extArr = fname.split('.');
        var ext = extArr[extArr.length-1];
        var nextPath = path+'.'+ext;
        //重命名文件
        fs.renameSync(path, nextPath);
    }
    //以 json 形式输出上传文件地址
    ctx.body = `{
        "fileUrl":"${uploadHost}${nextPath.slice(nextPath.lastIndexOf('/')+1)}"
    }`;
});

/**
 * http server
 */
var server = http.createServer(app.callback());
server.listen(port);
console.log('demo1 server start ......   ');

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo1 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo1")

# 多文件上传

在 `ie` 时代的多文件上传是需要创建多个 `input file` 标签，现在 `html5`只需要一个标签加个属性就搞定了,`file` 标签开启`multiple`。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3bc9abab6d30~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`HTML`

```go
//设置 multiple属性
<input type="file" name="f1" multiple/>

```

`NODE`

服务端也需要进行简单的调整，由单文件对象变为多文件数组，然后进行遍历处理。

```ini
//二次处理文件，修改名称
app.use((ctx) => {

    var files = ctx.request.files.f1;// 多文件， 得到上传文件的数组
    var result=[];

    //遍历处理
    files && files.forEach(item=>{
        var path = item.path;
        var fname = item.name;//原文件名称
        var nextPath = path + fname;
        if (item.size > 0 && path) {
            //得到扩展名
            var extArr = fname.split('.');
            var ext = extArr[extArr.length - 1];
            var nextPath = path + '.' + ext;
            //重命名文件
            fs.renameSync(path, nextPath);

            //文件可访问路径放入数组
            result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
        }
    });

    //输出 json 结果
    ctx.body = `{
        "fileUrl":${JSON.stringify(result)}
    }`;
})

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo2 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo2")

# 局部刷新 - iframe

这里说的是在 `ie` 时代的上传文件局部刷新，借助 iframe 实现。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3bde37cca831~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

* 局部刷新

页面内放一个隐藏的 `iframe`，或者使用 `js` 动态创建，指定 `form` 表单的 `target` 属性值为`iframe`标签 的 `name` 属性值，这样 `form` 表单的 `shubmit` 行为的跳转就会在 `iframe` 内完成，整体页面不会刷新。

* 拿到接口数据

然后为 `iframe` 添加`load`事件，得到 `iframe` 的页面内容，将结果转换为 `JSON` 对象，这样就拿到了接口的数据

`HTML`

```xml
   <iframe id="temp-iframe" name="temp-iframe" src="" style="display:none;"></iframe>
        <form method="post" target="temp-iframe" action="http://localhost:8100" enctype="multipart/form-data">
        选择文件(可多选):
            <input type="file" name="f1" id="f1" multiple/><br/> input 必须设置 name 属性，否则数据无法发送<br/>
<br/>
            标题：<input type="text" name="title"/><br/><br/><br/>

        <button type="submit" id="btn-0">上 传</button>

        </form>


<script>

var iframe = document.getElementById('temp-iframe');
iframe.addEventListener('load',function () {
      var result = iframe.contentWindow.document.body.innerText;
      //接口数据转换为 JSON 对象
      var obj = JSON.parse(result);
      if(obj && obj.fileUrl.length){
          alert('上传成功');

      }
      console.log(obj);
});


</script>

```

`NODE`

服务端代码不需要改动，略.

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo3 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo3")

# 无刷新上传

无刷新上传文件肯定要用到`XMLHttpRequest`,在 `ie` 时代也有这个对象，单只 支持文本数据的传输，无法用来读取和上传二进制数据。

现在已然升级到了`XMLHttpRequest2`，较1版本有非常大的升级，首先就是可以读取和上传二进制数据，可以使用·FormData·对象管理表单数据。

当然也可使用 `fetch` 进行上传。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3bf40a6ae554~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`HTML`

```xml
 <div>
        选择文件(可多选):
        <input type="file" id="f1" multiple/><br/><br/>
        <button type="button" id="btn-submit">上 传</button>
</div>


```

`JS xhr`

```xml

<script>
    function submitUpload() {
        //获得文件列表，注意这里不是数组，而是对象
        var fileList = document.getElementById('f1').files;
        if(!fileList.length){
            alert('请选择文件');
            return;
        }
        var fd = new FormData();   //构造FormData对象
        fd.append('title', document.getElementById('title').value);

        //多文件上传需要遍历添加到 fromdata 对象
        for(var i =0;i<fileList.length;i++){
            fd.append('f1', fileList[i]);//支持多文件上传
        }

        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://localhost:8100/', true);

        xhr.send(fd);//发送时  Content-Type默认就是: multipart/form-data; 
        xhr.onreadystatechange = function () {
            console.log('state change', xhr.readyState);
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                console.log(obj);
                if(obj.fileUrl.length){
                    alert('上传成功');
                }
            }
        }

    }

    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click',submitUpload);
</script>


```

`JS Fetch`

```ini
  fetch('http://localhost:8100/', {
            method: 'POST',
            body: fd
        })
            .then(response => response.json())
            .then(response =>{
                console.log(response);
                if (response.fileUrl.length) {
                    alert('上传成功');
                }
            } )
            .catch(error => console.error('Error:', error));

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo4 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo4")

# 多文件，单进度

借助`XMLHttpRequest2`的能力，实现多个文件或者一个文件的上传进度条的显示。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3bff57634139~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`说明`

* 页面内增加一个用于显示进度的标签 `div.progress`
* `js` 内处理增加进度处理的监听函数`xhr.upload.onprogress`
* `event.lengthComputable`这是一个状态，表示发送的长度有了变化，可计算
* `event.loaded`表示发送了多少字节
* `event.total`表示文件总大小
* 根据`event.loaded`和`event.total`计算进度，渲染`div.progress`

### PS 特别提醒

`xhr.upload.onprogress`要写在`xhr.send`方法前面，否则`event.lengthComputable`状态不会改变，只有在最后一次才能获得，也就是`100%`的时候.

`HTML`

```xml
 <div>

        选择文件(可多选):
            <input type="file" id="f1" multiple/><br/><br/>

            <div id="progress">
                <span class="red"></span>
            </div>

        <button type="button" id="btn-submit">上 传</button>

    </div>

```

`JS`

```ini
<script>

    function submitUpload() {
        var progressSpan = document.getElementById('progress').firstElementChild;
        var fileList = document.getElementById('f1').files;
        progressSpan.style.width='0';
        progressSpan.classList.remove('green');

        if(!fileList.length){
            alert('请选择文件');
            return;
        }

        var fd = new FormData();   //构造FormData对象
        fd.append('title', document.getElementById('title').value);

        for(var i =0;i<fileList.length;i++){
            fd.append('f1', fileList[i]);//支持多文件上传
        }

        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://10.70.65.235:8100/', true);

        xhr.onreadystatechange = function () {
            console.log('state change', xhr.readyState);
            if (xhr.readyState == 4) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                console.log(obj);
                if(obj.fileUrl.length){
                    //alert('上传成功');
                }
            }
        }

        xhr.onprogress=updateProgress;
        xhr.upload.onprogress = updateProgress;
        function updateProgress(event) {
            console.log(event);
            if (event.lengthComputable) {
                var completedPercent = (event.loaded / event.total * 100).toFixed(2);
                progressSpan.style.width= completedPercent+'%';
                progressSpan.innerHTML=completedPercent+'%';
                if(completedPercent>90){//进度条变色
                    progressSpan.classList.add('green');
                }
                console.log('已上传',completedPercent);
            }
        }
        //注意 send 一定要写在最下面，否则 onprogress 只会执行最后一次 也就是100%的时候
        xhr.send(fd);//发送时  Content-Type默认就是: multipart/form-data; 
    }
    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click',submitUpload);


</script>

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo5 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo5")

# 多文件上传+预览+取消

上一个栗子的多文件上传只有一个进度条，有些需求可能会不大一样，需要观察到每个文件的上传进度，并且可以终止上传。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c15b6fe32aa~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`说明`

* 为了预览的需要，我们这里选择上传图片文件，其他类型的也一样，只是预览不方便
* 页面内增加一个多图预览的容器`div.img-box`
* 根据选择的文件信息动态创建所属的预览区域和进度条以及取消按钮
* 为取消按钮绑定事件，调用`xhr.abort();`终止上传
* 使用`window.URL.createObjectURL`预览图片，在图片加载成功后需要清除使用的内存`window.URL.revokeObjectURL(this.src);`

`HTML`

```xml
 <div>
        选择文件(可多选):
        <div class="addfile">添加文件
            <input type="file" id="f1" multiple />
        </div>
        <div class="img-box"></div>
        <button type="button" id="btn-submit">上 传</button>
    </div>

```

`JS`

```ini
<script>
    //更改网络 为慢3g，就可以比较明显的看到进度条了
    var fileMaxCount=6;
    var imgBox =document.getElementsByClassName('img-box')[0];
    var willUploadFile=[];//保存待上传的文件以及相关附属信息
    document.getElementById('f1').addEventListener('change',function (e) {
        var fileList = document.getElementById('f1').files;

        if (willUploadFile.length > fileMaxCount || fileList.length>fileMaxCount || (willUploadFile.length+ fileList.length>fileMaxCount)) {
            alert('最多只能上传' + fileMaxCount + '张图');
            return;
        }
        for (var i = 0; i < fileList.length; i++) {
            var f = fileList[i];//先预览图片
            var img = document.createElement('img');
            var item = document.createElement('div');
            var progress = document.createElement('div');
            progress.className='progress';
            progress.innerHTML = '<span class="red"></span><button type="button">Abort</button>';
            item.className='item';
            img.src = window.URL.createObjectURL(f);
            img.onload = function () {
                //显示要是否这块儿内存
                window.URL.revokeObjectURL(this.src);
            }

            item.appendChild(img);
            item.appendChild(progress);
            imgBox.appendChild(item);

            willUploadFile.push({
                file:f,
                item,
                progress
            });
        }
    });


    function xhrSend({file, progress}) {

        var progressSpan = progress.firstElementChild;
        var btnCancel = progress.getElementsByTagName('button')[0];
        var abortFn=function(){
              if(xhr && xhr.readyState!==4){
               //取消上传
               xhr.abort();
           }
        }
        btnCancel.removeEventListener('click',abortFn);
        btnCancel.addEventListener('click',abortFn);

        progressSpan.style.width='0';
        progressSpan.classList.remove('green');

        var fd = new FormData();   //构造FormData对象
        fd.append('f1',file);

        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://localhost:8100/', true);

        xhr.onreadystatechange = function () {
            console.log('state change', xhr.readyState);
            //调用 abort 后，state 立即变成了4,并不会变成0
            //增加自定义属性  xhr.uploaded
            if (xhr.readyState == 4 &&  xhr.uploaded) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                console.log(obj);
                if(obj.fileUrl.length){
                    //alert('上传成功');
                }
            }
        }

        xhr.onprogress=updateProgress;
        xhr.upload.onprogress = updateProgress;
        function updateProgress(event) {
            if (event.lengthComputable) {
                var completedPercent = (event.loaded / event.total * 100).toFixed(2);
                progressSpan.style.width= completedPercent+'%';
                progressSpan.innerHTML=completedPercent+'%';
                if(completedPercent>90){//进度条变色
                    progressSpan.classList.add('green');
                }
                if(completedPercent>=100){
                    xhr.uploaded=true;
                }
                console.log('已上传',completedPercent);
            }
        }
        //注意 send 一定要写在最下面，否则 onprogress 只会执行最后一次 也就是100%的时候
        xhr.send(fd);//发送时  Content-Type默认就是: multipart/form-data; 
        return xhr;
    }

    //文件上传
    function submitUpload(willFiles) {
        if(!willFiles.length){
            return;
        }
        //遍历文件信息进行上传
        willFiles.forEach(function (item) {
             xhrSend({
                 file:item.file,
                 progress:item.progress
             });
        });
    }
    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click',function () {
        submitUpload(willUploadFile);
    });

</script>

```

### 问题1

这里没有做上传的并发控制，可以通过控制同时可上传文件的个数（这里控制为最多6个）或者上传的时候做好并发处理，也就是同时只能上传 X 个文件。

### 问题2

在测试过程中，取消请求的方法`xhr.abort()`调用后，`xhr.readyState`会立即变为`4`,而不是`0`，所以这里需要做容错处理。

MDN 上说是0.

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd29041bd33cdd~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

如果大家有不同的结果，欢迎留言。

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo11 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo11")

# 拖拽上传

`html5`的出现，让拖拽上传交互成为可能，现在这样的体验也屡见不鲜。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c296abb9562~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`说明`

* 定义一个允许拖放文件的区域`div.drop-box`
* 取消`drop` 事件的默认行为`e.preventDefault();`，不然浏览器会直接打开文件
* 为拖拽区域绑定事件,鼠标在拖拽区域上 `dragover`, 鼠标离开拖拽区域`dragleave`, 在拖拽区域上释放文件`drop`
* `drop`事件内获得文件信息`e.dataTransfer.files`

`HTML`

```bash
 <div class="drop-box" id="drop-box">
       拖动文件到这里,开始上传
    </div>

    <button type="button" id="btn-submit">上 传</button>

```

`JS`

```xml
<script>

    var box = document.getElementById('drop-box');

    //禁用浏览器的拖放默认行为
    document.addEventListener('drop',function (e) {
        console.log('document drog');
        e.preventDefault();
    });

    //设置拖拽事件
    function openDropEvent() {
        box.addEventListener("dragover",function (e) {
            console.log('elemenet dragover');
             box.classList.add('over');
               e.preventDefault();
        });
         box.addEventListener("dragleave", function (e) {
              console.log('elemenet dragleave');
            box.classList.remove('over');
              e.preventDefault();
        });

        box.addEventListener("drop", function (e) {
            e.preventDefault(); //取消浏览器默认拖拽效果

            var fileList = e.dataTransfer.files; //获取拖拽中的文件对象
            var len=fileList.length;//用来获取文件的长度（其实是获得文件数量）

            //检测是否是拖拽文件到页面的操作
            if (!len) {
                box.classList.remove('over');
                return;
            }

            box.classList.add('over');

            window.willUploadFileList=fileList;

        }, false);
    }

    openDropEvent();

    function submitUpload() {

        var fileList = window.willUploadFileList||[];
        if(!fileList.length){
            alert('请选择文件');
            return;
        }

        var fd = new FormData();   //构造FormData对象

        for(var i =0;i<fileList.length;i++){
            fd.append('f1', fileList[i]);//支持多文件上传
        }

        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://localhost:8100/', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                if(obj.fileUrl.length){
                    alert('上传成功');
                }
            }
        }
        xhr.send(fd);//发送
    }
    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click',submitUpload);

</script>

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo7 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo7")

# 剪贴板上传

掘金的写文编辑器是支持粘贴上传图片的，比如我从磁盘粘贴或者从网页上右键复制图片。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c3dc32af3fc~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`说明`

* 页面内增加一个可编辑的编辑区域`div.editor-box`,开启`contenteditable`
* 为`div.editor-box`绑定`paste`事件
* 处理`paste` 事件，从`event.clipboardData || window.clipboardData`获得数据
* 将数据转换为文件`items[i].getAsFile()`
* 实现在编辑区域的光标处插入内容 `insertNodeToEditor` 方法

### 问题1

测试中发现复制多个文件无效，只有最后一个文件上传，在掘金的编辑器里也同样存在，在坐有知道原因的可以留言说下。

### 问题2

`mac`系统可以支持从磁盘复制文件后上传，`windows` 系统测试未通过，剪贴板的数据未拿到。

`HTML`

```bash
 <div class="editor-box" id="editor-box" contenteditable="true" >
       可以直接粘贴图片到这里直接上传
 </div>

```

`JS`

```ini
 //光标处插入 dom 节点
    function  insertNodeToEditor(editor,ele) {
        //插入dom 节点
        var range;//记录光标位置对象
        var node = window.getSelection().anchorNode;
        // 这里判断是做是否有光标判断，因为弹出框默认是没有的
        if (node != null) {
            range = window.getSelection().getRangeAt(0);// 获取光标起始位置
            range.insertNode(ele);// 在光标位置插入该对象
        } else {
            editor.append(ele);
        }
    }

    var box = document.getElementById('editor-box');
    //绑定paste事件
    box.addEventListener('paste',function (event) {
        var data = (event.clipboardData || window.clipboardData);

        var items = data.items;
        var fileList = [];//存储文件数据
        if (items && items.length) {
            // 检索剪切板items
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].getAsFile());
                fileList.push(items[i].getAsFile());
            }
        }

        window.willUploadFileList = fileList;
        event.preventDefault();//阻止默认行为

        submitUpload();
    }); 

    function submitUpload() {

        var fileList = window.willUploadFileList||[];
        var fd = new FormData();   //构造FormData对象
        for(var i =0;i<fileList.length;i++){
            fd.append('f1', fileList[i]);//支持多文件上传
        }
        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://localhost:8100/', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                console.log(obj);
                if(obj.fileUrl.length){
                    var img = document.createElement('img');
                    img.src= obj.fileUrl[0];
                    img.style.width='100px';
                    insertNodeToEditor(box,img);
                   // alert('上传成功');
                }
            }
        }

        xhr.send(fd);//发送
    }


```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Fblob%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo8%2F "https://github.com/Bigerfe/fe-learn-code/blob/master/src/upfiles-demo/demo8/")

# 大文件上传-分片

在 `ie` 时代由于无法使用`xhr`上传二进制数据，上传大文件需要借助浏览器插件来完成。 现在来看实现大文件上传简直soeasy。

如果太大的文件，比如一个视频1g 2g那么大，直接采用上面的栗子中的方法上传可能会出链接现超时的情况，而且也会超过服务端允许上传文件的大小限制，所以解决这个问题我们可以将文件进行分片上传，每次只上传很小的一部分 比如2M。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3e61dd505d27~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c562bd4c801~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`说明`

相信大家都对`Blob` 对象有所了解，它表示原始数据,也就是二进制数据，同时提供了对数据截取的方法`slice`,而 `File` 继承了`Blob`的功能，所以可以直接使用此方法对数据进行分段截图。

* 把大文件进行分段 比如2M，发送到服务器携带一个标志，暂时用当前的时间戳，用于标识一个完整的文件
* 服务端保存各段文件
* 浏览器端所有分片上传完成，发送给服务端一个合并文件的请求
* 服务端根据文件标识、类型、各分片顺序进行文件合并
* 删除分片文件

`HTML`

代码略，只需要一个 `input file` 标签。

`JS`

```ini
   //分片逻辑  像操作字符串一样

    var start=0,end=0;
    while (true) {
        end+=chunkSize;
        var blob = file.slice(start,end);
        start+=chunkSize;

        if(!blob.size){//截取的数据为空 则结束
            //拆分结束
            break;
        }

        chunks.push(blob);//保存分段数据
    }

<script>
    function submitUpload() {
        var chunkSize=2*1024*1024;//分片大小 2M
        var file = document.getElementById('f1').files[0];
        var chunks=[], //保存分片数据
         token = (+ new Date()),//时间戳
         name =file.name,chunkCount=0,sendChunkCount=0;

        //拆分文件 像操作字符串一样
        if(file.size>chunkSize){
            //拆分文件
            var start=0,end=0;
            while (true) {
                end+=chunkSize;
                var blob = file.slice(start,end);
                start+=chunkSize;

                if(!blob.size){//截取的数据为空 则结束
                    //拆分结束
                    break;
                }

                chunks.push(blob);//保存分段数据
            }
        }else{
            chunks.push(file.slice(0));
        }

        chunkCount=chunks.length;//分片的个数 

        //没有做并发限制，较大文件导致并发过多，tcp 链接被占光 ，需要做下并发控制，比如只有4个在请求在发送

        for(var i=0;i< chunkCount;i++){
            var fd = new FormData();   //构造FormData对象
            fd.append('token', token);
            fd.append('f1', chunks[i]);
            fd.append('index', i);
            xhrSend(fd,function () {
                sendChunkCount+=1;
                if(sendChunkCount===chunkCount){//上传完成，发送合并请求
                    console.log('上传完成，发送合并请求');
                    var formD = new FormData();
                    formD.append('type','merge');
                    formD.append('token',token);
                    formD.append('chunkCount',chunkCount);
                    formD.append('filename',name);
                    xhrSend(formD);
                }
            });
        }
    }

    function xhrSend(fd,cb) {

        var xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', 'http://localhost:8100/', true);
        xhr.onreadystatechange = function () {
            console.log('state change', xhr.readyState);
            if (xhr.readyState == 4) {
                console.log(xhr.responseText);
                cb && cb();
            }
        }
        xhr.send(fd);//发送
    }

    //绑定提交事件
    document.getElementById('btn-submit').addEventListener('click',submitUpload);
</script>


```

`NODE`

服务端需要做一些改动，保存分片文件、合并分段文件、删除分段文件。

**PS**

合并文件这里使用 `stream pipe` 实现，这样更节省内存，边读边写入，占用内存更小，效率更高，代码见`fnMergeFile`方法。

```ini
//二次处理文件，修改名称
app.use((ctx) => {
    var body = ctx.request.body;
    var files = ctx.request.files ? ctx.request.files.f1:[];//得到上传文件的数组
    var result=[];
    var fileToken = ctx.request.body.token;// 文件标识
    var fileIndex=ctx.request.body.index;//文件顺序

    if(files &&  !Array.isArray(files)){//单文件上传容错
        files=[files];
    }

    files && files.forEach(item=>{
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
            result.push(uploadHost+nextPath.slice(nextPath.lastIndexOf('/') + 1));
        }
    });

    if(body.type==='merge'){//合并分片文件
        var filename = body.filename,
        chunkCount = body.chunkCount,
            folder = path.resolve(__dirname, '../static/uploads')+'/';

        var writeStream = fs.createWriteStream(`${folder}${filename}`);

        var cindex=0;
        //合并文件
        function fnMergeFile(){
            var fname = `${folder}${cindex}-${fileToken}`;
            var readStream = fs.createReadStream(fname);
            readStream.pipe(writeStream, { end: false });
            readStream.on("end", function () {
                fs.unlink(fname, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                if (cindex+1 < chunkCount){
                    cindex += 1;
                    fnMergeFile();
                }
            });
        }
        fnMergeFile();
        ctx.body='merge ok 200';
    }

});

```

`CODE`

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2Ftree%2Fmaster%2Fsrc%2Fupfiles-demo%2Fdemo12 "https://github.com/Bigerfe/fe-learn-code/tree/master/src/upfiles-demo/demo12")

# 大文件上传-断点续传

在上面我们实现了大文件的分片上传，解决了大文件上传超时和服务器的限制。

但是仍然不够完美，大文件上传并不是短时间内就上传完成，如果期间断网，页面刷新了仍然需要重头上传,这种时间的浪费怎么能忍？

所以我们实现断点续传，已上传的部分跳过，只传未上传的部分。

### 方法1

在上面我们实现了文件分片上传和最终的合并，现在要做的就是如何检测这些分片，不再重新上传即可。 这里我们可以在本地进行保存已上传成功的分片，重新上传的时候使用`spark-md5`来生成文件 hash，区分此文件是否已上传。

* 为每个分段生成 hash 值，使用 `spark-md5` 库
* 将上传成功的分段信息保存到本地
* 重新上传时，进行和本地分段 hash 值的对比，如果相同的话则跳过，继续下一个分段的上传

**PS**

生成 hash 过程肯定也会耗费资源，但是和重新上传相比可以忽略不计了。

`DEMO`

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c6f659bcdb1~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/16/16dd3c6f65c598bd~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

`HTML`

```
代码略

```

`JS`

模拟分段保存，本地保存到`localStorage`

```javascript

    //获得本地缓存的数据
    function getUploadedFromStorage(){
        return JSON.parse( localStorage.getItem(saveChunkKey) || "{}");
    }

    //写入缓存
    function setUploadedToStorage(index) {
        var obj =  getUploadedFromStorage();
        obj[index]=true;
        localStorage.setItem(saveChunkKey, JSON.stringify(obj) );
    }

    //分段对比

    var uploadedInfo = getUploadedFromStorage();//获得已上传的分段信息

    for(var i=0;i< chunkCount;i++){
            console.log('index',i, uploadedInfo[i]?'已上传过':'未上传');

            if(uploadedInfo[i]){//对比分段
                sendChunkCount=i+1;//记录已上传的索引
                continue;//如果已上传则跳过
            }
            var fd = new FormData();   //构造FormData对象
            fd.append('token', token);
            fd.append('f1', chunks[i]);
            fd.append('index', i);

           (function (index) {
                    xhrSend(fd, function () {
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

### 方法2

为什么还有方法2呢，正常情况下方法1没问题，但是需要将分片信息保存在客户端，保存在客户端是最不保险的，说不定出现各种神奇的幺蛾子。

所以这里有一个更完善的实现，只提供思路，代码就不写了，也是基于上面的实现，只是服务端需要增加一个接口。

基于上面一个栗子进行改进，服务端已保存了部分片段，客户端上传前需要从服务端获取已上传的分片信息（上面是保存在了本地浏览器），本地对比每个分片的 hash 值，跳过已上传的部分，只传未上传的分片。

方法1是从本地获取分片信息,这里只需要将此方法的能力改为从服务端获取分片信息就行了。

```diff
-getUploadedFromStorage
+getUploadedFromServer(fileHash)

```

另外服务端增加一个获取分片的接口供客户端调用，思路最重要，代码就不贴了。

# node 端上传图片

不只会从客户端上传文件到服务器，服务器也会上传文件到其他服务器。

* 读取文件buffer `fs`
* 构建 form-data `form-data`
* 上传文件 `node-fetch`

`NODE`

```javascript
 /**
     * filepath = 相对根目录的路径即可
     */
   async function getFileBufer(filePath) => {

        return new Promise((resolve) => {
            fs.readFile(filePath, function (err, data) {
                var bufer = null;
                if (!err) {
                    resolve({
                        err: err,
                        data: data
                    });
                }

            });

        });
    }


    /**
     * 上传文件
     */
    let fetch = require('node-fetch');
    let formData = require('form-data');

    module.exports = async (options) => {
        let {
            imgPath
        } = options;
        let data = await getFileBufer(imgPath);
        if (data.err) {
            return null;
        }
        let form = new formData();
        form.append('xxx', xxx);
        form.append('pic', data.data);
        return fetch('http://xx.com/upload', {
            body: form,
            method: 'POST',
            headers: form.getHeaders()//要活的 form-data的头，否则无法上传
        }).then(res => {
            return res.json();
        }).then(data => {
            return data;
        })
    }

```

# 其他

### 在浏览器端对文件的类型、大小、尺寸进行判断

* `file.type`判断类型
* `file.size`判断大小
* 通过动态创建 img 标签，图片加载后获得尺寸,`naturalWidth naturalHeight`or `width height`

`JS`

```kotlin
    var file = document.getElementById('f1').files[0];

    //判断类型
    if(f.type!=='image/jpeg' &&  f.type !== 'image/jpg'  ){
        alert('只能上传 jpg 图片');
        flag=false;
        break;
    }

    //判断大小
    if(file.size>100*1024){
        alert('不能大于100kb');
    }

    //判断图片尺寸
    var img =new Image();
    img.onload=function(){
         console.log('图片原始大小 width*height', this.width, this.height);
        if(this.naturalWidth){
        console.log('图片原始大小 naturalWidth*naturalHeight', this.naturalWidth, this.naturalHeight);
        }else{
          console.log('oImg.width*height', this.width, this.height);
        }
    }

```

### input file 外观更改

由于input file 的外观比较传统，很多地方都需要进行美化。

1. 定义好一个外观，然后将 file input 定位到该元素上，让他的透明度为0。
2. 使用 label 标签

```ini
  <label for="file">Choose file to upload</label>
    <input type="file" id="file" name="file" multiple>

```

3. 隐藏 input file 标签，然后调用 input 元素的 click 方法

**PS**

file 标签隐藏后在 ie 下无法获得文件内容，建议还是`方法1` 兼容性强。

# 源码在这里

以上代码均已上传 github

[github.com/Bigerfe/fe-…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Ffe-learn-code%2F "https://github.com/Bigerfe/fe-learn-code/")

# 参考资料

[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob")

[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequest "https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest")

[cloud.tencent.com/developer/n…](https://link.juejin.cn?target=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Fnews%2F323657 "https://cloud.tencent.com/developer/news/323657")

# 到这里请停一下

* 我正在打造一个纯技术交流群，以学习、交流、思考、提升能力为目标，因为一个人学不如大家一起学，有了更多的交流才会进步的更快。
* 我理想的模式是，每期让一个人深入学习一个技术，然后自己再转述给大家听，类似一个分享课堂，这样可以成倍的提升学习效率
* 在这个群里不用担心自己的能力不足，不用担心问题是否太小白而不敢说，大胆的说出问题， 让更多的人一起来分析，说错了也没关系
* 有想入群的加我微信 `223344386` 回复加群即可

希望本文可以给你带了一些帮助，文中如有错误，欢迎在评论区指。 如果这篇文章帮助到了你，欢迎点赞和关注。

另外推荐关注我的微信公众号【前端技术江湖】，除了深度好文，还有我有精心整理的【500道前端面试题】等你来查收。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/8/16e46ee0e85592d0~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/8/16e46eb33a23825f~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

# 其他

**你对 SSR 有兴趣吗？**

如果你对 `服务端渲染 ssr` 技术有兴趣，可以关注我的开源项目：`Zz.js`

github:[github.com/Bigerfe/koa…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FBigerfe%2Fkoa-react-ssr "https://github.com/Bigerfe/koa-react-ssr")

官网：[zz.bigerfe.com/](https://link.juejin.cn?target=http%3A%2F%2Fzz.bigerfe.com%2F "http://zz.bigerfe.com/")

SSR 技术原理

[juejin.cn/post/684490…](https://juejin.cn/post/6844903943902855176 "https://juejin.cn/post/6844903943902855176")
