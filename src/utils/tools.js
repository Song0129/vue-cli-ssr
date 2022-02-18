/**
 * 基本方法
 * */

class createTools {
  /**
   * @desc 防抖函数  处理频繁触发事件问题
   * @func 需处理的函数 function
   * @wait 等待时长  默认50ms  number
   * @immediate 是否可以立即执行  boolean
   * @author: Joshua 2020/7/21
   */
  debounce(func, wait= 50, immediate) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        let callNow = !timeout;
        timeout = setTimeout(function(){
          timeout = null;
        }, wait)
        if (callNow) func.apply(context, args);
      }
      else {
        timeout = setTimeout(function(){
          func.apply(context, args);
        }, wait);
      }
    }
  }
}

const Tools = new createTools();
export default Tools
