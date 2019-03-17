
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _classnames = _interopRequireDefault(require("classnames"));

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _BaseForm = _interopRequireDefault(require("./BaseForm"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

function createForm(WrappedForm) {
  return function BaseWrappedForm(props) {
    return _react.default.createElement(_BaseForm.default, (0, _extends2.default)({}, props, {
      formComponent: WrappedForm
    }));
  };
}

var _default = createForm;
exports.default = _default;