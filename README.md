# Warmup-Basic

复习和查漏补缺一些乱七八糟的小知识

[toc]

## git

### git 操作相关
1. commit 不带参数 会进入详情界面描述，:wq 保存并退出
2. git workflow 创建新分支 -》 alex 提交 申请 合并 -》审查-》 打回 -》 修改 -》 再次提交 -》 确认-》 合并
 
### git 撤销 
git pull 包含 git fetch 和 git merge 两个操作。
git revert 生成一个新的提交 来撤回指定提交
git reset --hard 删除提交到指定hash位置

### git 合并 
基本概念
git merge：
git merge是将一个分支的修改合并到另一个分支。它会创建一个新的合并提交，让分支历史记录能够清晰地显示合并操作的发生。例如，有一个develop分支和一个feature分支，当你想把feature分支的内容合并到develop分支时，使用git merge会在develop分支上创建一个新的合并提交，使得develop分支的历史包含了feature分支的修改。
git rebase：
git rebase是一种变基操作。它的目的是将一个分支的提交 “移动” 到另一个分支的最新提交之后，使得提交历史看起来像是在一条直线上进行的开发，而不是像git merge那样产生分支合并的节点。例如，同样对于develop分支和feature分支，使用git rebase可以把feature分支的提交重新排列，让它们看起来像是在develop分支的最新提交之后依次完成的。
操作后的历史记录呈现
git merge：
假设初始有main分支和feature分支，feature分支基于main分支的某个提交点A创建，然后在feature分支上有两个提交B和C。当使用git merge将feature分支合并到main分支时，main分支的历史记录会新增一个合并提交M，历史看起来像这样：A - M（包含B和C的合并）。可以看到，合并后会出现一个新的节点，表示两个分支的合并。
git rebase：
还是上述的情况，当使用git rebase将feature分支变基到main分支时，feature分支的提交B和C会被 “复制” 并 “移动” 到main分支的最新提交之后，历史记录看起来像这样：A - B' - C'（原来的B和C变基后）。这里B'和C'是原来B和C提交的副本，经过变基操作后重新排列在main分支的最新提交之后，没有像merge那样产生新的合并节点，使得提交历史更线性。
合并冲突处理方式
git merge：
当git merge过程中出现冲突时，Git 会在工作目录中标记出冲突的文件，需要手动解决这些冲突。例如，两个分支修改了同一个文件的同一行，合并时 Git 会在文件中显示类似<<<<<<< HEAD、=======和>>>>>>> feature - branch的标记，你需要编辑文件来决定保留哪些内容，然后将修改后的文件添加到暂存区（使用git add），最后完成合并提交（使用git commit）。
git rebase：
在git rebase过程中出现冲突时，处理方式稍有不同。同样会在文件中标记冲突，但你需要在解决冲突后使用git rebase --continue来继续变基操作。例如，在变基过程中遇到冲突，先解决文件中的冲突，然后添加修改后的文件到暂存区，最后执行git rebase --continue，它会继续处理下一个提交，直到所有提交都完成变基。
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
- 清理全局变量
- 添加防抖节流，节省内存开销 & 网络带宽
- 防恶化 监控 => 性能监控

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
## Vue 
### 响应式原理 

将数据和DOM更新绑定，在数据变更的时候自动执行DOM的更新操作。 
实现过程：  
1. 需要Effect副作用函数
2. reactive 使用proxy和reflect进行劫持
3. 劫持后，当数据变更的时候 触发 effect
4. 深层次的对象，递归 

数据结构 需要 一个 weakmap -> target , map -> name, set -> key , effect 

具体实现 看目录  vue/response-data

### computed原理 

computed接受两种方式 
1. 对象，分别传入 getter setter
2. 函数，会自动获取这个函数内 响应式数据 
匹配下是哪种模式 
如果是对象模式 就把getter setter 挂载
如果是函数模式 设置为只读  

内部保存了一个脏值判断，初始为true。
如果是true 走一遍执行，计算结果并缓存 ， 将脏值改为false
在effect副作用函数进行绑定的时候，同时传入了一个调度器，这个调度器包含了dirty的控制。并在 trigger 触发 effect的时候 执行 
这个时候 脏值就会 变为 true， 再次进入computed逻辑 会执行 重新计算。
computed 一般用作返回一个缓存结果 （比如派生值的计算总价 总分等等 ）

### watch & watchEffect

watch 和 computed 不同。 watch 相当于 添加了一个 Effect 副作用函数 ，当这个值 被触发的时候 ，会自动 执行 对应的 effect。 
传递的参数 控制 执行effect的时机。  immediate 和 deep 和 flush。
watch一般用作观测，当数据变化的时候 执行一些其他的操作（异步请求 搜索结果等等）。 

### nextTick
先介绍下写法 

```javascript
// 回调函数的写法 
nextTick(()=> dosomething )
// 直接async await
const send = async ()=>{
  // ...执行一些操作
  await nextTick();
  // ...剩下的操作 
  // await后面的所有代码 都是异步的了 
}

```

nextTick的原理 & 源码 其实就是将我们传入的回调放进了一个promise。 这样就会和组件一样进行异步更新