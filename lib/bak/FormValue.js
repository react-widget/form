
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var FormValue =
/*#__PURE__*/
function () {
  function FormValue() {
    var defaultData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, FormValue);
    this.options = (0, _assign.default)({
      path2obj: true // a.b.c转换成{a:{b: {c: 1}}}

    }, options);
    this.defaultData = (0, _cloneDeep.default)(defaultData);
    this.data = (0, _cloneDeep.default)(defaultData);
    this.rules = rules;
    this._listeners = [];
  }

  (0, _createClass2.default)(FormValue, [{
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      this.notify();
    }
  }, {
    key: "get",
    value: function get(name) {
      var path2obj = this.options.path2obj;

      if (path2obj) {
        return (0, _get2.default)(this.data, name);
      }

      return this.data[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var path2obj = this.options.path2obj;

      if (path2obj) {
        (0, _set2.default)(this.data, name, value);
      } else {
        this.data[name] = value;
      }

      this.notify();
      return this;
    }
  }, {
    key: "subscribe",
    value: function subscribe(listener) {
      var _this = this;

      this._listeners.push(listener);

      return function () {
        var index = _this._listeners.indexOf(listener);

        if (index > -1) _this._listeners.splice(index, 1);
      };
    }
  }, {
    key: "notify",
    value: function notify() {
      var _this2 = this;

      this._listeners.forEach(function (listener) {
        return listener(_this2.data);
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.data = (0, _cloneDeep.default)(this.defaultData);
      this.notify();
    }
  }, {
    key: "getError",
    value: function getError(name) {}
  }, {
    key: "validate",
    value: function validate(name) {}
  }]);
  return FormValue;
}();

exports.default = FormValue;