
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_asyncValidator.default.warning = function () {};

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_valiateCb", []);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      formError: {},
      validatingFields: {},
      formValue: _this.props.defaultFormValue || {}
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
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
    value: function setValue(name, value, event, cb) {
      var _this$props = this.props,
          path2obj = _this$props.path2obj,
          onChange = _this$props.onChange;
      var formValue = this.state.formValue;

      var nextFormValue = _objectSpread({}, formValue);

      if (path2obj) {
        (0, _set.default)(nextFormValue, name, value);
      } else {
        nextFormValue[name] = value;
      }

      if (!("formValue" in this.props)) {
        this.setState({
          formValue: nextFormValue
        });
      }

      if (onChange) {
        onChange(nextFormValue, event);
      }

      if (cb) {
        this._valiateCb.push(cb);
      }

      return this;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var formValue = this.state.formValue;
      var validateProcess = this._valiateCb;
      this._valiateCb = [];
      validateProcess.forEach(function (cb) {
        cb(formValue);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._valiateCb = [];
    }
  }, {
    key: "getError",
    value: function getError(name) {
      var formError = this.state.formError;
      if (!arguments.length) return formError;
      return formError[name];
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
    key: "setErrors",
    value: function setErrors(errors) {
      var formError = this.state.formError;
      this.setState(_objectSpread({}, formError, {}, errors));
    }
  }, {
    key: "getFieldRules",
    value: function getFieldRules(name) {
      var fieldRules = [];
      this.fields.filter(function (field) {
        return field.props.name === name;
      }).forEach(function (field) {
        var fieldProps = field.props;
        var rules = fieldProps.rules || [];

        if (typeof rules === "function") {
          rules = [{
            validator: rules
          }];
        } else if (!Array.isArray(rules)) {
          rules = [rules];
        }

        if (fieldProps.required) {
          rules.unshift({
            required: true
          });
        }

        fieldRules.push.apply(fieldRules, (0, _toConsumableArray2.default)(rules));
      });
      var rules = this.props.rules[name] || [];

      if (rules) {
        if (typeof rules === "function") {
          rules = [{
            validator: rules
          }];
        } else if (!Array.isArray(rules)) {
          rules = [rules];
        }
      }

      return rules ? fieldRules.concat(rules) : fieldRules;
    }
  }, {
    key: "isValidatingField",
    value: function isValidatingField(name) {
      var validatingFields = this.state.validatingFields;
      return !!validatingFields[name];
    }
  }, {
    key: "validateField",
    value: function validateField(name, cb) {
      var _this2 = this;

      var _this$state = this.state,
          formError = _this$state.formError,
          validatingFields = _this$state.validatingFields;
      var value = this.getValue(name);
      var rules = this.getFieldRules(name);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb(null, value);
        }

        return;
      }

      this.setState({
        validatingFields: _objectSpread({}, validatingFields, (0, _defineProperty2.default)({}, name, true))
      });
      var descriptor = (0, _defineProperty2.default)({}, name, rules);
      var validator = new _asyncValidator.default(descriptor);
      var data = (0, _defineProperty2.default)({}, name, value);
      validator.validate(data, {
        firstFields: true
      }, function (errors) {
        _this2.setState({
          formError: _objectSpread({}, formError, (0, _defineProperty2.default)({}, name, errors ? errors[0].message : null)),
          validatingFields: _objectSpread({}, validatingFields, (0, _defineProperty2.default)({}, name, false))
        }, function () {
          if (cb instanceof Function) {
            cb(errors, value);
          }
        });
      });
    }
  }, {
    key: "validate",
    value: function validate(callback) {
      var _this3 = this;

      var formValue = this.state.formValue;
      var fields = this.fields;
      var rules = {};

      if (fields.length === 0 && callback) {
        callback(null, formValue);
        return;
      }

      fields.forEach(function (field) {
        var name = field.props.name;
        if (!name || name in rules) return;

        var fieldRules = _this3.getFieldRules(name);

        if (fieldRules && fieldRules.length) {
          rules[name] = fieldRules;
        }
      });
      var validatingFields = {};
      var validator = new _asyncValidator.default(rules);
      var data = {};
      Object.keys(rules).forEach(function (key) {
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
            callback(errors, formValue);
          }
        });
      });
    }
  }, {
    key: "validateAndScroll",
    value: function validateAndScroll(callback) {
      var _this4 = this;

      this.validate(function (errors, formValue) {
        if (errors) {
          var field;
          var formError = _this4.state.formError;
          var fields = _this4.fields;
          fields.forEach(function (f) {
            var name = f.props.name;
            if (!name) return;

            if (!field && name in formError) {
              field = f;
            }
          });

          if (field) {
            var dom = field.getDOM();

            if (dom && dom.scrollIntoView) {
              dom.scrollIntoView();
            }
          }
        }

        callback(errors, formValue);
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
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          style = _this$props2.style,
          className = _this$props2.className,
          onSubmit = _this$props2.onSubmit,
          Component = _this$props2.component,
          children = _this$props2.children;
      return _react.default.createElement(_FormContext.default.Provider, {
        value: this.getFormContext()
      }, _react.default.createElement(Component, {
        style: style,
        className: (0, _classnames.default)(prefixCls, className),
        onSubmit: onSubmit
      }, typeof children === "function" ? children(this) : children));
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
  defaultFormValue: _propTypes.default.object,
  formValue: _propTypes.default.object,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.string,
  //change blur none
  component: _propTypes.default.node,
  rules: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.func]),
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelPosition: _propTypes.default.oneOf(["top", "left", "right"]),
  alignItems: _propTypes.default.oneOf(["top", "center", "bottom"]),
  inline: _propTypes.default.bool,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func,
  validateFieldsAndScroll: _propTypes.default.bool,
  showMessage: _propTypes.default.bool,
  getFormItemInputProps: _propTypes.default.func
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  prefixCls: "rw-form",
  className: "",
  style: {},
  rules: {},
  path2obj: true,
  component: "form",
  validateDelay: 0,
  validateTrigger: "none",
  labelPosition: "left",
  alignItems: "center",
  inline: false,
  showMessage: true
});