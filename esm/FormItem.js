
import _extends from "@babel/runtime/helpers/extends";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormContext from "./FormContext";
import FormItemContext from "./FormItemContext";

var FormItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormItem, _React$Component);

  function FormItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "saveDOM", function (dom) {
      _this._dom = dom;
    });

    _defineProperty(_assertThisInitialized(_this), "_validateTimer", null);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value, callback) {
      var name = _this.props.name;

      var oldValue = _this.getValue();

      _this.setValue(value, function (formValue) {
        if (formValue[name]
        /*newValue*/
        === oldValue
        /*oldValue*/
        ) return;
        callback && callback();

        if (_this.hasValidateTrigger("change")) {
          _this.triggerValidate("change");
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (callback) {
      var clearErrorOnFocus = _this.getProp("clearErrorOnFocus");

      callback && callback();

      if (clearErrorOnFocus) {
        if (_this._validateTimer) clearTimeout(_this._validateTimer);

        _this.cleanError();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (callback) {
      callback && callback();

      if (_this.hasValidateTrigger("blur")) {
        _this.triggerValidate("blur");
      }
    });

    var form = _this.getForm();

    form.addField(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = FormItem.prototype;

  _proto.getDOM = function getDOM() {
    return this._dom;
  };

  _proto.getForm = function getForm() {
    return this.context.form;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var form = this.getForm();
    form.removeField(this);
  };

  _proto.hasValidateTrigger = function hasValidateTrigger(type) {
    if (type === void 0) {
      type = "none";
    }

    var triggers = this.getProp("validateTrigger", []);
    triggers = Array.isArray(triggers) ? triggers : [triggers];
    return triggers.indexOf(type) !== -1;
  };

  _proto.getValidateDelay = function getValidateDelay() {
    var form = this.getForm();
    var validateDelay = form.props.validateDelay;
    var props = this.props;
    return "validateDelay" in props ? props.validateDelay : validateDelay;
  };

  _proto.hasError = function hasError() {
    var form = this.getForm();
    var name = this.props.name;
    return form.hasError(name);
  };

  _proto.getError = function getError() {
    var form = this.getForm();
    var name = this.props.name;
    return form.getError(name);
  };

  _proto.cleanError = function cleanError() {
    var form = this.getForm();
    var name = this.props.name;
    return form.cleanError(name);
  };

  _proto.setError = function setError(message) {
    var form = this.getForm();
    var name = this.props.name;
    return form.setError(name, message);
  };

  _proto.isValidating = function isValidating() {
    var form = this.getForm();
    var name = this.props.name;
    return form.isFieldValidating(name);
  };

  _proto.validate = function validate(callback, triggerType) {
    if (triggerType === void 0) {
      triggerType = "none";
    }

    var form = this.getForm();
    var name = this.props.name;
    form.validateField(name, callback, triggerType);
  };

  _proto.getValue = function getValue() {
    var form = this.getForm();
    var name = this.props.name;
    return form.getValue(name);
  };

  _proto.setValue = function setValue(value, callback) {
    var form = this.getForm();
    var name = this.props.name;
    form.setValue(name, value, callback);
  };

  _proto.triggerValidate = function triggerValidate(triggerType) {
    var _this2 = this;

    var validateDelay = this.getValidateDelay();

    if (validateDelay > 0) {
      if (this._validateTimer) clearTimeout(this._validateTimer);
      this._validateTimer = setTimeout(function () {
        _this2.validate(null, triggerType);
      }, validateDelay);
    } else {
      this.validate(null, triggerType);
    }
  };

  _proto.normalizeChildrenProps = function normalizeChildrenProps() {
    var _this3 = this;

    var _this$props = this.props,
        normalize = _this$props.normalize,
        name = _this$props.name,
        _onChange = _this$props.onChange,
        _onFocus = _this$props.onFocus,
        _onBlur = _this$props.onBlur;
    var getInputProps = this.getFormProps("getInputProps", function () {
      return {};
    });
    var customProps = getInputProps(this, name);
    return _extends({
      value: this.getValue()
    }, customProps, {
      onChange: function onChange(value) {
        if (normalize) {
          value = normalize(value);
        }

        _this3.handleChange(value, function () {
          _onChange && _onChange(value);
          customProps.onChange && customProps.onChange(value);
        });
      },
      onFocus: function onFocus(e) {
        _this3.handleFocus(function () {
          _onFocus && _onFocus(e);
          customProps.onFocus && customProps.onFocus(e);
        });
      },
      onBlur: function onBlur(e) {
        _this3.handleBlur(function () {
          _onBlur && _onBlur(e);
          customProps.onBlur && customProps.onBlur(e);
        });
      }
    });
  };

  _proto.normalizeChildren = function normalizeChildren() {
    return React.cloneElement(React.Children.only(this.props.children), this.normalizeChildrenProps());
  };

  _proto.getFormProps = function getFormProps(prop, defaultValue) {
    var form = this.getForm();
    var formProps = form.props;
    return formProps[prop] || defaultValue;
  };

  _proto.getProp = function getProp(prop, defaultValue) {
    var form = this.getForm();
    var formProps = form.props;
    var props = this.props;
    return prop in props ? props[prop] : formProps[prop] || defaultValue;
  };

  _proto.getFormItemContext = function getFormItemContext() {
    return Object.create(this);
  };

  _proto.render = function render() {
    var _this4 = this,
        _classnames;

    var _this$props2 = this.props,
        name = _this$props2.name,
        label = _this$props2.label,
        required = _this$props2.required,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        style = _this$props2.style,
        renderExtra = _this$props2.renderExtra,
        children = _this$props2.children;
    var inline = this.getProp("inline");
    var labelPosition = this.getProp("labelPosition");
    var renderFieldExtra = this.getFormProps("renderFieldExtra");

    var renderControlExtra = function renderControlExtra() {
      if (renderExtra) {
        return renderExtra(_this4);
      }

      if (renderFieldExtra) {
        return renderFieldExtra(_this4, name);
      }

      return null;
    };

    var hasError = this.hasError();
    var isValidating = this.isValidating();
    var child = typeof children === "function" ? children(this.normalizeChildrenProps(), this) : this.normalizeChildren();
    return React.createElement(FormItemContext.Provider, {
      value: this.getFormItemContext()
    }, React.createElement("div", {
      style: style,
      ref: this.saveDOM,
      className: classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-inline"] = inline, _classnames[prefixCls + "-" + labelPosition] = labelPosition, _classnames["has-error"] = hasError, _classnames["is-validating"] = isValidating, _classnames["is-required"] = required, _classnames["" + className] = className, _classnames))
    }, label && React.createElement("label", {
      htmlFor: this.getProp("labelFor"),
      className: classnames(prefixCls + "-label", this.getProp("labelClassName")),
      style: _extends({
        width: this.getProp("labelWidth")
      }, this.getProp("labelStyle", {}))
    }, label), React.createElement("div", {
      className: classnames(prefixCls + "-control", this.getProp("controlClassName")),
      style: this.getProp("controlStyle", {})
    }, child, renderControlExtra())));
  };

  return FormItem;
}(React.Component);

_defineProperty(FormItem, "contextType", FormContext);

FormItem.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.node,
  labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,
  labelPosition: PropTypes.oneOf(["top", "left"]),
  controlStyle: PropTypes.object,
  controlClassName: PropTypes.string,
  validator: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  required: PropTypes.bool,
  requiredMessage: PropTypes.string,
  clearErrorOnFocus: PropTypes.bool,
  normalize: PropTypes.func,
  renderExtra: PropTypes.func,
  validateDelay: PropTypes.number,
  validateTrigger: PropTypes.oneOf(["blur", "change"]),
  inline: PropTypes.bool
} : {};
FormItem.defaultProps = {
  prefixCls: "nex-form-item" // requiredMessage: "不能为空"

};
export default FormItem;