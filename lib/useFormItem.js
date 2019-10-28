
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormItemContext = _interopRequireDefault(require("./FormItemContext"));

var _default = function _default() {
  return _react.default.useContext(_FormItemContext.default);
};

exports.default = _default;