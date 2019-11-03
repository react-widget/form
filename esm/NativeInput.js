
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from "react";
export default function NativeInput(props) {
  var _props$component = props.component,
      Component = _props$component === void 0 ? "input" : _props$component,
      value = props.value,
      inputRef = props.inputRef,
      onChange = props.onChange,
      others = _objectWithoutPropertiesLoose(props, ["component", "value", "inputRef", "onChange"]);

  var onInputChange = function onInputChange(e) {
    var value = e.target.value;
    onChange && onChange(value, e);
  };

  return React.createElement(Component, _extends({
    ref: inputRef,
    onChange: onInputChange,
    value: value
  }, others));
}