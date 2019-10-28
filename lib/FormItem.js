
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _FormItemContext = _interopRequireDefault(require("./FormItemContext"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormItem, _React$Component);

  function FormItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveDOM", function (dom) {
      _this._dom = dom;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateTimer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (value, callback) {
      var name = _this.props.name;

      _this.setValue(value, function (formValue) {
        if (formValue[name]
        /*newValue*/
        === value
        /*oldValue*/
        ) return;
        callback && callback();

        if (_this.hasValidateTrigger("change")) {
          _this.triggerValidate();
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleFocus", function (callback) {
      var clearErrorOnFocus = _this.getProp("clearErrorOnFocus");

      callback && callback();

      if (clearErrorOnFocus) {
        if (_this._validateTimer) clearTimeout(_this._validateTimer);

        _this.cleanError();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleBlur", function (callback) {
      callback && callback();

      if (_this.hasValidateTrigger("blur")) {
        _this.triggerValidate();
      }
    });
    var form = _this.context;
    form.addField((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "getDOM",
    value: function getDOM() {
      return this._dom;
    }
  }, {
    key: "getForm",
    value: function getForm() {
      return this.context;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var form = this.context;
      form.removeField(this);
    }
  }, {
    key: "hasValidateTrigger",
    value: function hasValidateTrigger() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "none";
      var triggers = this.getProp("validateTrigger", []);
      triggers = Array.isArray(triggers) ? triggers : [triggers];
      return triggers.indexOf(type) !== -1;
    }
  }, {
    key: "getValidateDelay",
    value: function getValidateDelay() {
      var form = this.context;
      var validateDelay = form.props.validateDelay;
      var props = this.props;
      return "validateDelay" in props ? props.validateDelay : validateDelay;
    }
  }, {
    key: "hasError",
    value: function hasError() {
      var form = this.context;
      var name = this.props.name;
      return form.hasError(name);
    }
  }, {
    key: "getError",
    value: function getError() {
      var form = this.context;
      var name = this.props.name;
      return form.getError(name);
    }
  }, {
    key: "cleanError",
    value: function cleanError() {
      var form = this.context;
      var name = this.props.name;
      return form.cleanError(name);
    }
  }, {
    key: "setError",
    value: function setError(message) {
      var form = this.context;
      var name = this.props.name;
      return form.setError(name, message);
    }
  }, {
    key: "isValidating",
    value: function isValidating() {
      var form = this.context;
      var name = this.props.name;
      return form.isFieldValidating(name);
    }
  }, {
    key: "validate",
    value: function validate(callback) {
      var form = this.context;
      var name = this.props.name;
      form.validateField(name, callback);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var form = this.context;
      var name = this.props.name;
      return form.getValue(name);
    }
  }, {
    key: "setValue",
    value: function setValue(value, callback) {
      var form = this.context;
      var name = this.props.name;
      form.setValue(name, value, callback);
    }
  }, {
    key: "triggerValidate",
    value: function triggerValidate() {
      var _this2 = this;

      var validateDelay = this.getValidateDelay();

      if (validateDelay > 0) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(function () {
          _this2.validate();
        }, validateDelay);
      } else {
        this.validate();
      }
    }
  }, {
    key: "normalizeChildrenProps",
    value: function normalizeChildrenProps() {
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
      return _objectSpread({
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
    }
  }, {
    key: "normalizeChildren",
    value: function normalizeChildren() {
      return _react.default.cloneElement(_react.default.Children.only(this.props.children), this.normalizeChildrenProps());
    }
  }, {
    key: "getFormProps",
    value: function getFormProps(prop, defaultValue) {
      var form = this.context;
      var formProps = form.props;
      return formProps[prop] || defaultValue;
    }
  }, {
    key: "getProp",
    value: function getProp(prop, defaultValue) {
      var form = this.context;
      var formProps = form.props;
      var props = this.props;
      return prop in props ? props[prop] : formProps[prop] || defaultValue;
    }
  }, {
    key: "getFormItemContext",
    value: function getFormItemContext() {
      return Object.create(this);
    }
  }, {
    key: "render",
    value: function render() {
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
      return _react.default.createElement(_FormItemContext.default.Provider, {
        value: this.getFormItemContext()
      }, _react.default.createElement("div", {
        style: style,
        ref: this.saveDOM,
        className: (0, _classnames2.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-inline"), inline), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-").concat(labelPosition), labelPosition), (0, _defineProperty2.default)(_classnames, "has-error", hasError), (0, _defineProperty2.default)(_classnames, "is-validating", isValidating), (0, _defineProperty2.default)(_classnames, "is-required", required), (0, _defineProperty2.default)(_classnames, "".concat(className), className), _classnames))
      }, label && _react.default.createElement("label", {
        htmlFor: this.getProp("labelFor"),
        className: (0, _classnames2.default)("".concat(prefixCls, "-label"), this.getProp("labelClassName")),
        style: _objectSpread({
          width: this.getProp("labelWidth")
        }, this.getProp("labelStyle", {}))
      }, label), _react.default.createElement("div", {
        className: (0, _classnames2.default)("".concat(prefixCls, "-control"), this.getProp("controlClassName")),
        style: this.getProp("controlStyle", {})
      }, child, renderControlExtra())));
    }
  }]);
  return FormItem;
}(_react.default.Component);

(0, _defineProperty2.default)(FormItem, "contextType", _FormContext.default);
FormItem.propTypes = process.env.NODE_ENV !== "production" ? {
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
} : {};
FormItem.defaultProps = {
  prefixCls: "nex-form-item" // requiredMessage: "不能为空"

};
var _default = FormItem;
exports.default = _default;