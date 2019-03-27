
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

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
    key: "cleanErrors",
    value: function cleanErrors() {
      this.setState({
        validatingFields: {},
        formError: {}
      });
    }
  }, {
    key: "getFieldRules",
    value: function getFieldRules(name) {
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
      var rules = this.getFieldRules(name);

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
  //formError: PropTypes.object,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.string,
  //change blur none
  component: _propTypes.default.node,
  rules: _propTypes.default.object,
  // labelPosition: PropTypes.oneOf(['right']),
  // labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // labelSuffix: PropTypes.string,
  // inline: PropTypes.bool,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func,
  validateFieldsAndScroll: _propTypes.default.bool
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  prefixCls: 'rw-form',
  className: '',
  style: {},
  path2obj: true,
  component: 'form',
  validateDelay: 0,
  validateFieldsAndScroll: true,
  // 待实现
  validateTrigger: 'none',
  labelPosition: 'right' //  labelSuffix: '',

});