电影院选票功能可以通过 Canvas 来实现，具体实现步骤如下：

1. 绘制座位图案：使用 Canvas 绘制座位图案，可以用矩形或圆形来表示每个座位，还可以添加不同颜色来表示该座位的状态（已售、已选、可选等）。

2. 添加鼠标事件：添加鼠标事件，如鼠标移动、鼠标单击等，来实现用户交互操作。例如，当用户点击座位时，将该座位的状态改为已选状态，并更新座位图案的颜色。

3. 统计已选座位：在用户选票的过程中，需要统计已选座位的数量和位置，并将选票信息展示给用户。可以通过遍历座位图案数组来实现。

4. 添加检查功能：为了防止用户在选票过程中出现错误，可以添加检查功能，如检查座位是否已被售出或已被其他人选中等。

5. 添加确认和支付功能：当用户选好座位后，需要确认并支付，可以通过弹出确认对话框来实现，并将用户的选票信息发送至后台进行处理。



**代码实现如下**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<canvas id="canvas" width="800" height="600"></canvas>
<button id="btnPay">确认并支付</button>


<script>
  // 获取画布和按钮元素
  var canvas = document.getElementById('canvas');
  var btnPay = document.getElementById('btnPay');

  // 获取画布上下文和座位数组
  var ctx = canvas.getContext('2d');
  var seats = [];

  // 绘制座位
  function drawSeat(x, y, state) {
    switch (state) {
      case 0:
        ctx.fillStyle = '#ccc'; // 可选座位
        break;
      case 1:
        ctx.fillStyle = '#f00'; // 已售座位
        break;
      case 2:
        ctx.fillStyle = '#0f0'; // 已选座位
        break;
      default:
        ctx.fillStyle = '#000'; // 其他座位
        break;
    }
    ctx.fillRect(x, y, 30, 30);
  }

  // 初始化座位数组
  function initSeat() {
    for (var i = 0; i < 10; i++) {
      seats[i] = [];
      for (var j = 0; j < 10; j++) {
        seats[i][j] = 0; // 初始状态为可选
        drawSeat(i * 40 + 50, j * 40 + 50, 0); // 绘制座位
      }
    }
  }

  // 统计已选座位数量和位置
  function countSelectedSeats() {
    var selectedSeats = [];
    var count = 0;
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        if (seats[i][j] == 2) {
          selectedSeats.push([i, j]);
          count++;
        }
      }
    }
    return [count, selectedSeats];
  }

  // 更新座位状态和颜色
  function updateSeat(x, y) {
    if (seats[x][y] == 0) {
      seats[x][y] = 2; // 更改为已选状态
    } else if (seats[x][y] == 2) {
      seats[x][y] = 0; // 更改为可选状态
    }
    drawSeat(x * 40 + 50, y * 40 + 50, seats[x][y]); // 更新颜色
  }

  // 检查座位状态是否可选
  function checkSeat(x, y) {
    if (seats[x][y] == 1) {
      alert('该座位已售出，请选择其他座位！');
      return false;
    } else if (seats[x][y] == 2) {
      alert('该座位已被选中，请选择其他座位！');
      return false;
    }
    return true;
  }

  // 点击事件处理函数
  function handleClick(e) {
    var x = parseInt((e.clientX - canvas.offsetLeft - 50) / 40);
    var y = parseInt((e.clientY - canvas.offsetTop - 50) / 40);
    if (x >= 0 && x < 10 && y >= 0 && y < 10) {
      if (checkSeat(x, y)) {
        updateSeat(x, y);
        var count = countSelectedSeats()[0];
        if (count > 0) {
          btnPay.innerHTML = '确认并支付（已选 ' + count + ' 座位）';
        } else {
          btnPay.innerHTML = '确认并支付';
        }
      }
    }
  }

  // 确认并支付按钮点击事件处理函数
  function handlePay() {
    var selectedSeats = countSelectedSeats()[1];
    if (selectedSeats.length == 0) {
      alert('请选择座位！');
      return;
    }
    if (confirm('您已选中以下座位：' + selectedSeats.join('、') + '，确认支付吗？')) {
      // 向后台发送选票信息，并进行支付处理
      alert('支付成功！请前往指定影院取票！');
      initSeat(); // 重新初始化座位
      btnPay.innerHTML = '确认并支付';
    }
  }

  // 初始化座位
  initSeat();

  // 绑定点击事件和确认并支付按钮点击事件
  canvas.addEventListener('click', handleClick);
  btnPay.addEventListener('click', handlePay);

</script>
</body>
</html>
```


