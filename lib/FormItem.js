
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

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _FormItemContext = _interopRequireDefault(require("./FormItemContext"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

class FormItem extends _react.default.Component {
  constructor(...args) {
    super(...args);
    (0, _defineProperty2.default)(this, "saveDOM", dom => {
      this._dom = dom;
    });
    (0, _defineProperty2.default)(this, "_validateTimer", null);
    (0, _defineProperty2.default)(this, "handleChange", (value, callback) => {
      const {
        name
      } = this.props;
      this.setValue(value, formValue => {
        if (formValue[name]
        /*newValue*/
        === value
        /*oldValue*/
        ) return;
        callback && callback();

        if (this.hasValidateTrigger("change")) {
          this.triggerValidate();
        }
      });
    });
    (0, _defineProperty2.default)(this, "handleFocus", callback => {
      const clearErrorOnFocus = this.getProp("clearErrorOnFocus");
      callback && callback();

      if (clearErrorOnFocus) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this.cleanError();
      }
    });
    (0, _defineProperty2.default)(this, "handleBlur", callback => {
      callback && callback();

      if (this.hasValidateTrigger("blur")) {
        this.triggerValidate();
      }
    });
    const form = this.context;
    form.addField(this);
  }

  getDOM() {
    return this._dom;
  }

  getForm() {
    return this.context;
  }

  componentWillUnmount() {
    const form = this.context;
    form.removeField(this);
  }

  hasValidateTrigger(type = "none") {
    let triggers = this.getProp("validateTrigger", []);
    triggers = Array.isArray(triggers) ? triggers : [triggers];
    return triggers.indexOf(type) !== -1;
  }

  getValidateDelay() {
    const form = this.context;
    const {
      validateDelay
    } = form.props;
    const props = this.props;
    return "validateDelay" in props ? props.validateDelay : validateDelay;
  }

  hasError() {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.hasError(name);
  }

  getError() {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.getError(name);
  }

  cleanError() {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.cleanError(name);
  }

  setError(message) {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.setError(name, message);
  }

  isValidating() {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.isFieldValidating(name);
  }

  validate(callback) {
    const form = this.context;
    const {
      name
    } = this.props;
    form.validateField(name, callback);
  }

  getValue() {
    const form = this.context;
    const {
      name
    } = this.props;
    return form.getValue(name);
  }

  setValue(value, callback) {
    const form = this.context;
    const {
      name
    } = this.props;
    form.setValue(name, value, callback);
  }

  triggerValidate() {
    const validateDelay = this.getValidateDelay();

    if (validateDelay > 0) {
      if (this._validateTimer) clearTimeout(this._validateTimer);
      this._validateTimer = setTimeout(() => {
        this.validate();
      }, validateDelay);
    } else {
      this.validate();
    }
  }

  normalizeChildrenProps() {
    let {
      normalize,
      name,
      onChange: _onChange,
      onFocus: _onFocus,
      onBlur: _onBlur
    } = this.props;
    const getInputProps = this.getFormProps("getInputProps", () => ({}));
    const customProps = getInputProps(this, name);
    return _objectSpread({
      value: this.getValue()
    }, customProps, {
      onChange: value => {
        if (normalize) {
          value = normalize(value);
        }

        this.handleChange(value, () => {
          _onChange && _onChange(value);
          customProps.onChange && customProps.onChange(value);
        });
      },
      onFocus: e => {
        this.handleFocus(() => {
          _onFocus && _onFocus(e);
          customProps.onFocus && customProps.onFocus(e);
        });
      },
      onBlur: e => {
        this.handleBlur(() => {
          _onBlur && _onBlur(e);
          customProps.onBlur && customProps.onBlur(e);
        });
      }
    });
  }

  normalizeChildren() {
    return _react.default.cloneElement(_react.default.Children.only(this.props.children), this.normalizeChildrenProps());
  }

  getFormProps(prop, defaultValue) {
    const form = this.context;
    const formProps = form.props;
    return formProps[prop] || defaultValue;
  }

  getProp(prop, defaultValue) {
    const form = this.context;
    const formProps = form.props;
    const props = this.props;
    return prop in props ? props[prop] : formProps[prop] || defaultValue;
  }

  getFormItemContext() {
    return Object.create(this);
  }

  render() {
    const {
      name,
      label,
      required,
      className,
      prefixCls,
      style,
      renderExtra,
      children
    } = this.props;
    const inline = this.getProp("inline");
    const labelPosition = this.getProp("labelPosition");
    const renderFieldExtra = this.getFormProps("renderFieldExtra");

    const renderControlExtra = () => {
      if (renderExtra) {
        return renderExtra(this);
      }

      if (renderFieldExtra) {
        return renderFieldExtra(this, name);
      }

      return null;
    };

    const hasError = this.hasError();
    const isValidating = this.isValidating();
    const child = typeof children === "function" ? children(this.normalizeChildrenProps(), this) : this.normalizeChildren();
    return _react.default.createElement(_FormItemContext.default.Provider, {
      value: this.getFormItemContext()
    }, _react.default.createElement("div", {
      style: style,
      ref: this.saveDOM,
      className: (0, _classnames.default)(prefixCls, {
        ["".concat(prefixCls, "-inline")]: inline,
        ["".concat(prefixCls, "-").concat(labelPosition)]: labelPosition,
        ["has-error"]: hasError,
        ["is-validating"]: isValidating,
        ["is-required"]: required,
        ["".concat(className)]: className
      })
    }, label && _react.default.createElement("label", {
      htmlFor: this.getProp("labelFor"),
      className: (0, _classnames.default)("".concat(prefixCls, "-label"), this.getProp("labelClassName")),
      style: _objectSpread({
        width: this.getProp("labelWidth")
      }, this.getProp("labelStyle", {}))
    }, label), _react.default.createElement("div", {
      className: (0, _classnames.default)("".concat(prefixCls, "-control"), this.getProp("controlClassName")),
      style: this.getProp("controlStyle", {})
    }, child, renderControlExtra())));
  }

}

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "contextType", _FormContext.default);
(0, _defineProperty2.default)(FormItem, "propTypes", {
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]).isRequired,
  name: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  label: _propTypes.default.node,
  labelFor: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelStyle: _propTypes.default.object,
  labelClassName: _propTypes.default.string,
  labelPosition: _propTypes.default.oneOf(["top", "left"]),
  controlStyle: _propTypes.default.object,
  controlClassName: _propTypes.default.string,
  validator: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.array]),
  required: _propTypes.default.bool,
  requiredMessage: _propTypes.default.string,
  clearErrorOnFocus: _propTypes.default.bool,
  normalize: _propTypes.default.func,
  renderExtra: _propTypes.default.func,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.oneOf(["blur", "change"]),
  inline: _propTypes.default.bool
});
(0, _defineProperty2.default)(FormItem, "defaultProps", {
  prefixCls: "nex-form-item" // requiredMessage: "不能为空"

});