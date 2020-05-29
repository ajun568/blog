---
title: 'js执行机制'
description: 'Deeruby: js执行机制页面详细讲述了js的执行过程，在宏任务和微任务同时存在时的执行结果。'
date: '2019-11-12'
updated: '2020-05-29'
meta:
- name: keywords
  content: 前端、博客、deeruby、Deeruby、deeruby.com、yijun、yijun's blog、js、js执行机制、单线程、定时器、Promise、setTimeout、setInterval、宏任务、微任务
---

# js执行机制

> 菩提本无树，明镜亦非台；本来无一物，何处惹尘埃

我们一般理解，JavaSciprt是单线程语言，是按照顺序执行的

然而实际代码却往往复杂的多

```js
setTimeout(function(){
    console.log('定时器开始啦')
});

new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});

console.log('代码执行结束');
```

按照顺序执行的概念，我们很容易写出了输出结果

```js
// "定时器开始啦"
// "马上执行for循环啦"
// "执行then函数啦"
// "代码执行结束"
```

但实际运行后发现，与上述结果完全不同

看来是时候要弄明白JavaScript的执行机制了

### 写在前面

JavaScript是一门<strong style="font-size:20px">单线程</strong>语言，所有的多线程都是用单线程模拟的，一切JavaScript多线程都是纸老虎。

那既然是顺序执行的，如果遇到如高清大图加载不出来难道就不加载了吗？当然不是，于是就引出了同步和异步的概念。

当我们打开网站时，网页的渲染过程就是一大堆同步任务，比如页面骨架和页面元素的渲染。而像加载图片音乐之类占用资源大耗时久的任务，就是异步任务。

用一段请求接口的代码去描述同步异步的过程：

```js
let data = [];
$.ajax({
    url:www.javascript.com,
    data:data,
    success:() => {
      console.log('发送成功!');
    }
})
console.log('代码执行结束');
```

描述如下：

- ajax进入Event Table，注册回调函数<span style="color:orange;">success</span>

- 执行<span style="color:orange;">console.log('代码执行结束')</span>

- ajax事件完成，回调函数<span style="color:orange;">success</span>进入Event Queue

- 主线程从Event Queue读取回调函数<span style="color:orange;">success</span>并执行，<span style="color:orange;">console.log('发送成功!')</span>

### setTimeout 和 setInterval

对于定时器，我想我不用介绍大家也都很清楚了把，无非就是下面这个吗，有什么的

```js
setTimeout(() => {
  console.log('延时3秒');
},3000)
console.log('执行console');
```

无非就是执行如下：<span style="color:orange;">console.log('执行console')</span>，3s后执行<span style="color:orange;">console.log('延时3秒')</span>

那如果我们简单修改一下代码呢？

```js
setTimeout(() => {
    task()
},3000)

sleep(10000000)
```

你会发现执行<span style="color:orange;">task()</span>的时间远远超过3s

来看一下执行顺序：

- setTimeout()异步，task()进入Event Table并注册，计时开始

- 执行sleep函数，慢，很慢，非常慢

- 3s到了，task()进入Event Queue，但sleep太慢了，还没有执行完，只能等着

- sleep终于执行完了，task()进入主线程，但时间上已经远远超过3s

补充：setTimeout为0秒的情况：

> 即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。有兴趣的同学可以自行了解。

### Promise与process.nextTick(callback)

在这里，我们对任务有了更细的划分：

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval

- micro-task(微任务)：Promise，process.nextTick

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue

<strong>执行顺序：宏任务 -> 微任务 （其中宏任务执行1个，微任务执行全部，第一次进入整个结构算第一次宏任务，如此反复直到全部执行）</strong>

例子代码：

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

执行过程详解：

第一轮事件循环过程如下：

- 整体script作为第一次宏任务进入主线程，遇到console.log输出<strong style="color:green;">1</strong>

- 遇到setTimeout被分发到宏任务Event Queue中

- 遇到process.nextTick被分发到微任务Event Queue中

- new Promise执行，遇到console.log输出<strong style="color:green;">7</strong>

- .then()被分发到微任务Event Queue中

- 遇到setTimeout被分发到宏任务Event Queue中

- 第一轮宏任务执行完毕，执行微任务列表

| 宏任务Event Queue | 微任务Event Queue |
| :----: | :----: |
| setTimeout1 | process1 |
| setTimeout2 | then1 |

- process.nextTick的微任务，遇到console.log输出<strong style="color:green;">6</strong>

- .then()的微任务，遇到console.log输出<strong style="color:green;">8</strong>

- 第一轮执行结束，输出<strong style="color:green;">1，7，6，8</strong>

第二轮事件循环过程如下：

- 执行宏任务setTimout1，遇到console.log输出<strong style="color:green;">2</strong>

- 遇到process.nextTick被分发到微任务Event Queue中

- new Promise执行，遇到console.log输出<strong style="color:green;">4</strong>

- .then()被分发到微任务Event Queue中

- 第二轮宏任务执行完毕，执行微任务列表

- process.nextTick的微任务，遇到console.log输出<strong style="color:green;">3</strong>

- .then()的微任务，遇到console.log输出<strong style="color:green;">5</strong>

- 第二轮执行结束，输出<strong style="color:green;">2，4，3，5</strong>

第三轮事件循环过程如下：

- 执行宏任务setTimout2，遇到console.log输出<strong style="color:green;">9</strong>

- 遇到process.nextTick被分发到微任务Event Queue中

- new Promise执行，遇到console.log输出<strong style="color:green;">11</strong>

- .then()被分发到微任务Event Queue中

- 第二轮宏任务执行完毕，执行微任务列表

- process.nextTick的微任务，遇到console.log输出<strong style="color:green;">10</strong>

- .then()的微任务，遇到console.log输出<strong style="color:green;">12</strong>

- 第三轮执行结束，输出<strong style="color:green;">9，11，10，12</strong>

总执行顺序：1，7，6，8，2，4，3，5，9，11，10，12

### 写在最后

执行和运行有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的。

牢记：

- javascript是一门单线程语言

- Event Loop是javascript的执行机制

END

[参考链接 --> 这一次，彻底弄懂 JavaScript 执行机制 （原作者：ssssyoki）](https://juejin.im/post/59e85eebf265da430d571f89#heading-4)
