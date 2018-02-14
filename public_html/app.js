/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(1);

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _manager2.default(); // import MainLoop from 'mainloop.js';


document.querySelector('.blinkButton').addEventListener('mousedown', function () {
  return game.blink();
});
document.querySelector('.jumpButton').addEventListener('mousedown', function () {
  return game.jump();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hero = __webpack_require__(3);

var _hero2 = _interopRequireDefault(_hero);

var _ball = __webpack_require__(4);

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameManager = function () {
  function GameManager() {
    _classCallCheck(this, GameManager);

    this.images = {};
    this.fps = 30;
    this.drawing = false;
    this.numFramesDrawn = 0;
    this.curFPS = 0;
    this.level = 1;
    this.maxLevel = 10;
    this.speed = 15;
    this.curLoadResNum = 0;
    this.totalLoadResources = 9;
    this.displayList = [];

    this.prepareCanvas();
  }

  _createClass(GameManager, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.frameInterval = setInterval(function () {
        return _this.update();
      }, 1000 / this.fps);
      this.fpsInterval = setInterval(function () {
        return _this.updateFPS();
      }, 1000);
    }
  }, {
    key: 'resourceLoaded',
    value: function resourceLoaded() {
      this.curLoadResNum += 1;
      if (this.curLoadResNum === this.totalLoadResources) {
        this.start();
      }
    }
  }, {
    key: 'loadImage',
    value: function loadImage(name) {
      var _this2 = this;

      this.images[name] = new Image();
      this.images[name].onload = function () {
        return _this2.resourceLoaded();
      };
      this.images[name].src = 'images/' + name + '.png';
    }
  }, {
    key: 'prepareCanvas',
    value: function prepareCanvas() {
      this.canvas = global.document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      this.context.font = 'bold 32px "Reenie Beanie"';
      try {
        this.context.fillText('loading...', 40, 140);
      } catch (ex) {}

      // Load images
      this.loadImage('leftArm');
      this.loadImage('legs');
      this.loadImage('torso');
      this.loadImage('rightArm');
      this.loadImage('head');
      this.loadImage('hair');
      this.loadImage('leftArm-jump');
      this.loadImage('legs-jump');
      this.loadImage('rightArm-jump');

      // background = new Background();
      // displayList.push(background);

      this.hero = new _hero2.default(this.context, this.images);
      this.hero.setX(200);
      this.hero.setY(185);
      this.displayList.push(this.hero);

      this.ball = new _ball2.default(this.context);
      this.ball.setX(this.canvas.width);
      this.ball.setY(200);
      this.ball.roll(this.speed, -1);
      this.displayList.push(this.ball);
    }
  }, {
    key: 'clearCanvas',
    value: function clearCanvas() {
      this.canvas.width = this.canvas.width;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.numFramesDrawn += 1;

      if (this.level < this.maxLevel) {
        if (this.ball.getX() < 0) {
          this.speed += 2;
          this.level += 1;

          if (this.level > this.maxLevel) {
            this.ball.stop();
            this.ball.setX(2000);
          } else {
            this.ball.stop();
            this.ball.setX(this.canvas.width + 20);
            setTimeout(function () {
              return _this3.throwBall();
            }, Math.random() * 3000);
          }
        } else if (this.ball.getX() > this.canvas.width + 30) {
          this.ball.roll(this.speed, -1);
        } else if (this.ball.getX() > this.hero.getX() && this.ball.getX() < this.hero.getX() + 110 && !this.hero.getJumping()) {
          this.ball.roll(this.speed * 2, 1);
        }
      } else {
        this.ball.stop();
        this.ball.setX(2000);
      }

      this.redraw();
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.clearCanvas();

      for (var i = 0; i < this.displayList.length; i += 1) {
        this.displayList[i].draw();
      }

      this.context.fillStyle = '#000000';
      this.context.font = 'bold 12px sans-serif';
      this.context.fillText('fps: ' + this.curFPS + '/' + this.fps + ' (' + this.numFramesDrawn + ')', 40, 200);

      this.context.font = 'bold 32px "Reenie Beanie"';
      try {
        if (this.level < this.maxLevel) {
          this.context.fillText('Level: ' + this.level + ' of ' + this.maxLevel, 300, 40);
        } else {
          this.context.fillText('You Win!', 300, 100);
        }
      } catch (ex) {}
    }
  }, {
    key: 'updateFPS',
    value: function updateFPS() {
      this.curFPS = this.numFramesDrawn;
      this.numFramesDrawn = 0;
    }
  }, {
    key: 'jump',
    value: function jump() {
      this.hero.jump();
    }
  }, {
    key: 'blink',
    value: function blink() {
      this.hero.blink();
    }
  }, {
    key: 'throwBall',
    value: function throwBall() {
      this.ball.roll(this.speed, -1);
    }
  }]);

  return GameManager;
}();

exports.default = GameManager;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hero = function () {
  function Hero(context, images) {
    var _this = this;

    _classCallCheck(this, Hero);

    this.context = context;
    this.images = images;
    this.x = 400;
    this.y = 0;
    this.jumping = false;
    this.blinking = false;
    this.blinkUpdateTime = 100;
    this.blinkTimer = setInterval(function () {
      return _this.updateBlink();
    }, this.blinkUpdateTime);
    this.breathTimer = setInterval(function () {
      return _this.updateBreath();
    }, 1000 / 25);
    this.breathInc = 0.1;
    this.breathDir = 1;
    this.breathAmt = 0;
    this.breathMax = 2;
    this.eyeOpenTime = 0;
    this.timeBtwBlinks = 4000;
    this.maxEyeHeight = 14;
    this.curEyeHeight = this.maxEyeHeight;
  }

  _createClass(Hero, [{
    key: 'updateBreath',
    value: function updateBreath() {
      // breath in
      if (this.breathDir === 1) {
        this.breathAmt -= this.breathInc;
        if (this.breathAmt < -this.breathMax) {
          this.breathDir = -1;
        }
      } else {
        // breath out
        this.breathAmt += this.breathInc;
        if (this.breathAmt > this.breathMax) {
          this.breathDir = 1;
        }
      }
    }
  }, {
    key: 'updateBlink',
    value: function updateBlink() {
      this.eyeOpenTime += this.blinkUpdateTime;
      if (this.eyeOpenTime >= this.timeBtwBlinks) {
        this.blink();
      }
    }
  }, {
    key: 'blink',
    value: function blink() {
      if (this.blinking === false) {
        this.blinking = true;
        this.blinkLoop();
      }
    }
  }, {
    key: 'blinkLoop',
    value: function blinkLoop() {
      var _this2 = this;

      this.curEyeHeight -= 1;
      if (this.curEyeHeight <= 0) {
        this.curEyeHeight = this.maxEyeHeight;
        this.eyeOpenTime = 0;
        this.blinking = false;
      } else {
        setTimeout(function () {
          return _this2.blinkLoop();
        }, 10);
      }
    }
  }, {
    key: 'jump',
    value: function jump() {
      var _this3 = this;

      if (this.jumping === false) {
        this.jumping = true;
        this.y -= 45;
        setTimeout(function () {
          return _this3.land();
        }, 500);
      }
    }
  }, {
    key: 'land',
    value: function land() {
      if (this.jumping === true) {
        this.y += 45;
        this.jumping = false;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.drawShadow(this.x + 40, this.jumping ? this.y + 29 + 45 : this.y + 29);

      if (this.jumping) {
        this.context.drawImage(this.images['leftArm-jump'], this.x + 40, this.y - 42 - this.breathAmt);
        this.context.drawImage(this.images['legs-jump'], this.x, this.y - 6);
      } else {
        this.context.drawImage(this.images.leftArm, this.x + 40, this.y - 42 - this.breathAmt);
        this.context.drawImage(this.images.legs, this.x, this.y);
      }

      this.context.drawImage(this.images.torso, this.x, this.y - 50);
      this.context.drawImage(this.images.head, this.x - 10, this.y - 125 - this.breathAmt);
      this.context.drawImage(this.images.hair, this.x - 37, this.y - 138 - this.breathAmt);

      if (this.jumping) {
        this.context.drawImage(this.images['rightArm-jump'], this.x - 35, this.y - 42 - this.breathAmt);
      } else {
        this.context.drawImage(this.images.rightArm, this.x - 15, this.y - 42 - this.breathAmt);
      }

      this.drawEye(this.x + 47, this.y - 68 - this.breathAmt);
      this.drawEye(this.x + 58, this.y - 68 - this.breathAmt);
    }
  }, {
    key: 'drawEye',
    value: function drawEye(centerX, centerY) {
      var height = this.curEyeHeight;
      var width = 8;

      this.context.beginPath();
      this.context.moveTo(centerX, centerY - height / 2);

      this.context.bezierCurveTo(centerX - width / 2, centerY - height / 2, centerX - width / 2, centerY + height / 2, centerX, centerY + height / 2);

      this.context.bezierCurveTo(centerX + width / 2, centerY + height / 2, centerX + width / 2, centerY - height / 2, centerX, centerY - height / 2);

      this.context.fillStyle = '#000000';
      this.context.fill();
      this.context.closePath();
    }
  }, {
    key: 'drawShadow',
    value: function drawShadow(centerX, centerY) {
      var height = this.jumping ? 4 : 6;
      var width = this.jumping ? 100 : 160 - this.breathAmt * 2;

      this.context.beginPath();
      this.context.moveTo(centerX, centerY - height / 2);

      this.context.bezierCurveTo(centerX - width / 2, centerY - height / 2, centerX - width / 2, centerY + height / 2, centerX, centerY + height / 2);

      this.context.bezierCurveTo(centerX + width / 2, centerY + height / 2, centerX + width / 2, centerY - height / 2, centerX, centerY - height / 2);

      this.context.fillStyle = '#000000';
      this.context.fill();
      this.context.closePath();
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'setX',
    value: function setX(pX) {
      this.x = pX;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'setY',
    value: function setY(pY) {
      this.y = pY;
    }
  }, {
    key: 'getJumping',
    value: function getJumping() {
      return this.jumping;
    }
  }]);

  return Hero;
}();

exports.default = Hero;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(context) {
    var _this = this;

    _classCallCheck(this, Ball);

    this.context = context;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.direction = 1;
    this.dirty = false;
    this.diameter = 20;
    this.color = '#DD3333';
    this.highlightColor = '#fa6565';
    this.rollTimer = setInterval(function () {
      return _this.updateRoll();
    }, 1000 / 25);
  }

  _createClass(Ball, [{
    key: 'roll',
    value: function roll(pSpeed, pDirection) {
      this.speed = pSpeed;
      if (pDirection) {
        this.direction = pDirection;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.speed = 0;
    }
  }, {
    key: 'updateRoll',
    value: function updateRoll() {
      this.x += this.direction * this.speed;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var centerX = this.x;
      var centerY = this.y + ((this.diameter + 10) / 2 - 2);
      var width = this.diameter + 30;
      var height = 6;

      this.context.beginPath();
      this.context.moveTo(centerX, centerY);
      this.context.bezierCurveTo(centerX - width / 2, centerY - height / 2, centerX - width / 2, centerY + height / 2, centerX, centerY + height / 2);
      this.context.bezierCurveTo(centerX + width / 2, centerY + height / 2, centerX + width / 2, centerY - height / 2, centerX, centerY - height / 2);
      this.context.fillStyle = '#000000';
      this.context.fill();
      this.context.closePath();

      this.context.beginPath();
      this.context.moveTo(this.x, this.y - (this.diameter + 10) / 2);
      this.context.arc(this.x, this.y, (this.diameter + 10) / 2, 0, 2 * Math.PI, false);
      this.context.fillStyle = '#000000';
      this.context.fill();
      this.context.closePath();

      this.context.beginPath();
      this.context.moveTo(this.x, this.y - this.diameter / 2);
      this.context.arc(this.x, this.y, this.diameter / 2, 0, 2 * Math.PI, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath();

      centerX = this.x + 3;
      centerY = this.y - 3;
      this.context.beginPath();
      this.context.moveTo(centerX, centerY);
      this.context.arc(centerX, centerY, this.diameter / 3 / 2, 0, 2 * Math.PI, false);
      this.context.fillStyle = this.highlightColor;
      this.context.fill();
      this.context.closePath();
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'setX',
    value: function setX(pX) {
      this.x = pX;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'setY',
    value: function setY(pY) {
      this.y = pY;
    }
  }]);

  return Ball;
}();

exports.default = Ball;

/***/ })
/******/ ]);