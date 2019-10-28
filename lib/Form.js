
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

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function noop() {}

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateCb", []);
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
        var name = field.props.name;
        this.state.formError[name] = null;
        this.fields.splice(idx, 1);
      }
    }
  }, {
    key: "getValue",
    value: function getValue(name) {
      var getDefaultFieldValue = this.props.getDefaultFieldValue;
      var path2obj = this.props.path2obj;
      var formValue = this.state.formValue;
      var value = path2obj ? (0, _get.default)(formValue, name) : formValue[name];
      return value === undefined && getDefaultFieldValue ? getDefaultFieldValue(name) : value;
    }
  }, {
    key: "setValue",
    value: function setValue(name, value, cb) {
      var _this$props = this.props,
          path2obj = _this$props.path2obj,
          onChange = _this$props.onChange;
      var formValue = this.state.formValue; // TODO: 后面再考虑下特殊场景

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
        onChange(nextFormValue);
      }

      if (cb) {
        this._validateCb.push(cb);
      }
    }
  }, {
    key: "setValues",
    value: function setValues() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var _this$props2 = this.props,
          path2obj = _this$props2.path2obj,
          onChange = _this$props2.onChange;
      var formValue = this.state.formValue;

      var nextFormValue = _objectSpread({}, formValue);

      Object.keys(obj).forEach(function (name) {
        var value = obj[name];

        if (path2obj) {
          (0, _set.default)(nextFormValue, name, value);
        } else {
          nextFormValue[name] = value;
        }
      });

      if (!("formValue" in this.props)) {
        this.setState({
          formValue: nextFormValue
        });
      }

      if (onChange) {
        onChange(nextFormValue);
      }

      if (cb) {
        this._validateCb.push(cb);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var formValue = this.state.formValue;
      var validateProcess = this._validateCb;
      this._validateCb = [];
      validateProcess.forEach(function (cb) {
        cb(formValue);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._validateCb = [];
    }
  }, {
    key: "hasError",
    value: function hasError(name) {
      var formError = this.state.formError;
      return formError[name] != null; // null or undefined
    }
  }, {
    key: "getError",
    value: function getError(name) {
      var formError = this.state.formError;
      return formError[name];
    }
  }, {
    key: "cleanError",
    value: function cleanError(name) {
      var formError = this.state.formError;

      if (!this.hasError(name)) {
        return;
      }

      this.setState({
        formError: _objectSpread({}, formError, (0, _defineProperty2.default)({}, name, null))
      });
    }
  }, {
    key: "setError",
    value: function setError(name, message) {
      var formError = this.state.formError;
      this.setState({
        formError: _objectSpread({}, formError, (0, _defineProperty2.default)({}, name, message))
      });
    }
  }, {
    key: "cleanErrors",
    value: function cleanErrors() {
      this.setState({
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
    key: "getFieldValidator",
    value: function getFieldValidator(name) {
      var fieldValidators = [];
      this.fields.filter(function (field) {
        return field.props.name === name;
      }).forEach(function (field) {
        var fieldProps = field.props;

        if (fieldProps.required) {
          fieldValidators.unshift(function (value) {
            if ((0, _utils.isEmptyValue)(value)) {
              return fieldProps.requiredMessage == null ? "".concat(name, " fails") : fieldProps.requiredMessage;
            }
          });
        }

        if (fieldProps.validator) {
          fieldValidators.push.apply(fieldValidators, (0, _toConsumableArray2.default)(Array.isArray(fieldProps.validator) ? fieldProps.validator : [fieldProps.validator]));
        }
      });
      var validator = this.props.validators[name];

      if (validator) {
        fieldValidators.push.apply(fieldValidators, (0, _toConsumableArray2.default)(Array.isArray(validator) ? validator : [validator]));
      }

      return fieldValidators.filter(function (v) {
        return typeof v === "function";
      });
    }
  }, {
    key: "isFieldValidating",
    value: function isFieldValidating(name) {
      var validatingFields = this.state.validatingFields;
      return !!validatingFields[name];
    }
  }, {
    key: "isValidating",
    value: function isValidating() {
      var validatingFields = this.state.validatingFields;
      return Object.keys(validatingFields).some(function (key) {
        return validatingFields[key];
      });
    }
  }, {
    key: "_validateField",
    value: function _validateField(name, callback) {
      callback = typeof callback === "function" ? callback : noop;
      var formValue = this.state.formValue;
      var value = this.getValue(name);
      var validators = this.getFieldValidator(name);

      if (!validators.length) {
        callback(null, value);
        return;
      }

      var cb = function cb() {
        var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (errors === null && validators.length) {
          startCheck();
          return;
        }

        if (errors !== null) {
          if (!Array.isArray(errors)) {
            errors = [errors];
          }

          errors = errors.map(function (error) {
            var message = error;

            if (error instanceof Error) {
              message = error.message;
            }

            return {
              name: name,
              message: message
            };
          });
        }

        callback(errors, value);
      }; //串行校验


      var startCheck = function startCheck() {
        var validator = validators.shift();

        if (!validator) {
          return; //check finish
        }

        var ret = validator(value, formValue);

        if (ret === true) {
          cb();
        } else if (ret === false) {
          cb("".concat(name, " fails"));
        } else if (ret && ret.then) {
          //thenable
          ret.then(function () {
            return cb();
          }, function (e) {
            return cb(e);
          });
        } else {
          cb(ret);
        }
      };

      startCheck();
    }
  }, {
    key: "validateField",
    value: function validateField(name, callback) {
      var _this2 = this;

      callback = typeof callback === "function" ? callback : noop;
      var asyncTestDelay = this.props.asyncTestDelay;
      var _this$state = this.state,
          formError = _this$state.formError,
          validatingFields = _this$state.validatingFields; //是否异步探测

      var asyncTimer = setTimeout(function () {
        asyncTimer = null;

        _this2.setState({
          validatingFields: _objectSpread({}, validatingFields, (0, _defineProperty2.default)({}, name, true))
        });
      }, asyncTestDelay); // let isAsync = true;

      this._validateField(name, function (errors, value) {
        if (asyncTimer) {
          clearTimeout(asyncTimer);
        } // isAsync = false;


        _this2.setState({
          formError: _objectSpread({}, formError, (0, _defineProperty2.default)({}, name, errors ? errors[0].message : null)),
          validatingFields: _objectSpread({}, validatingFields, (0, _defineProperty2.default)({}, name, false))
        }, function () {
          callback(errors, value);
        });
      });
    }
  }, {
    key: "validate",
    value: function validate(callback) {
      var _this3 = this;

      callback = typeof callback === "function" ? callback : noop;
      var asyncTestDelay = this.props.asyncTestDelay;
      var _this$state2 = this.state,
          formValue = _this$state2.formValue,
          formError = _this$state2.formError;
      var fields = this.fields;
      var validatingFields = {};
      var allErrors = [];
      var validCounter = 0;

      var updateFormState = function updateFormState() {
        _this3.setState({
          formError: formError,
          validatingFields: validatingFields
        });
      };

      var complete = function complete(errors, name) {
        validCounter--;

        if (errors) {
          formError[name] = errors[0].message;
          allErrors.push.apply(allErrors, (0, _toConsumableArray2.default)(errors));
        }

        if (validCounter <= 0) {
          _this3.setState({
            formError: formError,
            validatingFields: {}
          }, function () {
            callback(allErrors.length ? allErrors : null, formValue);
          });
        }
      };

      if (fields.length) {
        //包含多个异步校验的情况下只执行一次
        var hasUpdate = false; //校验初始化

        fields.forEach(function (field) {
          var name = field.props.name;
          validCounter++;
          validatingFields[name] = true;

          if (!(name in formError)) {
            formError[name] = null;
          }
        }); //开始进行字段校验

        fields.forEach(function (field) {
          var name = field.props.name;
          var isAsyncValidate = false; //检测是否异步校验

          var asyncTimer = setTimeout(function () {
            isAsyncValidate = true;
            asyncTimer = null;
            if (hasUpdate) return;
            hasUpdate = true;
            updateFormState();
          }, asyncTestDelay);

          _this3._validateField(name, function (errors) {
            validatingFields[name] = false;

            if (asyncTimer) {
              clearTimeout(asyncTimer);
              asyncTimer = null;
            } //异步校验完成后执行刷新动作


            if (isAsyncValidate) {
              updateFormState();
            }

            complete(errors, name);
          });
        });
      } else {
        callback(null, formValue);
      }
    }
  }, {
    key: "validateAndScroll",
    value: function validateAndScroll(callback) {
      var _this4 = this;

      callback = typeof callback === "function" ? callback : noop;
      this.validate(function (errors, formValue) {
        if (errors) {
          var fields = _this4.fields;

          for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var name = field.props.name;

            if (_this4.hasError(name)) {
              var dom = field.getDOM();

              if (dom && dom.scrollIntoView) {
                dom.scrollIntoView();
                break;
              }
            }
          }
        }

        callback(errors, formValue);
      });
    }
  }, {
    key: "getFormContext",
    value: function getFormContext() {
      return Object.create(this);
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

Form.propTypes = process.env.NODE_ENV !== "production" ? {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  path2obj: _propTypes.default.bool,
  defaultFormValue: _propTypes.default.object,
  getDefaultFieldValue: _propTypes.default.func,
  renderFieldExtra: _propTypes.default.func,
  formValue: _propTypes.default.object,
  validators: _propTypes.default.object,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.oneOf(["blur", "change"]),
  asyncTestDelay: _propTypes.default.number,
  component: _propTypes.default.node,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelStyle: _propTypes.default.object,
  labelClassName: _propTypes.default.string,
  labelPosition: _propTypes.default.oneOf(["top", "left"]),
  controlStyle: _propTypes.default.object,
  controlClassName: _propTypes.default.string,
  clearErrorOnFocus: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func,
  getInputProps: _propTypes.default.func
} : {};
Form.defaultProps = {
  prefixCls: "nex-form",
  className: "",
  style: {},
  validators: {},
  path2obj: true,
  component: "form",
  asyncTestDelay: 100,
  validateDelay: 0,
  validateTrigger: "blur",
  labelPosition: "left",
  clearErrorOnFocus: true,
  inline: false
};
var _default = Form;
exports.default = _default;