// 这里判断手势是左滑还是右滑
var bindSwipeEvent = function (dom, leftCallback, rightCallback) {
  var isMove = false; // 判断是否存在滑动行为
  var startx = 0;
  var distance = 0;
  dom.addEventListener("touchstart", function (e) {
    startx = e.touches[0].clientX;
  });
  dom.addEventListener("touchmove", function (e) {
    isMove = true;
    var movex = e.touches[0].clientX;
    distance = movex - startx;
  });
  dom.addEventListener("touchend", function () {
    // 判断条件：  发生了滑动行为，滑动距离超过50px
    if (isMove == true && Math.abs(distance) > 100) {
      console.log(distance, 'distance');
      if (distance > 100) {
        leftCallback && leftCallback(this);
      } else {
        rightCallback && rightCallback(this);
      }
    }
  });
};
var pageScroll = function (dom, bottomFlag, callback) {
  if (!dom.children[0]) return
  const _dom = dom.children[0]
  const h = _dom.scrollHeight
  dom.onscroll = function (ev) {
    if (h - ev.target.scrollTop - dom.clientHeight < bottomFlag) {
      shake(callback)
    }
  }
}
const shake = (function () {
  let time = null
  return function (callback) {
    if (time) clearTimeout(time)
    time = setTimeout(function () {
      callback()
    }, 500)
  }
})()
export { bindSwipeEvent, pageScroll };
