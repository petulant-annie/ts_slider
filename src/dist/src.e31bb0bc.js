// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../assets/icons/icons-arrow.png":[function(require,module,exports) {
module.exports = "/icons-arrow.af376abf.png";
},{}],"index.js":[function(require,module,exports) {
var Slider =
/** @class */
function () {
  function Slider(options) {
    this.element = options.element || document.getElementById('slider');
    this.slide = this.element.getElementsByTagName('div'); // img container

    this.controlBar = document.createElement('p'); // control bar for dots

    this.speed = options.speed || 3000;
    this.controls = options.controls || true;
    this.pager = options.pager || true;
    this.pause = options.pause || false;
    this.melt = options.melt || true;
    this.dotAppear = options.dotAppear || false;
    this.slideshow = options.slideshow || false;
    this.radioBtn = this.controlBar.getElementsByTagName('button');
    this.btnPrev = document.createElement('img');
    this.btnNext = document.createElement('img');
    this.current = 0;
  }

  Slider.prototype.createPager = function () {
    this.controlBar = document.createElement('p');

    for (var i = 0; i < this.slide.length; i += 1) {
      var button = document.createElement('button');
      button.className = 'button';
      this.controlBar.append(button);
    }

    this.element.append(this.controlBar);
    this.controlBar.className = 'controlBar';
    this.radioBtn = this.controlBar.getElementsByTagName('button');
    this.showSlide();
  };

  Slider.prototype.createArrows = function () {
    this.btnPrev.src = require('../assets/icons/icons-arrow.png');
    this.btnNext.src = require('../assets/icons/icons-arrow.png');
    this.btnPrev.className = 'prevBtn';
    this.btnNext.className = 'nextBtn';
    this.element.append(this.btnPrev);
    this.element.append(this.btnNext);
  };

  Slider.prototype.hideSlides = function () {
    for (var i = 0; i < this.slide.length; i += 1) {
      this.slide[i].className = 'slide';
    }
  };

  Slider.prototype.showSlide = function () {
    this.slide[this.current].className = 'active';
    this.element.style.width = this.slide[this.current].firstChild.width + 10 + "px";
  };

  Slider.prototype.fillActiveButton = function () {
    for (var i = 0; i < this.slide.length; i += 1) {
      if (this.slide[i].classList.contains('active')) {
        this.radioBtn[i].style.backgroundColor = '#FFF';
      } else {
        this.radioBtn[i].style.backgroundColor = '#000';
      }
    }
  };

  Slider.prototype.changeSlide = function () {
    this.hideSlides();
    this.showSlide();
    this.fillActiveButton();
  };

  Slider.prototype.moveForward = function () {
    this.current += 1;

    if (this.current === this.slide.length) {
      this.current = 0;
      this.changeSlide();
      if (this.melt) this.doMeltForward();
      if (this.slideshow) this.doSlideshowForward();
      if (this.dotAppear) this.dotAppearSlide();
    } else {
      this.changeSlide();
      if (this.melt) this.doMeltForward();
      if (this.slideshow) this.doSlideshowForward();
      if (this.dotAppear) this.dotAppearSlide();
    }
  };

  Slider.prototype.moveBackward = function () {
    this.current -= 1;

    if (this.current < 0) {
      this.current = this.slide.length - 1;
      this.changeSlide();
      if (this.melt) this.doMeltBackward();
      if (this.slideshow) this.doSlideshowBackward();
      if (this.dotAppear) this.dotAppearSlide();
    } else {
      this.changeSlide();
      if (this.melt) this.doMeltBackward();
      if (this.slideshow) this.doSlideshowBackward();
      if (this.dotAppear) this.dotAppearSlide();
    }
  };

  Slider.prototype.addArrowsListener = function () {
    var _this = this;

    this.btnNext.addEventListener('click', function () {
      _this.moveForward();
    });
    this.btnNext.addEventListener('mouseenter', function () {
      if (!_this.pause) {
        clearInterval(_this.autoplayID);
      }
    });
    this.btnNext.addEventListener('mouseleave', function () {
      if (!_this.pause) {
        _this.autoplay();
      }
    });
    this.btnPrev.addEventListener('click', function () {
      _this.moveBackward();
    });
    this.btnPrev.addEventListener('mouseenter', function () {
      if (!_this.pause) {
        clearInterval(_this.autoplayID);
      }
    });
    this.btnPrev.addEventListener('mouseleave', function () {
      if (!_this.pause) {
        _this.autoplay();
      }
    });
  };

  Slider.prototype.addPagerListener = function () {
    var _this = this;

    var _loop_1 = function _loop_1(i) {
      this_1.radioBtn[i].addEventListener('click', function () {
        _this.current = i;

        _this.changeSlide();
      });
    };

    var this_1 = this;

    for (var i = 0; i < this.radioBtn.length; i += 1) {
      _loop_1(i);
    }

    this.controlBar.addEventListener('mouseenter', function () {
      if (!_this.pause) {
        clearInterval(_this.autoplayID);
      }
    });
    this.controlBar.addEventListener('mouseleave', function () {
      if (!_this.pause) {
        _this.autoplay();
      }
    });
  };

  Slider.prototype.addTouchListener = function () {
    var _this = this;

    var startPoint;
    var finalPoint;
    this.element.addEventListener('touchstart', function (event) {
      startPoint = event.changedTouches[0];
    }, false);
    this.element.addEventListener('touchend', function (event) {
      finalPoint = event.changedTouches[0];
      var xAbs = Math.abs(startPoint.pageX - finalPoint.pageX);
      var yAbs = Math.abs(startPoint.pageY - finalPoint.pageY);

      if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
          clearInterval(_this.autoplayID);

          if (finalPoint.pageX < startPoint.pageX) {
            _this.moveForward();
          } else {
            _this.moveBackward();
          }

          if (!_this.pause) _this.autoplay();
        }
      }
    }, false);
  }; // Animations


  Slider.prototype.autoplay = function () {
    var _this = this;

    this.autoplayID = setInterval(function () {
      return _this.moveForward();
    }, this.speed);
  };

  Slider.prototype.doMeltForward = function () {
    this.slide[this.current].classList.add('melt-current');
    this.slide[this.current - 1 < 0 ? this.slide.length - 1 : this.current - 1].classList.add('melt-previous');
  };

  Slider.prototype.doMeltBackward = function () {
    this.slide[this.current].classList.add('melt-current');
    this.slide[this.current + 1 < this.slide.length ? this.current + 1 : 0].classList.add('melt-previous');
  };

  Slider.prototype.doSlideshowForward = function () {
    this.slide[this.current].classList.add('slideshow-current', 'slide-in-from-right');
    this.slide[this.current - 1 < 0 ? this.slide.length - 1 : this.current - 1].classList.add('slideshow-previous', 'slide-out-to-left');
  };

  Slider.prototype.doSlideshowBackward = function () {
    this.slide[this.current].classList.add('slideshow-current', 'slide-in-from-left');
    this.slide[this.current + 1 < this.slide.length ? this.current + 1 : 0].classList.add('slideshow-previous', 'slide-out-to-right');
  };

  Slider.prototype.dotAppearSlide = function () {
    this.slide[this.current].classList.add('dot-current');
  };

  Slider.prototype.init = function () {
    this.hideSlides();
    this.showSlide();
    this.addTouchListener();

    if (this.controls) {
      this.createArrows();
      this.addArrowsListener();
    }

    if (this.pager) {
      this.createPager();
      this.fillActiveButton();
      this.addPagerListener();
    }

    if (!this.pause) {
      this.autoplay();
    }
  };

  return Slider;
}();

var slider = new Slider({
  element: document.getElementById('slider'),
  speed: 3000,
  controls: true,
  pager: true,
  pause: false,
  melt: true,
  dotAppear: false,
  slideshow: false
});
slider.init();
},{"../assets/icons/icons-arrow.png":"../assets/icons/icons-arrow.png"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49865" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map