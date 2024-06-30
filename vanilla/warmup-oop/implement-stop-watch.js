/* 实现一个钟表的构造函数 */
/**
 * stop
 * start
 * duration
 * reset
 */

// start开始计时 stop停止计时，
// start 和 stop 执行中重复调用报错
// duration显示 执行时间
// reset重置时间
// 尝试构造函数和class两种实现方式

// constructor function
function SW() {
  let startTime = { time: 0, flag: false };
  let stopTime = { time: 0, flag: false };
  let duration = 0;
  this.start = function () {
    // 开启过
    if (startTime.flag) {
      if (!stopTime.flag) {
        throw new Error("Already start");
      } else {
        stopTime.flag = false;
      }
    }
    startTime.time = performance.now();
    startTime.flag = true;
  };
  this.stop = function () {
    if (stopTime.flag) {
      throw new Error("Already stop");
    }
    stopTime.time = performance.now();
    stopTime.flag = true;
    duration = stopTime.time - startTime.time + duration;
  };
  this.duration = function () {
    return `${duration}ms`;
  };
  this.reset = function () {
    startTime = { time: 0, flag: false };
    stopTime = { time: 0, flag: false };
    duration = 0;
  };
}

// 改造版本
function Csw() {
  let startTime,
    stopTime,
    running,
    duration = 0;
  this.start = function () {
    if (running) {
      throw new Error("already start");
    } else {
      startTime = performance.now();
      running = 1;
    }
  };
  this.stop = function () {
    if (!running) {
      throw new Error("already stop");
    } else {
      stopTime = performance.now();
      duration = stopTime - startTime + duration;
      running = 0;
    }
  };
  this.reset = function () {
    stopTime = 0;
    startTime = 0;
    duration = 0;
  };
  Object.defineProperty(this, "duration", {
    get: function () {
      return duration;
    },
  });
}

// const sw = new Csw();
// class 版本
class CCsw {
  #startTime = 0;
  #stopTime = 0;
  #duration = 0;
  #running = 0;
  start() {
    if (this.#running) {
      throw new Error("already start");
    } else {
      this.#startTime = performance.now();
      this.#running = 1;
    }
  }
  stop() {
    if (!this.#running) {
      throw new Error("already stop");
    } else {
      this.#stopTime = performance.now();
      this.#duration = this.#stopTime - this.#startTime + this.#duration;
      this.#running = 0;
    }
  }
  reset() {
    this.#stopTime = 0;
    this.#startTime = 0;
    this.#duration = 0;
  }
  get duration() {
    return this.#duration;
  }
}

const sw = new CCsw();
