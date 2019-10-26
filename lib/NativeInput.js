
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NativeInput;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

function NativeInput(props) {
  const {
    component: Component = "input",
    value,
    inputRef,
    onChange
  } = props,
        others = (0, _objectWithoutProperties2.default)(props, ["component", "value", "inputRef", "onChange"]);

  const onInputChange = e => {
    const value = e.target.value;
    onChange && onChange(value, e);
  };

  return _react.default.createElement(Component, (0, _extends2.default)({
    ref: inputRef,
    onChange: onInputChange,
    value: value
  }, others));
}