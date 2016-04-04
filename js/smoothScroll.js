var smoothScroll = function(selector, duration, offset) {
  
  // set default values for duration and offset if not present
  duration = duration || 1000;
  offset = offset || 0;
  
  var target = document.querySelector(selector),
      targetOffset = getOffset(),
      startingScrollTop = window.pageYOffset || document.documentElement.scrollTop,
      startingScrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollDistance = targetOffset.top - startingScrollTop + offset,
  
      startTime = new Date().getTime(),
      endTime = startTime + duration,
      currentTime,
      scrollPos,
      point;
  
  var timer = setInterval(function() {
    point = smoothStep(startTime, endTime, new Date().getTime());
    scrollPos = Math.round(startingScrollTop + (point * scrollDistance));
    
    window.scrollTo(startingScrollLeft, scrollPos);
    
    if (point >= 1) {
      clearTimeout(timer);
    }
  }, 16);
  
  function smoothStep(start, end, point) {
    if (point <= start) { return 0; }
    if (point >= end) { return 1; }
    var x = (point - start) / (end - start); // interpolation
    return x * x * (3 - 2 * x);
  }
  
  function getOffset() {
    var x = target.offsetLeft,
        y = target.offsetTop,
        currentNode = target;
    
    while (currentNode.offsetParent && currentNode.offsetParent !== document.body) {
      currentNode = currentNode.offsetParent;
      x += currentNode.offsetLeft;
      y += currentNode.offsetTop;
    }
    
    return {
      left: x,
      top: y
    };
  }
};
