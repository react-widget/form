
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _Form = _interopRequireDefault(require("./Form"));

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _NativeField = _interopRequireDefault(require("./NativeField"));

_Form.default.Item = _FormItem.default;
_Form.default.NativeField = _NativeField.default;
var _default = _Form.default;
exports.default = _default;