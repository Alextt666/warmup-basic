# warmup-basic
复习和查漏补缺一些乱七八糟的小知识

### git
1. commit不带参数 会进入详情界面描述，:wq保存并退出
2. git workflow 创建新分支 -》 alex 提交 申请 合并 -》审查-》 打回 -》 修改 -》 再次提交 -》 确认-》 合并

### oop
1. this指向，context 和 scope。 context 对应 this 执行的上下文，保存变量的位置信息 
2. 闭包 -》 外层函数 已经被销毁，但是由于还有 内部执行的函数 或者 事件监听回调 仍然保持 对它上下文中变量的引用，这个引用不会被销毁 会保留
```javascript
// tip1 
function outer (){
    const alex = 'alex';
    function inner(){
        return `My name is ${alex}`;
    };
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
function createCircle (radius){
    return {
        radius,
        draw(){
            console.log('draw')
        }
    }
}
// Constructor Function
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}
// implement abstraction with closure
function Circle(radius){
    this.radius = radius;
    // closure;
    // let 声明的部分 产生了闭包，外部无法访问是私有变量 
    let defaultLocation = {x:0,y:0};
    let computedLocation = function(){

    }
    this.draw = function(){
        computedLocation();
        console.log('draw')
    }
    // getter和setter 增加一个 内部定义的属性
    Object.defineProperty(this,'defaultLocation',{
        get:function(){
            return defaultLocation
        },
        set:function(newValue){
            if(!newValue.x || !newValue.y)
            throw new Error('Invalid location.');
            defaultLocation = newValue;
        }
    })
}

```
### tips:
OOP 相关练习 进入 vanilla/warmup-oop
