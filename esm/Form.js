
import _extends from "@babel/runtime/helpers/extends";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import set from "lodash/set";
import get from "lodash/get";
import FormContext from "./FormContext";
import { isEmptyValue } from "./utils";

function noop() {}

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Form, _React$Component);

  function Form() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "fieldLockId", 1);

    _defineProperty(_assertThisInitialized(_this), "formLockId", 1);

    _defineProperty(_assertThisInitialized(_this), "fields", []);

    _defineProperty(_assertThisInitialized(_this), "_validateCb", []);

    _defineProperty(_assertThisInitialized(_this), "state", {
      formError: {},
      validatingFields: {},
      formValue: _this.props.defaultFormValue || {}
    });

    return _this;
  }

  Form.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    return {
      formValue: nextProps.formValue || prevState.formValue
    };
  } //异步校验加乐观锁
  ;

  var _proto = Form.prototype;

  _proto.addField = function addField(field) {
    this.fields.push(field);
  };

  _proto.removeField = function removeField(field) {
    var idx = this.fields.indexOf(field);

    if (idx !== -1) {
      var name = field.props.name;
      this.state.formError[name] = null;
      this.fields.splice(idx, 1);
    }
  };

  _proto.getValue = function getValue(name) {
    var getDefaultFieldValue = this.props.getDefaultFieldValue;
    var path2obj = this.props.path2obj;
    var formValue = this.state.formValue;
    var value = path2obj ? get(formValue, name) : formValue[name];
    return value === undefined && getDefaultFieldValue ? getDefaultFieldValue(name) : value;
  };

  _proto.setValue = function setValue(name, value, cb) {
    var _this$props = this.props,
        path2obj = _this$props.path2obj,
        onChange = _this$props.onChange;
    var formValue = this.state.formValue; // TODO: 后面再考虑下特殊场景

    var nextFormValue = _extends({}, formValue);

    if (path2obj) {
      set(nextFormValue, name, value);
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
  };

  _proto.setValues = function setValues(obj, cb) {
    if (obj === void 0) {
      obj = {};
    }

    var _this$props2 = this.props,
        path2obj = _this$props2.path2obj,
        onChange = _this$props2.onChange;
    var formValue = this.state.formValue;

    var nextFormValue = _extends({}, formValue);

    Object.keys(obj).forEach(function (name) {
      var value = obj[name];

      if (path2obj) {
        set(nextFormValue, name, value);
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
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var formValue = this.state.formValue;
    var validateProcess = this._validateCb;
    this._validateCb = [];
    validateProcess.forEach(function (cb) {
      cb(formValue);
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._validateCb = [];
  };

  _proto.hasError = function hasError(name) {
    var formError = this.state.formError;
    return formError[name] != null; // null or undefined
  };

  _proto.getError = function getError(name) {
    var formError = this.state.formError;
    return formError[name];
  };

  _proto.cleanError = function cleanError(name) {
    var _extends2;

    var formError = this.state.formError;

    if (!this.hasError(name)) {
      return;
    }

    this.setState({
      formError: _extends({}, formError, (_extends2 = {}, _extends2[name] = null, _extends2))
    });
  };

  _proto.setError = function setError(name, message) {
    var _extends3;

    var formError = this.state.formError;
    this.setState({
      formError: _extends({}, formError, (_extends3 = {}, _extends3[name] = message, _extends3))
    });
  };

  _proto.cleanErrors = function cleanErrors() {
    this.setState({
      formError: {}
    });
  };

  _proto.setErrors = function setErrors(errors) {
    var formError = this.state.formError;
    this.setState(_extends({}, formError, {}, errors));
  };

  _proto.getFieldValidatorList = function getFieldValidatorList(name) {
    var fieldValidators = [];
    this.fields.filter(function (field) {
      return field.props.name === name;
    }).forEach(function (field) {
      var fieldProps = field.props;

      if (fieldProps.required) {
        fieldValidators.unshift(function (value) {
          if (isEmptyValue(value)) {
            return fieldProps.requiredMessage == null ? name + " check fail" : fieldProps.requiredMessage;
          }
        });
      }

      if (fieldProps.validator) {
        fieldValidators.push.apply(fieldValidators, Array.isArray(fieldProps.validator) ? fieldProps.validator : [fieldProps.validator]);
      }
    });
    var validator = this.props.validators[name];

    if (validator) {
      fieldValidators.push.apply(fieldValidators, Array.isArray(validator) ? validator : [validator]);
    }

    return fieldValidators.filter(function (v) {
      return typeof v === "function";
    });
  };

  _proto.isFieldValidating = function isFieldValidating(name) {
    var validatingFields = this.state.validatingFields;
    return !!validatingFields[name];
  };

  _proto.isValidating = function isValidating() {
    var validatingFields = this.state.validatingFields;
    return Object.keys(validatingFields).some(function (key) {
      return validatingFields[key];
    });
  };

  _proto._validateField = function _validateField(name, callback, triggerType) {
    if (triggerType === void 0) {
      triggerType = "none";
    }

    callback = typeof callback === "function" ? callback : noop;
    var formValue = this.state.formValue;
    var value = this.getValue(name);
    var validators = this.getFieldValidatorList(name);

    if (!validators.length) {
      callback(null, value);
      return;
    }

    var cb = function cb(errors) {
      if (errors === void 0) {
        errors = null;
      }

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

      var ret = validator(value, formValue, triggerType);

      if (ret === true) {
        cb();
      } else if (ret === false) {
        cb(name + " fails");
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
  };

  _proto.validateField = function validateField(name, callback, triggerType) {
    var _this2 = this;

    callback = typeof callback === "function" ? callback : noop;
    var asyncTestDelay = this.props.asyncTestDelay;
    var _this$state = this.state,
        formError = _this$state.formError,
        validatingFields = _this$state.validatingFields;
    var lockId = ++this.fieldLockId; //是否异步探测

    var asyncTimer = setTimeout(function () {
      var _extends4;

      asyncTimer = null;
      if (lockId !== _this2.fieldLockId) return;

      _this2.setState({
        validatingFields: _extends({}, validatingFields, (_extends4 = {}, _extends4[name] = true, _extends4))
      });
    }, asyncTestDelay); // let isAsync = true;

    this._validateField(name, function (errors, value) {
      var _extends5, _extends6;

      if (asyncTimer) {
        clearTimeout(asyncTimer);
      } // isAsync = false;


      if (lockId !== _this2.fieldLockId) {
        callback(errors, value, true
        /* abort state */
        );
        return;
      }

      _this2.setState({
        formError: _extends({}, formError, (_extends5 = {}, _extends5[name] = errors ? errors[0].message : null, _extends5)),
        validatingFields: _extends({}, validatingFields, (_extends6 = {}, _extends6[name] = false, _extends6))
      }, function () {
        callback(errors, value);
      });
    }, triggerType);
  };

  _proto.validate = function validate(callback, triggerType) {
    var _this3 = this;

    callback = typeof callback === "function" ? callback : noop;
    var asyncTestDelay = this.props.asyncTestDelay;
    var _this$state2 = this.state,
        formValue = _this$state2.formValue,
        formError = _this$state2.formError;
    this.fieldLockId++; //validate优先级高于validateField

    var lockId = ++this.formLockId;
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
        allErrors.push.apply(allErrors, errors);
      }

      if (validCounter <= 0) {
        if (lockId !== _this3.formLockId) {
          callback(allErrors.length ? allErrors : null, formValue, true
          /* abort state */
          );
          return;
        }

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
          if (lockId !== _this3.formLockId) return;
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
        }, triggerType);
      });
    } else {
      callback(null, formValue);
    }
  };

  _proto.validateAndScroll = function validateAndScroll(callback, triggerType) {
    var _this4 = this;

    callback = typeof callback === "function" ? callback : noop;
    this.validate(function (errors, formValue, isAbort) {
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

      callback(errors, formValue, isAbort);
    }, triggerType);
  };

  _proto.getFormContext = function getFormContext() {
    return {
      form: this
    };
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style,
        className = _this$props3.className,
        onSubmit = _this$props3.onSubmit,
        Component = _this$props3.component,
        children = _this$props3.children;
    return React.createElement(FormContext.Provider, {
      value: this.getFormContext()
    }, React.createElement(Component, {
      style: style,
      className: classnames(prefixCls, className),
      onSubmit: onSubmit
    }, typeof children === "function" ? children(this) : children));
  };

  return Form;
}(React.Component);

Form.propTypes = process.env.NODE_ENV !== "production" ? {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  path2obj: PropTypes.bool,
  defaultFormValue: PropTypes.object,
  getDefaultFieldValue: PropTypes.func,
  renderFieldExtra: PropTypes.func,
  formValue: PropTypes.object,
  validators: PropTypes.object,
  validateDelay: PropTypes.number,
  validateTrigger: PropTypes.oneOf(["blur", "change"]),
  asyncTestDelay: PropTypes.number,
  component: PropTypes.node,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,
  labelPosition: PropTypes.oneOf(["top", "left"]),
  controlStyle: PropTypes.object,
  controlClassName: PropTypes.string,
  clearErrorOnFocus: PropTypes.bool,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  getInputProps: PropTypes.func
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
  validateTrigger: ["blur", "change"],
  labelPosition: "left",
  clearErrorOnFocus: true,
  inline: false
};
export default Form;