
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NativeField;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

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