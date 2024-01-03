**无限 debugger**

* 前端页面防止调试的方法主要是通过不断 `debugger` 来疯狂输出断点，因为 `debugger` 在控制台被打开的时候就会执行
* 由于程序被 `debugger` 阻止，所以无法进行断点调试，所以网页的请求也是看不到的
* 基础代码如下：

```javascript
/**
* 基础禁止调试代码
*/
(() => {
	function ban() {
	  setInterval(() => {
	    debugger;
	  }, 50);
	}
	try {
	  ban();
	} catch (err) { }
})();
```

**无限 debugger 的对策**

* 如果仅仅是加上面那么简单的代码，对于一些技术人员而言作用不大
* 可以通过控制台中的 `Deactivate breakpoints` 按钮或者使用快捷键 `Ctrl + F8` 关闭无限 `debugger`
* 这种方式虽然能去掉碍眼的 `debugger`，但是无法通过左侧的行号添加 `breakpoint`


**禁止断点的对策**

* 如果将 `setInterval` 中的代码写在一行，就能禁止用户断点，即使添加 `logpoint` 为 `false` 也无用
* 当然即使有些人想到用左下角的格式化代码，将其变成多行也是没用的

```javascript
(() => {
  function ban() {
    setInterval(() => { debugger; }, 50);
  }
  try {
    ban();
  } catch (err) { }
})();
```

**忽略执行的代码**

* 通过添加 `add script ignore list` 需要忽略执行代码行或文件
* 也可以达到禁止无限 `debugger`


**忽略执行代码的对策**

* 那如何针对上面操作的恶意用户呢
* 可以通过将 `debugger`改写成 `Function("debugger")();` 的形式来应对
* `Function` 构造器生成的 `debugger` 会在每一次执行时开启一个临时 `js` 文件
* 当然使用的时候，为了更加的安全，最好使用加密后的脚本

```javascript
// 加密前
(() => {
  function ban() {
    setInterval(() => {
      Function('debugger')();
    }, 50);
  }
  try {
    ban();
  } catch (err) { }
})();

// 加密后
eval(function(c,g,a,b,d,e){d=String;if(!"".replace(/^/,String)){for(;a--;)e[a]=b[a]||a;b=[function(f){return e[f]}];d=function(){return"\w+"};a=1}for(;a--;)b[a]&&(c=c.replace(new RegExp("\b"+d(a)+"\b","g"),b[a]));return c}('(()=>{1 0(){2(()=>{3("4")()},5)}6{0()}7(8){}})();',9,9,"block function setInterval Function debugger 50 try catch err".split(" "),0,{}));
```


**终极增强防调试代码**

* 为了让自己写出来的代码更加的晦涩难懂，需要对上面的代码再优化一下
* 将 `Function('debugger').call()`改成 `(function(){return false;})['constructor']('debugger')['call']();`
* 并且添加条件，当窗口外部宽高和内部宽高的差值大于一定的值 ，我把 `body` 里的内容换成指定内容
* 当然使用的时候，为了更加的安全，最好加密后再使用

```javascript
(() => {
  function block() {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
      document.body.innerHTML = "检测到非法调试,请关闭后刷新重试!";
    }
    setInterval(() => {
      (function () {
        return false;
      }
      ['constructor']('debugger')
      ['call']());
    }, 50);
  }
  try {
    block();
  } catch (err) { }
})();
```

**参考文档**
- https://juejin.cn/post/7262175454714626108
