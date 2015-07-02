/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***************************!*\
  !*** ./src/mouse-demo.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _regeneratorRuntime = __webpack_require__(/*! babel-runtime/regenerator */ 2)['default'];
	
	var marked0$0 = [mainloop, dragloop].map(_regeneratorRuntime.mark);
	
	var _require = __webpack_require__(/*! ../../../src/api-wrapper.js */ 1);
	
	var Chan = _require.Chan;
	var Mix = _require.Mix;
	var timeout = _require.timeout;
	var go = _require.go;
	var alts = _require.alts;
	var flush = _require.flush;
	var close = _require.close;
	
	var body = document.querySelector('body');
	
	go(mainloop);
	
	function mainloop() {
	  var buf, mousemove, mousedown, channel, value, moveX, moveY, clickX, clickY, R, G, _ref, _channel, _value;
	
	  return _regeneratorRuntime.wrap(function mainloop$(context$1$0) {
	    while (1) switch (context$1$0.prev = context$1$0.next) {
	      case 0:
	        buf = { type: 'sliding', size: 1 };
	        mousemove = new Chan(buf).addEvent(['body', 'mousemove']);
	        mousedown = new Chan(buf).addEvent(['body', 'mousedown']);
	        moveX = 0, moveY = 0, clickX = 0, clickY = 0, R = 0.5, G = 0.5;
	
	        body.innerHTML = moveX + ', ' + moveY + ' : ' + clickX + ', ' + clickY;
	        body.style.backgroundColor = 'rgba(' + Math.round(255 * R) + ',' + Math.round(255 * G) + ',0,0.4)';
	
	      case 6:
	        if (false) {
	          context$1$0.next = 27;
	          break;
	        }
	
	        context$1$0.next = 9;
	        return alts(mousemove, mousedown);
	
	      case 9:
	        _ref = context$1$0.sent;
	        _channel = _ref.channel;
	        _value = _ref.value;
	        context$1$0.t0 = _channel;
	        context$1$0.next = context$1$0.t0 === mousemove ? 15 : context$1$0.t0 === mousedown ? 19 : 25;
	        break;
	
	      case 15:
	        moveX = Math.round(100 * _value.clientX / body.clientWidth);
	        moveY = Math.round(100 * _value.clientY / body.clientHeight);
	        body.innerHTML = moveX + ', ' + moveY + ' : ' + clickX + ', ' + clickY;
	        return context$1$0.abrupt('break', 25);
	
	      case 19:
	        context$1$0.next = 21;
	        return go(dragloop, [body]);
	
	      case 21:
	        _value = context$1$0.sent;
	
	        if (_value) {
	          clickX = Math.round(100 * _value.clientX / body.clientWidth);
	          clickY = Math.round(100 * _value.clientY / body.clientHeight);
	          body.innerHTML = moveX + ', ' + moveY + ' : ' + clickX + ', ' + clickY;
	        }
	        flush(mousemove, mousedown);
	        return context$1$0.abrupt('break', 25);
	
	      case 25:
	        context$1$0.next = 6;
	        break;
	
	      case 27:
	      case 'end':
	        return context$1$0.stop();
	    }
	  }, marked0$0[0], this);
	}
	
	function dragloop(body) {
	  var buf, mousemove, mouseup, blur, keydown, _ref2, channel, value, G, R, _ref3;
	
	  return _regeneratorRuntime.wrap(function dragloop$(context$1$0) {
	    while (1) switch (context$1$0.prev = context$1$0.next) {
	      case 0:
	        buf = { type: 'sliding', size: 1 };
	        mousemove = new Chan(buf).addEvent(['body', 'mousemove']);
	        mouseup = new Chan(buf).addEvent(['body', 'mouseup']);
	        blur = new Chan(buf).addEvent([window, 'blur']);
	        keydown = new Chan(buf).addEvent([window, 'keydown']);
	        context$1$0.next = 7;
	        return alts(mousemove, mouseup, keydown, blur);
	
	      case 7:
	        _ref2 = context$1$0.sent;
	        channel = _ref2.channel;
	        value = _ref2.value;
	
	        if (!(channel === mouseup)) {
	          context$1$0.next = 12;
	          break;
	        }
	
	        return context$1$0.abrupt('return', { clientX: value.clientX, clientY: value.clientY });
	
	      case 12:
	        if (false) {
	          context$1$0.next = 33;
	          break;
	        }
	
	        context$1$0.t0 = channel;
	        context$1$0.next = context$1$0.t0 === mousemove ? 16 : context$1$0.t0 === keydown ? 20 : 24;
	        break;
	
	      case 16:
	        R = value.clientX / body.clientWidth;
	        G = value.clientY / body.clientHeight;
	        body.style.backgroundColor = 'rgba(' + Math.round(255 * R) + ',' + Math.round(255 * G) + ',0,0.4)';
	        return context$1$0.abrupt('break', 26);
	
	      case 20:
	        if (!(value.keyCode === 27)) {
	          context$1$0.next = 23;
	          break;
	        }
	
	        close(mousemove, mouseup, blur, keydown);
	        return context$1$0.abrupt('return');
	
	      case 23:
	        return context$1$0.abrupt('break', 26);
	
	      case 24:
	        close(mousemove, mouseup, blur, keydown);
	        return context$1$0.abrupt('return');
	
	      case 26:
	        context$1$0.next = 28;
	        return alts(mousemove, mouseup, keydown, blur);
	
	      case 28:
	        _ref3 = context$1$0.sent;
	        channel = _ref3.channel;
	        value = _ref3.value;
	        context$1$0.next = 12;
	        break;
	
	      case 33:
	      case 'end':
	        return context$1$0.stop();
	    }
	  }, marked0$0[1], this);
	}

/***/ },
/* 1 */
/*!*******************************************************!*\
  !*** /Users/topher/dev/core-async/src/api-wrapper.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* @flow */
	
	'use strict';
	
	var _createClass = __webpack_require__(/*! babel-runtime/helpers/create-class */ 3)['default'];
	
	var _classCallCheck = __webpack_require__(/*! babel-runtime/helpers/class-call-check */ 4)['default'];
	
	var _inherits = __webpack_require__(/*! babel-runtime/helpers/inherits */ 5)['default'];
	
	var _get = __webpack_require__(/*! babel-runtime/helpers/get */ 6)['default'];
	
	var _Map = __webpack_require__(/*! babel-runtime/core-js/map */ 7)['default'];
	
	var _Set = __webpack_require__(/*! babel-runtime/core-js/set */ 8)['default'];
	
	var _regeneratorRuntime = __webpack_require__(/*! babel-runtime/regenerator */ 2)['default'];
	
	/*
	Note: rather than using typeof, consider checking for:
	TakeChannel['@@channels/take'] = this.take
	*/
	
	var csp = __webpack_require__(/*! ./csp.js */ 9);
	// var TakeChannel = require('./api-TakeChannel.js');
	
	var TakeChannel = (function () {
	  function TakeChannel(bufferOrN, transducer, exceptionHandler) {
	    _classCallCheck(this, TakeChannel);
	
	    var buffer;
	    if (bufferOrN) {
	      if (typeof bufferOrN === 'number') {
	        buffer = csp.buffers.fixed(bufferOrN);
	      } else {
	        if (typeof bufferOrN.size !== 'number' || bufferOrN.size < 1) {
	          throw new Error('Buffer size must be number greater than 1');
	        }
	        switch (bufferOrN.type) {
	          case 'fixed':
	            buffer = csp.buffers.fixed(bufferOrN.size);
	            break;
	          case 'dropping':
	            buffer = csp.buffers.dropping(bufferOrN.size);
	            break;
	          case 'sliding':
	            buffer = csp.buffers.sliding(bufferOrN.size);
	            break;
	          default:
	            throw new Error('Unknown buffer type: ' + bufferOrN.type);
	        }
	      }
	    }
	    this._chan = csp.chan(buffer, transducer, exceptionHandler);
	  }
	
	  _createClass(TakeChannel, [{
	    key: 'take',
	    value: function take() {
	      return csp.take(this._chan);
	    }
	  }, {
	    key: 'takeAsync',
	    value: function takeAsync(fn) {
	      if (typeof fn === 'function') {
	        return csp.takeAsync(this._chan, fn);
	      } else {
	        return csp.takeAsync(this._chan, function () {});
	      }
	    }
	  }, {
	    key: 'poll',
	    value: function poll() {
	      return csp.poll(this._chan);
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      var discard = csp.poll(this._chan);
	      while (discard !== null) {
	        discard = csp.poll(this._chan);
	      }
	    }
	  }, {
	    key: 'checkOpen',
	    value: function checkOpen() {
	      return this._chan.closed;
	    }
	  }]);
	
	  return TakeChannel;
	})();
	
	// Possible duck-typing may avoid problems with multiple instances
	// TakeChannel.prototype['@@core-async/takeable] = true;
	
	var Channel = (function (_TakeChannel) {
	  function Channel(bufferOrN, transducer, exceptionHandler) {
	    var _this2 = this;
	
	    _classCallCheck(this, Channel);
	
	    _get(Object.getPrototypeOf(Channel.prototype), 'constructor', this).call(this, bufferOrN, transducer, exceptionHandler);
	    this.eventFn = function (e) {
	      _this2.putAsync(e);
	    };
	    this.eventMap = new _Map();
	  }
	
	  _inherits(Channel, _TakeChannel);
	
	  _createClass(Channel, [{
	    key: 'put',
	    value: function put(value) {
	      return csp.put(this._chan, value);
	    }
	  }, {
	    key: 'putAsync',
	    value: function putAsync(value, fn) {
	      if (typeof fn === 'function') {
	        csp.putAsync(this._chan, value, fn);
	      } else {
	        csp.putAsync(this._chan, value, function () {});
	      }
	    }
	  }, {
	    key: 'offer',
	    value: function offer(value) {
	      return csp.offer(this._chan, value);
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      var _this3 = this;
	
	      this.eventMap.forEach(function (set, target) {
	        set.forEach(function (e) {
	          if (target.removeEventListener !== undefined) {
	            target.removeEventListener(e, _this3.eventFn);
	          } else if (target.removeListener !== undefined) {
	            target.removeListener(e, _this3.eventFn);
	          } else {
	            throw new Error('Target: ' + target + ' methods removeEventListener/removeListener not found');
	          }
	        });
	      });
	      this._chan.close();
	    }
	  }, {
	    key: 'addEvent',
	    value: function addEvent(evt) {
	      var _this4 = this;
	
	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }
	
	      var eventPairs = parseEvents(evt, rest);
	      eventPairs.forEach(function (p) {
	        // Keep track of subscribed listeners
	        if (_this4.eventMap.has(p[0])) {
	          if (_this4.eventMap.get(p[0]).has(p[1])) {
	            throw new Error('Target: ' + p[0] + ' Event: ' + p[1] + ' listener already subscribed');
	          } else {
	            _this4.eventMap.get(p[0]).add(p[1]);
	          }
	        } else {
	          _this4.eventMap.set(p[0], new _Set([p[1]]));
	        }
	        // Add event listeners
	        if (p[0].addEventListener !== undefined) {
	          p[0].addEventListener(p[1], _this4.eventFn);
	        } else if (p[0].addListener !== undefined) {
	          p[0].addListener(p[1], _this4.eventFn);
	        } else {
	          throw new Error('Target: ' + p[0] + ' methods addEventListener/addListener not found');
	        }
	      });
	      return this;
	    }
	  }, {
	    key: 'addErrorEvent',
	    value: function addErrorEvent() {}
	  }, {
	    key: 'addNodeCallback',
	    value: function addNodeCallback() {}
	  }, {
	    key: 'removeEvent',
	    value: function removeEvent(evt) {
	      var _this5 = this;
	
	      var targetSet;
	
	      for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        rest[_key2 - 1] = arguments[_key2];
	      }
	
	      var eventPairs = parseEvents(evt, rest);
	      eventPairs.forEach(function (p) {
	        targetSet = _this5.eventMap.get(p[0]);
	        if (targetSet) {
	          if (targetSet.has(p[1])) {
	            if (p[0].removeEventListener !== undefined) {
	              p[0].removeEventListener(p[1], _this5.eventFn);
	            } else if (p[0].removeListener !== undefined) {
	              p[0].removeListener(p[1], _this5.eventFn);
	            } else {
	              throw new Error('Target: ' + p[0] + ' methods removeEventListener/removeListener not found');
	            }
	            targetSet['delete'](p[1]);
	            if (targetSet.size === 0) {
	              _this5.eventMap['delete'](p[0]);
	            }
	          }
	        }
	      });
	      return this;
	    }
	  }]);
	
	  return Channel;
	})(TakeChannel);
	
	function parseEvents(evt, rest) {
	  var args = [evt].concat(rest);
	  var element;
	  var eventPairs = [];
	  args.forEach(function (p) {
	    if (typeof p[0] === 'string') {
	      element = document.querySelector(p[0]);
	      if (element) {
	        eventPairs.push([element, p[1]]);
	      } else {
	        throw new Error('Query selector ' + p[0] + ' not found');
	      }
	    } else {
	      eventPairs.push([p[0], p[1]]);
	    }
	  });
	  return eventPairs;
	}
	
	var Mult = (function () {
	  function Mult(channel) {
	    _classCallCheck(this, Mult);
	
	    this._mult = csp.operations.mult(channel._chan);
	  }
	
	  _createClass(Mult, [{
	    key: 'tap',
	
	    // Accepts a Channel, multiple Chans, or an array of Chans
	    value: function tap(chan) {
	      return this;
	    }
	  }, {
	    key: 'tapAsync',
	    value: function tapAsync(chan, asyncfn) {
	      var keepOpen = arguments[2] === undefined ? false : arguments[2];
	      var n = arguments[3] === undefined ? 32 : arguments[3];
	      return this;
	    }
	  }, {
	    key: 'untap',
	    value: function untap(chan) {
	      return this;
	    }
	  }, {
	    key: 'untapAll',
	    value: function untapAll() {
	      return this;
	    }
	  }, {
	    key: 'reduce',
	    value: function reduce(fn, init) {
	      return new Go(function () {});
	    }
	
	    // reduce: returns a go-routine that puts the reduction on close of Channel?
	    // untapping before close means it will no longer receive values and never put?
	
	    // Close releases the consumed channel and distributes the closed value to taps
	    // close () {/* Any mult-specific cleanup */}
	
	  }]);
	
	  return Mult;
	})();
	
	// Helper function that will parse mix function syntax options:
	var parseChannels = function parseChannels(arg, rest) {
	  if (arg instanceof Array) {
	    return arg;
	  } else {
	    return [arg].concat(rest);
	  }
	};
	
	var Mix = (function (_TakeChannel2) {
	  function Mix(bufferOrN, transducer, exceptionHandler) {
	    _classCallCheck(this, Mix);
	
	    _get(Object.getPrototypeOf(Mix.prototype), 'constructor', this).call(this, bufferOrN, transducer, exceptionHandler);
	    this._mix = csp.operations.mix(this._chan);
	  }
	
	  _inherits(Mix, _TakeChannel2);
	
	  _createClass(Mix, [{
	    key: 'add',
	    value: function add(arg) {
	      var _this6 = this;
	
	      for (var _len3 = arguments.length, rest = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        rest[_key3 - 1] = arguments[_key3];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      chanArray.forEach(function (c) {
	        csp.operations.mix.add(_this6._mix, c._chan);
	      });
	      return this;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(arg) {
	      var _this7 = this;
	
	      for (var _len4 = arguments.length, rest = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        rest[_key4 - 1] = arguments[_key4];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      chanArray.forEach(function (c) {
	        csp.operations.mix.remove(_this7._mix, c._chan);
	      });
	      return this;
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      csp.operations.mix.removeAll(this._mix);
	      return this;
	    }
	  }, {
	    key: 'pause',
	    value: function pause(arg) {
	      for (var _len5 = arguments.length, rest = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        rest[_key5 - 1] = arguments[_key5];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { pause: true }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'unpause',
	    value: function unpause(arg) {
	      for (var _len6 = arguments.length, rest = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	        rest[_key6 - 1] = arguments[_key6];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { pause: false }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'mute',
	    value: function mute(arg) {
	      for (var _len7 = arguments.length, rest = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	        rest[_key7 - 1] = arguments[_key7];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { mute: true }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'unmute',
	    value: function unmute(arg) {
	      for (var _len8 = arguments.length, rest = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	        rest[_key8 - 1] = arguments[_key8];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { mute: true }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'focus',
	    value: function focus(arg) {
	      for (var _len9 = arguments.length, rest = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	        rest[_key9 - 1] = arguments[_key9];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { solo: true }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'unfocus',
	    value: function unfocus(arg) {
	      for (var _len10 = arguments.length, rest = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
	        rest[_key10 - 1] = arguments[_key10];
	      }
	
	      var chanArray = parseChannels(arg, rest);
	      var toggle_ops = chanArray.map(function (x) {
	        return [x._chan, { solo: false }];
	      });
	      csp.operations.mix.toggle(this._mix, toggle_ops);
	      return this;
	    }
	  }, {
	    key: 'setFocusMode',
	
	    // setFocusMode(): Mix {return this}
	    value: function setFocusMode(mode) {
	      var flag;
	      switch (mode) {
	        case 'mute':
	          flag = csp.operations.mix.MUTE;
	          break;
	        case 'pause':
	          flag = csp.operations.mix.PAUSE;
	          break;
	        default:
	          throw new Error('Unrecognized focus mode: ' + mode);
	      }
	      csp.operations.mix.setSoloMode(this._mix, flag);
	      return this;
	    }
	  }]);
	
	  return Mix;
	})(TakeChannel);
	
	var Go = (function (_TakeChannel3) {
	  function Go(gen, args) {
	    _classCallCheck(this, Go);
	
	    _get(Object.getPrototypeOf(Go.prototype), 'constructor', this).call(this);
	    this._chan = csp.go(gen, args);
	  }
	
	  _inherits(Go, _TakeChannel3);
	
	  return Go;
	})(TakeChannel);
	
	function go(gen, args) {
	  return new Go(gen, args);
	}
	
	var Timeout = (function (_TakeChannel4) {
	  function Timeout(msec) {
	    _classCallCheck(this, Timeout);
	
	    _get(Object.getPrototypeOf(Timeout.prototype), 'constructor', this).call(this);
	    this._chan = csp.timeout(msec);
	  }
	
	  _inherits(Timeout, _TakeChannel4);
	
	  return Timeout;
	})(TakeChannel);
	
	function timeout(msec) {
	  return new Timeout(msec);
	}
	
	// Helper types and function for parsing alts/altsp arguments:
	// Channel | Mix
	
	function getOpsArray(op, rest) {
	  var ops;
	  if (op instanceof Channel) {
	    ops = [op].concat(rest);
	  } else {
	    if (rest.length) {
	      ops = [op].concat(rest);
	    } else {
	      ops = op;
	    }
	  }
	  var ops_array = [];
	
	  // This needs to be a man that can take objects as keys
	  // var chan_map = {};
	  var chan_map = new _Map();
	
	  ops.forEach(function (op) {
	    if (op instanceof Channel) {
	      ops_array.push(op._chan);
	      chan_map.set(op._chan, op);
	      // return op._chan;
	    } else {
	      var ch = op[0];
	      var v = op[1];
	      if (ch instanceof Channel) {
	        ops_array.push([ch._chan, v]);
	        chan_map.set(ch._chan, ch._chan);
	        // return [ch._chan, v];
	      }
	    }
	  });
	  // var ops_array = ops.map((op)=>{
	  //   if (op instanceof Channel) {
	  //     return op._chan;
	  //   } else {
	  //     var ch = op[0];
	  //     var v = op[1];
	  //     if (ch instanceof Channel) {
	  //       return [ch._chan, v];
	  //     }
	  //   }
	  // });
	  return {
	    ops_array: ops_array,
	    chan_map: chan_map
	  };
	}
	
	var Alts = (function (_Channel) {
	  function Alts(chan, chan_map) {
	    _classCallCheck(this, Alts);
	
	    _get(Object.getPrototypeOf(Alts.prototype), 'constructor', this).call(this);
	    var _this = this;
	    csp.go(_regeneratorRuntime.mark(function callee$2$0(chan, chan_map, _this) {
	      var _ref, channel, value;
	
	      return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
	        while (1) switch (context$3$0.prev = context$3$0.next) {
	          case 0:
	            context$3$0.next = 2;
	            return chan;
	
	          case 2:
	            _ref = context$3$0.sent;
	            channel = _ref.channel;
	            value = _ref.value;
	            chan = chan_map.get(channel);
	            context$3$0.next = 8;
	            return csp.put(_this._chan, { channel: chan, value: value });
	
	          case 8:
	          case 'end':
	            return context$3$0.stop();
	        }
	      }, callee$2$0, this);
	    }), [chan, chan_map, _this]);
	  }
	
	  _inherits(Alts, _Channel);
	
	  return Alts;
	})(Channel);
	
	var alts = function alts(op) {
	  var ops;
	
	  for (var _len11 = arguments.length, rest = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
	    rest[_key11 - 1] = arguments[_key11];
	  }
	
	  var _getOpsArray = getOpsArray(op, rest);
	
	  var ops_array = _getOpsArray.ops_array;
	  var chan_map = _getOpsArray.chan_map;
	
	  var chan = csp.alts(ops_array);
	  return new Alts(chan, chan_map);
	};
	
	// altsp = alts with priority based on order of operations
	var altsp = function altsp(op) {
	  var ops;
	
	  for (var _len12 = arguments.length, rest = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    rest[_key12 - 1] = arguments[_key12];
	  }
	
	  var _getOpsArray2 = getOpsArray(op, rest);
	
	  var ops_array = _getOpsArray2.ops_array;
	  var chan_map = _getOpsArray2.chan_map;
	
	  var chan = csp.alts(ops_array, { priority: true });
	  return new Alts(chan, chan_map);
	};
	
	// Helper function for parsing flush and close arguments
	var getChanArray = function getChanArray(arg, rest) {
	  if (arg instanceof Array) {
	    return arg;
	  } else {
	    return [arg].concat(rest);
	  }
	};
	
	var close = function close(arg) {
	  for (var _len13 = arguments.length, rest = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
	    rest[_key13 - 1] = arguments[_key13];
	  }
	
	  var chanArray = getChanArray(arg, rest);
	  chanArray.forEach(function (c) {
	    c.close();
	  });
	};
	
	var flush = function flush(arg) {
	  for (var _len14 = arguments.length, rest = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
	    rest[_key14 - 1] = arguments[_key14];
	  }
	
	  var chanArray = getChanArray(arg, rest);
	  chanArray.forEach(function (c) {
	    c.flush();
	  });
	};
	
	/*
	createChan()
	createMix()
	createMult()
	*/
	
	function createChan(bufferOrN, transducer, exceptionHandler) {
	  return new Channel(bufferOrN, transducer, exceptionHandler);
	}
	
	function createMix(bufferOrN, transducer, exceptionHandler) {
	  return new Mix(bufferOrN, transducer, exceptionHandler);
	}
	
	function createMult(channel) {
	  return new Mult(channel);
	}
	
	module.exports = {
	  Chan: Channel,
	  Mix: Mix,
	  Mult: Mult,
	  // chan: chan,
	  // mix: mix,
	  // mult: mult,
	  timeout: timeout,
	  go: go,
	  alts: alts,
	  altsp: altsp,
	  close: close,
	  flush: flush,
	  csp: csp
	};
	
	/*
	TakeChannel becomes TakeChannel
	Chan extends TakeChannel and adds put operations + events
	Mix exetends TakeChannel and adds mixing operations
	Mult takes a channel as input and has tap/pipe/reduce operations

	Should TakeChannel implement pipe and pipeline?

	Do you need pipe if you can:
	new Mult(ch1).tap(ch2);

	what about pipeline?
	currently:
	new Mult(new Mult(ch1).pipeline(buf,xf)).tap(ch2);
	could be:
	new Mult(ch1,buffer,xform).tap(ch2);
	or:
	new Mult(ch1).tap(ch2,buf,xf)??
	ideal:
	new Mult(ch1).tap(ch2, xf)

	current csp code may not support closing Mults

	*/

	/*
	Don't flush multichannels because any values put on an
	untapped mult will be immediately taken and not distributed
	to any channels. The only situation where values can
	accumulate is when the mult is waiting on one or more
	slow takers.
	*/

	/*
	Could tap/untap while takes are pending be problematic?
	Mutate taps state while takes are still completing?
	This could be fixed by yielding to alts(taps,ch) so that
	the entire take cycle must complete or the tap/untap happens
	first.

	May need to apply similar logic to Mix add/remove, which appears
	to queue adds and removes by queuing them into a channel and yielding
	to all mix sources and the state modifications
	*/

	// Removed from mult:
	// pipelineAsync (n: number, af: AsyncFunction, keepOpen: boolean = false) {

	/*
	do we want keepOpen to be true for pipelineAsync?
	async work could finish after the source Mult has closed
	need to look at the implementation of this
	could implement this differently; specifically, without closing the chan
	 Alt implementation:
	create a new channel afnchan that taps this mult
	spawn a goroutine that takes from afnchan as soon as new items are
	available
	while value !== null, the goroutine will call asyncfn(value,outchan)
	asyncfn will put to outchan on completion (could put a value or an error)
	outchan is what we return to the user
	 untapping would have to be handled specially, because outchan is not
	directly tapped
	could accomplish this by keeping track of the afnchans that correspond to
	each outchan
	 Is this really a necessary function?
	without this function, the way to perform this action is to create a
	channel, spawn a goroutine that takes while channel is open, calls an
	async function on the value, and puts to another channel on completion. This
	is probably a better and more CSP-like method, since the goroutine is more
	transparent than a hidden async function. pipelineAsync also make assumptions
	about what type of function the user should supply that
	*/
	// }

	// renaming onto putCollection so all of the simple put operations have the 'put' prefix
	// putCollection (iterableCollection: Iterable) {} // returns a channel primative that closes on completion--implement as goroutine?
	// [1,2,3].forEach((x,i,c)=>{(i===c.length) ? chan.putAsync(x,console.log('last take succeeded')) : chan.putAsync(x)})

	// Alterative get/set interface (not currently supported by flow):
	/*
	get closed():boolean {return this._chan.closed}
	set closed (value: boolean) {
	  if (this.closed) {
	    throw new Error('closed property cannot be set on a closed channel');
	  } else if (value===true) {
	    this.close();
	    this.closed = true;
	  } else if (value!==false) {
	    throw new Error('Cannot set closed property to: ${value}');
	  }
	}
	*/
	// checkOpen() function call may be a more pure and understandable approach

	// class Buffer {
	//   type: string;
	//   size: number;
	//   constructor(type: string, size: number) {
	//     var buffer;
	//     switch (type) {
	//       case 'fixed':
	//         break;
	//       case 'dropping':
	//         if (size < 1) {
	//           throw new Error('Dropping buffer size must be greater than 1');
	//         }
	//         break;
	//       case 'sliding':
	//         if (size < 1) {
	//           throw new Error('Sliding buffer size must be greater than 1');
	//         }
	//         break;
	//       default:
	//         throw new Error('Unknown buffer type: ' + type);
	//     }
	//     this.type = type;
	//     this.size = size;
	//   }
	// }

	// function getOpsArray(op: Array<ChanOp> | ChanOp, rest: Array<ChanOp>) {
	//   var ops = [];
	//   if (rest.length) {
	//     ops = [op].concat(rest);
	//   }
	//   else if (op instanceof Array) {
	//     ops = (op: Array<ChanOp>);
	//   }
	//   var ops_array = ops.map((op)=>{
	//     if (op instanceof Chan) {
	//       return op._chan;
	//     } else {
	//       var ch = op[0];
	//       var v = op[1];
	//       if (ch instanceof Chan) {
	//         return [ch._chan, v];
	//       }
	//     }
	//   });
	//   return ops_array;
	// }

	// tap(chan, af, 3, keepOpen)
	// do we need n? it seems like its use was for parallism in clojure
	// default n concurrency could be 32 (the size of the tasks buffer in dispatch.js)

	// pipe (bufferOrN: number | Buffer, keepOpen: boolean = false) {/* returns a channel */}
	// pipeline (bufferOrN: number | Buffer, xf: any, keepOpen: boolean = false) {
	//   // returns a channel tapped to this Mult, transformed with xf
	// }
	// this._chan = chan;

/***/ },
/* 2 */
/*!*************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/regenerator/index.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(/*! ./runtime */ 10);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  delete g.regeneratorRuntime;
	}
	
	module.exports = { "default": module.exports, __esModule: true };
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/*!****************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/helpers/create-class.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__(/*! babel-runtime/core-js/object/define-property */ 11)["default"];
	
	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	
	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 4 */
/*!********************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/helpers/class-call-check.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 5 */
/*!************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/helpers/inherits.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(/*! babel-runtime/core-js/object/create */ 12)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 6 */
/*!*******************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/helpers/get.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$getOwnPropertyDescriptor = __webpack_require__(/*! babel-runtime/core-js/object/get-own-property-descriptor */ 13)["default"];
	
	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;
	
	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;
	    if (object === null) object = Function.prototype;
	
	    var desc = _Object$getOwnPropertyDescriptor(object, property);
	
	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);
	
	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;
	
	      if (getter === undefined) {
	        return undefined;
	      }
	
	      return getter.call(receiver);
	    }
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 7 */
/*!*******************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/map.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/map */ 20), __esModule: true };

/***/ },
/* 8 */
/*!*******************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/set.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/set */ 21), __esModule: true };

/***/ },
/* 9 */
/*!***********************************************!*\
  !*** /Users/topher/dev/core-async/src/csp.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var csp = __webpack_require__(/*! ./csp.core */ 14);
	var operations = __webpack_require__(/*! ./csp.operations */ 15);
	var pipeline = __webpack_require__(/*! ./csp.pipeline */ 16);
	
	csp.operations = operations;
	csp.operations.pipeline = pipeline.pipeline;
	csp.operations.pipelineAsync = pipeline.pipelineAsync;
	
	module.exports = csp;

/***/ },
/* 10 */
/*!***************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/regenerator/runtime.js ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	"use strict";
	
	var _Symbol = __webpack_require__(/*! babel-runtime/core-js/symbol */ 17)["default"];
	
	var _Symbol$iterator = __webpack_require__(/*! babel-runtime/core-js/symbol/iterator */ 18)["default"];
	
	var _Object$create = __webpack_require__(/*! babel-runtime/core-js/object/create */ 12)["default"];
	
	var _Promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 19)["default"];
	
	!(function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = _Object$create((outerFn || Generator).prototype);
	
	    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = _Object$create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument ? _Promise.resolve(value.arg).then(invokeNext, invokeThrow) : _Promise.resolve(value).then(function (unwrapped) {
	        result.value = unwrapped;
	        return result;
	      }, invokeThrow);
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      var enqueueResult =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(function () {
	        return invoke(method, arg);
	      }) : new _Promise(function (resolve) {
	        resolve(invoke(method, arg));
	      });
	
	      // Avoid propagating enqueueResult failures to Promises returned by
	      // later invocations of the iterator, and call generator.return() to
	      // allow the generator a chance to clean up.
	      previousPromise = enqueueResult["catch"](invokeReturn);
	
	      return enqueueResult;
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset();
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
	        this[tempName] = null;
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 25)))

/***/ },
/* 11 */
/*!**************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/object/define-property.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 22), __esModule: true };

/***/ },
/* 12 */
/*!*****************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/object/create.js ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 23), __esModule: true };

/***/ },
/* 13 */
/*!**************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/object/get-own-property-descriptor.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ 24), __esModule: true };

/***/ },
/* 14 */
/*!****************************************************!*\
  !*** /Users/topher/dev/core-async/src/csp.core.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var buffers = __webpack_require__(/*! ./impl/buffers */ 26);
	var channels = __webpack_require__(/*! ./impl/channels */ 27);
	var select = __webpack_require__(/*! ./impl/select */ 28);
	var process = __webpack_require__(/*! ./impl/process */ 29);
	var timers = __webpack_require__(/*! ./impl/timers */ 30);
	
	function spawn(gen, creator) {
	  var ch = channels.chan(buffers.fixed(1));
	  new process.Process(gen, function (value) {
	    if (value === channels.CLOSED) {
	      ch.close();
	    } else {
	      process.put_then_callback(ch, value, function (ok) {
	        ch.close();
	      });
	    }
	  }, creator).run();
	  return ch;
	};
	
	function go(f, args) {
	  args = args || [];
	
	  var gen = f.apply(null, args);
	  return spawn(gen, f);
	};
	
	function chan(bufferOrNumber, xform, exHandler) {
	  var buf;
	  if (bufferOrNumber === 0) {
	    bufferOrNumber = null;
	  }
	  if (typeof bufferOrNumber === "number") {
	    buf = buffers.fixed(bufferOrNumber);
	  } else {
	    buf = bufferOrNumber;
	  }
	  return channels.chan(buf, xform, exHandler);
	};
	
	function promiseChan(xform, exHandler) {
	  return chan(buffers.promise(), xform, exHandler);
	};
	
	module.exports = {
	  buffers: {
	    fixed: buffers.fixed,
	    dropping: buffers.dropping,
	    sliding: buffers.sliding,
	    promise: buffers.promise
	  },
	
	  spawn: spawn,
	  go: go,
	  chan: chan,
	  promiseChan: promiseChan,
	  DEFAULT: select.DEFAULT,
	  CLOSED: channels.CLOSED,
	
	  put: process.put,
	  take: process.take,
	  offer: process.offer,
	  poll: process.poll,
	  sleep: process.sleep,
	  alts: process.alts,
	  putAsync: process.put_then_callback,
	  takeAsync: process.take_then_callback,
	  NO_VALUE: process.NO_VALUE,
	
	  timeout: timers.timeout
	};

/***/ },
/* 15 */
/*!**********************************************************!*\
  !*** /Users/topher/dev/core-async/src/csp.operations.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _regeneratorRuntime = __webpack_require__(/*! babel-runtime/regenerator */ 2)["default"];
	
	var marked0$0 = [mapcat].map(_regeneratorRuntime.mark);
	var Box = __webpack_require__(/*! ./impl/channels */ 27).Box;
	
	var csp = __webpack_require__(/*! ./csp.core */ 14),
	    go = csp.go,
	    take = csp.take,
	    put = csp.put,
	    takeAsync = csp.takeAsync,
	    putAsync = csp.putAsync,
	    alts = csp.alts,
	    chan = csp.chan,
	    CLOSED = csp.CLOSED;
	
	function mapFrom(f, ch) {
	  return {
	    is_closed: function is_closed() {
	      return ch.is_closed();
	    },
	    close: function close() {
	      ch.close();
	    },
	    _put: function _put(value, handler) {
	      return ch._put(value, handler);
	    },
	    _take: function _take(handler) {
	      var result = ch._take({
	        is_active: function is_active() {
	          return handler.is_active();
	        },
	        commit: function commit() {
	          var take_cb = handler.commit();
	          return function (value) {
	            return take_cb(value === CLOSED ? CLOSED : f(value));
	          };
	        }
	      });
	      if (result) {
	        var value = result.value;
	        return new Box(value === CLOSED ? CLOSED : f(value));
	      } else {
	        return null;
	      }
	    }
	  };
	}
	
	function mapInto(f, ch) {
	  return {
	    is_closed: function is_closed() {
	      return ch.is_closed();
	    },
	    close: function close() {
	      ch.close();
	    },
	    _put: function _put(value, handler) {
	      return ch._put(f(value), handler);
	    },
	    _take: function _take(handler) {
	      return ch._take(handler);
	    }
	  };
	}
	
	function filterFrom(p, ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 12;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 7;
	            break;
	          }
	
	          out.close();
	          return context$2$0.abrupt("break", 12);
	
	        case 7:
	          if (!p(value)) {
	            context$2$0.next = 10;
	            break;
	          }
	
	          context$2$0.next = 10;
	          return put(out, value);
	
	        case 10:
	          context$2$0.next = 0;
	          break;
	
	        case 12:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	function filterInto(p, ch) {
	  return {
	    is_closed: function is_closed() {
	      return ch.is_closed();
	    },
	    close: function close() {
	      ch.close();
	    },
	    _put: function _put(value, handler) {
	      if (p(value)) {
	        return ch._put(value, handler);
	      } else {
	        return new Box(!ch.is_closed());
	      }
	    },
	    _take: function _take(handler) {
	      return ch._take(handler);
	    }
	  };
	}
	
	function removeFrom(p, ch) {
	  return filterFrom(function (value) {
	    return !p(value);
	  }, ch);
	}
	
	function removeInto(p, ch) {
	  return filterInto(function (value) {
	    return !p(value);
	  }, ch);
	}
	
	function mapcat(f, src, dst) {
	  var value, seq, length, i;
	  return _regeneratorRuntime.wrap(function mapcat$(context$1$0) {
	    while (1) switch (context$1$0.prev = context$1$0.next) {
	      case 0:
	        if (false) {
	          context$1$0.next = 22;
	          break;
	        }
	
	        context$1$0.next = 3;
	        return take(src);
	
	      case 3:
	        value = context$1$0.sent;
	
	        if (!(value === CLOSED)) {
	          context$1$0.next = 9;
	          break;
	        }
	
	        dst.close();
	        return context$1$0.abrupt("break", 22);
	
	      case 9:
	        seq = f(value);
	        length = seq.length;
	        i = 0;
	
	      case 12:
	        if (!(i < length)) {
	          context$1$0.next = 18;
	          break;
	        }
	
	        context$1$0.next = 15;
	        return put(dst, seq[i]);
	
	      case 15:
	        i++;
	        context$1$0.next = 12;
	        break;
	
	      case 18:
	        if (!dst.is_closed()) {
	          context$1$0.next = 20;
	          break;
	        }
	
	        return context$1$0.abrupt("break", 22);
	
	      case 20:
	        context$1$0.next = 0;
	        break;
	
	      case 22:
	      case "end":
	        return context$1$0.stop();
	    }
	  }, marked0$0[0], this);
	}
	
	function mapcatFrom(f, ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  go(mapcat, [f, ch, out]);
	  return out;
	}
	
	function mapcatInto(f, ch, bufferOrN) {
	  var src = chan(bufferOrN);
	  go(mapcat, [f, src, ch]);
	  return src;
	}
	
	function pipe(src, dst, keepOpen) {
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 13;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(src);
	
	        case 3:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 7;
	            break;
	          }
	
	          if (!keepOpen) {
	            dst.close();
	          }
	          return context$2$0.abrupt("break", 13);
	
	        case 7:
	          context$2$0.next = 9;
	          return put(dst, value);
	
	        case 9:
	          if (context$2$0.sent) {
	            context$2$0.next = 11;
	            break;
	          }
	
	          return context$2$0.abrupt("break", 13);
	
	        case 11:
	          context$2$0.next = 0;
	          break;
	
	        case 13:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return dst;
	}
	
	function split(p, ch, trueBufferOrN, falseBufferOrN) {
	  var tch = chan(trueBufferOrN);
	  var fch = chan(falseBufferOrN);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 12;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 8;
	            break;
	          }
	
	          tch.close();
	          fch.close();
	          return context$2$0.abrupt("break", 12);
	
	        case 8:
	          context$2$0.next = 10;
	          return put(p(value) ? tch : fch, value);
	
	        case 10:
	          context$2$0.next = 0;
	          break;
	
	        case 12:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return [tch, fch];
	}
	
	function reduce(f, init, ch) {
	  return go(_regeneratorRuntime.mark(function callee$1$0() {
	    var result, value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          result = init;
	
	        case 1:
	          if (false) {
	            context$2$0.next = 12;
	            break;
	          }
	
	          context$2$0.next = 4;
	          return take(ch);
	
	        case 4:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 9;
	            break;
	          }
	
	          return context$2$0.abrupt("return", result);
	
	        case 9:
	          result = f(result, value);
	
	        case 10:
	          context$2$0.next = 1;
	          break;
	
	        case 12:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }), [], true);
	}
	
	function onto(ch, coll, keepOpen) {
	  return go(_regeneratorRuntime.mark(function callee$1$0() {
	    var length, i;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          length = coll.length;
	          i = 0;
	
	        case 2:
	          if (!(i < length)) {
	            context$2$0.next = 8;
	            break;
	          }
	
	          context$2$0.next = 5;
	          return put(ch, coll[i]);
	
	        case 5:
	          i++;
	          context$2$0.next = 2;
	          break;
	
	        case 8:
	          if (!keepOpen) {
	            ch.close();
	          }
	
	        case 9:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	}
	
	// TODO: Bounded?
	function fromColl(coll) {
	  var ch = chan(coll.length);
	  onto(ch, coll);
	  return ch;
	}
	
	function map(f, chs, bufferOrN) {
	  var out = chan(bufferOrN);
	  var length = chs.length;
	  // Array holding 1 round of values
	  var values = new Array(length);
	  // TODO: Not sure why we need a size-1 buffer here
	  var dchan = chan(1);
	  // How many more items this round
	  var dcount;
	  // put callbacks for each channel
	  var dcallbacks = new Array(length);
	  for (var i = 0; i < length; i++) {
	    dcallbacks[i] = (function (i) {
	      return function (value) {
	        values[i] = value;
	        dcount--;
	        if (dcount === 0) {
	          putAsync(dchan, values.slice(0));
	        }
	      };
	    })(i);
	  }
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var i, values;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 18;
	            break;
	          }
	
	          dcount = length;
	          // We could just launch n goroutines here, but for effciency we
	          // don't
	          for (i = 0; i < length; i++) {
	            try {
	              takeAsync(chs[i], dcallbacks[i]);
	            } catch (e) {
	              // FIX: Hmm why catching here?
	              dcount--;
	            }
	          }
	          context$2$0.next = 5;
	          return take(dchan);
	
	        case 5:
	          values = context$2$0.sent;
	          i = 0;
	
	        case 7:
	          if (!(i < length)) {
	            context$2$0.next = 14;
	            break;
	          }
	
	          if (!(values[i] === CLOSED)) {
	            context$2$0.next = 11;
	            break;
	          }
	
	          out.close();
	          return context$2$0.abrupt("return");
	
	        case 11:
	          i++;
	          context$2$0.next = 7;
	          break;
	
	        case 14:
	          context$2$0.next = 16;
	          return put(out, f.apply(null, values));
	
	        case 16:
	          context$2$0.next = 0;
	          break;
	
	        case 18:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	function merge(chs, bufferOrN) {
	  var out = chan(bufferOrN);
	  var actives = chs.slice(0);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var r, value, i;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 15;
	            break;
	          }
	
	          if (!(actives.length === 0)) {
	            context$2$0.next = 3;
	            break;
	          }
	
	          return context$2$0.abrupt("break", 15);
	
	        case 3:
	          context$2$0.next = 5;
	          return alts(actives);
	
	        case 5:
	          r = context$2$0.sent;
	          value = r.value;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 11;
	            break;
	          }
	
	          i = actives.indexOf(r.channel);
	
	          actives.splice(i, 1);
	          return context$2$0.abrupt("continue", 0);
	
	        case 11:
	          context$2$0.next = 13;
	          return put(out, value);
	
	        case 13:
	          context$2$0.next = 0;
	          break;
	
	        case 15:
	          out.close();
	
	        case 16:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	function into(coll, ch) {
	  var result = coll.slice(0);
	  return reduce(function (result, item) {
	    result.push(item);
	    return result;
	  }, result, ch);
	}
	
	function takeN(n, ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var i, value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          i = 0;
	
	        case 1:
	          if (!(i < n)) {
	            context$2$0.next = 12;
	            break;
	          }
	
	          context$2$0.next = 4;
	          return take(ch);
	
	        case 4:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 7;
	            break;
	          }
	
	          return context$2$0.abrupt("break", 12);
	
	        case 7:
	          context$2$0.next = 9;
	          return put(out, value);
	
	        case 9:
	          i++;
	          context$2$0.next = 1;
	          break;
	
	        case 12:
	          out.close();
	
	        case 13:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	var NOTHING = {};
	
	function unique(ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  var last = NOTHING;
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 13;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 6;
	            break;
	          }
	
	          return context$2$0.abrupt("break", 13);
	
	        case 6:
	          if (!(value === last)) {
	            context$2$0.next = 8;
	            break;
	          }
	
	          return context$2$0.abrupt("continue", 0);
	
	        case 8:
	          last = value;
	          context$2$0.next = 11;
	          return put(out, value);
	
	        case 11:
	          context$2$0.next = 0;
	          break;
	
	        case 13:
	          out.close();
	
	        case 14:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	function partitionBy(f, ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  var part = [];
	  var last = NOTHING;
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value, newItem;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 23;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 12;
	            break;
	          }
	
	          if (!(part.length > 0)) {
	            context$2$0.next = 8;
	            break;
	          }
	
	          context$2$0.next = 8;
	          return put(out, part);
	
	        case 8:
	          out.close();
	          return context$2$0.abrupt("break", 23);
	
	        case 12:
	          newItem = f(value);
	
	          if (!(newItem === last || last === NOTHING)) {
	            context$2$0.next = 17;
	            break;
	          }
	
	          part.push(value);
	          context$2$0.next = 20;
	          break;
	
	        case 17:
	          context$2$0.next = 19;
	          return put(out, part);
	
	        case 19:
	          part = [value];
	
	        case 20:
	          last = newItem;
	
	        case 21:
	          context$2$0.next = 0;
	          break;
	
	        case 23:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	function partition(n, ch, bufferOrN) {
	  var out = chan(bufferOrN);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var part, i, value;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 21;
	            break;
	          }
	
	          part = new Array(n);
	          i = 0;
	
	        case 3:
	          if (!(i < n)) {
	            context$2$0.next = 17;
	            break;
	          }
	
	          context$2$0.next = 6;
	          return take(ch);
	
	        case 6:
	          value = context$2$0.sent;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 13;
	            break;
	          }
	
	          if (!(i > 0)) {
	            context$2$0.next = 11;
	            break;
	          }
	
	          context$2$0.next = 11;
	          return put(out, part.slice(0, i));
	
	        case 11:
	          out.close();
	          return context$2$0.abrupt("return");
	
	        case 13:
	          part[i] = value;
	
	        case 14:
	          i++;
	          context$2$0.next = 3;
	          break;
	
	        case 17:
	          context$2$0.next = 19;
	          return put(out, part);
	
	        case 19:
	          context$2$0.next = 0;
	          break;
	
	        case 21:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return out;
	}
	
	// For channel identification
	var genId = (function () {
	  var i = 0;
	  return function () {
	    i++;
	    return "" + i;
	  };
	})();
	
	var ID_ATTR = "__csp_channel_id";
	
	// TODO: Do we need to check with hasOwnProperty?
	function len(obj) {
	  var count = 0;
	  for (var p in obj) {
	    count++;
	  }
	  return count;
	}
	
	function chanId(ch) {
	  var id = ch[ID_ATTR];
	  if (id === undefined) {
	    id = ch[ID_ATTR] = genId();
	  }
	  return id;
	}
	
	var Mult = function Mult(ch) {
	  this.taps = {};
	  this.ch = ch;
	};
	
	var Tap = function Tap(channel, keepOpen) {
	  this.channel = channel;
	  this.keepOpen = keepOpen;
	};
	
	Mult.prototype.muxch = function () {
	  return this.ch;
	};
	
	Mult.prototype.tap = function (ch, keepOpen) {
	  var id = chanId(ch);
	  this.taps[id] = new Tap(ch, keepOpen);
	};
	
	Mult.prototype.untap = function (ch) {
	  delete this.taps[chanId(ch)];
	};
	
	Mult.prototype.untapAll = function () {
	  this.taps = {};
	};
	
	function mult(ch) {
	  var m = new Mult(ch);
	  var dchan = chan(1);
	  var dcount;
	  function makeDoneCallback(tap) {
	    return function (stillOpen) {
	      dcount--;
	      if (dcount === 0) {
	        putAsync(dchan, true);
	      }
	      if (!stillOpen) {
	        m.untap(tap.channel);
	      }
	    };
	  }
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value, id, t, taps, initDcount;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 17;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	          taps = m.taps;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 9;
	            break;
	          }
	
	          for (id in taps) {
	            t = taps[id];
	            if (!t.keepOpen) {
	              t.channel.close();
	            }
	          }
	          // TODO: Is this necessary?
	          m.untapAll();
	          return context$2$0.abrupt("break", 17);
	
	        case 9:
	          dcount = len(taps);
	          initDcount = dcount;
	
	          // Put value on tapping channels...
	          for (id in taps) {
	            t = taps[id];
	            putAsync(t.channel, value, makeDoneCallback(t));
	          }
	
	          if (!(initDcount > 0)) {
	            context$2$0.next = 15;
	            break;
	          }
	
	          context$2$0.next = 15;
	          return take(dchan);
	
	        case 15:
	          context$2$0.next = 0;
	          break;
	
	        case 17:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return m;
	}
	
	mult.tap = function tap(m, ch, keepOpen) {
	  m.tap(ch, keepOpen);
	  return ch;
	};
	
	mult.untap = function untap(m, ch) {
	  m.untap(ch);
	};
	
	mult.untapAll = function untapAll(m) {
	  m.untapAll();
	};
	
	var Mix = function Mix(ch) {
	  this.ch = ch;
	  this.stateMap = {};
	  this.change = chan();
	  this.soloMode = mix.MUTE;
	};
	
	Mix.prototype._changed = function () {
	  putAsync(this.change, true);
	};
	
	Mix.prototype._getAllState = function () {
	  var allState = {};
	  var stateMap = this.stateMap;
	  var solos = [];
	  var mutes = [];
	  var pauses = [];
	  var reads;
	  for (var id in stateMap) {
	    var chanData = stateMap[id];
	    var state = chanData.state;
	    var channel = chanData.channel;
	    if (state[mix.SOLO]) {
	      solos.push(channel);
	    }
	    // TODO
	    if (state[mix.MUTE]) {
	      mutes.push(channel);
	    }
	    if (state[mix.PAUSE]) {
	      pauses.push(channel);
	    }
	  }
	  var i, n;
	  if (this.soloMode === mix.PAUSE && solos.length > 0) {
	    n = solos.length;
	    reads = new Array(n + 1);
	    for (i = 0; i < n; i++) {
	      reads[i] = solos[i];
	    }
	    reads[n] = this.change;
	  } else {
	    reads = [];
	    for (id in stateMap) {
	      chanData = stateMap[id];
	      channel = chanData.channel;
	      if (pauses.indexOf(channel) < 0) {
	        reads.push(channel);
	      }
	    }
	    reads.push(this.change);
	  }
	
	  return {
	    solos: solos,
	    mutes: mutes,
	    reads: reads
	  };
	};
	
	Mix.prototype.admix = function (ch) {
	  this.stateMap[chanId(ch)] = {
	    channel: ch,
	    state: {}
	  };
	  this._changed();
	};
	
	Mix.prototype.unmix = function (ch) {
	  delete this.stateMap[chanId(ch)];
	  this._changed();
	};
	
	Mix.prototype.unmixAll = function () {
	  this.stateMap = {};
	  this._changed();
	};
	
	Mix.prototype.toggle = function (updateStateList) {
	  // [[ch1, {}], [ch2, {solo: true}]];
	  var length = updateStateList.length;
	  for (var i = 0; i < length; i++) {
	    var ch = updateStateList[i][0];
	    var id = chanId(ch);
	    var updateState = updateStateList[i][1];
	    var chanData = this.stateMap[id];
	    if (!chanData) {
	      chanData = this.stateMap[id] = {
	        channel: ch,
	        state: {}
	      };
	    }
	    for (var mode in updateState) {
	      chanData.state[mode] = updateState[mode];
	    }
	  }
	  this._changed();
	};
	
	Mix.prototype.setSoloMode = function (mode) {
	  if (VALID_SOLO_MODES.indexOf(mode) < 0) {
	    throw new Error("Mode must be one of: ", VALID_SOLO_MODES.join(", "));
	  }
	  this.soloMode = mode;
	  this._changed();
	};
	
	function mix(out) {
	  var m = new Mix(out);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var state, result, value, channel, solos, stillOpen;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          state = m._getAllState();
	
	        case 1:
	          if (false) {
	            context$2$0.next = 23;
	            break;
	          }
	
	          context$2$0.next = 4;
	          return alts(state.reads);
	
	        case 4:
	          result = context$2$0.sent;
	          value = result.value;
	          channel = result.channel;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 11;
	            break;
	          }
	
	          delete m.stateMap[chanId(channel)];
	          state = m._getAllState();
	          return context$2$0.abrupt("continue", 1);
	
	        case 11:
	          if (!(channel === m.change)) {
	            context$2$0.next = 14;
	            break;
	          }
	
	          state = m._getAllState();
	          return context$2$0.abrupt("continue", 1);
	
	        case 14:
	          solos = state.solos;
	
	          if (!(solos.indexOf(channel) > -1 || solos.length === 0 && !(state.mutes.indexOf(channel) > -1))) {
	            context$2$0.next = 21;
	            break;
	          }
	
	          context$2$0.next = 18;
	          return put(out, value);
	
	        case 18:
	          stillOpen = context$2$0.sent;
	
	          if (stillOpen) {
	            context$2$0.next = 21;
	            break;
	          }
	
	          return context$2$0.abrupt("break", 23);
	
	        case 21:
	          context$2$0.next = 1;
	          break;
	
	        case 23:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return m;
	}
	
	mix.MUTE = "mute";
	mix.PAUSE = "pause";
	mix.SOLO = "solo";
	var VALID_SOLO_MODES = [mix.MUTE, mix.PAUSE];
	
	mix.add = function admix(m, ch) {
	  m.admix(ch);
	};
	
	mix.remove = function unmix(m, ch) {
	  m.unmix(ch);
	};
	
	mix.removeAll = function unmixAll(m) {
	  m.unmixAll();
	};
	
	mix.toggle = function toggle(m, updateStateList) {
	  m.toggle(updateStateList);
	};
	
	mix.setSoloMode = function setSoloMode(m, mode) {
	  m.setSoloMode(mode);
	};
	
	function constantlyNull() {
	  return null;
	}
	
	var Pub = function Pub(ch, topicFn, bufferFn) {
	  this.ch = ch;
	  this.topicFn = topicFn;
	  this.bufferFn = bufferFn;
	  this.mults = {};
	};
	
	Pub.prototype._ensureMult = function (topic) {
	  var m = this.mults[topic];
	  var bufferFn = this.bufferFn;
	  if (!m) {
	    m = this.mults[topic] = mult(chan(bufferFn(topic)));
	  }
	  return m;
	};
	
	Pub.prototype.sub = function (topic, ch, keepOpen) {
	  var m = this._ensureMult(topic);
	  return mult.tap(m, ch, keepOpen);
	};
	
	Pub.prototype.unsub = function (topic, ch) {
	  var m = this.mults[topic];
	  if (m) {
	    mult.untap(m, ch);
	  }
	};
	
	Pub.prototype.unsubAll = function (topic) {
	  if (topic === undefined) {
	    this.mults = {};
	  } else {
	    delete this.mults[topic];
	  }
	};
	
	function pub(ch, topicFn, bufferFn) {
	  bufferFn = bufferFn || constantlyNull;
	  var p = new Pub(ch, topicFn, bufferFn);
	  go(_regeneratorRuntime.mark(function callee$1$0() {
	    var value, mults, topic, m, stillOpen;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 17;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return take(ch);
	
	        case 3:
	          value = context$2$0.sent;
	          mults = p.mults;
	
	          if (!(value === CLOSED)) {
	            context$2$0.next = 8;
	            break;
	          }
	
	          for (topic in mults) {
	            mults[topic].muxch().close();
	          }
	          return context$2$0.abrupt("break", 17);
	
	        case 8:
	          // TODO: Somehow ensure/document that this must return a string
	          // (otherwise use proper (hash)maps)
	          topic = topicFn(value);
	          m = mults[topic];
	
	          if (!m) {
	            context$2$0.next = 15;
	            break;
	          }
	
	          context$2$0.next = 13;
	          return put(m.muxch(), value);
	
	        case 13:
	          stillOpen = context$2$0.sent;
	
	          if (!stillOpen) {
	            delete mults[topic];
	          }
	
	        case 15:
	          context$2$0.next = 0;
	          break;
	
	        case 17:
	        case "end":
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }));
	  return p;
	}
	
	pub.sub = function sub(p, topic, ch, keepOpen) {
	  return p.sub(topic, ch, keepOpen);
	};
	
	pub.unsub = function unsub(p, topic, ch) {
	  p.unsub(topic, ch);
	};
	
	pub.unsubAll = function unsubAll(p, topic) {
	  p.unsubAll(topic);
	};
	
	module.exports = {
	  mapFrom: mapFrom,
	  mapInto: mapInto,
	  filterFrom: filterFrom,
	  filterInto: filterInto,
	  removeFrom: removeFrom,
	  removeInto: removeInto,
	  mapcatFrom: mapcatFrom,
	  mapcatInto: mapcatInto,
	
	  pipe: pipe,
	  split: split,
	  reduce: reduce,
	  onto: onto,
	  fromColl: fromColl,
	
	  map: map,
	  merge: merge,
	  into: into,
	  take: takeN,
	  unique: unique,
	  partition: partition,
	  partitionBy: partitionBy,
	
	  mult: mult,
	  mix: mix,
	  pub: pub
	};
	
	// Possible "fluid" interfaces:

	// thread(
	//   [fromColl, [1, 2, 3, 4]],
	//   [mapFrom, inc],
	//   [into, []]
	// )

	// thread(
	//   [fromColl, [1, 2, 3, 4]],
	//   [mapFrom, inc, _],
	//   [into, [], _]
	// )

	// wrap()
	//   .fromColl([1, 2, 3, 4])
	//   .mapFrom(inc)
	//   .into([])
	//   .unwrap();

	// FIX: Should be a generic looping interface (for...in?)

	// Remove closed channel
	// yield alts(inchannel, closemultchan)
	// XXX: This is because putAsync can actually call back
	// immediately. Fix that
	// ... waiting for all puts to complete

/***/ },
/* 16 */
/*!********************************************************!*\
  !*** /Users/topher/dev/core-async/src/csp.pipeline.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _regeneratorRuntime = __webpack_require__(/*! babel-runtime/regenerator */ 2)['default'];
	
	var csp = __webpack_require__(/*! ./csp.core */ 14);
	
	function pipelineInternal(n, to, from, close, taskFn) {
	  if (n <= 0) {
	    throw new Error('n must be positive');
	  }
	
	  var jobs = csp.chan(n);
	  var results = csp.chan(n);
	
	  for (var _ = 0; _ < n; _++) {
	    csp.go(_regeneratorRuntime.mark(function callee$1$0(taskFn, jobs, results) {
	      var job;
	      return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	        while (1) switch (context$2$0.prev = context$2$0.next) {
	          case 0:
	            if (false) {
	              context$2$0.next = 9;
	              break;
	            }
	
	            context$2$0.next = 3;
	            return csp.take(jobs);
	
	          case 3:
	            job = context$2$0.sent;
	
	            if (taskFn(job)) {
	              context$2$0.next = 7;
	              break;
	            }
	
	            results.close();
	            return context$2$0.abrupt('break', 9);
	
	          case 7:
	            context$2$0.next = 0;
	            break;
	
	          case 9:
	          case 'end':
	            return context$2$0.stop();
	        }
	      }, callee$1$0, this);
	    }), [taskFn, jobs, results]);
	  }
	
	  csp.go(_regeneratorRuntime.mark(function callee$1$0(jobs, from, results) {
	    var v, p;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 16;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return csp.take(from);
	
	        case 3:
	          v = context$2$0.sent;
	
	          if (!(v === csp.CLOSED)) {
	            context$2$0.next = 9;
	            break;
	          }
	
	          jobs.close();
	          return context$2$0.abrupt('break', 16);
	
	        case 9:
	          p = csp.chan(1);
	          context$2$0.next = 12;
	          return csp.put(jobs, [v, p]);
	
	        case 12:
	          context$2$0.next = 14;
	          return csp.put(results, p);
	
	        case 14:
	          context$2$0.next = 0;
	          break;
	
	        case 16:
	        case 'end':
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }), [jobs, from, results]);
	
	  csp.go(_regeneratorRuntime.mark(function callee$1$0(results, close, to) {
	    var p, res, v;
	    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
	      while (1) switch (context$2$0.prev = context$2$0.next) {
	        case 0:
	          if (false) {
	            context$2$0.next = 26;
	            break;
	          }
	
	          context$2$0.next = 3;
	          return csp.take(results);
	
	        case 3:
	          p = context$2$0.sent;
	
	          if (!(p === csp.CLOSED)) {
	            context$2$0.next = 9;
	            break;
	          }
	
	          if (close) {
	            to.close();
	          }
	          return context$2$0.abrupt('break', 26);
	
	        case 9:
	          context$2$0.next = 11;
	          return csp.take(p);
	
	        case 11:
	          res = context$2$0.sent;
	
	        case 12:
	          if (false) {
	            context$2$0.next = 24;
	            break;
	          }
	
	          context$2$0.next = 15;
	          return csp.take(res);
	
	        case 15:
	          v = context$2$0.sent;
	
	          if (!(v !== csp.CLOSED)) {
	            context$2$0.next = 21;
	            break;
	          }
	
	          context$2$0.next = 19;
	          return csp.put(to, v);
	
	        case 19:
	          context$2$0.next = 22;
	          break;
	
	        case 21:
	          return context$2$0.abrupt('break', 24);
	
	        case 22:
	          context$2$0.next = 12;
	          break;
	
	        case 24:
	          context$2$0.next = 0;
	          break;
	
	        case 26:
	        case 'end':
	          return context$2$0.stop();
	      }
	    }, callee$1$0, this);
	  }), [results, close, to]);
	
	  return to;
	}
	
	function pipeline(to, xf, from, keepOpen, exHandler) {
	
	  function taskFn(job) {
	    if (job === csp.CLOSED) {
	      return null;
	    } else {
	      var v = job[0];
	      var p = job[1];
	      var res = csp.chan(1, xf, exHandler);
	
	      csp.go(_regeneratorRuntime.mark(function callee$2$0(res, v) {
	        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
	          while (1) switch (context$3$0.prev = context$3$0.next) {
	            case 0:
	              context$3$0.next = 2;
	              return csp.put(res, v);
	
	            case 2:
	              res.close();
	
	            case 3:
	            case 'end':
	              return context$3$0.stop();
	          }
	        }, callee$2$0, this);
	      }), [res, v]);
	
	      csp.putAsync(p, res);
	
	      return true;
	    }
	  }
	
	  return pipelineInternal(1, to, from, !keepOpen, taskFn);
	}
	
	function pipelineAsync(n, to, af, from, keepOpen) {
	
	  function taskFn(job) {
	    if (job === csp.CLOSED) {
	      return null;
	    } else {
	      var v = job[0];
	      var p = job[1];
	      var res = csp.chan(1);
	      af(v, res);
	      csp.putAsync(p, res);
	      return true;
	    }
	  }
	
	  return pipelineInternal(n, to, from, !keepOpen, taskFn);
	}
	
	module.exports = {
	  pipeline: pipeline,
	  pipelineAsync: pipelineAsync
	};

/***/ },
/* 17 */
/*!**********************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/symbol.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 33), __esModule: true };

/***/ },
/* 18 */
/*!*******************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/symbol/iterator.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 31), __esModule: true };

/***/ },
/* 19 */
/*!***********************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/core-js/promise.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/promise */ 32), __esModule: true };

/***/ },
/* 20 */
/*!********************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/map.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 34);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 35);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 36);
	__webpack_require__(/*! ../modules/es6.map */ 37);
	__webpack_require__(/*! ../modules/es7.map.to-json */ 38);
	module.exports = __webpack_require__(/*! ../modules/$ */ 39).core.Map;

/***/ },
/* 21 */
/*!********************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/set.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 34);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 35);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 36);
	__webpack_require__(/*! ../modules/es6.set */ 41);
	__webpack_require__(/*! ../modules/es7.set.to-json */ 42);
	module.exports = __webpack_require__(/*! ../modules/$ */ 39).core.Set;

/***/ },
/* 22 */
/*!***************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/object/define-property.js ***!
  \***************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ../../modules/$ */ 39);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 23 */
/*!******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/object/create.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ../../modules/$ */ 39);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 24 */
/*!***************************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/object/get-own-property-descriptor.js ***!
  \***************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ../../modules/$ */ 39);
	__webpack_require__(/*! ../../modules/es6.object.statics-accept-primitives */ 40);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 25 */
/*!**********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/process/browser.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 26 */
/*!********************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/buffers.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// TODO: Consider EmptyError & FullError to avoid redundant bound
	// checks, to improve performance (may need benchmarks)
	
	function acopy(src, src_start, dst, dst_start, length) {
	  var count = 0;
	  while (true) {
	    if (count >= length) {
	      break;
	    }
	    dst[dst_start + count] = src[src_start + count];
	    count++;
	  }
	}
	
	function noop() {};
	
	var EMPTY = {
	  toString: function toString() {
	    return "[object EMPTY]";
	  }
	};
	
	var RingBuffer = function RingBuffer(head, tail, length, array) {
	  this.length = length;
	  this.array = array;
	  this.head = head;
	  this.tail = tail;
	};
	
	// Internal method, callers must do bound check
	RingBuffer.prototype._unshift = function (item) {
	  var array = this.array;
	  var head = this.head;
	  array[head] = item;
	  this.head = (head + 1) % array.length;
	  this.length++;
	};
	
	RingBuffer.prototype._resize = function () {
	  var array = this.array;
	  var new_length = 2 * array.length;
	  var new_array = new Array(new_length);
	  var head = this.head;
	  var tail = this.tail;
	  var length = this.length;
	  if (tail < head) {
	    acopy(array, tail, new_array, 0, length);
	    this.tail = 0;
	    this.head = length;
	    this.array = new_array;
	  } else if (tail > head) {
	    acopy(array, tail, new_array, 0, array.length - tail);
	    acopy(array, 0, new_array, array.length - tail, head);
	    this.tail = 0;
	    this.head = length;
	    this.array = new_array;
	  } else if (tail === head) {
	    this.tail = 0;
	    this.head = 0;
	    this.array = new_array;
	  }
	};
	
	RingBuffer.prototype.unbounded_unshift = function (item) {
	  if (this.length + 1 === this.array.length) {
	    this._resize();
	  }
	  this._unshift(item);
	};
	
	RingBuffer.prototype.pop = function () {
	  if (this.length === 0) {
	    return EMPTY;
	  }
	  var array = this.array;
	  var tail = this.tail;
	  var item = array[tail];
	  array[tail] = null;
	  this.tail = (tail + 1) % array.length;
	  this.length--;
	  return item;
	};
	
	RingBuffer.prototype.cleanup = function (predicate) {
	  var length = this.length;
	  for (var i = 0; i < length; i++) {
	    var item = this.pop();
	    if (predicate(item)) {
	      this._unshift(item);
	    }
	  }
	};
	
	var FixedBuffer = function FixedBuffer(buf, n) {
	  this.buf = buf;
	  this.n = n;
	};
	
	FixedBuffer.prototype.is_full = function () {
	  return this.buf.length >= this.n;
	};
	
	FixedBuffer.prototype.remove = function () {
	  return this.buf.pop();
	};
	
	FixedBuffer.prototype.add = function (item) {
	  // Note that even though the underlying buffer may grow, "n" is
	  // fixed so after overflowing the buffer is still considered full.
	  this.buf.unbounded_unshift(item);
	};
	
	FixedBuffer.prototype.count = function () {
	  return this.buf.length;
	};
	
	FixedBuffer.prototype.close = noop;
	
	var DroppingBuffer = function DroppingBuffer(buf, n) {
	  this.buf = buf;
	  this.n = n;
	};
	
	DroppingBuffer.prototype.is_full = function () {
	  return false;
	};
	
	DroppingBuffer.prototype.remove = function () {
	  return this.buf.pop();
	};
	
	DroppingBuffer.prototype.add = function (item) {
	  if (this.buf.length < this.n) {
	    this.buf._unshift(item);
	  }
	};
	
	DroppingBuffer.prototype.count = function () {
	  return this.buf.length;
	};
	
	DroppingBuffer.prototype.close = noop;
	
	var SlidingBuffer = function SlidingBuffer(buf, n) {
	  this.buf = buf;
	  this.n = n;
	};
	
	SlidingBuffer.prototype.is_full = function () {
	  return false;
	};
	
	SlidingBuffer.prototype.remove = function () {
	  return this.buf.pop();
	};
	
	SlidingBuffer.prototype.add = function (item) {
	  if (this.buf.length === this.n) {
	    this.buf.pop();
	  }
	  this.buf._unshift(item);
	};
	
	SlidingBuffer.prototype.count = function () {
	  return this.buf.length;
	};
	
	SlidingBuffer.prototype.close = noop;
	
	var PromiseBuffer = function PromiseBuffer() {
	  this.val = EMPTY;
	};
	
	PromiseBuffer.prototype.count = function () {
	  return this.val === EMPTY ? 0 : 1;
	};
	
	PromiseBuffer.prototype.add = function (item) {
	  if (this.val === EMPTY) {
	    this.val = item;
	  }
	};
	
	PromiseBuffer.prototype.is_full = function () {
	  return false;
	};
	
	PromiseBuffer.prototype.remove = function () {
	  return this.val;
	};
	
	PromiseBuffer.prototype.close = function () {
	  this.val = EMPTY;
	};
	
	var ring = exports.ring = function ring_buffer(n) {
	  return new RingBuffer(0, 0, 0, new Array(n));
	};
	
	/**
	 * Returns a buffer that is considered "full" when it reaches size n,
	 * but still accepts additional items, effectively allow overflowing.
	 * The overflowing behavior is useful for supporting "expanding"
	 * transducers, where we want to check if a buffer is full before
	 * running the transduced step function, while still allowing a
	 * transduced step to expand into multiple "essence" steps.
	 */
	exports.fixed = function fixed_buffer(n) {
	  return new FixedBuffer(ring(n), n);
	};
	
	exports.dropping = function dropping_buffer(n) {
	  return new DroppingBuffer(ring(n), n);
	};
	
	exports.sliding = function sliding_buffer(n) {
	  return new SlidingBuffer(ring(n), n);
	};
	
	exports.promise = function promise_buffer() {
	  return new PromiseBuffer();
	};
	
	exports.EMPTY = EMPTY;

/***/ },
/* 27 */
/*!*********************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/channels.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var buffers = __webpack_require__(/*! ./buffers */ 26);
	var dispatch = __webpack_require__(/*! ./dispatch */ 43);
	
	var MAX_DIRTY = 64;
	var MAX_QUEUE_SIZE = 1024;
	
	var CLOSED = null;
	
	var Box = function Box(value) {
	  this.value = value;
	};
	
	var PutBox = function PutBox(handler, value) {
	  this.handler = handler;
	  this.value = value;
	};
	
	var Channel = function Channel(takes, puts, buf, xform) {
	  this.buf = buf;
	  this.xform = xform;
	  this.takes = takes;
	  this.puts = puts;
	
	  this.dirty_takes = 0;
	  this.dirty_puts = 0;
	  this.closed = false;
	};
	
	function isReduced(v) {
	  return v && v["@@transducer/reduced"];
	}
	
	function schedule(f, v) {
	  dispatch.run(function () {
	    f(v);
	  });
	}
	
	Channel.prototype._put = function (value, handler) {
	  if (value === CLOSED) {
	    throw new Error("Cannot put CLOSED on a channel.");
	  }
	
	  // TODO: I'm not sure how this can happen, because the operations
	  // are registered in 1 tick, and the only way for this to be inactive
	  // is for a previous operation in the same alt to have returned
	  // immediately, which would have short-circuited to prevent this to
	  // be ever register anyway. The same thing goes for the active check
	  // in "_take".
	  if (!handler.is_active()) {
	    return null;
	  }
	
	  if (this.closed) {
	    handler.commit();
	    return new Box(false);
	  }
	
	  var taker, callback;
	
	  // Soak the value through the buffer first, even if there is a
	  // pending taker. This way the step function has a chance to act on the
	  // value.
	  if (this.buf && !this.buf.is_full()) {
	    handler.commit();
	    var done = isReduced(this.xform["@@transducer/step"](this.buf, value));
	    while (true) {
	      if (this.buf.count() === 0) {
	        break;
	      }
	      taker = this.takes.pop();
	      if (taker === buffers.EMPTY) {
	        break;
	      }
	      if (taker.is_active()) {
	        value = this.buf.remove();
	        callback = taker.commit();
	        schedule(callback, value);
	      }
	    }
	    if (done) {
	      this.close();
	    }
	    return new Box(true);
	  }
	
	  // Either the buffer is full, in which case there won't be any
	  // pending takes, or we don't have a buffer, in which case this loop
	  // fulfills the first of them that is active (note that we don't
	  // have to worry about transducers here since we require a buffer
	  // for that).
	  while (true) {
	    taker = this.takes.pop();
	    if (taker === buffers.EMPTY) {
	      break;
	    }
	    if (taker.is_active()) {
	      handler.commit();
	      callback = taker.commit();
	      schedule(callback, value);
	      return new Box(true);
	    }
	  }
	
	  // No buffer, full buffer, no pending takes. Queue this put now if blockable.
	  if (this.dirty_puts > MAX_DIRTY) {
	    this.puts.cleanup(function (putter) {
	      return putter.handler.is_active();
	    });
	    this.dirty_puts = 0;
	  } else {
	    this.dirty_puts++;
	  }
	  if (handler.is_blockable()) {
	    if (this.puts.length >= MAX_QUEUE_SIZE) {
	      throw new Error("No more than " + MAX_QUEUE_SIZE + " pending puts are allowed on a single channel.");
	    }
	    this.puts.unbounded_unshift(new PutBox(handler, value));
	  }
	  return null;
	};
	
	Channel.prototype._take = function (handler) {
	  if (!handler.is_active()) {
	    return null;
	  }
	
	  var putter, put_handler, callback, value;
	
	  if (this.buf && this.buf.count() > 0) {
	    handler.commit();
	    value = this.buf.remove();
	    // We need to check pending puts here, other wise they won't
	    // be able to proceed until their number reaches MAX_DIRTY
	    while (true) {
	      if (this.buf.is_full()) {
	        break;
	      }
	      putter = this.puts.pop();
	      if (putter === buffers.EMPTY) {
	        break;
	      }
	      put_handler = putter.handler;
	      if (put_handler.is_active()) {
	        callback = put_handler.commit();
	        if (callback) {
	          schedule(callback, true);
	        }
	        if (isReduced(this.xform["@@transducer/step"](this.buf, putter.value))) {
	          this.close();
	        }
	      }
	    }
	    return new Box(value);
	  }
	
	  // Either the buffer is empty, in which case there won't be any
	  // pending puts, or we don't have a buffer, in which case this loop
	  // fulfills the first of them that is active (note that we don't
	  // have to worry about transducers here since we require a buffer
	  // for that).
	  while (true) {
	    putter = this.puts.pop();
	    value = putter.value;
	    if (putter === buffers.EMPTY) {
	      break;
	    }
	    put_handler = putter.handler;
	    if (put_handler.is_active()) {
	      handler.commit();
	      callback = put_handler.commit();
	      if (callback) {
	        schedule(callback, true);
	      }
	      return new Box(value);
	    }
	  }
	
	  if (this.closed) {
	    handler.commit();
	    return new Box(CLOSED);
	  }
	
	  // No buffer, empty buffer, no pending puts. Queue this take now if blockable.
	  if (this.dirty_takes > MAX_DIRTY) {
	    this.takes.cleanup(function (handler) {
	      return handler.is_active();
	    });
	    this.dirty_takes = 0;
	  } else {
	    this.dirty_takes++;
	  }
	  if (handler.is_blockable()) {
	    if (this.takes.length >= MAX_QUEUE_SIZE) {
	      throw new Error("No more than " + MAX_QUEUE_SIZE + " pending takes are allowed on a single channel.");
	    }
	    this.takes.unbounded_unshift(handler);
	  }
	  return null;
	};
	
	Channel.prototype.close = function () {
	  if (this.closed) {
	    return;
	  }
	  this.closed = true;
	
	  // TODO: Duplicate code. Make a "_flush" function or something
	  if (this.buf) {
	    this.buf.close();
	    this.xform["@@transducer/result"](this.buf);
	    while (true) {
	      if (this.buf.count() === 0) {
	        break;
	      }
	      taker = this.takes.pop();
	      if (taker === buffers.EMPTY) {
	        break;
	      }
	      if (taker.is_active()) {
	        callback = taker.commit();
	        var value = this.buf.remove();
	        schedule(callback, value);
	      }
	    }
	  }
	
	  while (true) {
	    var taker = this.takes.pop();
	    if (taker === buffers.EMPTY) {
	      break;
	    }
	    if (taker.is_active()) {
	      var callback = taker.commit();
	      schedule(callback, CLOSED);
	    }
	  }
	
	  while (true) {
	    var putter = this.puts.pop();
	    if (putter === buffers.EMPTY) {
	      break;
	    }
	    if (putter.handler.is_active()) {
	      var put_callback = putter.handler.commit();
	      if (put_callback) {
	        schedule(put_callback, false);
	      }
	    }
	  }
	};
	
	Channel.prototype.is_closed = function () {
	  return this.closed;
	};
	
	function defaultHandler(e) {
	  console.log("error in channel transformer", e.stack);
	  return CLOSED;
	}
	
	function handleEx(buf, exHandler, e) {
	  var def = (exHandler || defaultHandler)(e);
	  if (def !== CLOSED) {
	    buf.add(def);
	  }
	  return buf;
	}
	
	// The base transformer object to use with transducers
	function AddTransformer() {}
	
	AddTransformer.prototype["@@transducer/init"] = function () {
	  throw new Error("init not available");
	};
	
	AddTransformer.prototype["@@transducer/result"] = function (v) {
	  return v;
	};
	
	AddTransformer.prototype["@@transducer/step"] = function (buffer, input) {
	  buffer.add(input);
	  return buffer;
	};
	
	function handleException(exHandler) {
	  return function (xform) {
	    return {
	      "@@transducer/step": function transducerStep(buffer, input) {
	        try {
	          return xform["@@transducer/step"](buffer, input);
	        } catch (e) {
	          return handleEx(buffer, exHandler, e);
	        }
	      },
	      "@@transducer/result": function transducerResult(buffer) {
	        try {
	          return xform["@@transducer/result"](buffer);
	        } catch (e) {
	          return handleEx(buffer, exHandler, e);
	        }
	      }
	    };
	  };
	}
	
	// XXX: This is inconsistent. We should either call the reducing
	// function xform, or call the transducer xform, not both
	exports.chan = function (buf, xform, exHandler) {
	  if (xform) {
	    if (!buf) {
	      throw new Error("Only buffered channels can use transducers");
	    }
	
	    xform = xform(new AddTransformer());
	  } else {
	    xform = new AddTransformer();
	  }
	  xform = handleException(exHandler)(xform);
	
	  return new Channel(buffers.ring(32), buffers.ring(32), buf, xform);
	};
	
	exports.Box = Box;
	exports.Channel = Channel;
	exports.CLOSED = CLOSED;

/***/ },
/* 28 */
/*!*******************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/select.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Box = __webpack_require__(/*! ./channels */ 27).Box;
	
	var AltHandler = function AltHandler(flag, f) {
	  this.f = f;
	  this.flag = flag;
	};
	
	AltHandler.prototype.is_active = function () {
	  return this.flag.value;
	};
	
	AltHandler.prototype.is_blockable = function () {
	  return true;
	};
	
	AltHandler.prototype.commit = function () {
	  this.flag.value = false;
	  return this.f;
	};
	
	var AltResult = function AltResult(value, channel) {
	  this.value = value;
	  this.channel = channel;
	};
	
	function rand_int(n) {
	  return Math.floor(Math.random() * (n + 1));
	}
	
	function random_array(n) {
	  var a = new Array(n);
	  var i;
	  for (i = 0; i < n; i++) {
	    a[i] = 0;
	  }
	  for (i = 1; i < n; i++) {
	    var j = rand_int(i);
	    a[i] = a[j];
	    a[j] = i;
	  }
	  return a;
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var DEFAULT = {
	  toString: function toString() {
	    return "[object DEFAULT]";
	  }
	};
	
	// TODO: Accept a priority function or something
	exports.do_alts = function (operations, callback, options) {
	  var length = operations.length;
	  // XXX Hmm
	  if (length === 0) {
	    throw new Error("Empty alt list");
	  }
	
	  var priority = options && options.priority ? true : false;
	  if (!priority) {
	    var indexes = random_array(length);
	  }
	
	  var flag = new Box(true);
	
	  for (var i = 0; i < length; i++) {
	    var operation = operations[priority ? i : indexes[i]];
	    var port, result;
	    // XXX Hmm
	    if (operation instanceof Array) {
	      var value = operation[1];
	      port = operation[0];
	      // We wrap this in a function to capture the value of "port",
	      // because js' closure captures vars by "references", not
	      // values. "let port" would have worked, but I don't want to
	      // raise the runtime requirement yet. TODO: So change this when
	      // most runtimes are modern enough.
	      result = port._put(value, (function (port) {
	        return new AltHandler(flag, function (ok) {
	          callback(new AltResult(ok, port));
	        });
	      })(port));
	    } else {
	      port = operation;
	      result = port._take((function (port) {
	        return new AltHandler(flag, function (value) {
	          callback(new AltResult(value, port));
	        });
	      })(port));
	    }
	    // XXX Hmm
	    if (result instanceof Box) {
	      callback(new AltResult(result.value, port));
	      break;
	    }
	  }
	
	  if (!(result instanceof Box) && options && hasOwnProperty.call(options, "default")) {
	    if (flag.value) {
	      flag.value = false;
	      callback(new AltResult(options["default"], DEFAULT));
	    }
	  }
	};
	
	exports.DEFAULT = DEFAULT;

/***/ },
/* 29 */
/*!********************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/process.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dispatch = __webpack_require__(/*! ./dispatch */ 43);
	var select = __webpack_require__(/*! ./select */ 28);
	var Channel = __webpack_require__(/*! ./channels */ 27).Channel;
	
	var NO_VALUE = null;
	
	var FnHandler = function FnHandler(f) {
	  this.f = f;
	};
	
	FnHandler.prototype.is_active = function () {
	  return true;
	};
	
	FnHandler.prototype.is_blockable = function () {
	  return !!this.f;
	};
	
	FnHandler.prototype.commit = function () {
	  return this.f;
	};
	
	function put_then_callback(channel, value, callback) {
	  var result = channel._put(value, new FnHandler(callback));
	  if (result && callback) {
	    callback(result.value);
	  }
	}
	
	function take_then_callback(channel, callback) {
	  var result = channel._take(new FnHandler(callback));
	  if (result) {
	    // if (result.value instanceof Error) {
	    //   throw result.value;
	    // } else {
	    callback(result.value);
	    // }
	  }
	}
	
	var Process = function Process(gen, onFinish, creator) {
	  this.gen = gen;
	  this.creatorFunc = creator;
	  this.finished = false;
	  this.onFinish = onFinish;
	};
	
	var Instruction = function Instruction(op, data) {
	  this.op = op;
	  this.data = data;
	};
	
	var TAKE = "take";
	var PUT = "put";
	var SLEEP = "sleep";
	var ALTS = "alts";
	
	// TODO FIX XXX: This is a (probably) temporary hack to avoid blowing
	// up the stack, but it means double queueing when the value is not
	// immediately available
	Process.prototype._continue = function (response) {
	  var self = this;
	  dispatch.run(function () {
	    self.run(response);
	  });
	};
	
	Process.prototype._done = function (value) {
	  if (!this.finished) {
	    this.finished = true;
	    var onFinish = this.onFinish;
	    if (typeof onFinish === "function") {
	      dispatch.run(function () {
	        onFinish(value);
	      });
	    }
	  }
	};
	
	Process.prototype.run = function (response) {
	  if (this.finished) {
	    return;
	  }
	
	  // if (response instanceof Error) {
	  //   throw response;
	  // }
	
	  // TODO: Shouldn't we (optionally) stop error propagation here (and
	  // signal the error through a channel or something)? Otherwise the
	  // uncaught exception will crash some runtimes (e.g. Node)
	  var iter = this.gen.next(response);
	  if (iter.done) {
	    this._done(iter.value);
	    return;
	  }
	
	  var ins = iter.value;
	  var self = this;
	
	  if (ins instanceof Instruction) {
	    switch (ins.op) {
	      case PUT:
	        var data = ins.data;
	        put_then_callback(data.channel, data.value, function (ok) {
	          self._continue(ok);
	        });
	        break;
	
	      case TAKE:
	        var channel = ins.data;
	        take_then_callback(channel, function (value) {
	          self._continue(value);
	        });
	        break;
	
	      case SLEEP:
	        var msecs = ins.data;
	        dispatch.queue_delay(function () {
	          self.run(null);
	        }, msecs);
	        break;
	
	      case ALTS:
	        select.do_alts(ins.data.operations, function (result) {
	          self._continue(result);
	        }, ins.data.options);
	        break;
	    }
	  } else if (ins instanceof Channel) {
	    var channel = ins;
	    take_then_callback(channel, function (value) {
	      self._continue(value);
	    });
	  }
	  // TakeChannel includes API: Chan, Mix, Go, and Alts
	  else if (ins._chan instanceof Channel) {
	    var channel = ins._chan;
	    take_then_callback(channel, function (value) {
	      self._continue(value);
	    });
	  } else {
	    this._continue(ins);
	  }
	};
	
	function take(channel) {
	  return new Instruction(TAKE, channel);
	}
	
	function put(channel, value) {
	  return new Instruction(PUT, {
	    channel: channel,
	    value: value
	  });
	}
	
	function poll(channel) {
	  if (channel.closed) {
	    return NO_VALUE;
	  }
	
	  var result = channel._take(new FnHandler());
	  if (result) {
	    return result.value;
	  } else {
	    return NO_VALUE;
	  }
	}
	
	function offer(channel, value) {
	  if (channel.closed) {
	    return false;
	  }
	
	  var result = channel._put(value, new FnHandler());
	  if (result) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	function sleep(msecs) {
	  return new Instruction(SLEEP, msecs);
	}
	
	function alts(operations, options) {
	  return new Instruction(ALTS, {
	    operations: operations,
	    options: options
	  });
	}
	
	exports.put_then_callback = put_then_callback;
	exports.take_then_callback = take_then_callback;
	exports.put = put;
	exports.take = take;
	exports.offer = offer;
	exports.poll = poll;
	exports.sleep = sleep;
	exports.alts = alts;
	exports.Instruction = Instruction;
	exports.Process = Process;
	exports.NO_VALUE = NO_VALUE;

/***/ },
/* 30 */
/*!*******************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/timers.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dispatch = __webpack_require__(/*! ./dispatch */ 43);
	var channels = __webpack_require__(/*! ./channels */ 27);
	
	exports.timeout = function timeout_channel(msecs) {
	  var chan = channels.chan();
	  dispatch.queue_delay(function () {
	    chan.close();
	  }, msecs);
	  return chan;
	};

/***/ },
/* 31 */
/*!********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/symbol/iterator.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 35);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 36);
	module.exports = __webpack_require__(/*! ../../modules/$.wks */ 44)('iterator');

/***/ },
/* 32 */
/*!************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/promise.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/es6.object.to-string */ 34);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 35);
	__webpack_require__(/*! ../modules/web.dom.iterable */ 36);
	__webpack_require__(/*! ../modules/es6.promise */ 45);
	module.exports = __webpack_require__(/*! ../modules/$ */ 39).core.Promise;

/***/ },
/* 33 */
/*!*****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/fn/symbol/index.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 46);
	module.exports = __webpack_require__(/*! ../../modules/$ */ 39).core.Symbol;

/***/ },
/* 34 */
/*!******************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.object.to-string.js ***!
  \******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./$.cof */ 51)
	  , tmp = {};
	tmp[__webpack_require__(/*! ./$.wks */ 44)('toStringTag')] = 'z';
	if(__webpack_require__(/*! ./$ */ 39).FW && cof(tmp) != 'z'){
	  __webpack_require__(/*! ./$.redef */ 52)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 35 */
/*!*****************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.string.iterator.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(/*! ./$ */ 39).set
	  , $at   = __webpack_require__(/*! ./$.string-at */ 47)(true)
	  , ITER  = __webpack_require__(/*! ./$.uid */ 48).safe('iter')
	  , $iter = __webpack_require__(/*! ./$.iter */ 49)
	  , step  = $iter.step;
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./$.iter-define */ 50)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 36 */
/*!**************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/web.dom.iterable.js ***!
  \**************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 53);
	var $           = __webpack_require__(/*! ./$ */ 39)
	  , Iterators   = __webpack_require__(/*! ./$.iter */ 49).Iterators
	  , ITERATOR    = __webpack_require__(/*! ./$.wks */ 44)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 37 */
/*!*****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.map.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./$.collection-strong */ 54);
	
	// 23.1 Map Objects
	__webpack_require__(/*! ./$.collection */ 55)('Map', function(get){
	  return function Map(){ return get(this, arguments[0]); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 38 */
/*!*************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es7.map.to-json.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(/*! ./$.collection-to-json */ 56)('Map');

/***/ },
/* 39 */
/*!***********************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.js ***!
  \***********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(/*! ./$.fw */ 57)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 40 */
/*!**********************************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.object.statics-accept-primitives.js ***!
  \**********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(/*! ./$ */ 39)
	  , $def     = __webpack_require__(/*! ./$.def */ 58)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(/*! ./$.get-names */ 59).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 41 */
/*!*****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.set.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(/*! ./$.collection-strong */ 54);
	
	// 23.2 Set Objects
	__webpack_require__(/*! ./$.collection */ 55)('Set', function(get){
	  return function Set(){ return get(this, arguments[0]); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 42 */
/*!*************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es7.set.to-json.js ***!
  \*************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	__webpack_require__(/*! ./$.collection-to-json */ 56)('Set');

/***/ },
/* 43 */
/*!*********************************************************!*\
  !*** /Users/topher/dev/core-async/src/impl/dispatch.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";
	
	// TODO: Use process.nextTick if it's available since it's more
	// efficient
	// http://howtonode.org/understanding-process-next-tick
	// Maybe we don't even need to queue ourselves in that case?
	
	// XXX: But http://blog.nodejs.org/2013/03/11/node-v0-10-0-stable/
	// Looks like it will blow up the stack (or is that just about
	// pre-empting IO (but that's already bad enough IMO)?)
	
	// Looks like
	// http://nodejs.org/api/process.html#process_process_nexttick_callback
	// is the equivalent of our TASK_BATCH_SIZE
	
	var buffers = __webpack_require__(/*! ./buffers */ 26);
	
	var TASK_BATCH_SIZE = 1024;
	
	var tasks = buffers.ring(32);
	var running = false;
	var queued = false;
	
	var queue_dispatcher;
	
	function process_messages() {
	  running = true;
	  queued = false;
	  var count = 0;
	  while (true) {
	    var task = tasks.pop();
	    if (task === buffers.EMPTY) {
	      break;
	    }
	    // TODO: Don't we need a try/finally here?
	    task();
	    if (count >= TASK_BATCH_SIZE) {
	      break;
	    }
	    count++;
	  }
	  running = false;
	  if (tasks.length > 0) {
	    queue_dispatcher();
	  }
	}
	
	if (typeof MessageChannel !== "undefined") {
	  var message_channel = new MessageChannel();
	  message_channel.port1.onmessage = function (_) {
	    process_messages();
	  };
	  queue_dispatcher = function () {
	    if (!(queued && running)) {
	      queued = true;
	      message_channel.port2.postMessage(0);
	    }
	  };
	} else if (typeof setImmediate !== "undefined") {
	  queue_dispatcher = function () {
	    if (!(queued && running)) {
	      queued = true;
	      setImmediate(process_messages);
	    }
	  };
	} else {
	  queue_dispatcher = function () {
	    if (!(queued && running)) {
	      queued = true;
	      setTimeout(process_messages, 0);
	    }
	  };
	}
	
	exports.run = function (f) {
	  tasks.unbounded_unshift(f);
	  queue_dispatcher();
	};
	
	exports.queue_delay = function (f, delay) {
	  setTimeout(f, delay);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/timers-browserify/main.js */ 61).setImmediate))

/***/ },
/* 44 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.wks.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./$ */ 39).g
	  , store  = __webpack_require__(/*! ./$.shared */ 60)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(/*! ./$.uid */ 48).safe('Symbol.' + name));
	};

/***/ },
/* 45 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.promise.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(/*! ./$ */ 39)
	  , ctx      = __webpack_require__(/*! ./$.ctx */ 62)
	  , cof      = __webpack_require__(/*! ./$.cof */ 51)
	  , $def     = __webpack_require__(/*! ./$.def */ 58)
	  , assert   = __webpack_require__(/*! ./$.assert */ 63)
	  , forOf    = __webpack_require__(/*! ./$.for-of */ 64)
	  , setProto = __webpack_require__(/*! ./$.set-proto */ 65).set
	  , same     = __webpack_require__(/*! ./$.same */ 66)
	  , species  = __webpack_require__(/*! ./$.species */ 67)
	  , SPECIES  = __webpack_require__(/*! ./$.wks */ 44)('species')
	  , RECORD   = __webpack_require__(/*! ./$.uid */ 48).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , isNode   = cof(process) == 'process'
	  , asap     = process && process.nextTick || __webpack_require__(/*! ./$.task */ 68).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;
	
	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}
	
	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && $.DESC){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  // strange IE + webpack dev server bug - use .call(global)
	  if(chain.length)asap.call(global, function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    asap.call(global, function(){
	      if(isUnhandled(promise = record.p)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      // strange IE + webpack dev server bug - use .call(global)
	      asap.call(global, function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	}
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(/*! ./$.mix */ 69)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(/*! ./$.iter-detect */ 70)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 46 */
/*!********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.symbol.js ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $        = __webpack_require__(/*! ./$ */ 39)
	  , setTag   = __webpack_require__(/*! ./$.cof */ 51).set
	  , uid      = __webpack_require__(/*! ./$.uid */ 48)
	  , shared   = __webpack_require__(/*! ./$.shared */ 60)
	  , $def     = __webpack_require__(/*! ./$.def */ 58)
	  , $redef   = __webpack_require__(/*! ./$.redef */ 52)
	  , keyOf    = __webpack_require__(/*! ./$.keyof */ 71)
	  , enumKeys = __webpack_require__(/*! ./$.enum-keys */ 72)
	  , assertObject = __webpack_require__(/*! ./$.assert */ 63).obj
	  , ObjectProto = Object.prototype
	  , DESC     = $.DESC
	  , has      = $.has
	  , $create  = $.create
	  , getDesc  = $.getDesc
	  , setDesc  = $.setDesc
	  , desc     = $.desc
	  , $names   = __webpack_require__(/*! ./$.get-names */ 59)
	  , getNames = $names.get
	  , toObject = $.toObject
	  , $Symbol  = $.g.Symbol
	  , setter   = false
	  , TAG      = uid('tag')
	  , HIDDEN   = uid('hidden')
	  , _propertyIsEnumerable = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols = shared('symbols')
	  , useNative = $.isFunction($Symbol);
	
	var setSymbolDesc = DESC ? function(){ // fallback for old Android
	  try {
	    return $create(setDesc({}, HIDDEN, {
	      get: function(){
	        return setDesc(this, HIDDEN, {value: false})[HIDDEN];
	      }
	    }))[HIDDEN] || setDesc;
	  } catch(e){
	    return function(it, key, D){
	      var protoDesc = getDesc(ObjectProto, key);
	      if(protoDesc)delete ObjectProto[key];
	      setDesc(it, key, D);
	      if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	    };
	  }
	}() : setDesc;
	
	function wrap(tag){
	  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
	  DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, desc(1, value));
	    }
	  });
	  return sym;
	}
	
	function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = $create(D, {enumerable: desc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	}
	function defineProperties(it, P){
	  assertObject(it);
	  var keys = enumKeys(P = toObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)defineProperty(it, key = keys[i++], P[key]);
	  return it;
	}
	function create(it, P){
	  return P === undefined ? $create(it) : defineProperties($create(it), P);
	}
	function propertyIsEnumerable(key){
	  var E = _propertyIsEnumerable.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	}
	function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	}
	function getOwnPropertyNames(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	}
	function getOwnPropertySymbols(it){
	  var names  = getNames(toObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	}
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function(){
	    return this[TAG];
	  });
	
	  $.create     = create;
	  $.setDesc    = defineProperty;
	  $.getDesc    = getOwnPropertyDescriptor;
	  $.setDescs   = defineProperties;
	  $.getNames   = $names.get = getOwnPropertyNames;
	  $.getSymbols = getOwnPropertySymbols;
	
	  if($.DESC && $.FW)$redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	    'species,split,toPrimitive,toStringTag,unscopables'
	  ).split(','), function(it){
	    var sym = __webpack_require__(/*! ./$.wks */ 44)(it);
	    symbolStatics[it] = useNative ? sym : wrap(sym);
	  }
	);
	
	setter = true;
	
	$def($def.G + $def.W, {Symbol: $Symbol});
	
	$def($def.S, 'Symbol', symbolStatics);
	
	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: getOwnPropertySymbols
	});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag($.g.JSON, 'JSON', true);

/***/ },
/* 47 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.string-at.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(/*! ./$ */ 39);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 48 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.uid.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(/*! ./$ */ 39).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 49 */
/*!****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.iter.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(/*! ./$ */ 39)
	  , cof               = __webpack_require__(/*! ./$.cof */ 51)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(/*! ./$.assert */ 63)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(/*! ./$.wks */ 44)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(/*! ./$.shared */ 60)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}
	
	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 50 */
/*!***********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.iter-define.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(/*! ./$.def */ 58)
	  , $redef          = __webpack_require__(/*! ./$.redef */ 52)
	  , $               = __webpack_require__(/*! ./$ */ 39)
	  , cof             = __webpack_require__(/*! ./$.cof */ 51)
	  , $iter           = __webpack_require__(/*! ./$.iter */ 49)
	  , SYMBOL_ITERATOR = __webpack_require__(/*! ./$.wks */ 44)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 51 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.cof.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(/*! ./$ */ 39)
	  , TAG      = __webpack_require__(/*! ./$.wks */ 44)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 52 */
/*!*****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.redef.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./$ */ 39).hide;

/***/ },
/* 53 */
/*!****************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/es6.array.iterator.js ***!
  \****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(/*! ./$ */ 39)
	  , setUnscope = __webpack_require__(/*! ./$.unscope */ 73)
	  , ITER       = __webpack_require__(/*! ./$.uid */ 48).safe('iter')
	  , $iter      = __webpack_require__(/*! ./$.iter */ 49)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(/*! ./$.iter-define */ 50)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 54 */
/*!*****************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.collection-strong.js ***!
  \*****************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(/*! ./$ */ 39)
	  , ctx      = __webpack_require__(/*! ./$.ctx */ 62)
	  , safe     = __webpack_require__(/*! ./$.uid */ 48).safe
	  , assert   = __webpack_require__(/*! ./$.assert */ 63)
	  , forOf    = __webpack_require__(/*! ./$.for-of */ 64)
	  , step     = __webpack_require__(/*! ./$.iter */ 49).step
	  , $has     = $.has
	  , set      = $.set
	  , isObject = $.isObject
	  , hide     = $.hide
	  , isExtensible = Object.isExtensible || isObject
	  , ID       = safe('id')
	  , O1       = safe('O1')
	  , LAST     = safe('last')
	  , FIRST    = safe('first')
	  , ITER     = safe('iter')
	  , SIZE     = $.DESC ? safe('size') : 'size'
	  , id       = 0;
	
	function fastKey(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	}
	
	function getEntry(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that[O1][index];
	  // frozen object case
	  for(entry = that[FIRST]; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	}
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      assert.inst(that, C, NAME);
	      set(that, O1, $.create(null));
	      set(that, SIZE, 0);
	      set(that, LAST, undefined);
	      set(that, FIRST, undefined);
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    __webpack_require__(/*! ./$.mix */ 69)(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that[FIRST] = that[LAST] = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that[O1][entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that[FIRST] == entry)that[FIRST] = next;
	          if(that[LAST] == entry)that[LAST] = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments[1], 3)
	          , entry;
	        while(entry = entry ? entry.n : this[FIRST]){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if($.DESC)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return assert.def(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that[O1][index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  // add .keys, .values, .entries, [@@iterator]
	  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	  setIter: function(C, NAME, IS_MAP){
	    __webpack_require__(/*! ./$.iter-define */ 50)(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	  }
	};

/***/ },
/* 55 */
/*!**********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.collection.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $     = __webpack_require__(/*! ./$ */ 39)
	  , $def  = __webpack_require__(/*! ./$.def */ 58)
	  , $iter = __webpack_require__(/*! ./$.iter */ 49)
	  , BUGGY = $iter.BUGGY
	  , forOf = __webpack_require__(/*! ./$.for-of */ 64)
	  , assertInstance = __webpack_require__(/*! ./$.assert */ 63).inst
	  , INTERNAL = __webpack_require__(/*! ./$.uid */ 48).safe('internal');
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = $.g[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!$.DESC || !$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    __webpack_require__(/*! ./$.mix */ 69)(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      assertInstance(target, C, NAME);
	      target[INTERNAL] = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var chain = KEY == 'add' || KEY == 'set';
	      if(KEY in proto)$.hide(C.prototype, KEY, function(a, b){
	        var result = this[INTERNAL][KEY](a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this[INTERNAL].size;
	      }
	    });
	  }
	
	  __webpack_require__(/*! ./$.cof */ 51).set(C, NAME);
	
	  O[NAME] = C;
	  $def($def.G + $def.W + $def.F, O);
	  __webpack_require__(/*! ./$.species */ 67)(C);
	
	  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 56 */
/*!******************************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.collection-to-json.js ***!
  \******************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $def  = __webpack_require__(/*! ./$.def */ 58)
	  , forOf = __webpack_require__(/*! ./$.for-of */ 64);
	module.exports = function(NAME){
	  $def($def.P, NAME, {
	    toJSON: function toJSON(){
	      var arr = [];
	      forOf(this, false, arr.push, arr);
	      return arr;
	    }
	  });
	};

/***/ },
/* 57 */
/*!**************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.fw.js ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 58 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.def.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(/*! ./$ */ 39)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 59 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.get-names.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(/*! ./$ */ 39)
	  , toString = {}.toString
	  , getNames = $.getNames;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 60 */
/*!******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.shared.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(/*! ./$ */ 39)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 61 */
/*!*****************************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/timers-browserify/main.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(/*! process/browser.js */ 25).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/timers-browserify/main.js */ 61).setImmediate, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/timers-browserify/main.js */ 61).clearImmediate))

/***/ },
/* 62 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.ctx.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(/*! ./$.assert */ 63).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 63 */
/*!******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.assert.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ./$ */ 39);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 64 */
/*!******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.for-of.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(/*! ./$.ctx */ 62)
	  , get  = __webpack_require__(/*! ./$.iter */ 49).get
	  , call = __webpack_require__(/*! ./$.iter-call */ 74);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 65 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.set-proto.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(/*! ./$ */ 39)
	  , assert = __webpack_require__(/*! ./$.assert */ 63);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(/*! ./$.ctx */ 62)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 66 */
/*!****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.same.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 67 */
/*!*******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.species.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(/*! ./$ */ 39)
	  , SPECIES = __webpack_require__(/*! ./$.wks */ 44)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 68 */
/*!****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.task.js ***!
  \****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(/*! ./$ */ 39)
	  , ctx    = __webpack_require__(/*! ./$.ctx */ 62)
	  , cof    = __webpack_require__(/*! ./$.cof */ 51)
	  , invoke = __webpack_require__(/*! ./$.invoke */ 75)
	  , cel    = __webpack_require__(/*! ./$.dom-create */ 76)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id, '*');
	    };
	    global.addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 69 */
/*!***************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.mix.js ***!
  \***************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(/*! ./$.redef */ 52);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 70 */
/*!***********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.iter-detect.js ***!
  \***********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(/*! ./$.wks */ 44)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 71 */
/*!*****************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.keyof.js ***!
  \*****************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ./$ */ 39);
	module.exports = function(object, el){
	  var O      = $.toObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 72 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.enum-keys.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(/*! ./$ */ 39);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 73 */
/*!*******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.unscope.js ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 74 */
/*!*********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.iter-call.js ***!
  \*********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(/*! ./$.assert */ 63).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 75 */
/*!******************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.invoke.js ***!
  \******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 76 */
/*!**********************************************************************************************!*\
  !*** /Users/topher/dev/core-async/~/babel-runtime/~/core-js/library/modules/$.dom-create.js ***!
  \**********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(/*! ./$ */ 39)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }
/******/ ]);
//# sourceMappingURL=mouse-demo.bundle.js.map