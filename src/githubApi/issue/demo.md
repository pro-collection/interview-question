**关键词**：ajax 上传文件、ajax 上传文件函数、ajax 上传文件封装

下面是一个使用 AJAX 封装的上传文件函数的示例代码：

```javascript
function uploadFile(file, url, progressCallback, successCallback, errorCallback) {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  // 将文件添加到 FormData 对象
  formData.append('file', file);

  xhr.open('POST', url, true);

  // 监听上传进度
  xhr.upload.addEventListener('progress', function(event) {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      // 调用进度回调函数
      progressCallback(progress);
    }
  });

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // 上传成功
        // 解析响应数据
        const response = JSON.parse(xhr.responseText);
        // 调用成功回调函数
        successCallback(response);
      } else {
        // 上传失败
        // 创建错误对象
        const error = new Error(`File upload failed with status ${xhr.status}`);
        // 调用错误回调函数
        errorCallback(error);
      }
    }
  };

  // 发送请求
  xhr.send(formData);
}

// 使用示例
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const progressElement = document.getElementById('progress');
const statusElement = document.getElementById('status');

uploadButton.addEventListener('click', function() {
  const file = fileInput.files[0];
  const url = 'https://api.example.com/upload';
  
  uploadFile(
    file,
    url,
    function(progress) {
      // 更新进度
      progressElement.textContent = `Upload Progress: ${progress}%`;
    },
    function(response) {
      // 上传成功
      statusElement.textContent = 'Upload Successful';
      console.log('Response:', response);
    },
    function(error) {
      // 上传失败
      statusElement.textContent = 'Upload Failed';
      console.error('Error:', error);
    }
  );
});
```

在上述示例代码中，定义了一个 `uploadFile` 函数用于上传文件。该函数接收文件对象、上传 URL、进度回调函数、成功回调函数和错误回调函数作为参数。

函数内部通过创建 `XMLHttpRequest` 对象，将文件添加到 `FormData` 对象，并使用 `POST` 方法发送请求到指定的 URL。同时，通过监听 `upload` 事件来获取上传进度，并调用进度回调函数进行更新。在请求的状态改变时，根据响应状态码判断上传成功与否，并调用相应的回调函数。

使用示例中，通过监听按钮点击事件，获取选择的文件对象，并调用 `uploadFile` 函数进行文件上传。在回调函数中更新进度和状态信息，并处理成功和失败的情况。
