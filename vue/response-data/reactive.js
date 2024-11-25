import { track, trigger } from "./effect.js";
const isObjecgt = (target)=> target !=null && typeof target == 'object';
export const reactive = (target) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver);
      track(target, key);
      if(isObjecgt(res)){
        return reactive(res)
      }
      return res;
    },
    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });
};
