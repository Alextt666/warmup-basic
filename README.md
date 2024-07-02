# Warmup-Basic

复习和查漏补缺一些乱七八糟的小知识

## git

1. commit 不带参数 会进入详情界面描述，:wq 保存并退出
2. git workflow 创建新分支 -》 alex 提交 申请 合并 -》审查-》 打回 -》 修改 -》 再次提交 -》 确认-》 合并

## oop

1. this 指向，context 和 scope。 context 对应 this 执行的上下文，保存变量的位置信息
2. 闭包 -》 外层函数 已经被销毁，但是由于还有 内部执行的函数 或者 事件监听回调 仍然保持 对它上下文中变量的引用，这个引用不会被销毁 会保留

```javascript
// tip1
function outer() {
  const alex = "alex";
  function inner() {
    return `My name is ${alex}`;
  }
  return inner;
}
const innerCall = outer();
```

3. 工厂函数 和 构造函数 ，四个核心要点 ： <strong>封装，抽象，继承，多态</strong> <br>
   封装：解决函数变量和函数分散的问题，将相关内容集中在一起，也便于解耦和复用。
   抽象：是暴露必要的用户接口，隐藏其他具体的实现内容和方式。 有助于消除冗余代码，也避免用户对代码产生影响。当实现方式更新的时候，用户无感知。
   继承：多个不同的子类 可以 不必重复写类似的内容和代码，仅需要继承即可
   多态：不同的子类，可以用自己的方式实现 相同的 接口。

```javascript
// 实现一个circle
// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw() {
      console.log("draw");
    },
  };
}
// Constructor Function
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  };
}
// implement abstraction with closure
function Circle(radius) {
  this.radius = radius;
  // closure;
  // let 声明的部分 产生了闭包，外部无法访问是私有变量
  let defaultLocation = { x: 0, y: 0 };
  let computedLocation = function () {};
  this.draw = function () {
    computedLocation();
    console.log("draw");
  };
  // getter和setter 增加一个 内部定义的属性
  Object.defineProperty(this, "defaultLocation", {
    get: function () {
      return defaultLocation;
    },
    set: function (newValue) {
      if (!newValue.x || !newValue.y) throw new Error("Invalid location.");
      defaultLocation = newValue;
    },
  });
}
```

### tips:

OOP 相关练习 进入 vanilla/warmup-oop

## 原型 & 原型链

### 构造函数

构造函数（会创建一个对象）
=》 构造函数内部 会有一个 prototype 属性
=》 属性值 是一个对象
=》 这个对象包含了共享的属性和方法

使用构造函数创建的对象实例，内部存在一个指针(大多数浏览器实现为**proto**) =》 指向 构造函数 prototype 属性的对应值

### 链式获取属性：

用户获取对象的属性 =》 对象内部本身是否包含这个属性
=》 顺着指针去原型对象中查找
=》 继续顺着原型对象的指针向上查找 一直到 null

## Object.defineProperty vs Proxy

### ODP

Object.defineProperty 是对象用来修改或者新增属性而使用的，也可以用作代理

```javascript
const obj = {};
Object.defineProperty(obj, "name", {
  value: "alex",
});
// value 属性值
// configurable 和 writable 值是否可以被修改，
// get/set =》 读取/修改
// enumerable 能否枚举
// =》 均为属性代理
```

### Proxy

Proxy：专门作为代理使用

```javascript
const obj = {};
const proxyObj = new Proxy(obg, {
  get(target, prop, receiver) {},
  // set
  // delete
});
```

### 区别

1. 颗粒度不同
   Object.defineProperty 代理为 对象的某个具体属性（例如 vue2 新添加的属性值 无法监听 除非主动设置 set；
   Proxy 代理的就是对象
   （tips:对于嵌套的对象，二者都需要进行递归的代理）
2. 对于原对象
   ODP 是对原对象的修改
   proxy 仅是一层代理包裹
3. 兼容性
   ODP 比 proxy 更好

## 性能优化

### 编译层面

使用 webpack & vite，升级版本，添加插件

- 压缩，分包
- 缓存
- 摇树瘦身
- 区分开发模式

### 部署层面

- link 的 prefech

静态资源

- CDN
- SSR

### 框架 & 代码

- 框架升级
- 防止内存泄漏
- 清理闭包、定时器
- 添加防抖节流，节省内存开销 & 网络带宽

#### TIPS：

防抖和节流，区别之我见：
防抖：
注重满足单位时间 delay 的前提下，最后一次的结果，假设 0.5 s 等待 没有额外输入 即这个算最后一次请求，执行这个请求，其他多少次请求全部抛弃，注重最后一次这个概念
节流
注重 满足单位时间 delay，要满足时间，注重时间这个概念，未达到时间条件的全部抛弃，达到时间的请求执行。1s 内 点击多少次都被忽略，满足 1s 时间的时候，进入的请求触发

```javascript
// debounce
function debounce(fn, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

  // throttle
  function throttle(fn,delay){
     let prevTime = Date.now();
     return function(){
        let curTime = Date.now();
        if(curTime - prevTime > delay){
            fn.apply(this,arguments);
            prevTime = curTime;
        }
     }
  }
```
