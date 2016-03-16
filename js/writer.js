var Queue = function() {
  this.running = false;
  this.tasks = [];
};

Queue.prototype.add = function(fn) {
  this.tasks.push(fn);
  return this;
};

Queue.prototype.start = function() {
  if (this.tasks.length > 0) {
    this.next();
  }
  return this;
};

Queue.prototype.next = function() {
  this.tasks.shift().apply(this);
  return this;
};

var Writer = function(selector, options) {
  this.element = document.querySelector(selector);
  this.typeSpeed = 75;
  
  this.queue = [];
  
  var _this = this;
  
  function type(text) {
    var i = 0,
        textArray = text.split(''),
        l = textArray.length,
        typeHandler = function() {
          _this.element.innerHTML += textArray[i];
          i++;
          if (i === l) {
            advanceQueue();
          } else {
            typeLoop();
          }
        },
        typeLoop = function() {
          setTimeout(typeHandler, _this.typeSpeed);
        };
        
    typeLoop();
  }
  
  function backspace(times) {
    var i = 0,
        backspaceHandler = function() {
          _this.element.innerHTML = _this.element.innerHTML.substring(0, _this.element.innerHTML.length - 1);
          i++;
          if (i === times) {
            advanceQueue();
          } else {
            backspaceLoop();
          }
        },
        backspaceLoop = function() {
          setTimeout(backspaceHandler, _this.typeSpeed);
        };
    backspaceLoop();
  }
  
  function wait(time) {
    setTimeout(advanceQueue, time);
  }
  
  function addToQueue(fn, params) {
    _this.queue.push(function() {
      fn.apply(_this, [params]);
    });
    if (_this.queue.length === 1) {
      _this.queue[0]();
    }
  }
  
  function advanceQueue() {
    _this.queue.shift();
    if (_this.queue.length > 0) {
      _this.queue[0]();
    }
  }
  
  this.type = function(text) {
    addToQueue(type, text);
    return this;
  };
  
  this.backspace = function(times) {
    addToQueue(backspace, times);
    return this;
  };
  
  this.wait = function(time) {
    addToQueue(wait, time);
    return this;
  };
};
