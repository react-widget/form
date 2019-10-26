
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

class Form extends _react.default.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "fields", []);
    (0, _defineProperty2.default)(this, "_validateCb", []);
    (0, _defineProperty2.default)(this, "state", {
      formError: {},
      validatingFields: {},
      formValue: this.props.defaultFormValue || {}
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      formValue: nextProps.formValue || prevState.formValue
    };
  }

  addField(field) {
    this.fields.push(field);
  }

  removeField(field) {
    var idx = this.fields.indexOf(field);

    if (idx !== -1) {
      const name = field.props.name;
      this.state.formError[name] = null;
      this.fields.splice(idx, 1);
    }
  }

  getValue(name) {
    const {
      getDefaultFieldValue
    } = this.props;
    const path2obj = this.props.path2obj;
    const formValue = this.state.formValue;
    const value = path2obj ? (0, _get.default)(formValue, name) : formValue[name];
    return value === undefined && getDefaultFieldValue ? getDefaultFieldValue(name) : value;
  }

  setValue(name, value, cb) {
    const {
      path2obj,
      onChange
    } = this.props;
    const formValue = this.state.formValue; // const defer = deferred();
    // TODO: 后面再考虑下特殊场景

    const nextFormValue = _objectSpread({}, formValue);

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
      this._validateCb.push(formValue => {
        cb(formValue); // defer.resolve(formValue);
      });
    } // return defer.promise;

  }

  setValues(obj = {}, cb) {
    const {
      path2obj,
      onChange
    } = this.props;
    const formValue = this.state.formValue; // const defer = deferred();

    const nextFormValue = _objectSpread({}, formValue);

    Object.keys(obj).forEach(name => {
      const value = obj[name];

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
      this._validateCb.push(formValue => {
        cb(formValue); // defer.resolve(formValue);
      });
    } // return defer.promise;

  }

  componentDidUpdate() {
    const formValue = this.state.formValue;
    const validateProcess = this._validateCb;
    this._validateCb = [];
    validateProcess.forEach(cb => {
      cb(formValue);
    });
  }

  componentWillUnmount() {
    this._validateCb = [];
  }

  hasError(name) {
    const {
      formError
    } = this.state;
    return formError[name] != null; // null or undefined
  }

  getError(name) {
    const {
      formError
    } = this.state;
    return formError[name];
  }

  cleanError(name) {
    const {
      formError
    } = this.state;

    if (!this.hasError(name)) {
      return;
    }

    this.setState({
      formError: _objectSpread({}, formError, {
        [name]: null
      })
    });
  }

  setError(name, message) {
    const {
      formError
    } = this.state;
    this.setState({
      formError: _objectSpread({}, formError, {
        [name]: message
      })
    });
  }

  cleanErrors() {
    this.setState({
      formError: {}
    });
  }

  setErrors(errors) {
    const {
      formError
    } = this.state;
    this.setState(_objectSpread({}, formError, {}, errors));
  }

  getFieldValidator(name) {
    const fieldValidators = [];
    this.fields.filter(field => field.props.name === name).forEach(field => {
      const fieldProps = field.props;

      if (fieldProps.required) {
        fieldValidators.unshift(value => {
          if ((0, _utils.isEmptyValue)(value)) {
            return fieldProps.requiredMessage == null ? "".concat(name, " fails") : fieldProps.requiredMessage;
          }
        });
      }

      if (fieldProps.validator) {
        fieldValidators.push(...(Array.isArray(fieldProps.validator) ? fieldProps.validator : [fieldProps.validator]));
      }
    });
    const validator = this.props.validators[name];

    if (validator) {
      fieldValidators.push(...(Array.isArray(validator) ? validator : [validator]));
    }

    return fieldValidators.filter(v => typeof v === "function");
  }

  isFieldValidating(name) {
    const validatingFields = this.state.validatingFields;
    return !!validatingFields[name];
  }

  isValidating() {
    const validatingFields = this.state.validatingFields;
    return Object.keys(validatingFields).some(key => validatingFields[key]);
  }

  _validateField(name, callback) {
    callback = typeof callback === "function" ? callback : noop;
    const {
      formValue
    } = this.state;
    const value = this.getValue(name);
    const validators = this.getFieldValidator(name);

    if (!validators.length) {
      callback(null, value);
      return;
    }

    const cb = (errors = null) => {
      if (errors === null && validators.length) {
        startCheck();
        return;
      }

      if (errors !== null) {
        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        errors = errors.map(error => {
          let message = error;

          if (error instanceof Error) {
            message = error.message;
          }

          return {
            name,
            message
          };
        });
      }

      callback(errors, value);
    }; //串行校验


    const startCheck = () => {
      const validator = validators.shift();

      if (!validator) {
        return; //check finish
      }

      const ret = validator(value, formValue);

      if (ret === true) {
        cb();
      } else if (ret === false) {
        cb("".concat(name, " fails"));
      } else if (ret && ret.then) {
        //thenable
        ret.then(() => cb(), e => cb(e));
      } else {
        cb(ret);
      }
    };

    startCheck();
  }

  validateField(name, callback) {
    callback = typeof callback === "function" ? callback : noop;
    const {
      asyncTestDelay
    } = this.props;
    const {
      formError,
      validatingFields
    } = this.state; //是否异步探测

    let asyncTimer = setTimeout(() => {
      asyncTimer = null;
      this.setState({
        validatingFields: _objectSpread({}, validatingFields, {
          [name]: true
        })
      });
    }, asyncTestDelay); // let isAsync = true;

    this._validateField(name, (errors, value) => {
      if (asyncTimer) {
        clearTimeout(asyncTimer);
      } // isAsync = false;


      this.setState({
        formError: _objectSpread({}, formError, {
          [name]: errors ? errors[0].message : null
        }),
        validatingFields: _objectSpread({}, validatingFields, {
          [name]: false
        })
      }, () => {
        callback(errors, value);
      });
    });
  }

  validate(callback) {
    callback = typeof callback === "function" ? callback : noop;
    const {
      asyncTestDelay
    } = this.props;
    const {
      formValue,
      formError
    } = this.state;
    const fields = this.fields;
    const validatingFields = {};
    const allErrors = [];
    let validCounter = 0;

    const updateFormState = () => {
      this.setState({
        formError,
        validatingFields
      });
    };

    const complete = (errors, name) => {
      validCounter--;

      if (errors) {
        formError[name] = errors[0].message;
        allErrors.push(...errors);
      }

      if (validCounter <= 0) {
        this.setState({
          formError,
          validatingFields: {}
        }, () => {
          callback(allErrors.length ? allErrors : null, formValue);
        });
      }
    };

    if (fields.length) {
      //包含多个异步校验的情况下只执行一次
      let hasUpdate = false; //校验初始化

      fields.forEach(field => {
        const name = field.props.name;
        validCounter++;
        validatingFields[name] = true;

        if (!(name in formError)) {
          formError[name] = null;
        }
      }); //开始进行字段校验

      fields.forEach(field => {
        const name = field.props.name;
        let isAsyncValidate = false; //检测是否异步校验

        let asyncTimer = setTimeout(() => {
          isAsyncValidate = true;
          asyncTimer = null;
          if (hasUpdate) return;
          hasUpdate = true;
          updateFormState();
        }, asyncTestDelay);

        this._validateField(name, errors => {
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

  validateAndScroll(callback) {
    callback = typeof callback === "function" ? callback : noop;
    this.validate((errors, formValue) => {
      if (errors) {
        const fields = this.fields;

        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const name = field.props.name;

          if (this.hasError(name)) {
            const dom = field.getDOM();

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

  getFormContext() {
    return Object.create(this);
  }

  render() {
    const {
      prefixCls,
      style,
      className,
      onSubmit,
      component: Component,
      children
    } = this.props;
    return _react.default.createElement(_FormContext.default.Provider, {
      value: this.getFormContext()
    }, _react.default.createElement(Component, {
      style: style,
      className: (0, _classnames.default)(prefixCls, className),
      onSubmit: onSubmit
    }, typeof children === "function" ? children(this) : children));
  }

}

exports.default = Form;
(0, _defineProperty2.default)(Form, "propTypes", {
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
});
(0, _defineProperty2.default)(Form, "defaultProps", {
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
});