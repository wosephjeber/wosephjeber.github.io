function triggerEvent(element, eventName) {
  var e = document.createEvent('Event');
  e.initEvent(eventName, true, true);
  element.dispatchEvent(e);
}

var Queue = function() {
  this.running = false;
  this.tasks = [];
};

Queue.prototype.add = function(fn) {
  this.tasks.push(fn);
  return this;
};

Queue.prototype.start = function() {
  var _this = this;
  if (this.tasks.length > 0) {
    this.running = true;
    
    window.addEventListener('queueStepComplete', function(e) {
      _this.next();
    });
    
    this.next();
  }
  return this;
};

Queue.prototype.next = function() {
  if (this.tasks.length > 0) {
    this.tasks.shift().apply(this);
  }
  return this;
};

Queue.prototype.wait = function(time) {
  setTimeout(function(){
    triggerEvent(window, 'queueStepComplete');
  }, time);
  return this;
};

var FakeInput = function(selector, options) {
  this.element = document.querySelector(selector);
  this.typeSpeed = 60;
  this.queue = new Queue();
  
  var _this = this;
  
  this.focus = function() {
    this.element.classList.add('focus');
    return this;
  };
  
  this.blur = function() {
    this.element.classList.remove('focus');
    return this;
  };
  
  this.type = function(text) {
    var _this = this;
    var i = 0,
        textArray = text.split(''),
        l = textArray.length,
        typeHandler = function() {
          _this.element.querySelector('.type-me').innerHTML += textArray[i];
          i++;
          if (i === l) {
            triggerEvent(window, 'queueStepComplete');
          } else {
            typeLoop();
          }
        },
        typeLoop = function() {
          setTimeout(typeHandler, _this.typeSpeed);
        };
        
    typeLoop();
    
    return this;
  };
  
  this.backspace = function(times) {
    var i = 0,
        backspaceHandler = function() {
          _this.element.querySelector('.type-me').innerHTML = _this.element.querySelector('.type-me').innerHTML.substring(0, _this.element.querySelector('.type-me').innerHTML.length - 1);
          i++;
          if (i === times) {
            triggerEvent(window, 'queueStepComplete');
          } else {
            backspaceLoop();
          }
        },
        backspaceLoop = function() {
          setTimeout(backspaceHandler, _this.typeSpeed);
        };
    backspaceLoop();
    
    return this;
  };
};
