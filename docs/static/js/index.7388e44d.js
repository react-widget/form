/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

// import Demo2 from './demos/Demo2';
// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stringify = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js"));

var _parseInt2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _index = __webpack_require__(/*! ../../src/index */ "./src/index.js");

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      formValue: {
        name: 'haha',
        info: {
          gender: '男'
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "reset", function (e) {
      e.preventDefault();

      _this.setState({
        formValue: {
          name: 'haha',
          info: {
            gender: '男'
          }
        }
      });

      _this.form.cleanErrors();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSubmit", function (e) {
      e.preventDefault();

      if (_this.form) {
        _this.form.validate(function (errors) {
          console.log(errors);
        });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "getRules",
    value: function getRules() {
      return {
        'info.address': {
          type: "email",
          message: "emial 错误..."
        },
        name: function name(rule, value, callback) {
          setTimeout(function () {
            if (value.length < 5) {
              callback('必须多于5个字符');
            } else {
              callback();
            }
          }, 2000);
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var formValue = this.state.formValue;
      return _react.default.createElement("div", null, _react.default.createElement(_index.Form, {
        ref: function ref(form) {
          return _this2.form = form;
        },
        formValue: formValue,
        onChange: function onChange(formValue) {
          return _this2.setState({
            formValue: formValue
          });
        },
        onSubmit: this.onSubmit,
        rules: this.getRules(),
        checkTrigger: "none"
      }, function (form) {
        return _react.default.createElement("div", null, _react.default.createElement(_index.FormItem, {
          name: "name",
          label: "\u59D3\u540D"
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement("div", null, form.isValidatingField('name') ? '数据校验中...' : null), _react.default.createElement(_index.FormItem, {
          name: "info.gender",
          label: "\u6027\u522B"
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement(_index.FormItem, {
          name: "info.age",
          label: "\u5E74\u9F84",
          normalize: function normalize(v) {
            return (0, _parseInt2.default)(v) || '';
          }
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement(_index.FormItem, {
          name: "info.address",
          label: "\u5730\u5740"
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement(_index.FormItem, {
          name: "info.list[0]",
          label: "L1"
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement(_index.FormItem, {
          name: "info.list[1]",
          label: "L2"
        }, _react.default.createElement(_index.NativeField, {
          component: "input"
        })), _react.default.createElement(_index.FormItem, {
          name: "info.country",
          label: "\u56FD\u7C4D"
        }, _react.default.createElement(_index.NativeField, {
          component: "select"
        }, _react.default.createElement("option", {
          value: "\u4E2D\u56FD"
        }, "\u4E2D\u56FD"), _react.default.createElement("option", {
          value: "\u7F8E\u56FD"
        }, "\u7F8E\u56FD"), _react.default.createElement("option", {
          value: "\u6FB3\u5927\u5229\u4E9A"
        }, "\u6FB3\u5927\u5229\u4E9A"))), _react.default.createElement(_index.FormItem, {
          name: "info.desc",
          label: "\u5907\u6CE8"
        }, _react.default.createElement(_index.NativeField, {
          component: "textarea"
        })), _react.default.createElement("pre", null, (0, _stringify.default)(formValue)), _react.default.createElement("pre", null, (0, _stringify.default)(form.getError())), _react.default.createElement("button", null, "submit"), _react.default.createElement("button", {
          onClick: _this2.reset
        }, "reset"));
      }));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js"));

var _objectSpread5 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/objectSpread.js"));

var _isArray = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _asyncValidator = _interopRequireDefault(__webpack_require__(/*! async-validator */ "./node_modules/async-validator/es/index.js"));

var _set = _interopRequireDefault(__webpack_require__(/*! lodash/set */ "./node_modules/lodash/set.js"));

var _get = _interopRequireDefault(__webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js"));

var _FormContext = _interopRequireDefault(__webpack_require__(/*! ./FormContext */ "./src/FormContext.js"));

var Form =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Form, _React$Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fields", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      formError: {},
      validatingFields: {},
      formValue: _this.props.formDefaultValue || {}
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "getRule",
    value: function getRule(name) {
      var rules = this.props.rules[name] || null;

      if (rules) {
        if (typeof rules === 'function') {
          rules = [{
            validator: rules
          }];
        } else if (!(0, _isArray.default)(rules)) {
          rules = [rules];
        }
      }

      return rules;
    }
  }, {
    key: "validateField",
    value: function validateField(name, cb) {
      var _this2 = this;

      var _this$state = this.state,
          formError = _this$state.formError,
          validatingFields = _this$state.validatingFields;
      var rules = this.getRule(name);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb(null);
        }

        return;
      }

      this.setState({
        validatingFields: (0, _objectSpread5.default)({}, validatingFields, (0, _defineProperty2.default)({}, name, true))
      });
      var descriptor = (0, _defineProperty2.default)({}, name, rules);
      var validator = new _asyncValidator.default(descriptor);
      var data = (0, _defineProperty2.default)({}, name, this.getValue(name));
      validator.validate(data, {
        firstFields: true
      }, function (errors) {
        _this2.setState({
          formError: (0, _objectSpread5.default)({}, formError, (0, _defineProperty2.default)({}, name, errors ? errors[0].message : null)),
          validatingFields: (0, _objectSpread5.default)({}, validatingFields, (0, _defineProperty2.default)({}, name, false))
        }, function () {
          if (cb instanceof Function) {
            cb(errors);
          }
        });
      });
    }
  }, {
    key: "addField",
    value: function addField(field) {
      this.fields.push(field);
    }
  }, {
    key: "removeField",
    value: function removeField(field) {
      var idx = this.fields.indexOf(field);

      if (idx !== -1) {
        this.fields.splice(idx, 1);
      }
    }
  }, {
    key: "getValue",
    value: function getValue(name) {
      var path2obj = this.props.path2obj;
      var formValue = this.state.formValue;

      if (path2obj) {
        return (0, _get.default)(formValue, name);
      }

      return formValue[name];
    }
  }, {
    key: "setValue",
    value: function setValue(name, value, event) {
      var _this$props = this.props,
          path2obj = _this$props.path2obj,
          onChange = _this$props.onChange;
      var formValue = this.state.formValue;
      var nextFormValue = (0, _objectSpread5.default)({}, formValue);

      if (path2obj) {
        (0, _set.default)(nextFormValue, name, value);
      } else {
        nextFormValue[name] = value;
      }

      if (!('formValue' in this.props)) {
        this.setState({
          formValue: nextFormValue
        });
      }

      if (onChange) {
        onChange(nextFormValue, event);
      }

      return this;
    }
  }, {
    key: "getError",
    value: function getError(name) {
      var formError = this.state.formError;
      if (!arguments.length) return formError;
      return formError[name];
    }
  }, {
    key: "isValidatingField",
    value: function isValidatingField(name) {
      var validatingFields = this.state.validatingFields;
      return !!validatingFields[name];
    }
  }, {
    key: "cleanErrors",
    value: function cleanErrors() {
      this.setState({
        validatingFields: {},
        formError: {}
      });
    }
  }, {
    key: "validate",
    value: function validate(callback) {
      var _this3 = this;

      var _this$props2 = this.props,
          rules = _this$props2.rules,
          formValue = _this$props2.formValue;
      var fields = this.fields;

      if (fields.length === 0 && callback) {
        callback(null);
        return;
      }

      var validatingFields = {};
      var validator = new _asyncValidator.default(rules);
      var data = {};
      (0, _keys.default)(rules).forEach(function (key) {
        data[key] = (0, _get.default)(formValue, key);
        validatingFields[key] = true;
      });
      this.setState({
        validatingFields: validatingFields
      });
      validator.validate(data, {
        firstFields: true
      }, function (errors) {
        var formError = {};

        if (errors) {
          errors.forEach(function (error) {
            formError[error.field] = error.message;
          });
        }

        _this3.setState({
          formError: formError,
          validatingFields: {}
        }, function () {
          if (callback instanceof Function) {
            callback(errors);
          }
        });
      });
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(name, value) {
      var formValue = this.state.formValue;
      formValue.set(name, value);
    }
  }, {
    key: "getFormContext",
    value: function getFormContext() {
      return {
        form: this
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          prefixCls = _this$props3.prefixCls,
          style = _this$props3.style,
          className = _this$props3.className,
          onSubmit = _this$props3.onSubmit,
          Component = _this$props3.component,
          children = _this$props3.children;
      return _react.default.createElement(_FormContext.default.Provider, {
        value: this.getFormContext()
      }, _react.default.createElement(Component, {
        style: style,
        className: (0, _classnames.default)(prefixCls, className),
        onSubmit: onSubmit
      }, typeof children === 'function' ? children(this) : children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        formValue: nextProps.formValue || prevState.formValue
      };
    }
  }]);
  return Form;
}(_react.default.Component);

exports.default = Form;
(0, _defineProperty2.default)(Form, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  path2obj: _propTypes.default.bool,
  formDefaultValue: _propTypes.default.object,
  formValue: _propTypes.default.object,
  formError: _propTypes.default.object,
  checkDelay: _propTypes.default.number,
  checkTrigger: _propTypes.default.string,
  //change blur none
  component: _propTypes.default.node,
  rules: _propTypes.default.object,
  // labelPosition: PropTypes.oneOf(['right']),
  // labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // labelSuffix: PropTypes.string,
  // inline: PropTypes.bool,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  prefixCls: 'rw-form',
  className: '',
  style: {},
  path2obj: true,
  component: 'form',
  labelPosition: 'right',
  labelSuffix: ''
});

/***/ }),

/***/ "./src/FormContext.js":
/*!****************************!*\
  !*** ./src/FormContext.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _default = _react.default.createContext({});

exports.default = _default;

/***/ }),

/***/ "./src/FormItem.js":
/*!*************************!*\
  !*** ./src/FormItem.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseInt2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames2 = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _asyncValidator = _interopRequireDefault(__webpack_require__(/*! async-validator */ "./node_modules/async-validator/es/index.js"));

var _FormContext = _interopRequireDefault(__webpack_require__(/*! ./FormContext */ "./src/FormContext.js"));

var FormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormItem, _React$Component);

  function FormItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FormItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormItem).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateTimer", null);
    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var form = this.context.form;
      var name = this.props.name;

      if (name) {
        form.addField(this);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var form = this.context.form;
      form.removeField(this);
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      var form = this.context.form;
      var name = this.props.name;
      var rules = form.getRule(name);
      var isRequired = false;

      if (rules && rules.length) {
        isRequired = rules.some(function (rule) {
          return rule.required;
        });
      }

      return isRequired;
    }
  }, {
    key: "onFieldBlur",
    value: function onFieldBlur() {
      var form = this.context.form;
      var _form$props = form.props,
          checkTrigger = _form$props.checkTrigger,
          checkDelay = _form$props.checkDelay;
      var name = this.props.name;

      if (checkTrigger === 'blur' && checkDelay > 0) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(function () {
          form.validateField(name);
        }, checkDelay);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var name = this.props.name;
      var form = this.context.form;
      return form.getValue(name);
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(value, e) {
      var form = this.context.form;
      var checkTrigger = form.props.checkTrigger;
      var name = this.props.name;
      form.setValue(name, value, e);

      if (checkTrigger === 'change' && checkDelay > 0) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(function () {
          form.validateField(name);
        }, checkDelay);
      }
    }
  }, {
    key: "labelStyle",
    value: function labelStyle() {
      var ret = {}; // if (this.parent().props.labelPosition === 'top') return ret;

      var labelWidth = this.props.labelWidth; //|| this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "contentStyle",
    value: function contentStyle() {
      var ret = {}; //    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

      var labelWidth = this.props.labelWidth; // || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "fieldValue",
    value: function fieldValue() {
      var model = this.context.model; //const model = this.parent().props.model;

      if (!model || !this.props.name) {
        return;
      }

      return model[this.props.name];
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var form = this.context.form;
      var validating = this.state.validating;
      var _this$props = this.props,
          normalize = _this$props.normalize,
          label = _this$props.label,
          required = _this$props.required,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          name = _this$props.name;
      var error = form.getError(name);

      var children = _react.default.Children.only(this.props.children);

      var _children$props = children.props,
          _onChange = _children$props.onChange,
          _onBlur = _children$props.onBlur;
      var onFieldChange = this.onFieldChange.bind(this);
      var onFieldBlur = this.onFieldBlur.bind(this);

      var InputComponent = _react.default.cloneElement(children, {
        value: this.getValue(),
        onChange: function onChange(value, event) {
          if (normalize) {
            value = normalize(value);
          }

          _onChange && _onChange(value, event);
          onFieldChange(value, event);
        },
        onBlur: function onBlur(e) {
          _onBlur && _onBlur(e);
          onFieldBlur(e);
        }
      });

      return _react.default.createElement("div", {
        className: (0, _classnames2.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(className), className), (0, _defineProperty2.default)(_classnames, 'is-error', error), (0, _defineProperty2.default)(_classnames, 'is-validating', validating), (0, _defineProperty2.default)(_classnames, 'is-required', this.isRequired() || required), _classnames))
      }, label && _react.default.createElement("label", {
        className: "nex-form-item-label"
      }, label), _react.default.createElement("div", {
        className: "nex-form-inner-wrapper",
        style: this.contentStyle()
      }, InputComponent, error && _react.default.createElement("div", {
        className: "nex-form-item-error"
      }, error)));
    }
  }]);
  return FormItem;
}(_react.default.Component);

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "contextType", _FormContext.default);
(0, _defineProperty2.default)(FormItem, "propTypes", {
  label: _propTypes.default.string,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  name: _propTypes.default.string,
  required: _propTypes.default.bool,
  rules: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  normalize: _propTypes.default.func
});
(0, _defineProperty2.default)(FormItem, "defaultProps", {
  prefixCls: 'rw-form-item'
});

/***/ }),

/***/ "./src/NativeField.js":
/*!****************************!*\
  !*** ./src/NativeField.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NativeField;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/objectWithoutProperties.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function NativeField(props) {
  var _props$component = props.component,
      Component = _props$component === void 0 ? 'input' : _props$component,
      value = props.value,
      inputRef = props.inputRef,
      onChange = props.onChange,
      others = (0, _objectWithoutProperties2.default)(props, ["component", "value", "inputRef", "onChange"]);

  var onInputChange = function onInputChange(e) {
    var value = e.target.value;
    onChange && onChange(value, e);
  };

  return _react.default.createElement(Component, (0, _extends2.default)({
    ref: inputRef,
    onChange: onInputChange,
    value: value
  }, others));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form.default;
  }
});
Object.defineProperty(exports, "FormItem", {
  enumerable: true,
  get: function get() {
    return _FormItem.default;
  }
});
Object.defineProperty(exports, "NativeField", {
  enumerable: true,
  get: function get() {
    return _NativeField.default;
  }
});
exports.default = void 0;

var _Form = _interopRequireDefault(__webpack_require__(/*! ./Form */ "./src/Form.js"));

var _FormItem = _interopRequireDefault(__webpack_require__(/*! ./FormItem */ "./src/FormItem.js"));

var _NativeField = _interopRequireDefault(__webpack_require__(/*! ./NativeField */ "./src/NativeField.js"));

var _default = _Form.default;
exports.default = _default;

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\form\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\form\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\form\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.7388e44d.js.map