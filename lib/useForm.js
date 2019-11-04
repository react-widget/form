
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _default = function _default() {
  var context = _react.default.useContext(_FormContext.default);

  return context.form;
};

exports.default = _default;